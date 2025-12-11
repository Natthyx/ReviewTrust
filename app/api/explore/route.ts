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
    const subcategoryName = searchParams.get('subcategory')
    const sortBy = searchParams.get('sort') || 'rating'

    // Step 1: Fetch businesses (without rating_count)
    let query = supabase
      .from('businesses')
      .select('id, business_name, location, description')
      .eq('is_banned', false)

    if (searchQuery) {
      query = query.ilike('business_name', `%${searchQuery}%`)
    }

    const { data: businesses, error } = await query
    if (error) throw error
    if (!businesses || businesses.length === 0) {
      return NextResponse.json([])
    }

    // Step 2: Filter by subcategory if needed
    let filteredBusinesses = businesses
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
        filteredBusinesses = businesses.filter(b => linkedIds.includes(b.id))
      } else {
        filteredBusinesses = [] // No matching subcategory
      }
    }

    const businessIds = filteredBusinesses.map(b => b.id)

    // Step 3: Fetch all reviews for these businesses in one query
    const { data: allReviews } = await supabase
      .from('reviews')
      .select('reviewee_id, rating')
      .in('reviewee_id', businessIds)

    // Step 4: Calculate rating and review count per business
    const statsMap = new Map<string, { total: number; count: number }>()

    allReviews?.forEach(review => {
      const entry = statsMap.get(review.reviewee_id) || { total: 0, count: 0 }
      entry.total += review.rating
      entry.count += 1
      statsMap.set(review.reviewee_id, entry)
    })

    // Step 5: Build final response
    const processed = filteredBusinesses.map(business => {
      const stats = statsMap.get(business.id) || { total: 0, count: 0 }
      const averageRating = stats.count > 0 
        ? Math.round((stats.total / stats.count) * 10) / 10 
        : 0

      return {
        id: business.id,
        name: business.business_name,
        location: business.location || '',
        description: business.description || '',
        rating: averageRating,
        reviewCount: stats.count
      }
    })

    // Step 6: Sort results
    processed.sort((a, b) => {
      if (sortBy === 'reviews') {
        return b.reviewCount - a.reviewCount
      }
      if (sortBy === 'recent') {
        // Fallback: sort by review count (most active)
        return b.reviewCount - a.reviewCount
      }
      // Default: highest rated
      return b.rating - a.rating || b.reviewCount - a.reviewCount
    })

    return NextResponse.json(processed)
  } catch (error) {
    console.error('Error in explore API:', error)
    return NextResponse.json({ error: 'Failed to load services' }, { status: 500 })
  }
}