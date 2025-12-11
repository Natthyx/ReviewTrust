-- Migration to add likes_count column to reviews table
-- This migration adds the likes_count column to track how many likes a review has

-- Add likes_count column to reviews table
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS likes_count INTEGER DEFAULT 0;

-- Add constraint to ensure likes_count is not negative
ALTER TABLE reviews 
ADD CONSTRAINT positive_likes_count CHECK (likes_count >= 0);