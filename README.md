# DEALPORT Admin Dashboard + Products API

> **Full-Stack Developer Assessment** | NestJS + Prisma API + Next.js (App Router) + Tailwind CSS

This repository is a production-ready implementation of the scoped **DEALPORT** admin shell dashboard, product creation form, product management list, and authentication & products REST API.

---

## 🌟 Key Features

### 🟢 Backend (NestJS + Prisma + PostgreSQL/SQLite)
- **Authentication**: JWT-based login (`/auth/login`) with seeded admin persona credentials.
- **Products API**: Full CRUD with DTO validation (`class-validator`), search, category filtering, status filtering (`PUBLISHED` / `DRAFT`), and pagination.
- **Dashboard Widgets API**: Dynamic endpoints for Best Selling Products (`/products/widgets/best-selling`) and Top Products (`/products/widgets/top-rated`).
- **Categories API**: Category management (`/categories`) pre-seeded with eCommerce categories (Electronic, Fashion, Home, Beauty, Sports).
- **Architecture**: Strict NestJS standard modular structure (`Controller -> Service -> PrismaService`) with DTO input validation & custom JWT Auth Guard.
- **Database**: Prisma ORM configured for PostgreSQL / SQLite zero-config local testing.

### 🟢 Frontend (Next.js 14 App Router + Tailwind CSS)
- **DEALPORT Admin Shell**: Emerald green theme palette (`#059669` / `#10b981`), collapsible sidebar navigation with active path indicators, dynamic header with user profile menu, search, and notification badges.
- **Authentication**: Typed JWT Auth client saving session state, pre-filled quick login button for easy reviewer access.
- **Dashboard Screen**:
  - Stat cards: Total Sales, Total Orders, Pending & Canceled.
  - "Report for this week" interactive chart & weekly performance metrics.
  - Transaction table with status badges (Paid, Pending, Canceled).
  - **API-Integrated Product Widgets**: Best Selling Products table, Top Products card list, Categories quick view, and Quick Product additions — all fetching live data from NestJS.
  - Live charts: "Users in last 30 mins" and "Sales by Country" distribution metrics.
- **Add Product Screen**:
  - Full product form matching DEALPORT design spec: Name, Description, Pricing, Discount calculation, Tax toggle, Expiration date range, Unlimited stock toggle, Stock status dropdown, Category picker, Tags, Color swatches.
  - Image Upload UI with preview thumbnail grid, primary image selection, and upload simulation.
  - Dual action endpoints: **Publish Product** (`PUBLISHED`) & **Save to Draft** (`DRAFT`).
- **Product List Screen**:
  - API-integrated table displaying all products.
  - Live search bar, category filter, status filter (`PUBLISHED`/`DRAFT`).
  - Actions to delete products, edit product status, or launch the Add Product flow.
  - Pagination controls.

---

## 🛠️ Architecture & Tech Stack

```
portal/
├── backend/                  # NestJS API Server
│   ├── prisma/
│   │   ├── schema.prisma     # Prisma Models (User, Product, Category)
│   │   └── seed.ts           # Automated Database Seed Script
│   └── src/
│       ├── auth/             # Auth Module, JWT Strategy & Guards
│       ├── categories/       # Categories Module & Service
│       ├── products/         # Products Module, DTOs & Service
│       └── prisma/           # Prisma Service
└── frontend/                 # Next.js App Router UI
    └── src/
        ├── app/
        │   ├── login/        # Admin Login Page
        │   └── dashboard/    # DEALPORT Admin Shell & Routes
        │       ├── page.tsx            # Main Dashboard
        │       └── products/
        │           ├── page.tsx        # Product List Table
        │           └── add/page.tsx    # Add Product Form
        ├── components/       # UI Widgets & Components
        ├── lib/              # API Client & Axios/Fetch Wrapper
        └── types/            # TypeScript Interfaces
```

---

## 🔑 Seed User & Demo Credentials

When the seed script runs, the following admin account is initialized:

| Role | Email | Password |
|---|---|---|
| **Admin / Seller** | `admin@dealport.com` | `password123` |

> 💡 **Quick Login**: The frontend login page includes a single-click **"Fill Seed Credentials"** button for immediate testing by reviewers.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.x` or `v20.x`
- **npm** or **yarn**

### 1. Install Dependencies
```bash
# Monorepo root shortcut
npm run install:all

# OR install individually:
cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure Environment Variables

**Backend (`backend/.env`):**
```env
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_SECRET="dealport_super_secret_jwt_key_2026"
CORS_ORIGIN="http://localhost:3000"
```

**Frontend (`frontend/.env.local`):**
```env
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
```

### 3. Seed Database
Run the seed command inside the `backend` folder to initialize database tables and insert demo users, categories, and products:
```bash
cd backend
npx prisma db push
npx prisma db seed
```

### 4. Run Backend & Frontend

**Terminal 1 (Backend - NestJS):**
```bash
cd backend
npm run start:dev
```
*Backend API runs at: http://localhost:4000*

**Terminal 2 (Frontend - Next.js):**
```bash
cd frontend
npm run dev
```
*Frontend UI runs at: http://localhost:3000*

---

## 📡 API Endpoint Overview

### Auth
- `POST /auth/login` - Authenticate admin & return JWT access token
- `GET /auth/me` - Get logged-in admin user details (Protected)

### Products
- `GET /products` - Fetch paginated product list (`?search=...&category=...&status=...&page=1&limit=10`)
- `GET /products/:id` - Get single product detail
- `POST /products` - Create new product (Publish or Save as Draft)
- `PATCH /products/:id` - Update existing product
- `DELETE /products/:id` - Delete product
- `GET /products/widgets/best-selling` - Fetch top-selling products for dashboard
- `GET /products/widgets/top-rated` - Fetch top products for dashboard side panel

### Categories
- `GET /categories` - Get all product categories
- `POST /categories` - Create new category

---

## 🎨 UI Design Implementation

The DEALPORT UI strictly follows the Figma design specification:
- **Primary Emerald Accent**: `#059669` (Emerald 600) / `#10b981` (Emerald 500)
- **Backgrounds**: Slate/zinc clean background `#F8FAFC` with crisp white card containers `#FFFFFF` and subtle borders `#E2E8F0`.
- **Typography**: Clean sans-serif hierarchy matching modern dashboard design systems.
