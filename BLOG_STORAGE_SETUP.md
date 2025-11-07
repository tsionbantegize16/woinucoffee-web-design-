# Supabase Storage Setup for Blog Post Images

## Step 1: Create Blog Images Bucket

1. Go to your Supabase Dashboard
2. Click on **Storage** in the left sidebar
3. Click **"New bucket"**
4. Enter bucket details:
   - **Name**: `blog-images`
   - **Public bucket**: ✅ **Check this** (images need to be publicly accessible)
   - Click **"Create bucket"**

## Step 2: Set Storage Policies

1. Go to **Storage** → Click on `blog-images` bucket
2. Click **"Policies"** tab
3. Click **"New Policy"** and add these policies:

### Allow Public Read Access
```sql
CREATE POLICY "Blog Images Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'blog-images' );
```

### Allow Authenticated Upload
```sql
CREATE POLICY "Blog Images Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'blog-images' );
```

### Allow Authenticated Update
```sql
CREATE POLICY "Blog Images Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'blog-images' );
```

### Allow Authenticated Delete
```sql
CREATE POLICY "Blog Images Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'blog-images' );
```

## Step 3: Test Upload

1. Log into your admin dashboard
2. Navigate to **Blog Posts** section
3. Click **"New Post"**
4. Fill in the form:
   - **Title**: Your blog post title
   - **Content**: Blog post content
   - **Excerpt**: Short description
   - **Author**: Author name
   - **Upload Featured Image**: Click to select an image
5. Click **"Create Post"** or **"Save Draft"**

✅ Image should upload successfully!

## How It Works

1. **User selects image** → Validated (type, size)
2. **Image uploaded** → Supabase Storage bucket `blog-images/posts/`
3. **Public URL generated** → e.g., `https://your-project.supabase.co/storage/v1/object/public/blog-images/posts/123456.jpg`
4. **URL saved** → Database table `blog_posts` in `featured_image` field
5. **Frontend displays** → Fetches from database and shows blog with image

## Features

- ✅ **Drag & drop** or click to upload
- ✅ **Image preview** before uploading
- ✅ **File validation** (type & size)
- ✅ **Unique filenames** (prevents conflicts)
- ✅ **Max 5MB** file size
- ✅ **Supported formats**: JPG, JPEG, PNG, WEBP

## Troubleshooting

### Error: "Failed to upload image"

**Solution:**
1. Check that `blog-images` bucket exists
2. Verify bucket is set to **public**
3. Check you're logged into admin dashboard
4. Try refreshing the page

### Error: "Permission denied"

**Solution:**
1. Add the storage policies above
2. Make sure you're authenticated in admin dashboard
3. Check RLS policies in Supabase

### Image not showing on blog post

**Solution:**
1. Check the `featured_image` URL in database is correct
2. Test the URL directly in browser
3. Ensure bucket is public
4. Verify the image was uploaded successfully

---

## Important Notes

- Images are stored permanently until deleted
- Each upload creates a unique filename with timestamp
- Deleting a blog post **does NOT** automatically delete its image from storage
- Public bucket means anyone can view images via URL
- Only authenticated admins can upload/delete images

---

Enjoy your blog post feature with image uploads! 📝
