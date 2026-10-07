<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header Hero with GhanaTech purple gradient and organic curve -->
    <section class="relative bg-gradient-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-20 sm:pt-40 sm:pb-28 text-white">
      <!-- Background decoration wrapped in overflow-hidden so circles don't cause page scrollbars -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="hidden sm:block absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -bottom-12 -left-12 w-[240px] h-[240px] rounded-full border border-white/15 pointer-events-none" />
        <div class="hidden sm:block absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-white/15 pointer-events-none" />
      </div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        <!-- Main Title -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Technology Services for Your Business
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Get help with online security, cloud systems, software, data, and IT support. Hire a person, build a team, or discuss a project.
        </p>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div
          v-for="service in services"
          :key="service.slug"
          class="bg-white rounded-3xl border border-brand-border/80 p-8 shadow-violet-sm hover:shadow-violet-md transition-all flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold text-brand-primary bg-brand-soft px-3 py-1 rounded-full">
                Service Area
              </span>
              <router-link
                :to="`/services/${service.slug}`"
                class="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
              >
                <span>Read About This Service</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </router-link>
            </div>

            <h2 class="text-2xl font-bold text-brand-dark mb-3">
              {{ service.title }}
            </h2>

            <p class="text-sm text-brand-muted leading-relaxed mb-6">
              {{ service.description }}
            </p>

            <div class="space-y-2 mb-6">
              <h4 class="text-xs font-bold uppercase tracking-wider text-brand-dark">How We Can Help:</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div
                  v-for="cap in service.capabilities"
                  :key="cap"
                  class="flex items-center space-x-2 text-xs text-brand-dark"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span>{{ cap }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-brand-border/40 flex items-center justify-between">
            <router-link
              :to="`/services/${service.slug}`"
              class="px-5 py-2 rounded-xl border border-brand-border text-xs font-semibold text-brand-dark hover:bg-brand-soft transition-colors"
            >
              Learn More
            </router-link>

            <router-link
              :to="{ path: '/hire-talent', query: { technologyNeed: service.title, engagementType: 'Managed talent' } }"
              class="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm"
            >
              Build a {{ service.title }} Team
            </router-link>
          </div>
        </div>
      </div>

      <!-- Turnkey Pod SLA Guarantee Card -->
      <div class="bg-gradient-to-r from-brand-dark to-brand-primary rounded-3xl p-8 sm:p-12 text-white shadow-violet-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-2 max-w-xl text-center md:text-left">
          <h3 class="text-2xl font-extrabold tracking-tight">Need a Team for Your Project?</h3>
          <p class="text-sm text-brand-soft leading-relaxed">
            We can help you bring together the right mix of developers, testers, and cloud specialists. Agree on responsibilities, costs, and progress updates with our team.
          </p>
        </div>
        <router-link
          to="/hire-talent"
          class="px-8 py-3.5 rounded-full bg-white text-brand-primary font-bold text-xs hover:bg-brand-lightest shadow-violet-md whitespace-nowrap"
        >
          Talk About Your Team
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { servicesService } from '@/services/services';
const services = ref([
  {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    description: "Help protect your systems and data with security monitoring, risk reviews, and account access controls.",
    capabilities: [
      '24/7 SOC Triage & Containment',
      'SIEM Engineering & Tuning',
      'GRC & SOC 2 Preparation',
      "Account Access & Permissions (IAM)",
      'Vulnerability Scanning & Patching',
      'Cloud Security Posture (CSPM)',
    ],
  },
  {
    title: 'Cloud & IT',
    slug: 'cloud-it',
    description: "Set up and manage cloud systems, automate software updates, and keep business IT running.",
    capabilities: [
      'AWS & Azure Cloud Migration',
      'Terraform Infrastructure as Code',
      "Managing Apps with Kubernetes",
      'Automated CI/CD Delivery Pipelines',
      'Linux/Unix Server Administration',
      'Cloud Spend & FinOps Auditing',
    ],
  },
  {
    title: 'Software Engineering',
    slug: 'software',
    description: "Build websites, mobile apps, and software that connects your business tools.",
    capabilities: [
      'Frontend (Vue 3, TypeScript, React)',
      'Backend Microservices (Node, Python, Go)',
      'PostgreSQL, MongoDB & Redis Datastores',
      'API Design & GraphQL Schemas',
      'Automated QA & Playwright Tests',
      'Code Refactoring & Debt Remediation',
    ],
  },
  {
    title: 'Data & Analytics',
    slug: 'data',
    description: "Organise business data and create reports and dashboards that help you make decisions.",
    capabilities: [
      'Snowflake & BigQuery Data Warehousing',
      'dbt Data Modeling & Transformation',
      'Airflow & Kafka Streaming Ingestion',
      'Power BI, Tableau & Metabase Analytics',
      'Data Quality Automation & Schema Checks',
      'Predictive Modeling Support',
    ],
  },
]);
onMounted(async () => {
  try {
    const response = await servicesService.getServices();
    if (response.success && response.data) services.value = response.data.map(service => ({ title: service.title, slug: service.slug, description: service.description, capabilities: service.capabilities.map(capability => typeof capability === 'string' ? capability : capability.title) }));
  } catch { /* Existing practice content remains available while the API is offline. */ }
});
</script>
