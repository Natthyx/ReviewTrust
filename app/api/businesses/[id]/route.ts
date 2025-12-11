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

// GET /api/businesses/[id] - Fetch detailed business information
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const supabase = createPublicClient()
    
    // Await params to get the actual values
    const { id } = await params
    
    // Fetch business details with related data
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select(`
        id,
        business_name,
        location,
        description,
        website,
        phone,
        address,
        google_map_embed,
        business_hours,
        rating_count,
        created_at,
        updated_at,
        business_owner_id,
        is_banned,
        business_categories(
          category_id,
          categories(
            id,
            name,
            icon,
            bg_color
          )
        ),
        business_subcategories(
          subcategory_id,
          subcategories(
            id,
            name
          )
        )
      `)
      .eq('id', id)
      .eq('is_banned', false)
      .single()
    
    if (businessError) {
      console.error('Error fetching business:', businessError)
      return NextResponse.json({ error: "Business not found" }, { status: 404 })
    }
    
    // Fetch average rating and review count
    const { data: reviewsData, error: reviewsError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('reviewee_id', id)
    
    let averageRating = 0
    let reviewCount = 0
    
    if (!reviewsError && reviewsData) {
      reviewCount = reviewsData.length
      if (reviewCount > 0) {
        const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0)
        averageRating = Math.round((totalRating / reviewCount) * 10) / 10 // Round to 1 decimal place
      }
    }
    
    // Process the business data to match the expected format
    const processedBusiness = {
      id: business.id,
      name: business.business_name,
      location: business.location,
      address: business.address,
      phone: business.phone,
      website: business.website,
      google_map_embed: business.google_map_embed,
      businessHours: business.business_hours,
      description: business.description,
      rating: averageRating,
      reviewCount: reviewCount,
      createdAt: business.created_at,
      updatedAt: business.updated_at,
      categories: business.business_categories.map((bc: any) => bc.categories),
      subcategories: business.business_subcategories.map((bs: any) => bs.subcategories)
    }
    
    return NextResponse.json(processedBusiness)
  } catch (error) {
    console.error('Error fetching business details:', error)
    return NextResponse.json({ error: "Failed to fetch business details" }, { status: 500 })
  }
}