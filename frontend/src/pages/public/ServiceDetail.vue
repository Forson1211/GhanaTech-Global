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
          <span>All Managed Services</span>
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
            Request {{ currentService.title }} Pod
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
            Practice Capabilities & Deliverables
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
          <h3 class="text-xl font-bold mb-4">Engagement & Delivery Options</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-brand-soft">
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <span class="text-brand-bright font-bold uppercase tracking-wider block mb-1">Option 1</span>
              <strong class="text-white text-sm block mb-1">Dedicated Contributor</strong>
              Full-time senior specialist reporting directly to your engineering manager.
            </div>
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <span class="text-brand-bright font-bold uppercase tracking-wider block mb-1">Option 2</span>
              <strong class="text-white text-sm block mb-1">Turnkey Engineering Pod</strong>
              Multi-disciplinary team with dedicated lead, delivery management, and sprint commitments.
            </div>
            <div class="p-4 rounded-xl bg-white/5 border border-white/10">
              <span class="text-brand-bright font-bold uppercase tracking-wider block mb-1">Option 3</span>
              <strong class="text-white text-sm block mb-1">Direct Hire Placement</strong>
              Permanent addition to your cap table with seamless Ghana-US contract conversion.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const serviceDetails: Record<string, any> = {
  cybersecurity: {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Enterprise 24/7 security monitoring, SIEM tuning, vulnerability management, and regulatory compliance support.',
    capabilities: [
      { name: '24/7 SOC Tier 1/2 Monitoring', details: 'Continuous real-time alert triage, intrusion detection, and incident escalation protocols.' },
      { name: 'SIEM Engineering & Detection Rules', details: 'Splunk, Microsoft Sentinel, and Elastic log collection, correlation rules, and parsing.' },
      { name: 'Identity & Access Management (IAM)', details: 'Okta, Azure AD, role-based access policies, and least-privilege zero-trust governance.' },
      { name: 'GRC & Security Framework Compliance', details: 'SOC 2 Type II, ISO 27001, and HIPAA documentation and policy audit remediation.' },
    ],
  },
  'cloud-it': {
    title: 'Cloud & IT',
    slug: 'cloud-it',
    description: 'Cloud infrastructure modernization, automated Kubernetes deployment pipelines, and high-availability systems reliability engineering.',
    capabilities: [
      { name: 'Cloud Architecture & Migration', details: 'Design, lift-and-shift, or re-platforming to AWS and Microsoft Azure with minimal downtime.' },
      { name: 'Infrastructure as Code (IaC)', details: 'Terraform and Ansible modular automation for repeatable, version-controlled environments.' },
      { name: 'Container Orchestration & CI/CD', details: 'Kubernetes cluster deployment, Helm chart templating, GitHub Actions, and ArgoCD workflows.' },
      { name: 'FinOps & Cloud Cost Optimization', details: 'Comprehensive infrastructure audits and reserved instance planning to cut cloud bills by 30%+.' },
    ],
  },
  software: {
    title: 'Software Engineering',
    slug: 'software',
    description: 'Agile frontend, backend, and full-stack software development squads writing clean, tested, maintainable production software.',
    capabilities: [
      { name: 'Modern Frontend Development', details: 'Responsive, accessible single-page web applications built in Vue 3, React, and TypeScript.' },
      { name: 'Scalable Microservice Backends', details: 'High-throughput REST and GraphQL APIs using Node.js, Python, Go, and relational/NoSQL datastores.' },
      { name: 'Automated QA & Reliability Testing', details: 'End-to-end regression suites, Playwright/Cypress integration tests, and unit coverage.' },
      { name: 'Technical Debt & Performance Optimization', details: 'Code refactoring, database query indexing, memory leak triage, and latency reductions.' },
    ],
  },
  data: {
    title: 'Data & Analytics',
    slug: 'data',
    description: 'Data platform engineering, automated ETL/ELT pipelines, Snowflake/BigQuery warehousing, and business intelligence reporting.',
    capabilities: [
      { name: 'Data Pipeline Engineering', details: 'Robust batch and streaming pipelines using Python, Airflow, dbt, and Kafka.' },
      { name: 'Cloud Data Warehousing', details: 'Data modeling, star schema architecture, and partition strategies in Snowflake and BigQuery.' },
      { name: 'BI Dashboards & Reporting', details: 'Executive KPI reporting, interactive stakeholder dashboards in Power BI, Tableau, and Metabase.' },
      { name: 'Data Governance & Quality Assurance', details: 'Automated schema tests, Great Expectations checks, and metadata cataloging.' },
    ],
  },
};

const currentService = computed(() => {
  const slug = (route.params.slug as string) || (route.path.split('/').pop() || 'software');
  return serviceDetails[slug] || serviceDetails['software'];
});
</script>
