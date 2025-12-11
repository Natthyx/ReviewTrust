-- Business owners manage their own data
CREATE POLICY "owners_insert_business" ON businesses FOR INSERT WITH CHECK (auth.uid() = business_owner_id);
CREATE POLICY "owners_update_business" ON businesses FOR UPDATE USING (auth.uid() = business_owner_id);

-- Documents
CREATE POLICY "owners_insert_documents" ON business_documents FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM businesses b WHERE b.id = business_id AND b.business_owner_id = auth.uid())
);

-- Categories / Subcategories assignment
CREATE POLICY "owners_manage_categories" ON business_categories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM businesses b WHERE b.id = business_id AND b.business_owner_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM businesses b WHERE b.id = business_id AND b.business_owner_id = auth.uid())
  );

CREATE POLICY "owners_manage_subcategories" ON business_subcategories
  FOR ALL USING (
    EXISTS (SELECT 1 FROM businesses b WHERE b.id = business_id AND b.business_owner_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM businesses b WHERE b.id = business_id AND b.business_owner_id = auth.uid())
  );

-- Blogs
CREATE POLICY "owners_manage_blogs" ON blogs
  FOR ALL USING (
    EXISTS (SELECT 1 FROM businesses b WHERE b.id = business_id AND b.business_owner_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM businesses b WHERE b.id = business_id AND b.business_owner_id = auth.uid())
  );

-- Users manage their own reviews & likes
CREATE POLICY "users_manage_own_reviews" ON reviews
  FOR ALL USING (auth.uid() = reviewer_id) WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "users_or_owners_comment_on_reviews" ON review_comments FOR INSERT WITH CHECK (
  auth.uid() = commenter_id
  AND EXISTS (
    SELECT 1 FROM reviews r
    JOIN businesses b ON r.reviewee_id = b.id
    WHERE r.id = review_id
      AND (b.business_owner_id = auth.uid() OR r.reviewer_id = auth.uid())
  )
);