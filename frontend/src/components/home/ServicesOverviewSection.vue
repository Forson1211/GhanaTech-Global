<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-14">
        <div>
          <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
            MANAGED SERVICES
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            End-to-End Technology Solutions
          </h2>
          <p class="mt-2 text-base text-brand-muted max-w-xl">
            Whether you need dedicated individual contributors or turnkey managed service pods, we deliver production-ready execution.
          </p>
        </div>

        <router-link
          to="/services"
          class="mt-6 md:mt-0 px-6 py-2.5 rounded-full border border-brand-primary text-brand-primary hover:bg-brand-lightest text-xs font-bold transition-all shadow-violet-sm"
        >
          View All Managed Services
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="service in services"
          :key="service.slug"
          class="bg-white rounded-3xl border border-brand-border/80 p-8 shadow-violet-sm hover:shadow-violet-md transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold text-brand-primary bg-brand-soft px-3 py-1 rounded-full">
                Managed Practice
              </span>
              <span class="text-xs text-brand-muted">Turnkey or Staff Aug</span>
            </div>

            <h3 class="text-2xl font-bold text-brand-dark mb-3">
              {{ service.title }}
            </h3>

            <p class="text-sm text-brand-muted leading-relaxed mb-6">
              {{ service.description }}
            </p>

            <!-- Capabilities list -->
            <div class="space-y-2 mb-8">
              <h4 class="text-xs font-bold uppercase tracking-wider text-brand-dark">Key Capabilities:</h4>
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

          <div class="pt-4 border-t border-brand-border/40 flex items-center justify-between">
            <router-link
              :to="`/services/${service.slug}`"
              class="text-xs font-bold text-brand-primary hover:text-brand-dark flex items-center gap-1.5"
            >
              <span>Explore {{ service.title }}</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>

            <router-link
              :to="{ path: '/hire-talent', query: { technologyNeed: service.title } }"
              class="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm"
            >
              Request Pod
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    title: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Protect enterprise infrastructure, achieve regulatory compliance, and deploy 24/7 security monitoring with vetted Ghanaian cybersecurity analysts.',
    capabilities: [
      '24/7 SOC Monitoring & Triage',
      'SIEM Engineering (Splunk, Sentinel)',
      'GRC & SOC 2 Readiness',
      "Account Access & Permissions (IAM)",
      'Vulnerability Management',
      'Incident Response Coordination',
    ],
  },
  {
    title: 'Cloud & IT',
    slug: 'cloud-it',
    description: 'Modernize legacy environments, architect scalable cloud backbones on AWS and Azure, and automate deployment workflows with expert DevOps talent.',
    capabilities: [
      'AWS & Azure Cloud Architecture',
      'Infrastructure as Code (Terraform)',
      'Kubernetes & Container Orchestration',
      'CI/CD Pipeline Automation',
      '24/7 Systems Administration',
      'Cloud Cost Optimization & FinOps',
    ],
  },
  {
    title: 'Software Engineering',
    slug: 'software',
    description: 'Accelerate your core product roadmap with skilled software engineers fluent in modern frameworks, clean code practices, and agile delivery.',
    capabilities: [
      'Full-Stack Web Development',
      'Frontend (Vue, TypeScript, React)',
      'Backend APIs (Node, Python, Go)',
      'Microservices & Distributed Systems',
      'Automated QA & Integration Testing',
      'Technical Debt Remediation',
    ],
  },
  {
    title: 'Data & Analytics',
    slug: 'data',
    description: 'Transform fragmented raw data into reliable analytics pipelines, business intelligence dashboards, and machine learning infrastructure.',
    capabilities: [
      'Data Engineering & ETL Pipelines',
      'Data Warehousing (Snowflake, BigQuery)',
      'Business Intelligence & Reporting',
      'dbt & SQL Data Modeling',
      'Real-Time Streaming Architectures',
      'Data Governance & Quality Checks',
    ],
  },
];
</script>
