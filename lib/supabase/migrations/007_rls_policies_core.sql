-- Enable RLS on all tables
DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'profiles', 'categories', 'subcategories', 'businesses',
    'business_documents', 'business_categories', 'business_subcategories',
    'reviews', 'review_comments', 'blogs', 'user_reads', 'user_reviews'
  ] LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
  END LOOP;
END $$;

-- Public read access
CREATE POLICY "public_read_categories" ON categories FOR SELECT USING (true);
CREATE POLICY "public_read_subcategories" ON subcategories FOR SELECT USING (true);
CREATE POLICY "public_read_businesses" ON businesses FOR SELECT USING (true);
CREATE POLICY "public_read_business_documents" ON business_documents FOR SELECT USING (true);
CREATE POLICY "public_read_reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "public_read_review_comments" ON review_comments FOR SELECT USING (true);
CREATE POLICY "public_read_published_blogs" ON blogs FOR SELECT USING (status = 'published');

-- Authenticated users can see all profiles (name, role, etc.)
CREATE POLICY "auth_can_view_all_profiles" ON profiles
  FOR SELECT TO authenticated USING (true);