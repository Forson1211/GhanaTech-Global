<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
            SPECIALIZED RECRUITMENT & PLACEMENT
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            High-Demand Roles We Recruit & Place
          </h2>
          <p class="mt-2 text-base text-brand-muted max-w-2xl">
            Pre-assessed, English-fluent Ghanaian technology professionals ready to integrate into your U.S. engineering squads.
          </p>
        </div>

        <router-link
          to="/talent"
          class="mt-6 md:mt-0 inline-flex items-center text-sm font-bold text-brand-primary hover:text-brand-dark group gap-1.5"
        >
          <span>Explore Recruitment Capabilities</span>
          <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>

      <!-- Role Showcase Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="roleItem in showcaseRoles"
          :key="roleItem.role"
          class="group bg-white rounded-3xl p-7 shadow-violet-sm hover:shadow-violet-md transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <!-- Category Badge & Benchmark -->
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-full bg-brand-soft text-brand-dark text-[11px] font-bold">
                {{ roleItem.category }}
              </span>
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary">
                <span class="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                Vetted & Ready
              </span>
            </div>

            <!-- Role Title -->
            <h3 class="text-xl font-extrabold text-brand-dark group-hover:text-brand-primary transition-colors mb-2">
              {{ roleItem.role }}
            </h3>

            <!-- Description -->
            <p class="text-xs text-brand-muted leading-relaxed mb-5">
              {{ roleItem.description }}
            </p>

            <!-- Metrics bar -->
            <div class="grid grid-cols-2 gap-2 text-xs py-2.5 px-3.5 rounded-2xl bg-brand-lightest/70 mb-5">
              <div>
                <span class="block text-[10px] uppercase font-bold text-brand-muted">Experience</span>
                <span class="font-extrabold text-brand-dark">{{ roleItem.experience }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-bold text-brand-muted">Shortlist Time</span>
                <span class="font-extrabold text-brand-primary">{{ roleItem.shortlistTime }}</span>
              </div>
            </div>

            <!-- Core Stack Badges -->
            <div class="mb-6">
              <span class="block text-[10px] uppercase font-bold text-brand-muted mb-2">Core Tech Stack</span>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="skill in roleItem.skills"
                  :key="skill"
                  class="px-2.5 py-1 rounded-lg bg-brand-soft/60 text-brand-dark text-[11px] font-medium"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <router-link
            :to="{ path: '/hire-talent', query: { role: roleItem.role, technologyNeed: roleItem.category } }"
            class="w-full py-3 px-4 rounded-2xl bg-brand-soft text-brand-dark hover:bg-brand-primary hover:text-white font-bold text-xs transition-all text-center block shadow-violet-sm"
          >
            Request Talent for This Role
          </router-link>
        </div>
      </div>

      <!-- Trust Footer Banner -->
      <div class="mt-12 p-6 rounded-3xl bg-brand-lightest flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center space-x-3 text-brand-dark text-xs sm:text-sm font-semibold">
          <span class="w-8 h-8 rounded-full bg-brand-soft flex items-center justify-center text-brand-primary font-bold">✓</span>
          <span>Every professional undergoes live technical evaluations, background verification, and U.S. timezone alignment.</span>
        </div>
        <router-link
          to="/hire-talent"
          class="shrink-0 px-5 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm"
        >
          Build a Custom Team
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface ShowcaseRole {
  role: string;
  category: string;
  description: string;
  experience: string;
  shortlistTime: string;
  skills: string[];
}

const showcaseRoles: ShowcaseRole[] = [
  {
    role: 'SOC Analyst',
    category: 'Cybersecurity',
    description: 'Vigilant security analysts monitoring enterprise SIEM environments, analyzing alert telemetry, and coordinating incident triage.',
    experience: '4–8+ Years',
    shortlistTime: '48–72 Hours',
    skills: ['SIEM', 'Splunk', 'CrowdStrike', 'Threat Hunting', 'Incident Response', 'SOC 2'],
  },
  {
    role: 'Cloud & DevOps Engineer',
    category: 'Cloud & IT',
    description: 'Cloud architects specializing in resilient AWS/Azure infrastructures, automated CI/CD pipelines, and Kubernetes container orchestration.',
    experience: '5–10+ Years',
    shortlistTime: '48–72 Hours',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions', 'Linux'],
  },
  {
    role: 'Full-Stack Developer',
    category: 'Software Engineering',
    description: 'Product-focused engineers building robust web applications with TypeScript, modern component frontend frameworks, and clean microservices.',
    experience: '4–9+ Years',
    shortlistTime: '48–72 Hours',
    skills: ['Vue 3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
  },
  {
    role: 'Security Engineer',
    category: 'Cybersecurity',
    description: 'Offensive and defensive security specialists securing cloud infrastructure, implementing zero-trust IAM, and conducting penetration testing.',
    experience: '5–11+ Years',
    shortlistTime: '48–72 Hours',
    skills: ['Cloud Security', 'IAM', 'Penetration Testing', 'NIST CSF', 'Vulnerability Mgmt'],
  },
  {
    role: 'Data Engineer',
    category: 'Data & Analytics',
    description: 'Pipeline architects building high-throughput modern data platforms with Snowflake, dbt transformations, and automated Airflow DAGs.',
    experience: '4–8+ Years',
    shortlistTime: '48–72 Hours',
    skills: ['Snowflake', 'dbt', 'Python', 'Apache Airflow', 'SQL', 'AWS Redshift'],
  },
  {
    role: 'Backend Systems Engineer',
    category: 'Software Engineering',
    description: 'High-throughput API specialists engineering distributed backend services in Go and Node.js with caching and sub-100ms response latencies.',
    experience: '6–12+ Years',
    shortlistTime: '48–72 Hours',
    skills: ['Go', 'Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'gRPC'],
  },
];
</script>
