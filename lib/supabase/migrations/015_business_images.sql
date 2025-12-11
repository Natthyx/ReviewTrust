-- Create business_images table
CREATE TABLE IF NOT EXISTS business_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_business_images_business_id ON business_images(business_id);

-- Enable RLS
ALTER TABLE business_images ENABLE ROW LEVEL SECURITY;

-- Business owner can do everything on their images
CREATE POLICY "Business owners can manage their images"
ON business_images FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM businesses
    WHERE businesses.id = business_images.business_id
    AND businesses.business_owner_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM businesses
    WHERE businesses.id = business_images.business_id
    AND businesses.business_owner_id = auth.uid()
  )
);

-- Public can read all images
CREATE POLICY "Public can view business images"
ON business_images FOR SELECT
USING (true);

-- Ensure only one primary image per business
CREATE UNIQUE INDEX IF NOT EXISTS unique_primary_image_per_business
ON business_images (business_id)
WHERE is_primary = true;


-- 1. Allow business owners to upload images to their own folder
CREATE POLICY "Business owners can upload to their folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'business_images'
  AND (storage.foldername(name))[1]::uuid = (auth.jwt() ->> 'user_id')::uuid
  AND (storage.foldername(name))[2] IS NOT NULL  -- second level = business_id
);

-- 2. Allow business owners to delete their own images
CREATE POLICY "Business owners can delete their images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'business_images'
  AND EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id::text = (storage.foldername(name))[2]
      AND b.business_owner_id = auth.uid()
  )
);

-- 3. Allow business owners to update (replace) their images
CREATE POLICY "Business owners can update their images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'business_images'
  AND EXISTS (
    SELECT 1 FROM businesses b
    WHERE b.id::text = (storage.foldername(name))[2]
      AND b.business_owner_id = auth.uid()
  )
);

-- 4. Public can view all images (read-only)
CREATE POLICY "Public can view business images"
ON storage.objects FOR SELECT
USING (bucket_id = 'business_images');