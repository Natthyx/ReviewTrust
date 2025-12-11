-- Add storage policies for business_documents bucket
-- Allow businesses to upload and manage their own documents

-- Enable RLS on storage.objects (if not already enabled)
-- Note: This is typically already enabled in Supabase

-- Policy to allow businesses to insert business documents
CREATE POLICY "Businesses can upload business documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'business_documents' 
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses 
    WHERE business_owner_id = auth.uid()
  )
);

-- Policy to allow businesses to select their own business documents
CREATE POLICY "Businesses can view their own business documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'business_documents' 
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses 
    WHERE business_owner_id = auth.uid()
  )
);

-- Policy to allow businesses to update their own business documents
CREATE POLICY "Businesses can update their own business documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'business_documents' 
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses 
    WHERE business_owner_id = auth.uid()
  )
);

-- Policy to allow businesses to delete their own business documents
CREATE POLICY "Businesses can delete their own business documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'business_documents' 
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses 
    WHERE business_owner_id = auth.uid()
  )
);

-- Policy to allow public read access to business documents (for displaying to admins)
CREATE POLICY "Public can read business documents"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'business_documents');