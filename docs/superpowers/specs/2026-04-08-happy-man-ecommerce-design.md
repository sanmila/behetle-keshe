# HAPPY MAN — Full-Stack Ecommerce + Admin Dashboard

**Date:** 2026-04-08
**Status:** Approved

---

## 1. Concept & Vision

HAPPY MAN is a fashion ecommerce store with a soft, feminine pink-and-white aesthetic. The brand is bold yet approachable — premium fashion with a warm, editorial feel. A separate admin dashboard provides full store management without disturbing the customer-facing experience. The site uses a real PostgreSQL database, authentication, and a mock payment flow (Stripe-ready architecture).

---

## 2. Design Language

### Customer Store

**Color Palette:**
| Token | Hex | Usage |
|---|---|---|
| `--pink-primary` | `#F8C8DC` | Primary pink (nav, buttons, accents) |
| `--pink-deep` | `#D4A0B8` | Hover/active states |
| `--pink-pale` | `#F0E6EC` | Card backgrounds, section tints |
| `--bg-warm` | `#FFF8F5` | Warm off-white page background |
| `--text-dark` | `#2D2620` | Body text on light backgrounds |
| `--text-muted` | `#8A7D70` | Secondary/muted text |
| `--dark-bg` | `#1C1814` | Dark sections (hero, footer) |
| `--white` | `#FFFFFF` | White text on dark |

**Typography:**
- **Display / Logo:** `HAPPY MAN` PNG logo image (provided by user)
- **Headings:** Cormorant Garamond (Google Fonts) — elegant serif
- **Body:** DM Sans (Google Fonts) — clean sans-serif

**Spatial System:**
- Max content width: 1400px
- Padding: 24px (mobile), 48px (desktop)
- Section padding: 80–160px vertical
- Grid gaps: 12–24px

**Motion:**
- Entrance: fade + translateY(30px), 600ms, cubic-bezier(0.16, 1, 0.3, 1)
- Hover: scale(1.04), 700ms ease
- Page transitions: subtle fade
- Scroll-triggered reveals via Framer Motion

### Admin Dashboard

**Theme:** Dark neutral (contrasts with customer store)

| Token | Hex | Usage |
|---|---|---|
| `--admin-bg` | `#141210` | Main background |
| `--admin-card` | `#1C1814` | Card/panel background |
| `--admin-border` | `#2D2620` | Borders, dividers |
| `--admin-pink` | `#F8C8DC` | Accent (matches brand) |
| `--admin-text` | `#F0E6EC` | Primary text |
| `--admin-muted` | `#8A7D70` | Secondary text |

**Typography:** Same DM Sans throughout (admin-only, no display font needed)

---

## 3. Layout & Structure

### Customer Store Pages

#### Homepage Sections (top to bottom):
1. **Navbar** — Sticky, blush pink bg, logo centered, nav links, icons right
2. **Hero** — Split layout (50/50): left dark bg with text stack / right editorial fashion photo
3. **New Arrivals** — Off-white bg, 3-column grid
4. **Women Editorial** — Dark photo left, text right (asymmetric)
5. **Women Collection** — 4-column product grid
6. **Oversized Editorial** — Text left, editorial image right
7. **Products** — Filter tabs + 4-column grid
8. **About** — Two-column text + image
9. **Newsletter** — Email signup
10. **Footer** — 4-column links, watermark

#### Inner Pages:
- `/product/[id]` — Product detail with gallery, size/color selector, add to cart
- `/cart` — Full cart with quantity controls
- `/checkout` — 3-step: Address → Payment → Confirmation
- `/account` — Login / Register / Order history tabs
- `/order/[id]` — Order confirmation detail

### Admin Dashboard (`/admin`)

Separate Next.js route group with own layout (dark theme).

