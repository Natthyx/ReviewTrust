-- Storage policies for blog_thumbnail bucket
CREATE POLICY "Businesses upload own thumbnails"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'blog_thumbnail'
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses WHERE business_owner_id = auth.uid() LIMIT 1
  )
);

CREATE POLICY "Businesses manage own thumbnails"
ON storage.objects FOR ALL TO authenticated
USING (
  bucket_id = 'blog_thumbnail'
  AND (storage.foldername(name))[1] = (
    SELECT id::text FROM businesses WHERE business_owner_id = auth.uid() LIMIT 1
  )
);

CREATE POLICY "Public read blog thumbnails"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'blog_thumbnail');