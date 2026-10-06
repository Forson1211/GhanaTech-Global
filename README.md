# GhanaTech Global

> **U.S.–Ghana Technology Talent & Services Platform**  
> Connecting forward-thinking U.S. companies with thoroughly vetted, top-tier Ghanaian technology professionals and enterprise-grade managed tech services.

---

## 1. Architecture Overview

GhanaTech Global is architected into two completely decoupled, independent applications:

```text
ghanatech-global/
├── frontend/             # Vue 3 + TypeScript + Vite + Tailwind CSS + Pinia
├── backend/              # Node.js + Express + TypeScript + MongoDB + JWT
├── README.md
├── .gitignore
└── .env.example
```

---

## 2. Technology Stack

### Frontend
- **Framework**: Vue 3 (Composition API with `<script setup lang="ts">`)
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Strict Violet & White theme)
- **State Management**: Pinia
- **Routing**: Vue Router 4 (Separate `PublicLayout` and `AdminLayout`)
- **Icons**: Lucide Vue Next
- **HTTP Client**: Axios
- **Utilities**: VueUse

### Backend
- **Runtime**: Node.js & Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing
- **File Uploads**: Multer with file-type, extension, and size validation
- **Security**: Helmet, CORS, express-rate-limit, input validation (Zod)
- **Architecture**: Controller-Service-Repository pattern with centralized error handling

---

## 3. Visual Branding & Design System
GhanaTech Global adheres strictly to a **Violet and White** visual identity:
- **Primary Violet**: `#6D28D9`
- **Dark Violet**: `#4C1D95`
- **Bright Violet**: `#7C3AED`
- **Soft Violet**: `#EDE9FE`
- **Very Light Violet**: `#F5F3FF`
- **Pure White**: `#FFFFFF`
- **Deep Slate/Violet Text**: `#0F0A1C` / `#1E1035`

---

## 4. Key Application Features

### Public Website
1. **Interactive Value Calculator**: Real-time salary cost comparison between U.S. onshore rates and GhanaTech Global across 17 roles and 3 seniority levels.
2. **Talent Marketplace (`/talent`)**: Search, filter by discipline, role, experience, availability, and pagination.
3. **Public Candidate Profiles (`/talent/:id`)**: Sanitized candidate resumes with privacy protection (private email, phone, CV, and internal notes are never exposed).
4. **Talent Application Portal (`/join-talent`)**: Comprehensive submission form with automated CV upload validation.
5. **Client Lead Intake (`/hire-talent`)**: Multi-field company inquiry form for team building or managed service requests.
6. **Managed Services Showcase (`/services`)**: In-depth capability breakdowns across Cybersecurity, Cloud & IT, Software Engineering, and Data & Analytics.
7. **Comprehensive Informational Pages**: `/about`, `/how-it-works`, `/why-ghana`, `/contact`, `/faq`.

### Authenticated Admin Dashboard (`/admin`)
1. **Separated Admin Layout**: Dedicated navigation drawer, top bar, and KPI analytics suite.
2. **Dashboard Overview**: Active KPI cards (Total Candidates, New Applications, Open Leads, Active Services) and recent activity streams.
3. **Candidate Management (`/admin/candidates`)**: CRUD, approval/rejection workflows, availability management, and internal notes.
4. **Application Pipeline (`/admin/applications`)**: Review applicant submissions, add recruiter notes, and download candidate CVs securely.
5. **Company Lead Pipeline (`/admin/leads`)**: CRM tracking for enterprise hiring inquiries.
6. **Service & Category Management (`/admin/services`, `/admin/categories`)**: Publish, edit, and maintain service offerings.
7. **Cost Calculator Configuration (`/admin/calculator`)**: Adjust cost baselines and seniority multipliers.
8. **FAQs, Testimonials, Statistics, and Site Settings**: Complete administrative control over website content.

---

## 5. API Structure

All API routes follow a consistent JSON response standard:
```json
{
  "success": true,
  "message": "Request successful",
  "data": {}
}
```

### Public Endpoints
- `GET  /api/health` — Service health check
- `GET  /api/candidates` — Paginated and filtered public candidates (sanitized)
- `GET  /api/candidates/:id` — Public candidate profile (sanitized)
- `POST /api/applications` — Submit candidate application with CV upload
- `POST /api/leads` — Submit enterprise hiring inquiry
- `GET  /api/services` — Public published services
- `GET  /api/services/:slug` — Single service detail
- `GET  /api/categories` — Technology disciplines
- `GET  /api/calculator/configs` — Available roles and baseline values
- `POST /api/calculator/calculate` — Live cost comparison computation
- `GET  /api/faqs` — Published FAQs
- `GET  /api/testimonials` — Client testimonials
- `GET  /api/statistics` — Published trust statistics
- `POST /api/auth/login` — Administrator authentication

### Admin Endpoints (JWT Protected)
- `GET    /api/auth/me` — Current admin session
- `PUT    /api/auth/profile` — Update admin account
- `GET    /api/statistics/admin/dashboard-summary` — Dashboard analytics & KPIs
- `GET    /api/candidates/admin/all` — Full candidate list with internal notes
- `POST   /api/candidates/admin` — Create new candidate
- `PUT    /api/candidates/admin/:id` — Update candidate
- `PATCH  /api/candidates/admin/:id/status` — Approve, reject, update availability
- `DELETE /api/candidates/admin/:id` — Remove candidate
- `GET    /api/applications/admin/all` — Review candidate applications
- `PATCH  /api/applications/admin/:id` — Update application status & notes
- `GET    /api/applications/admin/:id/cv` — Secure CV file download
- `GET    /api/leads/admin/all` — Review company inquiries
- `PATCH  /api/leads/admin/:id` — Update lead stage & notes
- `POST   /api/calculator/admin/config` — Update salary baseline assumptions

---

## 6. Quick Start Guide

### Prerequisites
- Node.js (v18+ or v22+)
- MongoDB running locally on `mongodb://127.0.0.1:27017` or a MongoDB Atlas URI

---

### Backend Setup

1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Seed the database with initial admin user, roles, services, categories, calculator data, FAQs, and sample talent:
   ```bash
   npm run seed
   ```
   *Default Admin credentials:*
   - **Email**: `admin@ghanatechglobal.com`
   - **Password**: `AdminPass123!`
   *Default Recruiter credentials:*
   - **Email**: `recruiter@ghanatechglobal.com`
   - **Password**: `RecruiterPass123!`

5. Start the backend in development mode:
   ```bash
   npm run dev
   ```
   The backend API will run at `http://localhost:5000/api`.

---

### Frontend Setup

1. Navigate to `frontend`:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The public application will be available at `http://localhost:5173`.  
   The admin portal will be available at `http://localhost:5173/admin/login`.

---

## 7. Production Build

### Backend
```bash
cd backend
npm run build
npm run start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```
