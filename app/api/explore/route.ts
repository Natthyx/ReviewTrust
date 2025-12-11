// app/api/explore/route.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/lib/supabase/database.types'
import { NextResponse } from 'next/server'

const createPublicClient = () => {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function GET(request: Request) {
  try {
    const supabase = createPublicClient()
    const { searchParams } = new URL(request.url)
    const searchQuery = searchParams.get('search')
    const categoryId = searchParams.get('category')
    const subcategoryName = searchParams.get('subcategory')
    const sortBy = searchParams.get('sort') || 'rating'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    // Step 1: Fetch businesses with category information
    let query = supabase
      .from('businesses')
      .select(`
        id, 
        business_name, 
        location, 
        description,
        created_at,
        business_categories(
          category_id,
          categories(
            id,
            name
          )
        )
      `, { count: 'exact' })
      .eq('is_banned', false)

    // Apply search filter
    if (searchQuery) {
      query = query.ilike('business_name', `%${searchQuery}%`)
    }

    const { data: businesses, error, count } = await query
    if (error) throw error
    if (!businesses || businesses.length === 0) {
      return NextResponse.json({
        businesses: [],
        pagination: {
          currentPage: page,
          totalPages: 0,
          totalCount: 0,
          hasNext: false,
          hasPrev: false
        }
      })
    }

    // Step 2: Filter by category if needed
    let filteredBusinesses = businesses
    if (categoryId && categoryId !== 'all') {
      filteredBusinesses = businesses.filter(business => 
        business.business_categories?.some((cat: any) => cat.category_id === categoryId)
      )
    }

    // Step 3: Filter by subcategory if needed
    if (subcategoryName) {
      const { data: subcat } = await supabase
        .from('subcategories')
        .select('id')
        .ilike('name', subcategoryName)
        .single()

      if (subcat) {
        const { data: links } = await supabase
          .from('business_subcategories')
          .select('business_id')
          .eq('subcategory_id', subcat.id)

        const linkedIds = links?.map(l => l.business_id) || []
        filteredBusinesses = filteredBusinesses.filter(b => linkedIds.includes(b.id))
      } else {
        filteredBusinesses = [] // No matching subcategory
      }
    }

    // Step 4: Get business IDs for review counting
    const businessIds = filteredBusinesses.map(b => b.id)

    // Step 5: Fetch review counts for all businesses
    const { data: reviewCounts } = await supabase
      .from('reviews')
      .select('reviewee_id, rating')
      .in('reviewee_id', businessIds)

    // Step 6: Calculate rating and review count per business
    const statsMap = new Map<string, { total: number; count: number }>()

    reviewCounts?.forEach(review => {
      const entry = statsMap.get(review.reviewee_id) || { total: 0, count: 0 }
      entry.total += review.rating
      entry.count += 1
      statsMap.set(review.reviewee_id, entry)
    })

    // Step 7: Sort results based on actual data
    filteredBusinesses.sort((a, b) => {
      const statsA = statsMap.get(a.id) || { total: 0, count: 0 }
      const statsB = statsMap.get(b.id) || { total: 0, count: 0 }
      
      const avgRatingA = statsA.count > 0 ? statsA.total / statsA.count : 0
      const avgRatingB = statsB.count > 0 ? statsB.total / statsB.count : 0
      
      if (sortBy === 'reviews') {
        return statsB.count - statsA.count
      }
      if (sortBy === 'recent') {
        // Sort by created date if available
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
        return dateB - dateA
      }
      // Default: highest rated
      if (avgRatingB !== avgRatingA) {
        return avgRatingB - avgRatingA
      }
      // If ratings are equal, sort by review count
      return statsB.count - statsA.count
    })

    // Step 8: Paginate results
    const totalCount = filteredBusinesses.length
    const totalPages = Math.ceil(totalCount / limit)
    const startIndex = (page - 1) * limit
    const paginatedBusinesses = filteredBusinesses.slice(startIndex, startIndex + limit)

    // Step 9: Fetch primary images for these businesses
    const paginatedBusinessIds = paginatedBusinesses.map(b => b.id)
    const { data: businessImages } = await supabase
      .from('business_images')
      .select('business_id, image_url')
      .in('business_id', paginatedBusinessIds)
      .eq('is_primary', true)

    // Create a map of business_id to primary image URL
    const imageMap = new Map<string, string>()
    businessImages?.forEach(img => {
      imageMap.set(img.business_id, img.image_url)
    })

    // Step 10: Build final response
    const processed = paginatedBusinesses.map(business => {
      const stats = statsMap.get(business.id) || { total: 0, count: 0 }
      const averageRating = stats.count > 0 
        ? Math.round((stats.total / stats.count) * 10) / 10 
        : 0

      // Get the first category name for display
      const categoryName = business.business_categories?.[0]?.categories?.name || "Service"

      return {
        id: business.id,
        name: business.business_name,
        location: business.location || '',
        description: business.description || '',
        rating: averageRating,
        reviewCount: stats.count,
        imageUrl: imageMap.get(business.id) || '/placeholder-service-image.svg',
        category: categoryName
      }
    })

    return NextResponse.json({
      businesses: processed,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalCount: totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    })
  } catch (error) {
    console.error('Error in explore API:', error)
    return NextResponse.json({ error: 'Failed to load services' }, { status: 500 })
  }
}