-- SQL Script to add business hours and location details fields to businesses table
-- Run this script in your Supabase SQL editor

-- Add columns for business hours (as JSON to accommodate varying schedules)
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS business_hours JSONB,
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS address TEXT;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_businesses_latitude ON businesses(latitude);
CREATE INDEX IF NOT EXISTS idx_businesses_longitude ON businesses(longitude);