#### Pages:
- `/admin` — Dashboard: stats cards, recent orders, quick actions
- `/admin/orders` — Orders table with status filters, detail drawer
- `/admin/products` — Product table with search, add/edit/delete modal
- `/admin/products/add` — Add product form
- `/admin/products/[id]/edit` — Edit product form
- `/admin/customers` — Customer list with order counts
- `/admin/settings` — Store settings (name, contact)

---

## 4. Features & Interactions

### Customer Store

**Navigation:**
- Sticky navbar with blur backdrop on scroll
- Logo links to home
- Nav links highlight on hover (underline animation)
- **Language toggle** — EN / RU switch in navbar (top-right area). Defaults to Russian. Selection stored in localStorage + cookie (so preference persists across sessions). All site text (labels, buttons, nav, product info, checkout, etc.) is bilingual.
- Cart icon shows badge count (animated on add)
- Mobile: hamburger menu with full-screen overlay

**Product Browsing:**
- Filter by category (All / New / Tops / Women / Bottoms / Accessories)
- Product cards: image zoom on hover, "Add to Cart" reveals on hover
- Loading skeleton on initial load
- Empty state if no products match filter

**Product Detail Page:**
- Image gallery (main image + thumbnails)
- Size selector (radio buttons, disabled if out of stock)
- Color selector (color swatches)
- Quantity picker (+/-)
- Add to Cart button → opens cart drawer
- Related products section

**Cart:**
- Cart drawer slides in from right (accessible from every page via navbar icon)
- Quantity increment/decrement
- Remove item
- Subtotal calculation
- "View Cart" → full cart page
- "Checkout" → checkout flow

**Checkout Flow:**
- Step 1 — Shipping: name, email, address, city, state, zip, country
- Step 2 — Review + Payment: order summary, mock payment (test card input that always succeeds)
- Step 3 — Confirmation: order number, summary, email confirmation message
- Progress indicator between steps
- Back button on each step

**Authentication:**
- Register: name, email, password (min 8 chars)
- Login: email, password
- Logout (clears httpOnly cookie)
- Protected: `/account`, `/checkout` (guest can checkout too)
- On login: guest cart merges into user cart

**Order History (account page):**
- List of past orders with date, status, total
- Click to view order detail

### Admin Dashboard

**Auth:**
- Separate admin login at `/admin/login`
- Checks `isAdmin: true` on user in DB
- Redirects non-admins to homepage

**Dashboard:**
- Stats: Total Orders, Total Revenue (₽), Products, Customers
- Recent orders table (last 10)
- Quick action buttons: Add Product, View Orders

**Orders Management:**
- Table: Order ID, Customer, Date, Total (₽), Status, Actions
- Filter by status: All / Pending / Confirmed / Shipped / Delivered
- Click row to open detail drawer/modal
- Update status dropdown: Pending → Confirmed → Shipped → Delivered
- Order detail: items list, shipping address, total (₽)

**Products Management:**
- Table: Image thumb, Name, Category, Price (₽), Stock, Actions
- Search by name
- Add Product button → modal/page with form
- Edit → pre-filled form
- Delete → confirmation dialog
- Form fields: name, price, category, tag (new/bestseller/sale), color, description, images (URL), stock qty
- Inline stock indicator (green if >0, red if 0)

### Currency
- All prices displayed in **Russian Rubles (₽)**
- Product prices stored as Decimal in DB
- Format: `₽X XXX` (e.g. ₽2 990, ₽4 500)
- Checkout totals, order totals, and admin stats all in rubles

**Customers:**
- Table: Name, Email, Join Date, Order Count
- Click to view their orders

**Settings:**
- Store display name
- Contact email
- Save to DB (single key-value or settings model)

---

## 5. Component Inventory

