-- Add likes counter to reviews table
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;

-- Add a check constraint to ensure likes_count is not negative
ALTER TABLE reviews 
ADD CONSTRAINT positive_likes_count CHECK (likes_count >= 0);