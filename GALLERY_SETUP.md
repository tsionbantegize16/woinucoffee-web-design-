# Gallery Setup Guide - Woinu Coffee

## Overview
The Gallery page dynamically fetches images from the admin dashboard, displaying them with like and share features.

---

## Database Setup

### Create Gallery Images Table in Supabase

Run this SQL in your Supabase SQL Editor:

```sql
-- Create Gallery Images Table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT DEFAULT 'Ambiance' CHECK (category IN ('Ambiance', 'Coffee Art', 'Products', 'Experience')),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery_images(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_is_active ON gallery_images(is_active);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);

-- Enable Row Level Security
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view active gallery images
CREATE POLICY "Allow public to view active gallery images" ON gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true OR auth.role() = 'authenticated');

-- Allow authenticated users (admins) to insert gallery images
CREATE POLICY "Allow authenticated to insert gallery images" ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users (admins) to update gallery images
CREATE POLICY "Allow authenticated to update gallery images" ON gallery_images
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users (admins) to delete gallery images
CREATE POLICY "Allow authenticated to delete gallery images" ON gallery_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Sample images (optional)
INSERT INTO gallery_images (title, description, image_url, category, display_order, is_active)
VALUES
  ('Our Cozy Space', 'Experience the warmth of Woinu Coffee', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800', 'Ambiance', 1, true),
  ('Perfect Latte Art', 'Crafted with love and precision', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800', 'Coffee Art', 2, true),
  ('Ethiopian Coffee Beans', 'Premium beans from the birthplace of coffee', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800', 'Products', 3, true),
  ('Traditional Coffee Ceremony', 'A cultural journey in every cup', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800', 'Experience', 4, true)
ON CONFLICT DO NOTHING;
```

---

## Environment Configuration

Add your Supabase credentials to both `.env` files:

**Frontend:** `coffee-frontend/.env`
**Admin Dashboard:** `coffee-admin-dashboard/.env`

```env
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## How It Works

### Admin Dashboard - Adding Images

1. Navigate to **Gallery** section in admin dashboard
2. Click **"Add Image"** button
3. Fill in the form:
   - **Title** (required): Name of the image
   - **Description**: Optional description
   - **Upload Image** (required): Click to select image from your computer
     - Supported: JPG, PNG, GIF, WEBP
     - Max size: 5MB
     - Preview shown after selection
   - **Category**: Ambiance, Coffee Art, Products, or Experience
   - **Display Order**: Lower numbers appear first (0, 1, 2...)
   - **Active**: Check to make visible on website
4. Click **"Add Image"**
5. Image uploads to Supabase Storage and appears in gallery grid

**Note:** You need to set up Supabase Storage first! See `SUPABASE_STORAGE_SETUP.md` for instructions.

### Managing Images

**View Statistics:**
- Total Images count
- Active Images count
- Total Likes across all images

**Image Actions:**
- **Hide/Show**: Toggle visibility on website
- **Delete**: Remove image (with confirmation)
- **View Likes**: See heart badge with like count

### Frontend - Gallery Page

**Features:**
1. **Dynamic Loading**: Fetches only active images from database
2. **Hero Section**: Static preview images (as requested)
3. **Category Filtering**: Filter by All, Ambiance, Coffee Art, Products, Experience
4. **Like Feature**: 
   - Click heart icon to like images
   - Likes persist in browser localStorage
   - Like count updates in database
5. **Share Feature**:
   - Click share icon
   - Uses native share API on mobile
   - Copies link on desktop
6. **Lightbox View**: Click any image to view full size

**Fallback:**
- If database is empty, shows local static images
- Ensures website never looks empty

---

## Testing

### Test Admin Upload
1. **First**: Set up Supabase Storage (see `SUPABASE_STORAGE_SETUP.md`)
2. Log into admin dashboard
3. Go to Gallery section
4. Click "Add Image"
5. Click "Upload Image" and select any image from your computer
6. Fill title: "Test Coffee"
7. Click "Add Image"
8. Verify it appears in admin gallery grid with the uploaded image

### Test Frontend Display
1. Open frontend: `http://localhost:3000/gallery`
2. Verify your uploaded image appears
3. Click heart icon to like it
4. Refresh page - like should persist
5. Click share icon to test sharing
6. Click image to open lightbox

### Test Filtering
1. Add images with different categories in admin
2. On frontend, click category filter buttons
3. Verify images filter correctly

---

## Navbar Update

✅ **Cart button removed**
✅ **Contact Us button added** - Links to Contact page
✅ Beautiful icon with MessageCircle icon
✅ Works on both desktop and mobile

---

## Key Features Summary

### Gallery Frontend
- ✅ Dynamic image loading from database
- ✅ Like/unlike functionality with persistence
- ✅ Share functionality (native + clipboard)
- ✅ Category filtering
- ✅ Masonry grid layout
- ✅ Lightbox viewing
- ✅ Like counts displayed
- ✅ Static hero section maintained

### Gallery Admin Dashboard
- ✅ Upload images via URL
- ✅ Set title, description, category
- ✅ Control display order
- ✅ Toggle visibility (active/inactive)
- ✅ Delete images
- ✅ View statistics
- ✅ See like counts on images

### Navbar
- ✅ Contact Us button (right side)
- ✅ Clean, modern design
- ✅ Responsive on mobile

---

## Files Modified

**Frontend (`coffee-frontend/`):**
- ✅ `src/components/Navbar.js` - Contact Us button
- ✅ `src/pages/Gallery.js` - Dynamic gallery with likes/shares
- ✅ `src/pages/Menu.js` - Removed cart functionality
- ✅ `src/App.js` - Cleaned up routes
- ❌ Deleted: `src/context/CartContext.js`
- ❌ Deleted: `src/pages/Cart.js`

**Admin Dashboard (`coffee-admin-dashboard/`):**
- ✅ `src/pages/Gallery.js` - Complete image management

---

## Troubleshooting

**Images not showing?**
- Check if `is_active = true` in database
- Verify image URL is publicly accessible
- Check browser console for errors

**Can't upload images?**
- Ensure you're logged into admin dashboard
- Check Supabase RLS policies
- Verify database table exists

**Likes not working?**
- Check localStorage is enabled in browser
- Verify `likes` column exists in database
- Check browser console for errors

---

## Next Steps

1. ✅ Run database setup SQL in Supabase
2. ✅ Configure `.env` files with credentials
3. ✅ Start both applications
4. ✅ Add sample images from admin dashboard
5. ✅ Test on frontend

---

Enjoy your dynamic coffee gallery! ☕✨
