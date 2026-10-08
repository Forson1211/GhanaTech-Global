<template>
  <section class="py-16 sm:py-24 bg-brand-lightest/30 border-b border-brand-border/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div class="max-w-2xl">
          <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-primary text-xs font-extrabold mb-3">
            SPECIALIZED RECRUITMENT &amp; PLACEMENT
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight">
            High-Demand Roles We Recruit &amp; Place
          </h2>
          <p class="mt-3 text-sm sm:text-base text-slate-500 leading-relaxed">
            Pre-assessed, English-fluent Ghanaian technology professionals ready to integrate into your U.S. engineering squads.
          </p>
        </div>

        <router-link
          to="/jobs"
          class="mt-6 md:mt-0 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-primary hover:text-brand-dark transition-colors group shrink-0"
        >
          <span>Explore Recruitment Capabilities</span>
          <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>

      <!-- 3-Column Jobs Grid (Stroke-free, clean elevation) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="job in featuredJobs"
          :key="job.id"
          class="bg-white rounded-3xl p-7 sm:p-8 shadow-violet-sm hover:shadow-violet-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <!-- Top Badges Row -->
            <div class="flex items-center justify-between gap-2 mb-5">
              <span class="px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold">
                {{ job.category }}
              </span>
              <span class="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary">
                <span class="w-2 h-2 rounded-full bg-brand-primary" />
                {{ job.status }}
              </span>
            </div>

            <!-- Role Title (links to /jobs/:id) -->
            <h3 class="text-2xl font-black text-brand-dark mb-3 hover:text-brand-primary transition-colors">
              <router-link :to="'/jobs/' + job.id">
                {{ job.title }}
              </router-link>
            </h3>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
              {{ job.description }}
            </p>

            <!-- Stats Box (Experience & Shortlist Time) -->
            <div class="bg-brand-lightest/70 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-3">
              <div>
                <span class="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">EXPERIENCE</span>
                <span class="block text-xs sm:text-sm font-black text-slate-800 mt-0.5">{{ job.experience }}</span>
              </div>
              <div>
                <span class="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">SHORTLIST TIME</span>
                <span class="block text-xs sm:text-sm font-black text-slate-800 mt-0.5">{{ job.shortlistTime }}</span>
              </div>
            </div>

            <!-- Tech Stack Pills -->
            <div class="mb-6">
              <span class="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2.5">CORE TECH STACK</span>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in job.techStack"
                  :key="tech"
                  class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons: Apply + View More to Visit Job Page -->
          <div class="pt-2 space-y-2">
            <router-link
              :to="{ path: '/hire-talent', query: { role: job.title, technologyNeed: job.category } }"
              class="w-full py-3 px-4 rounded-xl bg-brand-soft hover:bg-brand-primary text-brand-primary hover:text-white font-extrabold text-xs sm:text-sm transition-all duration-200 text-center flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Request Talent for This Role</span>
            </router-link>

            <router-link
              :to="'/jobs/' + job.id"
              class="w-full py-2 text-center text-xs font-extrabold text-brand-primary hover:text-brand-dark flex items-center justify-center gap-1 group transition-colors"
            >
              <span>VIEW MORE &amp; READ DETAILS</span>
              <svg class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Quick Link to Full Jobs Page -->
      <div class="mt-12 text-center">
        <router-link
          to="/jobs"
          class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-primary hover:bg-brand-dark text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-200"
        >
          <span>VIEW ALL OPEN REMOTE JOBS</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const featuredJobs = [
  {
    id: '10965',
    title: 'SOC Analyst',
    category: 'Cybersecurity',
    status: 'Vetted & Ready',
    experience: '4–8+ Years',
    shortlistTime: '48–72 Hours',
    description: 'Vigilant security analysts monitoring enterprise SIEM environments, analyzing alert telemetry, and coordinating incident triage.',
    techStack: ['SIEM', 'Splunk', 'CrowdStrike', 'Threat Hunting', 'Incident Response', 'SOC 2'],
  },
  {
    id: '08752',
    title: 'Cloud & DevOps Engineer',
    category: 'Cloud & IT',
    status: 'Vetted & Ready',
    experience: '5–10+ Years',
    shortlistTime: '48–72 Hours',
    description: 'Cloud architects specializing in resilient AWS/Azure infrastructures, automated CI/CD pipelines, and Kubernetes container orchestration.',
    techStack: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'GitHub Actions', 'Linux'],
  },
  {
    id: '14527',
    title: 'Full-Stack Developer',
    category: 'Software Engineering',
    status: 'Vetted & Ready',
    experience: '4–9+ Years',
    shortlistTime: '48–72 Hours',
    description: 'Product-focused engineers building robust web applications with TypeScript, modern component frontend frameworks, and clean microservices.',
    techStack: ['Vue 3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
  },
];
</script>
