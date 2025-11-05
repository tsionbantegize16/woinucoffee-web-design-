# Woinu Coffee Shop - Quick Start Guide

## 🚀 Getting Started in 5 Steps

### Step 1: Set Up Supabase (15 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project" and fill in:
   - **Name**: woinucoffee
   - **Database Password**: (create a strong password)
   - **Region**: Choose closest to you
3. Wait for project creation (2-3 minutes)
4. Open the SQL Editor and run the complete schema from `SUPABASE_SETUP.md`
5. Go to **Settings → API** and copy:
   - Project URL
   - anon/public key

### Step 2: Configure Environment Variables

**Admin Dashboard:**
```bash
cd coffee-admin-dashboard
cp .env.example .env
```

Edit `.env`:
```
REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

**Frontend:**
```bash
cd ../coffee-frontend
cp .env.example .env
```

Edit `.env` with the same credentials.

### Step 3: Install Dependencies

**Admin Dashboard:**
```bash
cd coffee-admin-dashboard
npm install
```

**Frontend:**
```bash
cd ../coffee-frontend
npm install
```

### Step 4: Create Admin User

1. In Supabase Dashboard, go to **Authentication → Users**
2. Click "Add User" (via email)
3. Enter:
   - Email: your@email.com
   - Password: (create a password)
   - Auto Confirm User: ✓ (check this box)
4. Click "Create User"

### Step 5: Run the Applications

**Terminal 1 - Admin Dashboard:**
```bash
cd coffee-admin-dashboard
npm start
```
Opens at: http://localhost:3000

**Terminal 2 - Frontend:**
```bash
cd coffee-frontend
PORT=3001 npm start
```
Opens at: http://localhost:3001

## 🎯 What You Get

### Admin Dashboard (localhost:3000)
- **Dashboard**: Overview with stats
- **Menu Items**: Add/edit coffee and food items
- **Categories**: Organize menu
- **Orders**: Manage customer orders
- **Gallery**: Upload images
- **Blog**: Publish articles
- **Messages**: View contact submissions
- **Settings**: Configure site settings

### Public Frontend (localhost:3001)
- **Home**: Beautiful landing page
- **Menu**: Browse products by category
- **About**: Coffee shop story
- **Gallery**: Photo gallery
- **Blog**: Articles and stories
- **Contact**: Contact form

## 📝 First Tasks

1. **Login to Admin** (localhost:3000/login)
   - Use the email/password you created in Step 4

2. **Add Categories**:
   - Hot Coffee
   - Cold Coffee
   - Tea
   - Pastries
   - Snacks

3. **Add Menu Items**:
   - Name, price, description
   - Upload images (or use URLs)
   - Assign to categories

4. **Update Settings**:
   - Site title
   - Contact information
   - Opening hours
   - Social media links

5. **Add Gallery Images**:
   - Upload coffee shop photos
   - Interior/exterior shots
   - Product photos

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js` in both projects:

```js
colors: {
  coffee: {
    500: '#YOUR_COLOR', // Primary brown
    900: '#YOUR_COLOR', // Dark brown
  },
  yellow: {
    500: '#YOUR_COLOR', // Accent color
  }
}
```

### Change Logo

Replace the Coffee icon in:
- `coffee-admin-dashboard/src/components/Layout.js`
- `coffee-frontend/src/components/Navbar.js`

Add your logo image to `public/` folder and update the imports.

## 🐛 Troubleshooting

**Can't login to admin:**
- Check if user exists in Supabase Auth
- Verify email is confirmed
- Check browser console for errors

**Images not showing:**
- Create storage buckets in Supabase
- Set public access policies (see SUPABASE_SETUP.md)

**Database connection failed:**
- Verify .env file has correct credentials
- Check Supabase project is active
- Ensure no typos in URL/key

**Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3002 npm start
```

## 📚 Resources

- **Full Documentation**: See `README.md`
- **Database Setup**: See `SUPABASE_SETUP.md`
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## 🎉 You're Ready!

Your coffee shop website is now running. Start by:
1. Adding your first category
2. Adding your first menu item
3. Viewing it on the frontend

Happy coding! ☕
