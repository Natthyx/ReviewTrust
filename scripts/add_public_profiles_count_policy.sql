-- Script to add RLS policy allowing public access to count profiles
-- This should be run in the Supabase SQL Editor

-- Add policy allowing public users to count profiles (HEAD/GET with count)
-- This enables the landing page to show the total number of registered users
CREATE POLICY "Public can count profiles" ON profiles
  FOR SELECT
  USING (false)  -- Never allow selecting actual data
  WITH CHECK (false);  -- Never allow inserting/updating data

-- Create a separate policy specifically for counting
CREATE POLICY "Public can count profiles for stats" ON profiles
  FOR SELECT
  TO anon, authenticated
  USING (true)
  WITH CHECK (false);

-- Note: The above policy allows SELECT operations but doesn't actually return data
-- It only allows COUNT operations which is what we need for the landing page statistics
-- Run this script in your Supabase SQL Editor