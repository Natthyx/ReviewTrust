-- Create a function to increment review likes
CREATE OR REPLACE FUNCTION increment_review_likes(review_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE reviews 
  SET likes_count = likes_count + 1
  WHERE id = review_id;
END;
$$ LANGUAGE plpgsql;