### Customer Components
| Component | States |
|---|---|
| `Navbar` | default, scrolled (blur bg), mobile menu open |
| `Hero` | default, parallax on scroll |
| `LanguageToggle` | RU active, EN active, hover |
| `ProductCard` | default, hover (zoom + quick-add), out-of-stock dimmed |
| `FilterTabs` | each tab: default, active, hover |
| `CartDrawer` | closed, open (slide in), empty, with items |
| `CartItem` | default, updating quantity, removing |
| `ProductDetail` | with/without size, with/without stock |
| `CheckoutStepper` | step 1/2/3, completed steps |
| `AddressForm` | default, validation errors |
| `AuthForm` | login mode, register mode |
| `OrderHistory` | empty, with orders |
| `Newsletter` | default, submitted, error |

### Admin Components
| Component | States |
|---|---|
| `AdminSidebar` | default, collapsed (mobile) |
| `StatsCard` | loading, with data |
| `OrdersTable` | loading, empty, with rows, filtered |
| `OrderDetail` | open/closed drawer |
| `ProductsTable` | loading, empty, with rows, searched |
| `ProductForm` | create mode, edit mode, submitting, validation errors |
| `ConfirmDialog` | default, confirmed |
| `CustomerTable` | loading, empty, with rows |

---

## 6. Technical Approach

### Framework & Libraries
- **Next.js 15** — App Router, Server Components where possible
- **TypeScript** — strict mode
- **Prisma** — ORM for PostgreSQL
- **Framer Motion** — animations
- **Tailwind CSS** — utility styling (existing setup)
- **bcrypt** — password hashing
- **jsonwebtoken** — JWT tokens in httpOnly cookies
- **Zod** — form validation
- **next-intl** — Internationalization (RU default, EN toggle)

### Internationalization (i18n)
- Default language: **Russian (RU)**
- Toggle: **EN / RU** switch in navbar
- All UI text stored in `/lib/i18n/` as JSON dictionaries:
  - `lib/i18n/ru.json` — Russian (default)
  - `lib/i18n/en.json` — English
- Language preference stored in `localStorage` + `lang` cookie
- Product names/descriptions stored in DB as `{ nameRu, nameEn, descRu, descEn }` fields (admin enters both on product form)
- Checkout forms, error messages, order statuses all bilingual

### Database Schema (Prisma)

```prisma
model User {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String
  isAdmin      Boolean   @default(false)
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  cartItems    CartItem[]
  orders       Order[]
}

model Product {
  id          String      @id @default(cuid())
  nameRu      String
  nameEn      String
  slug        String      @unique  // auto-generated from name (slugify)
  price       Decimal     @db.Decimal(10, 2)
  category    String
  tag         String?
  color       String
  colorRu     String      // localized color name
  colorEn     String
  descriptionRu String
  descriptionEn String
  image       String
  images      String[]    // additional images
  sizes       String[]    // available sizes e.g. ["S","M","L","XL"]
  stockQty    Int         @default(0)
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  cartItems   CartItem[]
  orderItems  OrderItem[]
}

model CartItem {
  id        String   @id @default(cuid())
  userId    String?
  sessionId String?
  productId String
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  user      User?    @relation(fields: [userId], references: [id])
  product   Product  @relation(fields: [productId], references: [id])
}

model Order {
  id              String      @id @default(cuid())
  orderNumber     String      @unique
  userId          String?
  email           String
  name            String
  shippingAddress String
  city            String
  state           String
  zip             String
  country         String
  totalAmount     Decimal     @db.Decimal(10, 2)
  status          String      @default("pending") // pending/confirmed/shipped/delivered
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  user            User?       @relation(fields: [userId], references: [id])
  items           OrderItem[]
}

model OrderItem {
  id             String  @id @default(cuid())
  orderId        String
  productId      String
  productName    String  // stored at time of purchase (bilingual)
  productImage   String
  quantity       Int
  priceAtPurchase Decimal @db.Decimal(10, 2)
  order          Order   @relation(fields: [orderId], references: [id])
  product        Product @relation(fields: [productId], references: [id])
}

model Setting {
  id    String @id @default("store")
  key   String @unique
  value String
}
```

