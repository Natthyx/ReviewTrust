-- SQL Script to add business hours and location details fields to businesses table
-- Run this script in your Supabase SQL editor

-- Add columns for business hours (as JSON to accommodate varying schedules)
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS business_hours JSONB,
ADD COLUMN IF NOT EXISTS google_map_embed TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT;

-- Remove the old latitude/longitude columns since we're using embed codes
ALTER TABLE businesses 
DROP COLUMN IF EXISTS latitude,
DROP COLUMN IF EXISTS longitude;

-- Add indexes for better performance on the new column
CREATE INDEX IF NOT EXISTS idx_businesses_google_map_embed ON businesses(google_map_embed);