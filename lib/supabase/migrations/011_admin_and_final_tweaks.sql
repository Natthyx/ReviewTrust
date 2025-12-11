-- Optional: Create first admin (run manually once)
-- INSERT INTO auth.users (...) VALUES (...) -- see your original script

-- Ensure default blog status
ALTER TABLE blogs ALTER COLUMN status SET DEFAULT 'drafted';

-- Fix any legacy published = false → status = 'unpublished'
UPDATE blogs SET status = 'unpublished' WHERE status = 'published' AND published = false;