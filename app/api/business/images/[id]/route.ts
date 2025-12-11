import { NextResponse } from 'next/server'
import { createClient } from '../../../../../lib/supabase/server'

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Create a Supabase client using the server client
    const supabase = await createClient()
    
    // Get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Get the image ID from params
    const { id } = await params;
    
    // Get the image to delete
    const { data: image, error: imageError } = await supabase
      .from('business_images')
      .select('id, business_id, image_url')
      .eq('id', id)
      .single()
    
    if (imageError || !image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }
    
    // Check if the user owns this business
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('id')
      .eq('id', image.business_id)
      .eq('business_owner_id', user.id)
      .single()
    
    if (businessError || !business) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Extract file path from URL
    const filePath = image.image_url.split('business_images/')[1]
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('business_images')
      .remove([filePath])
    
    if (storageError) {
      console.error('Storage delete error:', storageError)
      return NextResponse.json({ error: 'Failed to delete file from storage' }, { status: 500 })
    }
    
    // Delete from database
    const { error: dbError } = await supabase
      .from('business_images')
      .delete()
      .eq('id', id)
    
    if (dbError) {
      console.error('Database delete error:', dbError)
      return NextResponse.json({ error: 'Failed to delete image record' }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Create a Supabase client using the server client
    const supabase = await createClient()
    
    // Get the user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Get the image ID from params
    const { id } = await params;
    
    // Get the image to update
    const { data: image, error: imageError } = await supabase
      .from('business_images')
      .select('id, business_id')
      .eq('id', id)
      .single()
    
    if (imageError || !image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }
    
    // Check if the user owns this business
    const { data: business, error: businessError } = await supabase
      .from('businesses')
      .select('id')
      .eq('id', image.business_id)
      .eq('business_owner_id', user.id)
      .single()
    
    if (businessError || !business) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Get request body
    const { is_primary } = await request.json()
    
    if (is_primary) {
      // Remove primary status from all images for this business
      await supabase
        .from('business_images')
        .update({ is_primary: false })
        .eq('business_id', business.id)
    }
    
    // Set primary status for selected image
    const { error: updateError } = await supabase
      .from('business_images')
      .update({ is_primary })
      .eq('id', id)
    
    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: 'Failed to update image' }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'Image updated successfully' })
  } catch (error) {
    console.error('Error updating image:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}