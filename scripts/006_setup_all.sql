-- Create menu_prices table
CREATE TABLE IF NOT EXISTS menu_prices (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_en INTEGER NOT NULL,
  price_familj INTEGER,
  category TEXT NOT NULL,
  vegetarian BOOLEAN DEFAULT false,
  spicy BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE menu_prices ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'menu_prices' AND policyname = 'Anyone can view menu prices') THEN
    CREATE POLICY "Anyone can view menu prices" ON menu_prices FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'menu_prices' AND policyname = 'Anyone can update menu prices') THEN
    CREATE POLICY "Anyone can update menu prices" ON menu_prices FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'menu_prices' AND policyname = 'Anyone can insert menu prices') THEN
    CREATE POLICY "Anyone can insert menu prices" ON menu_prices FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'menu_prices' AND policyname = 'Anyone can delete menu prices') THEN
    CREATE POLICY "Anyone can delete menu prices" ON menu_prices FOR DELETE USING (true);
  END IF;
END $$;

-- Create site_content table for editable texts
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  field_key TEXT NOT NULL,
  field_value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_content' AND policyname = 'Anyone can view site content') THEN
    CREATE POLICY "Anyone can view site content" ON site_content FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_content' AND policyname = 'Anyone can update site content') THEN
    CREATE POLICY "Anyone can update site content" ON site_content FOR UPDATE USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'site_content' AND policyname = 'Anyone can insert site content') THEN
    CREATE POLICY "Anyone can insert site content" ON site_content FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  items JSONB NOT NULL,
  total_amount INTEGER NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'swish',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  order_status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Anyone can create orders') THEN
    CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Anyone can view orders') THEN
    CREATE POLICY "Anyone can view orders" ON orders FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'orders' AND policyname = 'Anyone can update orders') THEN
    CREATE POLICY "Anyone can update orders" ON orders FOR UPDATE USING (true);
  END IF;
END $$;

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Anyone can insert contact messages') THEN
    CREATE POLICY "Anyone can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Anyone can view contact messages') THEN
    CREATE POLICY "Anyone can view contact messages" ON contact_messages FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Anyone can update contact messages') THEN
    CREATE POLICY "Anyone can update contact messages" ON contact_messages FOR UPDATE USING (true);
  END IF;
END $$;
