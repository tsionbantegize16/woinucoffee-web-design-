# Supabase Storage Setup for Image Upload

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Click on **Storage** in the left sidebar
3. Click **"New bucket"**
4. Enter bucket details:
   - **Name**: `gallery-images`
   - **Public bucket**: ✅ **Check this** (images need to be publicly accessible)
   - Click **"Create bucket"**

## Step 2: Set Storage Policies (if needed)

If you get permission errors, set up these policies:

1. Go to **Storage** → Click on `gallery-images` bucket
2. Click **"Policies"** tab
3. Add these policies:

### Allow Public Read Access
```sql
CREATE POLICY "Gallery Images Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'gallery-images' );
```

### Allow Authenticated Upload
```sql
CREATE POLICY "Gallery Images Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'gallery-images' );
```

### Allow Authenticated Delete
```sql
CREATE POLICY "Gallery Images Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'gallery-images' );
```

## Step 3: Test Upload

1. Log into your admin dashboard
2. Navigate to **Gallery** section
3. Click **"Add Image"**
4. Fill in the form:
   - **Title**: Test Image
   - **Description**: Test description
   - **Upload Image**: Click to select an image from your computer
   - **Category**: Choose any
   - **Active**: Keep checked
5. Click **"Add Image"**

✅ Image should upload successfully!

## How It Works

1. **User selects image** → Validated (type, size)
2. **Image uploaded** → Supabase Storage bucket `gallery-images/gallery/`
3. **Public URL generated** → e.g., `https://your-project.supabase.co/storage/v1/object/public/gallery-images/gallery/123456.jpg`
4. **URL saved** → Database table `gallery_images`
5. **Frontend displays** → Fetches from database and shows image

## Features

- ✅ **Drag & drop** or click to upload
- ✅ **Image preview** before uploading
- ✅ **File validation** (type & size)
- ✅ **Unique filenames** (prevents conflicts)
- ✅ **Max 5MB** file size
- ✅ **Supported formats**: JPG, PNG, GIF, WEBP

## Troubleshooting

### Error: "Failed to upload image"

**Solution:**
1. Check that `gallery-images` bucket exists
2. Verify bucket is set to **public**
3. Check you're logged into admin dashboard
4. Try refreshing the page

### Error: "Permission denied"

**Solution:**
1. Add the storage policies above
2. Make sure you're authenticated in admin dashboard
3. Check RLS policies in Supabase

### Image not showing on frontend

**Solution:**
1. Verify image has `is_active = true`
2. Check the `image_url` in database is correct
3. Test the URL directly in browser
4. Ensure bucket is public

---

## Important Notes

- Images are stored permanently until deleted
- Each upload creates a unique filename
- Deleting from gallery grid **does NOT** delete from storage (to implement if needed)
- Public bucket means anyone can view images via URL
- Only authenticated admins can upload

---

## Alternative: Use Image URLs

If you prefer to use image URLs instead of uploading:

1. Host images on:
   - Unsplash: `https://images.unsplash.com/...`
   - ImgBB: Upload and get URL
   - Cloudinary: Upload and get URL
   - Your own hosting

2. The gallery will work with any publicly accessible image URL

---

Enjoy your image upload feature! 📸
