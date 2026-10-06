# GhanaTech Global — Backend API

RESTful API backend for GhanaTech Global built with Express, TypeScript, MongoDB, Mongoose, and JWT.

## Setup & Running

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Ensure `.env` exists with valid `MONGODB_URI` and `JWT_SECRET`.

3. **Seed Database:**
   ```bash
   npm run seed
   ```

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

## API Routes Overview

- `/api/auth` - Login, logout, status, user verification
- `/api/candidates` - Public talent directory & admin candidate management
- `/api/applications` - Submit candidate application (with CV upload) & admin management
- `/api/leads` - Submit hiring inquiries & admin lead tracking
- `/api/services` - Managed tech services & details
- `/api/categories` - Technology categories
- `/api/calculator` - Value calculator configuration & formulas
- `/api/testimonials` - Client testimonials
- `/api/faqs` - Frequently Asked Questions
- `/api/statistics` - Trust numbers and homepage stats
- `/api/admin` - Administrative stats and protected endpoints
