-- Track reviews written by users (optional helper table)
CREATE TABLE IF NOT EXISTS public.user_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, review_id)
);

CREATE INDEX IF NOT EXISTS idx_user_reviews_user ON user_reviews(user_id);