### API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/api/products` | List products (filter by category, search) |
| GET | `/api/products/[id]` | Get single product |
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login, set JWT cookie |
| POST | `/api/auth/logout` | Clear JWT cookie |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/[id]` | Update quantity |
| DELETE | `/api/cart/[id]` | Remove item |
| POST | `/api/cart/merge` | Merge guest cart into user cart |
| GET | `/api/orders` | List user orders |
| POST | `/api/orders` | Create order from cart |
| GET | `/api/orders/[id]` | Get order detail |
| GET | `/api/admin/orders` | Admin: all orders |
| PUT | `/api/admin/orders/[id]` | Admin: update order status |
| GET | `/api/admin/products` | Admin: all products |
| POST | `/api/admin/products` | Admin: create product |
| PUT | `/api/admin/products/[id]` | Admin: update product |
| DELETE | `/api/admin/products/[id]` | Admin: delete product |
| GET | `/api/admin/customers` | Admin: all customers |
| GET | `/api/admin/stats` | Admin: dashboard stats |
| GET | `/api/admin/settings` | Admin: get settings |
| PUT | `/api/admin/settings` | Admin: update settings |

### Auth Strategy
- Password hashed with bcrypt (12 rounds)
- JWT signed with `process.env.JWT_SECRET`
- Stored in httpOnly, Secure, SameSite=Strict cookie named `auth_token`
- Session expires after 7 days
- Middleware protects `/account/**` and `/checkout` (redirects to login)
- Admin routes protected by middleware checking `isAdmin: true`

### Cart Strategy
- **Guest:** sessionId generated on first cart action, stored in `cart_session` cookie + localStorage
- **Authenticated:** cart stored in DB with `userId`
- **Merge:** on login, guest cart items are merged into user cart (quantities added if same product)

---

## 7. File Structure

```
neura-fashion/
├── prisma/
│   └── schema.prisma
├── public/
│   ├── logo.png              # HAPPY MAN logo
│   └── products/...          # product images
├── app/
│   ├── layout.tsx            # Root layout
│   ├── globals.css
│   ├── page.tsx              # Homepage
│   ├── shop/page.tsx         # Products page
│   ├── product/[id]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── account/page.tsx
│   ├── order/[id]/page.tsx
│   ├── api/
│   │   ├── auth/...
│   │   ├── products/...
│   │   ├── cart/...
│   │   ├── orders/...
│   │   └── admin/...
│   └── admin/
│       ├── layout.tsx        # Dark theme layout
│       ├── login/page.tsx
│       ├── page.tsx          # Dashboard
│       ├── orders/page.tsx
│       ├── products/
│       │   ├── page.tsx
│       │   ├── add/page.tsx
│       │   └── [id]/edit/page.tsx
│       ├── customers/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ProductCard.tsx
│   ├── CartDrawer.tsx
│   ├── CheckoutStepper.tsx
│   ├── ... (existing + new)
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── OrdersTable.tsx
│       ├── ProductsTable.tsx
│       ├── ProductForm.tsx
│       └── ...
├── lib/
│   ├── prisma.ts             # Prisma client singleton
│   ├── auth.ts               # JWT helpers
│   └── utils.ts
└── docs/superpowers/specs/
    └── 2026-04-08-happy-man-ecommerce-design.md
```

---

## 8. Implementation Order

1. **Setup:** Prisma schema, DB migration, seed data
2. **Auth:** Register, login, logout, JWT middleware
3. **Products API:** CRUD endpoints
4. **Customer store:** ProductCard, Collections page, Product detail page
5. **Cart:** CartDrawer, cart API, guest cart with sessionId
6. **Checkout:** Checkout flow, order creation, order confirmation
7. **Account:** Auth forms, order history
8. **Admin auth:** Admin login, protected routes
9. **Admin dashboard:** Stats, orders management
10. **Admin products:** Full CRUD for products
11. **Admin customers:** Customer list
12. **Admin settings:** Store settings
13. **Polish:** Animations, loading states, error handling, responsive
