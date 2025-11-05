# Woinu Coffee Shop Website

A modern, full-stack coffee shop website with an admin dashboard and public frontend. Built with React, Tailwind CSS, and Supabase.

## 🎨 Project Structure

```
woinucoffee-web-design-/
├── coffee-admin-dashboard/     # Admin panel for managing content
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Layout.js       # Main layout with sidebar
│   │   │   └── ProtectedRoute.js
│   │   ├── context/
│   │   │   └── AuthContext.js  # Authentication context
│   │   ├── lib/
│   │   │   └── supabaseClient.js
│   │   ├── pages/              # Admin pages
│   │   │   ├── Dashboard.js
│   │   │   ├── MenuItems.js
│   │   │   ├── Categories.js
│   │   │   ├── Orders.js
│   │   │   ├── Gallery.js
│   │   │   ├── BlogPosts.js
│   │   │   ├── Promotions.js
│   │   │   ├── Testimonials.js
│   │   │   ├── Messages.js
│   │   │   └── Settings.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
├── coffee-frontend/            # Public-facing website
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Frontend pages
│   │   ├── lib/
│   │   │   └── supabaseClient.js
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
└── SUPABASE_SETUP.md          # Database setup guide
```

## 🚀 Features

### Admin Dashboard
- **Dashboard**: Overview with statistics and recent orders
- **Menu Management**: Add, edit, delete menu items with images
- **Category Management**: Organize menu items into categories
- **Order Management**: View and update order statuses
- **Gallery**: Manage images for the coffee shop
- **Blog**: Create and publish blog posts
- **Promotions**: Manage special offers and discounts
- **Testimonials**: Moderate customer reviews
- **Messages**: View contact form submissions
- **Settings**: Configure site-wide settings
- **Authentication**: Secure login with Supabase Auth

### Public Frontend
- **Home**: Hero section, featured products, about section
- **Menu**: Browse coffee and food items by category
- **Gallery**: View coffee shop photos
- **Blog**: Read coffee-related articles
- **About**: Learn about the coffee shop
- **Contact**: Get in touch via contact form
- **Order Online**: Place orders for pickup or delivery

## 🎨 Color Scheme

The website uses a coffee-inspired color palette:

- **Coffee Brown**: `#6F4E37` (primary)
- **Dark Coffee**: `#3E2723`
- **Yellow/Gold**: `#FDB813`, `#FFD700` (accent)
- **Cream**: `#F5F5DC` (background)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Styling**: Tailwind CSS 3
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Icons**: Lucide React
- **Routing**: React Router DOM 6
- **Notifications**: React Hot Toast
- **Animations**: Framer Motion

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm
- Supabase account

### 1. Clone the Repository

```bash
cd /home/tsedenawit/Documents/projects/team/woinucoffee-web-design-
```

### 2. Set Up Supabase

Follow the detailed guide in `SUPABASE_SETUP.md` to:
1. Create a Supabase project
2. Set up the database tables
3. Configure storage buckets
4. Set up authentication
5. Configure Row Level Security (RLS)

### 3. Configure Environment Variables

**Admin Dashboard:**
```bash
cd coffee-admin-dashboard
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
REACT_APP_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key_here
```

**Public Frontend:**
```bash
cd ../coffee-frontend
cp .env.example .env
```

Edit `.env` with the same credentials.

### 4. Install Dependencies

**Admin Dashboard:**
```bash
cd coffee-admin-dashboard
npm install
```

**Public Frontend:**
```bash
cd ../coffee-frontend
npm install
```

### 5. Run the Applications

**Admin Dashboard** (http://localhost:3000):
```bash
cd coffee-admin-dashboard
npm start
```

**Public Frontend** (http://localhost:3001):
```bash
cd coffee-frontend
PORT=3001 npm start
```

## 🔐 Authentication

The admin dashboard requires authentication. To create an admin user:

1. Go to your Supabase dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Invite User** or **Add User**
4. Enter admin email and password
5. The user will receive a confirmation email

## 📊 Database Schema

The database includes these main tables:

- `categories` - Menu categories
- `menu_items` - Coffee and food items
- `blog_posts` - Blog articles
- `gallery_images` - Photo gallery
- `contact_messages` - Contact form submissions
- `promotions` - Special offers
- `testimonials` - Customer reviews
- `orders` - Customer orders
- `order_items` - Individual items in orders
- `settings` - Site configuration

See `SUPABASE_SETUP.md` for the complete SQL schema.

## 🎯 Key Features Implementation

### Dynamic Content
All content sections are managed through the admin panel:
- Menu items and categories
- Blog posts
- Gallery images
- Promotions
- Testimonials

### Responsive Design
- Mobile-first approach
- Tailwind CSS breakpoints
- Optimized for all devices

### Image Management
- Supabase Storage integration
- Support for menu images, gallery, blog featured images
- Automatic URL generation

### Order Management
- Online ordering system
- Status tracking (pending → confirmed → preparing → ready → completed)
- Pickup and delivery options

## 🚀 Deployment

### Admin Dashboard
```bash
cd coffee-admin-dashboard
npm run build
```

### Public Frontend
```bash
cd coffee-frontend
npm run build
```

Deploy the `build` folder to your hosting provider (Netlify, Vercel, etc.).

## 📝 Development Notes

### Code Reusability
- Auth context from IPv6 project
- Layout pattern adapted for coffee theme
- Supabase client configuration reused

### Customization
- Colors defined in `tailwind.config.js`
- Easy to modify theme colors
- Component-based architecture for easy updates

## 🐛 Troubleshooting

**Can't connect to Supabase:**
- Verify credentials in `.env` file
- Check Supabase project status
- Ensure RLS policies are set correctly

**Images not displaying:**
- Check storage bucket policies
- Verify bucket names match configuration
- Ensure images are uploaded to correct bucket

**Login not working:**
- Verify admin user exists in Supabase Auth
- Check email confirmation status
- Review browser console for errors

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## 🤝 Support

For issues or questions:
1. Check the Supabase dashboard for database errors
2. Review browser console for frontend errors
3. Verify all environment variables are set correctly

## 📄 License

© 2024 Woinu Coffee. All rights reserved.

---

**Happy Coding! ☕**
