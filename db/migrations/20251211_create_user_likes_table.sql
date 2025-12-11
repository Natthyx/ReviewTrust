-- Create user_likes table to track which users have liked which reviews
CREATE TABLE IF NOT EXISTS user_likes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  review_id UUID REFERENCES reviews(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, review_id) -- One like per user per review
);

-- Enable RLS on user_likes table
ALTER TABLE user_likes ENABLE ROW LEVEL SECURITY;