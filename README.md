# 🌿 Urban Oasis — A Multi-Store Web Experience

A fully functional multi-page e-commerce style website simulating a real-world shopping experience across 4 distinct stores, built using **HTML, CSS, and JavaScript only** — no frameworks.

**Developed by:** Khushmeet (2510993612) & Ridhima (2510993779) — First Year B.Tech, 2025–26

---

## 🏪 Stores

| Store | File | Description |
|-------|------|-------------|
| ☕ The Brew Café | `3cafe.html` | Coffee, tea & desserts — 12 menu items across 4 categories |
| 🍦 The Velvet Frost | `4icecream.html` | Ice cream with 7 flavors and topping customization |
| 🌸 The Bloomed Petal | `5flower.html` | 8 flower bouquets with a unique gift link feature |
| 📚 The Paper Meadows | `6bookstore.html` | 8 books available to buy or rent, with wishlist & genre filter |

---

## 📁 File Structure

```
Urban Oasis/
├── index.html          # Login page (user authentication)
├── 2home.html          # Home / landing page
├── 3cafe.html          # The Brew Café
├── 4icecream.html      # The Velvet Frost
├── 5flower.html        # The Bloomed Petal
├── 6bookstore.html     # The Paper Meadows
├── 7feedback.html      # Customer feedback page
├── *.css               # Individual stylesheet per page (7 total)
├── *.js                # JavaScript logic per store (6 total)
└── /Images             # All image assets
```

---

## 💻 Tech Stack

- **HTML5** — Semantic structure using `nav`, `section`, `header`, `footer`, and `form` tags
- **CSS3** — Flexbox, Grid, animations, media queries, transitions, glassmorphism effects
- **JavaScript (Vanilla)** — DOM manipulation, event listeners, `localStorage`, dynamic rendering
- **localStorage** — Persists login credentials (email, username) across pages
- **No frameworks** — 100% vanilla; no React, jQuery, or Bootstrap

---

## 🗺️ Page Overview

### 🔐 Login — `index.html`
- Email and password validation (valid `@` format, min 6 characters)
- Saves credentials to `localStorage` on success
- Inline error messages and animated toast notifications
- Auto-redirects to home page after 1.5 seconds

### 🏠 Home — `2home.html`
- Full-screen hero banner with an Explore button
- 4 clickable store cards with images and CTAs
- "This Week's Favorites" highlights and privileges section (Free Wi-Fi, Pet Friendly, etc.)
- Live OPEN/CLOSED status using JavaScript `Date()`
- Profile dropdown showing user name/email with logout

### ☕ The Brew Café — `3cafe.html`
- 12 menu items across 4 categories (Coffee, Non-Coffee, Tea, Desserts)
- Category filter buttons for instant filtering
- Slide-in product detail panel with rating, description, and ingredients
- Favorites panel (heart icon) and cart drawer with quantity controls
- Full checkout flow with receipt and success animation
- Toast notifications for all user actions

### 🍦 The Velvet Frost — `4icecream.html`
- 7 flavors (Classic, Sundae, Tropical, Limited edition)
- Topping add-ons with individual pricing (e.g., Hot Fudge +₹25)
- Perks: free candy every order, waffle cone on 2+ scoops, polaroid on weekends

### 🌸 The Bloomed Petal — `5flower.html`
- 8 bouquets with 10–20% discounts
- Gift Link feature: fill in recipient details and personal note → generate shareable link
- Freebies: gift card, silk ribbon, flower mist (₹799+), scented candle (occasion orders), polaroid

### 📚 The Paper Meadows — `6bookstore.html`
- 8 books with buy and rent (weekly) options
- Live search by title/author, genre filter, and price sort
- Wishlist drawer with one-click "move all to cart"
- Freebies on purchase: bookmark, notes pad, candle, café drink

### 💬 Feedback — `7feedback.html`
- Store-specific dropdown (Café, Ice Cream, Flower, Books, Overall)
- Dynamic radio/checkbox options based on selected store
- 1–5 star rating with text label (Poor → Excellent)
- Form validation, animated success banner, and auto-reset after submission

---

## 🚀 Key Features

