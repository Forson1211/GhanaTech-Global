import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PublicLayout from '@/layouts/PublicLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

const routes: RouteRecordRaw[] = [
  // Public Routes (PublicLayout)
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/pages/public/Home.vue'),
        meta: { title: 'GhanaTech Global | Ghanaian Technology Talent for U.S. Companies' },
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/pages/public/About.vue'),
        meta: { title: 'About Us | GhanaTech Global' },
      },
      {
        path: 'talent',
        name: 'Talent',
        component: () => import('@/pages/public/Talent.vue'),
        meta: { title: 'Technology Talent Recruitment & Placement | GhanaTech Global' },
      },
      {
        path: 'talent/:id',
        redirect: '/hire-talent',
      },
      {
        path: 'hire-talent',
        name: 'HireTalent',
        component: () => import('@/pages/public/HireTalent.vue'),
        meta: { title: 'Hire Talent | GhanaTech Global' },
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: () => import('@/pages/public/Jobs.vue'),
        meta: { title: 'Find Your Dream Remote Job | GhanaTech Global' },
      },
      {
        path: 'find-job',
        redirect: '/jobs',
      },
      {
        path: 'join-talent',
        name: 'JoinTalent',
        component: () => import('@/pages/public/JoinTalent.vue'),
        meta: { title: 'Join Talent Network | GhanaTech Global' },
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('@/pages/public/Services.vue'),
        meta: { title: 'Managed Technology Services | GhanaTech Global' },
      },
      {
        path: 'services/:slug',
        name: 'ServiceDetail',
        component: () => import('@/pages/public/ServiceDetail.vue'),
        meta: { title: 'Practice Details | GhanaTech Global' },
      },
      {
        path: 'how-it-works',
        name: 'HowItWorks',
        component: () => import('@/pages/public/HowItWorks.vue'),
        meta: { title: 'How It Works | GhanaTech Global' },
      },
      {
        path: 'why-ghana',
        name: 'WhyGhana',
        component: () => import('@/pages/public/WhyGhana.vue'),
        meta: { title: 'Why Ghana? | GhanaTech Global' },
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('@/pages/public/Contact.vue'),
        meta: { title: 'Contact Us | GhanaTech Global' },
      },
      {
        path: 'faq',
        name: 'Faq',
        component: () => import('@/pages/public/Faq.vue'),
        meta: { title: 'Frequently Asked Questions | GhanaTech Global' },
      },
    ],
  },

  // Auth Routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/pages/auth/Login.vue'),
    meta: { title: 'Admin Sign In | GhanaTech Global' },
  },

  // Admin Dashboard Routes (AdminLayout)
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminDashboard',
        component: () => import('@/pages/admin/Dashboard.vue'),
        meta: { title: 'Dashboard Overview | GhanaTech Admin' },
      },
      {
        path: 'candidates',
        name: 'AdminCandidates',
        component: () => import('@/pages/admin/Candidates.vue'),
        meta: { title: 'Talent Management | GhanaTech Admin' },
      },
      {
        path: 'applications',
        name: 'AdminApplications',
        component: () => import('@/pages/admin/Applications.vue'),
        meta: { title: 'Application Management | GhanaTech Admin' },
      },
      {
        path: 'leads',
        name: 'AdminLeads',
        component: () => import('@/pages/admin/Leads.vue'),
        meta: { title: 'Company Leads | GhanaTech Admin' },
      },
      {
        path: 'services',
        name: 'AdminServices',
        component: () => import('@/pages/admin/Services.vue'),
        meta: { title: 'Services Management | GhanaTech Admin' },
      },
      {
        path: 'categories',
        name: 'AdminCategories',
        component: () => import('@/pages/admin/Categories.vue'),
        meta: { title: 'Category Management | GhanaTech Admin' },
      },
      {
        path: 'calculator',
        name: 'AdminCalculator',
        component: () => import('@/pages/admin/Calculator.vue'),
        meta: { title: 'Calculator Assumptions | GhanaTech Admin' },
      },
      {
        path: 'testimonials',
        name: 'AdminTestimonials',
        component: () => import('@/pages/admin/Testimonials.vue'),
        meta: { title: 'Testimonial Management | GhanaTech Admin' },
      },
      {
        path: 'faqs',
        name: 'AdminFaqs',
        component: () => import('@/pages/admin/Faqs.vue'),
        meta: { title: 'FAQ Management | GhanaTech Admin' },
      },
      {
        path: 'statistics',
        name: 'AdminStatistics',
        component: () => import('@/pages/admin/Statistics.vue'),
        meta: { title: 'Statistics Management | GhanaTech Admin' },
      },
      {
        path: 'settings',
        name: 'AdminSettings',
        component: () => import('@/pages/admin/Settings.vue'),
        meta: { title: 'Site Settings | GhanaTech Admin' },
      },
    ],
  },

  // Fallback Catch-All Redirect
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

// Navigation Guards
router.beforeEach((to, _from, next) => {
  // Update document title for SEO
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  const token = localStorage.getItem('gtg_token');

  // Check auth requirement
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      return next({ path: '/admin/login', query: { redirect: to.fullPath } });
    }
  }

  // If already authenticated and trying to access login, redirect to admin
  if (to.path === '/admin/login' && token) {
    return next({ path: '/admin' });
  }

  next();
});

export default router;
