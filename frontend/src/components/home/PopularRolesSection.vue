<template>
  <section class="py-20 bg-brand-lightest/40 border-b border-brand-border/60 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
        <div>
          <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
            IN-DEMAND SPECIALTIES
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Popular Roles Ready for Placement
          </h2>
          <p class="mt-2 text-sm text-brand-muted">
            Swipe through verified talent categories available for immediate onboarding.
          </p>
        </div>

        <!-- Left/Right Scroll Arrows -->
        <div class="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            type="button"
            class="p-2.5 rounded-full border border-brand-border bg-white text-brand-dark hover:bg-brand-soft transition-colors shadow-violet-sm"
            @click="scrollLeft"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            class="p-2.5 rounded-full border border-brand-border bg-white text-brand-dark hover:bg-brand-soft transition-colors shadow-violet-sm"
            @click="scrollRight"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Horizontal Scrolling Container -->
      <div
        ref="scrollContainer"
        class="flex space-x-5 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x scroll-smooth"
      >
        <div
          v-for="role in roles"
          :key="role.name"
          class="flex-shrink-0 w-72 snap-start bg-white p-6 rounded-3xl border border-brand-border/80 shadow-violet-sm hover:shadow-violet-md hover:border-brand-primary/40 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-bold uppercase tracking-wider text-brand-primary bg-brand-soft px-2.5 py-1 rounded-md">
                {{ role.category }}
              </span>
              <span class="w-2 h-2 rounded-full bg-brand-primary"></span>
            </div>

            <h3 class="text-base font-bold text-brand-dark mb-2">
              {{ role.name }}
            </h3>

            <p class="text-xs text-brand-muted leading-relaxed mb-4">
              {{ role.summary }}
            </p>

            <div class="flex flex-wrap gap-1 mb-5">
              <span
                v-for="tech in role.techs"
                :key="tech"
                class="text-[10px] font-medium text-brand-dark bg-brand-lightest px-2 py-0.5 rounded border border-brand-border/40"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <router-link
            :to="{ path: '/talent', query: { role: role.name } }"
            class="w-full text-center py-2 px-3 rounded-xl border border-brand-border hover:bg-brand-primary hover:text-white hover:border-brand-primary text-brand-primary text-xs font-bold transition-all"
          >
            View Available {{ role.name }}s
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const scrollContainer = ref<HTMLElement | null>(null);

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: -320, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollBy({ left: 320, behavior: 'smooth' });
  }
};

const roles = [
  { name: 'SOC Analyst', category: 'Cybersecurity', summary: 'Continuous SIEM log monitoring, threat hunting, and containment.', techs: ['Splunk', 'CrowdStrike', 'QRadar'] },
  { name: 'Security Engineer', category: 'Cybersecurity', summary: 'Firewall rules, zero-trust network design, and endpoint protection.', techs: ['Palo Alto', 'Sentinel', 'Tenable'] },
  { name: 'Cloud Engineer', category: 'Cloud & IT', summary: 'Scalable multi-cloud deployments, resilience, and microservices.', techs: ['AWS', 'GCP', 'Azure'] },
  { name: 'DevOps Engineer', category: 'Cloud & IT', summary: 'Automated CI/CD pipelines, containerization, and infra automation.', techs: ['Kubernetes', 'Docker', 'Terraform'] },
  { name: 'AWS Engineer', category: 'Cloud & IT', summary: 'Deep Amazon Web Services expertise in ECS, EKS, RDS, and Lambda.', techs: ['AWS EKS', 'Lambda', 'CloudFormation'] },
  { name: 'Azure Engineer', category: 'Cloud & IT', summary: 'Enterprise Microsoft Azure virtualization and active directory sync.', techs: ['Azure AD', 'ARM Templates', 'App Services'] },
  { name: 'Frontend Developer', category: 'Software', summary: 'Modern web UIs, responsive styling, and state management.', techs: ['Vue 3', 'TypeScript', 'Tailwind'] },
  { name: 'Backend Developer', category: 'Software', summary: 'Scalable REST/GraphQL APIs, database queries, and microservices.', techs: ['Node.js', 'Python', 'PostgreSQL'] },
  { name: 'Full-Stack Developer', category: 'Software', summary: 'End-to-end feature delivery from database architecture to user interface.', techs: ['Vue', 'Node', 'TypeScript', 'Mongo'] },
  { name: 'QA Engineer', category: 'Software', summary: 'Comprehensive automated test suites, regression testing, and CI gates.', techs: ['Playwright', 'Cypress', 'Jest'] },
  { name: 'Data Analyst', category: 'Data & Analytics', summary: 'Business insights dashboards, cohort modeling, and KPI reporting.', techs: ['SQL', 'Power BI', 'Tableau', 'Excel'] },
  { name: 'Data Engineer', category: 'Data & Analytics', summary: 'Large-scale ingestion pipelines, data warehousing, and dbt models.', techs: ['Snowflake', 'dbt', 'Airflow', 'Spark'] },
  { name: 'Business Analyst', category: 'Data & Analytics', summary: 'Requirement distillation, process mapping, and engineering sprint alignment.', techs: ['Jira', 'Confluence', 'User Stories'] },
];
</script>
