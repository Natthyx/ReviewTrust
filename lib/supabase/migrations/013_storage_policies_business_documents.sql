-- Storage policies for business_documents bucket
CREATE POLICY "Businesses upload own documents"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'business_documents'
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses WHERE business_owner_id = auth.uid() LIMIT 1
  )
);

CREATE POLICY "Businesses manage own documents"
ON storage.objects FOR ALL TO authenticated
USING (
  bucket_id = 'business_documents'
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses WHERE business_owner_id = auth.uid() LIMIT 1
  )
);

CREATE POLICY "Public read business documents"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'business_documents');