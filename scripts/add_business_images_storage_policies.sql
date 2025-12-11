-- Add storage policies for business_images bucket
-- Allow businesses to upload and manage their own images

-- Policy to allow businesses to insert business images
CREATE POLICY "Businesses can upload business images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'business_images' 
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses 
    WHERE business_owner_id = auth.uid()
  )
);

-- Policy to allow businesses to select their own business images
CREATE POLICY "Businesses can view their own business images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'business_images' 
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses 
    WHERE business_owner_id = auth.uid()
  )
);

-- Policy to allow businesses to update their own business images
CREATE POLICY "Businesses can update their own business images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'business_images' 
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses 
    WHERE business_owner_id = auth.uid()
  )
);

-- Policy to allow businesses to delete their own business images
CREATE POLICY "Businesses can delete their own business images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'business_images' 
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses 
    WHERE business_owner_id = auth.uid()
  )
);

-- Policy to allow public read access to business images (for displaying on service pages)
CREATE POLICY "Public can read business images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'business_images');