-- Create menu_prices table to store editable menu prices
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

-- Enable Row Level Security
ALTER TABLE menu_prices ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read menu prices (public menu)
CREATE POLICY "Anyone can view menu prices" ON menu_prices
  FOR SELECT USING (true);

-- Allow anyone to update menu prices (admin panel uses client-side password)
CREATE POLICY "Anyone can update menu prices" ON menu_prices
  FOR UPDATE USING (true);

-- Allow inserts for seeding
CREATE POLICY "Anyone can insert menu prices" ON menu_prices
  FOR INSERT WITH CHECK (true);
