# Complete Storage Bucket Setup - All Policies

## Buckets You Need to Create

You need to create **3 buckets** in Supabase Storage:

1. **`gallery-images`** - For gallery photos
2. **`blog-images`** - For blog post featured images
3. **`menu-images`** - For menu item photos

---

## How to Create Each Bucket

For **each bucket**, follow these steps:

1. Go to **Supabase Dashboard** → **Storage**
2. Click **"New bucket"**
3. Enter the bucket name (from list above)
4. **✅ CHECK "Public bucket"** (very important!)
5. Click **"Create bucket"**

---

## Storage Policies - Copy & Paste All at Once

After creating all 3 buckets, go to **SQL Editor** and run this complete script:

```sql
-- ===========================================
-- GALLERY IMAGES BUCKET POLICIES
-- ===========================================

CREATE POLICY "Gallery Images Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery-images' );

CREATE POLICY "Gallery Images Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'gallery-images' );

CREATE POLICY "Gallery Images Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'gallery-images' );

CREATE POLICY "Gallery Images Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'gallery-images' );

-- ===========================================
-- BLOG IMAGES BUCKET POLICIES
-- ===========================================

CREATE POLICY "Blog Images Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );

CREATE POLICY "Blog Images Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'blog-images' );

CREATE POLICY "Blog Images Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'blog-images' );

CREATE POLICY "Blog Images Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'blog-images' );

-- ===========================================
-- MENU IMAGES BUCKET POLICIES
-- ===========================================

CREATE POLICY "Menu Images Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'menu-images' );

CREATE POLICY "Menu Images Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'menu-images' );

CREATE POLICY "Menu Images Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'menu-images' );

CREATE POLICY "Menu Images Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'menu-images' );
```

---

## ✅ Quick Checklist

- [ ] Create `gallery-images` bucket (public)
- [ ] Create `blog-images` bucket (public)
- [ ] Create `menu-images` bucket (public)
- [ ] Run the SQL script above in SQL Editor
- [ ] Verify all buckets show "Public" badge
- [ ] Test upload from admin dashboard

---

## What Each Bucket Is For

| Bucket | Used For | Admin Page |
|--------|----------|------------|
| `gallery-images` | Gallery photos | Gallery |
| `blog-images` | Blog featured images | Blog Posts |
| `menu-images` | Menu item photos | Menu Items |

---

## Quick Test

After setup, test each feature:

1. **Gallery**: Upload a photo in Gallery section
2. **Blog Posts**: Create a post with featured image
3. **Menu Items**: Add menu item with photo

All should work! 🎉
