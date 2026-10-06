<template>
  <section class="py-20 bg-brand-lightest/50 border-y border-brand-border/60 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
          RIGOROUS VETTING STANDARD
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
          We assess technical ability, not just resumes.
        </h2>
        <p class="mt-3 text-base text-brand-muted">
          Only the top 3% of applicants advance through our multi-stage evaluation pipeline to join the active GhanaTech Global roster.
        </p>
      </div>

      <!-- Modern Animated Timeline Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <div
          v-for="(step, idx) in steps"
          :key="step.number"
          class="relative bg-white rounded-3xl p-7 border border-brand-border/80 shadow-violet-sm hover:shadow-violet-md hover:border-brand-primary/40 transition-all duration-300 group flex flex-col justify-between"
        >
          <!-- Top step badge -->
          <div>
            <div class="flex items-center justify-between mb-5">
              <span class="text-2xl font-black text-brand-primary font-mono group-hover:scale-110 transition-transform">
                {{ step.number }}
              </span>
              <span class="text-[10px] font-bold uppercase tracking-wider text-brand-muted bg-brand-lightest px-2.5 py-1 rounded-md">
                Phase {{ idx + 1 }}
              </span>
            </div>

            <h3 class="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
              {{ step.title }}
            </h3>

            <p class="text-xs text-brand-muted leading-relaxed mb-4">
              {{ step.description }}
            </p>
          </div>

          <div class="pt-4 border-t border-brand-border/40 text-[11px] font-semibold text-brand-dark flex items-center space-x-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span>{{ step.detail }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    number: '01',
    title: 'Profile Screening',
    description: 'Comprehensive review of verified background, work history, enterprise contributions, credentials, and identity verification.',
    detail: 'Top 25% pass to Technical Exam',
  },
  {
    number: '02',
    title: 'Technical Assessment',
    description: 'Domain-specific timed coding exams, architecture reviews, and hands-on lab challenges (SOC incident triage, cloud deployment, live debugging).',
    detail: 'Hands-on practical code evaluation',
  },
  {
    number: '03',
    title: 'Professional Evaluation',
    description: 'In-depth video interview evaluating English communication fluency, problem-solving under pressure, timezone flexibility, and cultural alignment.',
    detail: 'Conducted by senior engineering leads',
  },
  {
    number: '04',
    title: 'Client Interview',
    description: 'Curated shortlist of only the top 1-2 candidates delivered directly to your hiring team for final interviews and immediate kickoff.',
    detail: 'Average 48 hours to match',
  },
];
</script>
