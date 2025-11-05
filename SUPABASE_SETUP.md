# Woinu Coffee Shop - Supabase Database Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Project Name**: `woinucoffee` (or your preferred name)
   - **Database Password**: Create a strong password and save it
   - **Region**: Choose closest to your users
5. Wait for the project to be created (2-3 minutes)

## Step 2: Get Your Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJhbGci...`)

## Step 3: Configure Environment Variables

Create `.env` files in both admin and frontend directories:

**coffee-admin-dashboard/.env**
```
REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

**coffee-frontend/.env**
```
REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Create Database Tables

Go to **SQL Editor** in Supabase dashboard and run the following SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Items Table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  ingredients TEXT[],
  allergens TEXT[],
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author VARCHAR(100),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery Images Table
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200),
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(200) NOT NULL,
  email VARCHAR(200) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(300),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  responded BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Promotions Table
CREATE TABLE promotions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  discount_percentage INTEGER,
  discount_amount DECIMAL(10, 2),
  code VARCHAR(50) UNIQUE,
  image_url TEXT,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(200) NOT NULL,
  customer_image TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings Table (for site-wide settings)
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  type VARCHAR(50) DEFAULT 'text',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table (for online orders)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  customer_email VARCHAR(200) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  delivery_address TEXT,
  order_type VARCHAR(20) CHECK (order_type IN ('delivery', 'pickup')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  total_amount DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id),
  item_name VARCHAR(200) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  notes TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_active ON menu_items(is_available);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_contact_messages_read ON contact_messages(is_read);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_promotions_updated_at BEFORE UPDATE ON promotions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Step 5: Insert Sample Data

```sql
-- Insert sample categories
INSERT INTO categories (name, slug, description, display_order) VALUES
('Hot Coffee', 'hot-coffee', 'Freshly brewed hot coffee selections', 1),
('Cold Coffee', 'cold-coffee', 'Refreshing cold coffee drinks', 2),
('Tea', 'tea', 'Premium tea selections', 3),
('Pastries', 'pastries', 'Freshly baked pastries and desserts', 4),
('Snacks', 'snacks', 'Light bites and snacks', 5);

-- Insert sample settings
INSERT INTO settings (key, value, type) VALUES
('site_title', 'Woinu Coffee Shop', 'text'),
('site_description', 'Premium Ethiopian Coffee Experience', 'text'),
('contact_email', 'info@woinucoffee.com', 'email'),
('contact_phone', '+251-XXX-XXX-XXX', 'text'),
('address', 'Addis Ababa, Ethiopia', 'text'),
('opening_hours', 'Mon-Sat: 7:00 AM - 10:00 PM, Sun: 8:00 AM - 9:00 PM', 'text'),
('facebook_url', 'https://facebook.com/woinucoffee', 'text'),
('instagram_url', 'https://instagram.com/woinucoffee', 'text'),
('twitter_url', 'https://twitter.com/woinucoffee', 'text');
```

## Step 6: Set Up Storage for Images

1. Go to **Storage** in Supabase dashboard
2. Click **Create a new bucket**
3. Create these buckets:
   - `menu-images` (public)
   - `blog-images` (public)
   - `gallery-images` (public)
   - `promotion-images` (public)

4. For each bucket, set the policy to allow public read access:

```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'menu-images' );

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery-images' );

CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'promotion-images' );
```

## Step 7: Set Up Authentication

1. Go to **Authentication** → **Policies**
2. For admin access, you can either:
   - Use email/password authentication
   - Create a specific admin user manually

3. To create an admin user:
   - Go to **Authentication** → **Users**
   - Click **Invite User**
   - Enter admin email
   - User will receive an email to set password

## Step 8: Set Up Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read policies (for frontend)
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for all users" ON menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Enable read access for all users" ON gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for all users" ON promotions FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (is_approved = true);

-- Allow anyone to insert contact messages and orders
CREATE POLICY "Enable insert for contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for order items" ON order_items FOR INSERT WITH CHECK (true);

-- Admin policies (authenticated users have full access)
CREATE POLICY "Enable all access for authenticated users" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON menu_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON contact_messages FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON promotions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Enable all access for authenticated users" ON settings FOR ALL USING (auth.role() = 'authenticated');
```

## Done! 🎉

Your Supabase database is now ready. Update the `.env` files in both projects with your credentials and start developing!

## Quick Test

To test if everything is working:

1. Run the admin dashboard: `cd coffee-admin-dashboard && npm install && npm start`
2. Run the frontend: `cd coffee-frontend && npm install && npm start`
3. Try to login to the admin dashboard
4. View the frontend and see if data loads

## Troubleshooting

- **Connection failed**: Check if your Supabase URL and Anon Key are correct
- **No data showing**: Make sure RLS policies are set correctly
- **Can't upload images**: Check storage bucket policies
- **Can't login**: Verify authentication is enabled and admin user exists
