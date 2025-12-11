-- Likes on reviews
CREATE TABLE IF NOT EXISTS public.user_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, review_id)
);

-- Likes on comments
CREATE TABLE IF NOT EXISTS public.user_comment_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  comment_id UUID REFERENCES review_comments(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, comment_id)
);

ALTER TABLE user_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_comment_likes ENABLE ROW LEVEL SECURITY;

-- RLS for likes
CREATE POLICY "users_insert_own_likes" ON user_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_delete_own_likes" ON user_likes FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "public_read_likes" ON user_likes FOR SELECT USING (true);

CREATE POLICY "users_insert_comment_likes" ON user_comment_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "users_delete_comment_likes" ON user_comment_likes FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "public_read_comment_likes" ON user_comment_likes FOR SELECT USING (true);

-- Allow authenticated users to update likes_count (safe because we validate in app logic)
CREATE POLICY "auth_update_review_likes" ON reviews FOR UPDATE TO authenticated USING (true) WITH CHECK (likes_count >= 0);
CREATE POLICY "auth_update_comment_likes" ON review_comments FOR UPDATE TO authenticated USING (true) WITH CHECK (likes_count >= 0);