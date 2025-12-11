-- SQL Script to update businesses table with google_map_embed field
-- Run this script in your Supabase SQL editor

-- Add the new google_map_embed column
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS google_map_embed TEXT;

-- Remove the old latitude/longitude columns
ALTER TABLE businesses 
DROP COLUMN IF EXISTS latitude,
DROP COLUMN IF EXISTS longitude;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_businesses_google_map_embed ON businesses(google_map_embed);