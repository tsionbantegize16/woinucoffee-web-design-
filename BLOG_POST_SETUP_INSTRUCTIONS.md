# Blog Post Feature - Setup Instructions

## ✅ What's Been Done

I've successfully implemented the blog post feature with image upload capability! Here's what was created:

### 1. **BlogPostForm Component** (`coffee-admin-dashboard/src/components/BlogPostForm.js`)
   - Full blog post creation and editing
   - Featured image upload with drag & drop
   - Image preview before upload
   - File validation (type, size)
   - Automatic slug generation from title
   - Publish/draft toggle

### 2. **Updated BlogPosts Page** (`coffee-admin-dashboard/src/pages/BlogPosts.js`)
   - "New Post" button now functional
   - "Edit" buttons now work
   - Modal form integration
   - Proper state management

### 3. **Documentation**
   - `BLOG_STORAGE_SETUP.md` - Complete guide for setting up storage

---

## 🚀 What You Need To Do

To make blog posts work, you need to create the storage bucket in Supabase:

### Step 1: Create the Bucket

1. Go to your **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Click **Storage** in the left sidebar
4. Click **"New bucket"** button
5. Enter these details:
   - **Name**: `blog-images`
   - **Public bucket**: ✅ **CHECK THIS** (very important!)
   - Click **"Create bucket"**

### Step 2: Set Storage Policies

After creating the bucket:

1. Click on the `blog-images` bucket
2. Click the **"Policies"** tab
3. Click **"New Policy"**
4. Add these **4 policies**:

#### Policy 1: Public Read Access
```sql
CREATE POLICY "Blog Images Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );
```

#### Policy 2: Authenticated Upload
```sql
CREATE POLICY "Blog Images Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'blog-images' );
```

#### Policy 3: Authenticated Update
```sql
CREATE POLICY "Blog Images Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'blog-images' );
```

#### Policy 4: Authenticated Delete
```sql
CREATE POLICY "Blog Images Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'blog-images' );
```

### Step 3: Test It!

1. **Start your admin dashboard** (if not running):
   ```bash
   cd coffee-admin-dashboard
   npm start
   ```

2. **Log in** to your admin dashboard

3. **Go to Blog Posts** page

4. **Click "New Post"** button

5. **Fill in the form**:
   - Title: "Welcome to Our Coffee Blog"
   - Content: "Your blog post content..."
   - Excerpt: "Short description"
   - Author: "Your name"
   - Upload a featured image
   - Check "Publish immediately" if you want it live

6. **Click "Create Post"**

✅ Your blog post should be created successfully!

---

## 📋 Features Included

- ✅ **Create new blog posts** with images
- ✅ **Edit existing posts** 
- ✅ **Delete posts**
- ✅ **Image upload** with preview
- ✅ **Drag & drop** image upload
- ✅ **File validation** (JPG, PNG, WEBP, max 5MB)
- ✅ **Automatic slug generation**
- ✅ **Publish/Draft status**
- ✅ **Author attribution**
- ✅ **Excerpt support**

---

## 🔍 Troubleshooting

### "Failed to upload image"
- **Check**: Bucket `blog-images` exists
- **Check**: Bucket is set to **public**
- **Check**: You're logged in as authenticated user

### "Permission denied"
- **Check**: All 4 storage policies are added
- **Check**: You're authenticated in the admin dashboard

### Image not showing
- **Check**: The featured_image URL in database
- **Check**: Bucket is public
- **Open URL directly** in browser to test

---

## 🎯 Next Steps

After creating the bucket, you can:

1. **Create blog posts** with featured images
2. **Edit existing posts** 
3. **Manage publish status** (draft/published)
4. **View posts** on your frontend (if frontend is set up)

---

## 📝 Notes

- Images are stored in: `blog-images/posts/`
- Each image gets a unique filename
- Deleting a post **doesn't** delete its image from storage
- Only authenticated admins can create/edit posts
- Public users can view published posts

---

That's it! Your blog post feature is ready to go! 🎉

For more details, see: `BLOG_STORAGE_SETUP.md`
