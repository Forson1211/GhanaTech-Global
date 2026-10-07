<template>
  <div class="bg-white min-h-screen">
    <!-- Header Hero with GhanaTech purple gradient and organic curve -->
    <section class="relative bg-gradient-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-24 sm:pt-40 sm:pb-32 text-white">
      <!-- Background decoration wrapped in overflow-hidden so circles don't cause page scrollbars -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="hidden sm:block absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -bottom-12 -left-12 w-[240px] h-[240px] rounded-full border border-white/15 pointer-events-none" />
        <div class="hidden sm:block absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-white/15 pointer-events-none" />
      </div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Back Link -->
        <router-link
          to="/services"
          class="inline-flex items-center text-xs font-bold text-white/80 hover:text-white mb-6 transition-colors gap-1.5 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>All Services</span>
        </router-link>

        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {{ currentService.title }}
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
          {{ currentService.description }}
        </p>

        <!-- CTA Buttons -->
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
            :to="{ path: '/hire-talent', query: { technologyNeed: currentService.title } }"
            class="px-8 py-3.5 rounded-full bg-white text-brand-dark font-extrabold text-xs uppercase tracking-wide hover:bg-brand-soft transition-all shadow-lg transform hover:-translate-y-0.5"
          >
            Request {{ currentService.title }} Team
          </router-link>
          <router-link
            :to="{ path: '/talent', query: { category: currentService.title } }"
            class="px-8 py-3.5 rounded-full bg-white/10 text-white border border-white/30 font-bold text-xs hover:bg-white/20 transition-all"
          >
            Browse {{ currentService.title }} Talent
          </router-link>
        </div>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      <!-- Detailed Capabilities & Execution Matrix -->
      <div class="space-y-12">
        <div>
          <h2 class="text-2xl font-extrabold text-brand-dark mb-6">
            How We Can Help
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="cap in currentService.capabilities"
              :key="cap.name"
              class="p-6 rounded-2xl bg-white border border-brand-border/80 shadow-violet-sm"
            >
              <h3 class="text-base font-bold text-brand-dark mb-2 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-brand-primary" />
                <span>{{ cap.name }}</span>
              </h3>
              <p class="text-xs text-brand-muted leading-relaxed">
                {{ cap.details }}
              </p>
            </div>
          </div>
        </div>

        <!-- How We Deliver Section -->
        <div class="bg-brand-darkest text-white rounded-3xl p-8 sm:p-10 shadow-violet-lg">
          <h3 class="text-xl font-bold mb-4">Ways to Work With Us</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-brand-soft">
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <span class="text-brand-bright font-bold uppercase tracking-wider block mb-1">Option 1</span>
              <strong class="text-white text-sm block mb-1">Hire One Professional</strong>
              Work with one experienced professional who reports to your team manager.
            </div>
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <span class="text-brand-bright font-bold uppercase tracking-wider block mb-1">Option 2</span>
              <strong class="text-white text-sm block mb-1">Build a Dedicated Team</strong>
              Bring together a team with a leader, agreed tasks, and regular progress updates.
            </div>
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <span class="text-brand-bright font-bold uppercase tracking-wider block mb-1">Option 3</span>
              <strong class="text-white text-sm block mb-1">Hire Someone Directly</strong>
              Hire a professional directly into your company with agreed employment terms.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { servicesService } from '@/services/services';
import { useRoute } from 'vue-router';

const route = useRoute();

const serviceDetails: Record<string, any> = {
  cybersecurity: {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    description: "Help monitor security threats, find weaknesses, and prepare for security reviews.",
    capabilities: [
      { name: "24/7 Security Monitoring", details: "Review security alerts, identify possible attacks, and help teams respond." },
      { name: "Security Alerts & Monitoring Tools", details: "Set up tools such as Splunk and Microsoft Sentinel to collect security information and identify threats." },
      { name: "Account Access & Permissions (IAM)", details: "Manage who can sign in and which systems they can access, using tools such as Okta and Azure AD." },
      { name: "Security Risks & Review Support", details: "Help prepare security policies, records, and improvements for reviews such as SOC 2 and ISO 27001." },
    ],
  },
  'cloud-it': {
    title: 'Cloud & IT',
    slug: 'cloud-it',
    description: "Improve cloud systems, automate software updates, and keep applications running reliably.",
    capabilities: [
      { name: "Cloud Setup & Moving Systems", details: "Plan cloud systems and help move existing applications to AWS or Microsoft Azure." },
      { name: "Automated Cloud Setup", details: "Use Terraform and Ansible to set up systems consistently and track changes." },
      { name: "App Management & Software Releases", details: "Manage applications with Kubernetes and automate releases with tools such as GitHub Actions." },
      { name: "Cloud Cost Reviews", details: "Review cloud usage and suggest ways to reduce unnecessary costs." },
    ],
  },
  software: {
    title: 'Software Engineering',
    slug: 'software',
    description: "Build reliable websites, apps, and business software with developers and testers.",
    capabilities: [
      { name: "Website & App Interfaces", details: "Build easy-to-use websites and app screens with Vue, React, and TypeScript." },
      { name: "Business Systems Behind Your Apps", details: "Build the systems that process data and connect applications, using Node.js, Python, Go, and databases." },
      { name: "Software Testing", details: "Test software features and automate checks with tools such as Playwright and Cypress." },
      { name: "Improving Existing Software", details: "Improve code, fix performance problems, and make existing applications easier to maintain." },
    ],
  },
  data: {
    title: 'Data & Analytics',
    slug: 'data',
    description: "Bring business data together and create reports and dashboards your team can use.",
    capabilities: [
      { name: "Collecting & Moving Data", details: "Collect and move data between systems with Python, Airflow, dbt, and Kafka." },
      { name: "Organising Data in the Cloud", details: "Organise business data in Snowflake and BigQuery so it is ready for analysis." },
      { name: "Dashboards & Reports", details: "Build reports and dashboards with Power BI, Tableau, and Metabase." },
      { name: "Data Quality & Access", details: "Check that data is accurate, organised, and available to the right people." },
    ],
  },
};

const loadedService = ref<any>(null);
watch(() => route.params.slug, async slug => {
  loadedService.value = null;
  try { const response = await servicesService.getServiceBySlug(String(slug)); if (route.params.slug === slug && response.success && response.data) { const service = response.data; loadedService.value = { ...service, capabilities: service.capabilities.map(capability => typeof capability === 'string' ? { name: capability, details: '' } : { name: capability.title, details: capability.description }) }; } }
  catch { /* Retain the existing approved practice descriptions for known slugs. */ }
}, { immediate: true });

const currentService = computed(() => {
  if (loadedService.value) return loadedService.value;
  const slug = (route.params.slug as string) || (route.path.split('/').pop() || 'software');
  return serviceDetails[slug] || { title: "Service Not Found", description: "Browse our services or contact our team for help.", capabilities: [] };
});
</script>
