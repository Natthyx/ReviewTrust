import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/supabase/database.types'
import { NextResponse } from 'next/server'

// Create a public client for read-only operations
const createPublicClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// GET /api/explore - Fetch businesses with optional filtering
export async function GET(request: Request) {
  try {
    const supabase = createPublicClient()
    
    const { searchParams } = new URL(request.url)
    const subcategoryName = searchParams.get('subcategory')
    const searchQuery = searchParams.get('search')
    const sortBy = searchParams.get('sort') || 'rating'
    
    let businessQuery = supabase
      .from('businesses')
      .select(`
        id,
        business_name,
        location,
        description,
        rating_count
      `)
      .eq('is_banned', false)
    
    // Apply search filter if provided
    if (searchQuery) {
      businessQuery = businessQuery.ilike('business_name', `%${searchQuery}%`)
    }
    
    // Execute the business query
    const { data: businesses, error: businessError } = await businessQuery
    
    if (businessError) {
      throw businessError
    }
    
    // If we're filtering by subcategory, we need to filter the businesses
    let filteredBusinesses = businesses
    if (subcategoryName) {
      // First, find the subcategory ID by name
      const { data: subcategoryData, error: subcategoryError } = await supabase
        .from('subcategories')
        .select('id')
        .ilike('name', subcategoryName)
        .single()
      
      if (!subcategoryError && subcategoryData) {
        // Get business IDs that have this subcategory
        const { data: businessSubcategories, error: businessSubError } = await supabase
          .from('business_subcategories')
          .select('business_id')
          .eq('subcategory_id', subcategoryData.id)
        
        if (!businessSubError && businessSubcategories) {
          const businessIds = businessSubcategories.map(bs => bs.business_id)
          filteredBusinesses = businesses.filter(b => businessIds.includes(b.id))
        }
      }
    }
    
    // Process the data to match the expected format
    const processedBusinesses = filteredBusinesses.map(business => ({
      id: business.id,
      name: business.business_name,
      location: business.location,
      description: business.description,
      rating: business.rating_count || 0,
      // We'll need to fetch review counts separately
      reviewCount: 0 // Placeholder, will be updated below
    }))
    
    // Fetch review counts for each business
    if (processedBusinesses.length > 0) {
      const businessIds = processedBusinesses.map(b => b.id)
      const { data: reviewCounts, error: reviewError } = await supabase
        .from('reviews')
        .select('reviewee_id')
        .in('reviewee_id', businessIds)
      
      if (!reviewError && reviewCounts) {
        // Count reviews per business
        const reviewCountMap: Record<string, number> = {}
        reviewCounts.forEach((review: any) => {
          reviewCountMap[review.reviewee_id] = (reviewCountMap[review.reviewee_id] || 0) + 1
        })
        
        // Update review counts
        processedBusinesses.forEach(business => {
          business.reviewCount = reviewCountMap[business.id] || 0
        })
      }
    }
    
    // Sort the results
    let sortedBusinesses = [...processedBusinesses]
    switch (sortBy) {
      case 'reviews':
        sortedBusinesses.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case 'recent':
        // For recent, we would need a created_at field on businesses
        // Since we don't have that, we'll sort by rating as fallback
        sortedBusinesses.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'rating':
      default:
        sortedBusinesses.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
    }
    
    return NextResponse.json(sortedBusinesses)
  } catch (error) {
    console.error('Error fetching businesses:', error)
    return NextResponse.json({ error: "Failed to fetch businesses" }, { status: 500 })
  }
}