# Promotions Feature - What It Is & Where It's Used

## What Are Promotions?

Promotions are **special offers, discounts, or deals** that you can create to attract customers. Examples:

- **"Buy 1 Get 1 Free"** on certain drinks
- **"20% Off All Pastries"** this weekend
- **"Happy Hour Special"** - discounted prices 3-5 PM
- **"Student Discount"** - 15% off with student ID
- **Seasonal Offers** - "Summer Refresh - Ice Coffee 50% Off"
- **Loyalty Rewards** - "Get a free coffee after 10 purchases"

## Database Structure

The `promotions` table has these fields:
- `title` - Name of the promotion (e.g., "Weekend Special")
- `description` - Details about the offer
- `discount_percentage` - Percentage off (e.g., 20 for 20% off)
- `discount_amount` - Fixed amount off (e.g., 50 Birr off)
- `code` - Promo code customers can use (e.g., "COFFEE20")
- `image_url` - Banner/image for the promotion
- `start_date` - When promotion starts
- `end_date` - When promotion ends
- `is_active` - Whether it's currently active

## Where Promotions Are Used

### ❌ Currently: **NOT IMPLEMENTED** in Frontend

The promotions feature is **set up in the admin panel** but **not yet displayed on the customer-facing frontend**. 

Right now:
- ✅ **Admin Dashboard** has a Promotions page (but it's just a placeholder)
- ❌ **Frontend** does NOT show promotions anywhere

### ✅ Where Promotions SHOULD Be Used (Future Implementation)

Here are the best places to display promotions on your frontend:

#### 1. **Homepage Hero Banner**
   - Show active promotion as a hero banner
   - Example: Big banner saying "20% OFF ALL COFFEE THIS WEEK"

#### 2. **Homepage Special Section**
   - Add a "Current Promotions" section
   - Display all active promotions with images

#### 3. **Menu Page Banner**
   - Show active promotions at the top of menu
   - Example: "🎉 Use code COFFEE20 for 20% off"

#### 4. **Checkout/Cart (if you add e-commerce)**
   - Allow customers to enter promo codes
   - Apply discounts automatically

#### 5. **Popup/Modal**
   - Show promotion popup when user visits site
   - Example: "Welcome! Get 10% off your first order"

## Example Use Cases

### 1. Weekend Special
```
Title: "Weekend Coffee Deal"
Description: "Every Saturday & Sunday - Buy 2 Cappuccinos, Get 1 Free!"
Discount: Buy 2 Get 1 Free
Dates: Every weekend
Active: Yes
```

### 2. Student Discount
```
Title: "Student Discount"
Description: "Show your student ID and get 15% off any drink"
Discount: 15%
Code: STUDENT15
Active: Yes
```

### 3. Seasonal Promo
```
Title: "Summer Ice Coffee Special"
Description: "Beat the heat! All iced coffees 50% off"
Discount: 50%
Dates: June 1 - August 31
Image: summer-coffee-banner.jpg
Active: Yes
```

## How to Use Promotions Feature

### In Admin Dashboard:

1. Go to **Promotions** page
2. Create a new promotion with:
   - Eye-catching title
   - Clear description
   - Discount details
   - Start and end dates
   - Upload a banner image (optional)
3. Set `is_active = true` when ready to launch

### To Display on Frontend (Needs Implementation):

You would need to:

1. **Fetch active promotions** from database
2. **Display them** on homepage/menu
3. **Apply discount codes** at checkout (if you add shopping cart)

## Do You Need It?

**Right now: NO** - The promotions feature is not essential.

**Consider implementing if:**
- ✅ You want to run seasonal discounts
- ✅ You plan to offer promo codes
- ✅ You want to attract customers with special offers
- ✅ You're building an online ordering system

**You can skip it if:**
- ❌ You're only showcasing your menu (no online ordering)
- ❌ You don't plan to run promotions
- ❌ You want to keep things simple

## Recommendation

Since your frontend is mainly a **showcase website** (not a full e-commerce site), you can:

**Option 1: Remove Promotions** (Simplify)
- Delete promotions from admin menu
- Remove from database
- Keep it simple

**Option 2: Keep for Future** (Flexible)
- Leave it in admin but don't worry about it
- Implement frontend display later if needed

**Option 3: Simple Banner Implementation** (Quick Win)
- Just show 1 active promotion as a banner on homepage
- Easy to implement, adds value

---

## Quick Frontend Implementation (If You Want It)

To show promotions on your homepage, add this:

```jsx
// In Home.js, fetch promotions
const [promotions, setPromotions] = useState([]);

useEffect(() => {
  const fetchPromotions = async () => {
    const { data } = await supabase
      .from('promotions')
      .select('*')
      .eq('is_active', true)
      .gte('end_date', new Date().toISOString())
      .limit(1);
    setPromotions(data || []);
  };
  fetchPromotions();
}, []);

// Display as banner
{promotions.length > 0 && (
  <div className="bg-amber-500 text-white p-4 text-center">
    <h3 className="font-bold">{promotions[0].title}</h3>
    <p>{promotions[0].description}</p>
  </div>
)}
```

---

**Summary**: Promotions are for special offers/discounts. Currently not used in frontend. Optional feature—keep or remove based on your needs.
