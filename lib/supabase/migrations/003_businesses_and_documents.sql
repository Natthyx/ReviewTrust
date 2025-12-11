-- Businesses
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_name TEXT NOT NULL,
  business_owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  location TEXT,
  description TEXT,
  website TEXT,
  phone TEXT,
  address TEXT,
  business_hours JSONB,
  google_map_embed TEXT,
  is_banned BOOLEAN DEFAULT FALSE,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business Documents (with approval status)
CREATE TABLE IF NOT EXISTS public.business_documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  document_url TEXT NOT NULL,
  document_name TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction tables
CREATE TABLE IF NOT EXISTS public.business_categories (
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (business_id, category_id)
);

CREATE TABLE IF NOT EXISTS public.business_subcategories (
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE NOT NULL,
  subcategory_id UUID REFERENCES subcategories(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (business_id, subcategory_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON businesses(business_owner_id);
CREATE INDEX IF NOT EXISTS idx_business_categories_business ON business_categories(business_id);
CREATE INDEX IF NOT EXISTS idx_business_subcategories_business ON business_subcategories(business_id);