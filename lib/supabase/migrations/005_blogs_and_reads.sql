-- Blogs
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  thumbnail_image TEXT,
  read_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'drafted' 
    CHECK (status IN ('pending', 'drafted', 'approved', 'withdrawn', 'published', 'unpublished')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Track who read which blog
CREATE TABLE IF NOT EXISTS public.user_reads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  blog_id UUID REFERENCES blogs(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, blog_id)
);

CREATE INDEX IF NOT EXISTS idx_blogs_business ON blogs(business_id);
CREATE INDEX IF NOT EXISTS idx_user_reads_user ON user_reads(user_id);
CREATE INDEX IF NOT EXISTS idx_user_reads_blog ON user_reads(blog_id);