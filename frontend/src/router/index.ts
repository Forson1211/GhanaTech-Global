import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PublicLayout from '@/layouts/PublicLayout.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { updatePageMetadata } from '@/utils/seo';

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
        name: 'CandidateProfile',
        component: () => import('@/pages/public/CandidateProfile.vue'),
        meta: { title: 'Technology Professional | GhanaTech Global' },
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
        path: 'jobs/:id',
        name: 'JobDetail',
        component: () => import('@/pages/public/Jobs.vue'),
        meta: { title: 'Career Opportunity | GhanaTech Global' },
      },
      {
        path: 'calculator',
        name: 'Calculator',
        component: () => import('@/pages/public/CalculatorPage.vue'),
        meta: { title: 'Technology ROI & Cost Calculator | GhanaTech Global', description: 'Calculate and compare engineering hiring costs between US domestic salaries and vetted Ghanaian technology professionals.' },
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
      { path: 'managed-teams', name: 'ManagedTeams', component: () => import('@/pages/public/BusinessInfo.vue'), meta: { title: 'Dedicated Managed Teams | GhanaTech Global', description: 'Build a dedicated team of vetted Ghanaian technology professionals for global delivery.' } },
      { path: 'for-talent', name: 'ForTalent', component: () => import('@/pages/public/BusinessInfo.vue'), meta: { title: 'For Technology Talent | GhanaTech Global', description: 'Join the GhanaTech Global Talent Network for full-time, contract, project, and managed-team opportunities.' } },
      { path: 'industries', name: 'Industries', component: () => import('@/pages/public/BusinessInfo.vue'), meta: { title: 'Industry Technology Expertise | GhanaTech Global', description: 'Technology talent and delivery expertise aligned with your business requirements.' } },
      { path: 'talent-directory', name: 'TalentDirectory', component: () => import('@/pages/public/TalentDirectory.vue'), meta: { title: 'Available Technology Talent | GhanaTech Global', description: 'Explore approved Ghanaian technology professionals and submit your hiring requirement.' } },
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
      ...[
        { path: 'leadership', name: 'Leadership', title: 'Leadership' },
        { path: 'insights', name: 'Insights', title: 'Insights' },
        { path: 'insights/:slug', name: 'Insight', title: 'Insights' },
        { path: 'privacy', name: 'Privacy', title: 'Privacy Policy' },
        { path: 'terms', name: 'Terms', title: 'Terms of Use' },
      ].map(page => ({ path: page.path, name: page.name, component: () => import('@/pages/public/ContentPage.vue'), meta: { title: page.title + ' | GhanaTech Global' } })),
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
      { path: 'account', name: 'AdminAccount', component: () => import('@/pages/admin/Account.vue'), meta: { title: 'Account Settings | GhanaTech Admin' } },
      { path: 'jobs', name: 'AdminJobs', component: () => import('@/pages/admin/Publishing.vue'), meta: { title: 'Career Opportunities | GhanaTech Admin' } },
      { path: 'content', name: 'AdminContent', component: () => import('@/pages/admin/Publishing.vue'), meta: { title: 'Website Content | GhanaTech Admin' } },
      { path: 'communications', name: 'AdminCommunications', component: () => import('@/pages/admin/Communications.vue'), meta: { title: 'Communications | GhanaTech Admin' } },
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

  const descriptions: Record<string, string> = { Home: 'GhanaTech Global connects exceptional Ghanaian technology professionals with global companies. Vetted Technology Talent. Global Delivery.', Talent: 'Explore technology talent across cybersecurity, cloud, software, data, IT, and business technology.', HireTalent: 'Submit your technology hiring requirement for direct placement, managed talent, or a technology project.', JoinTalent: 'Join the GhanaTech Global Talent Network with your skills, experience, preferences, and CV.', Services: 'Technology talent, managed teams, and technology solutions for global companies.' };
  let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!description) { description = document.createElement('meta'); description.name = 'description'; document.head.appendChild(description); }
  description.content = to.meta.description as string || descriptions[String(to.name)] || descriptions.Home;
  updatePageMetadata(String(to.meta.title || 'GhanaTech Global'), description.content, to.path, to.path.startsWith('/admin'));

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
