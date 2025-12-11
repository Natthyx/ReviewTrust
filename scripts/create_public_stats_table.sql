-- Script to create a public statistics table for landing page metrics
-- This should be run in the Supabase SQL Editor

-- Create a table to store public statistics
CREATE TABLE IF NOT EXISTS public.landing_stats (
  id TEXT PRIMARY KEY DEFAULT 'stats',
  user_count INTEGER DEFAULT 0,
  business_count INTEGER DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert initial row
INSERT INTO public.landing_stats (id) 
VALUES ('stats') 
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the stats table
ALTER TABLE public.landing_stats ENABLE ROW LEVEL SECURITY;

-- Create policy allowing public read access to stats
CREATE POLICY "Public can read landing stats" ON public.landing_stats
  FOR SELECT
  USING (true);

-- Grant SELECT permission to anon role
GRANT SELECT ON public.landing_stats TO anon;

-- Create function to update stats
CREATE OR REPLACE FUNCTION public.update_landing_stats()
RETURNS VOID AS $$
BEGIN
  UPDATE public.landing_stats 
  SET 
    user_count = (SELECT COUNT(*) FROM public.profiles),
    business_count = (SELECT COUNT(*) FROM public.businesses),
    review_count = (SELECT COUNT(*) FROM public.reviews),
    updated_at = NOW()
  WHERE id = 'stats';
  
  -- If no rows were updated, insert the initial row
  IF NOT FOUND THEN
    INSERT INTO public.landing_stats (id, user_count, business_count, review_count)
    VALUES ('stats', 
            (SELECT COUNT(*) FROM public.profiles),
            (SELECT COUNT(*) FROM public.businesses),
            (SELECT COUNT(*) FROM public.reviews))
    ON CONFLICT (id) DO UPDATE SET
      user_count = EXCLUDED.user_count,
      business_count = EXCLUDED.business_count,
      review_count = EXCLUDED.review_count,
      updated_at = NOW();
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers to automatically update stats when relevant tables change
-- Users (profiles)
CREATE OR REPLACE FUNCTION public.update_stats_on_profile_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.update_landing_stats();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stats_on_profile_insert
  AFTER INSERT ON public.profiles
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.update_stats_on_profile_change();

CREATE TRIGGER update_stats_on_profile_delete
  AFTER DELETE ON public.profiles
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.update_stats_on_profile_change();

-- Businesses
CREATE OR REPLACE FUNCTION public.update_stats_on_business_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.update_landing_stats();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stats_on_business_insert
  AFTER INSERT ON public.businesses
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.update_stats_on_business_change();

CREATE TRIGGER update_stats_on_business_delete
  AFTER DELETE ON public.businesses
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.update_stats_on_business_change();

-- Reviews
CREATE OR REPLACE FUNCTION public.update_stats_on_review_change()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM public.update_landing_stats();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stats_on_review_insert
  AFTER INSERT ON public.reviews
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.update_stats_on_review_change();

CREATE TRIGGER update_stats_on_review_delete
  AFTER DELETE ON public.reviews
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.update_stats_on_review_change();

-- Initial stats update
SELECT public.update_landing_stats();

-- Note: Run this script in your Supabase SQL Editor
-- After running this, update your landing page API to read from this table instead of counting directly