| Feature | Details |
|---------|---------|
| 🛒 Shopping Cart | Slide-in drawer with add/remove/quantity controls, per-item totals, and checkout receipt |
| 🤍 Wishlist | Save items across Books & Flowers; move all to cart in one click |
| 🍞 Toast Notifications | Animated, auto-dismissing popups (2.5–3s) for every user action |
| 🔍 Search & Filter | Live text search, genre/category filters, and price sorting |
| 📱 Responsive Design | `@media` queries at 600px and 768px; Flexbox/Grid card wrapping |
| ⚡ Dynamic Rendering | All product cards rendered via JS `.map()` — no hardcoded HTML in `<body>` |

---

## ⚡ Core JavaScript Functions

| Function | File(s) | Purpose |
|----------|---------|---------|
| `addToCart(item)` | `3cafe.js`, `5flower.js`, `6bookstore.js` | Adds item or increments quantity; updates badge and rerenders drawer |
| `renderBooks(bookList)` | `6bookstore.js` | Maps over filtered array to generate book cards dynamically |
| `filterBooks()` | `6bookstore.js` | Reads search/genre/sort inputs and calls `renderBooks()` with results |
| `filterCategory(name)` | `3cafe.js`, `4icecream.js` | Filters menu items by category and rebuilds cards via `innerHTML` |
| `processCheckout()` | `3cafe.js`, `4icecream.js` | Validates cart, generates itemized receipt, resets cart data |
| `togglePanel(id, open)` | `3cafe.js`, `4icecream.js` | Opens/closes side panels with overlay and scroll lock |
| `showToast(message)` | All JS files | Creates and auto-removes toast notification after 3 seconds |
| `setRating(rating)` | `7feedback.js` | Handles star rating UI and updates hidden input + label |

---

## 🎨 CSS Highlights

- **Flexbox & Grid** — Used for navbars, card grids, and drawers throughout
- **`@keyframes`** — Toast slideUp, success scaleIn, flower petal sway
- **`backdrop-filter: blur(12px)`** — Glassmorphism navbar effect
- **`position: fixed`** — Navbar, side panels, toasts, and overlays
- **`::before` / `::after`** — Decorative emoji overlays via pseudo-elements
- **`linear-gradient`** — Hero sections, buttons, and discount strips
- **`border-radius`** — Rounded cards (16–28px), pill buttons (40–50px), circular badges (50%)
- **`box-shadow`** — Layered depth on cards, drawers, toasts, and icons

---

## 🔗 Data Flow

```
index.html (Login)
    │
    └──▶ 2home.html (Home)
              │
    ┌─────────┼──────────┐──────────┐
    ▼         ▼          ▼          ▼
3cafe.html  4icecream  5flower  6bookstore
    │         │          │          │
    └─────────┴──────────┴──────────┘
                    │
              7feedback.html
```

- `localStorage` stores `userEmail` and `userName` from login; home page reads these on load
- All pages interconnect via nav bars (`onclick` / `href`)
- Cart and wishlist are held in memory (reset on navigation — no backend persistence)

---

## 🧠 Challenges & Learnings

- **Cart without a database** — Managed state in JS arrays; understood how real apps use backend APIs
- **Responsive design** — Mastered Flexbox wrap, Grid `auto-fill`, and media queries for mobile
- **Dynamic rendering** — Used `.map()`, `.filter()`, and `.innerHTML` to avoid hardcoded HTML
- **State across pages** — Used `localStorage` for login; recognized cart reset as a real-world limitation
- **Drawer/panel UX** — Implemented smooth slide-in via `right: -420px → 0` with CSS transitions and overlay
- **Vanilla form validation** — Built without libraries using `indexOf('@')`, `.length`, and inline error display

---

## 🔮 Future Scope

- Add a backend (Node.js / Firebase) for real data and cart persistence
- Implement real user accounts and a payment gateway
- Build an admin panel to manage products, orders, and inventory

---

## 🚀 Getting Started

No build tools or dependencies required. Simply open `index.html` in any modern browser.

```bash
# Clone or download the project, then open:
open index.html
```

> Make sure all 7 HTML files, their corresponding CSS/JS files, and the `/Images` folder are in the same directory.
