<template>
  <section class="py-20 bg-brand-lightest/40 border-b border-brand-border/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
          PARTNERS IN SCALE
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
          Who We Serve
        </h2>
        <p class="mt-3 text-base text-brand-muted">
          Engineered for technical leaders and growing organizations seeking top-tier capability without domestic overhead.
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div
          v-for="target in audiences"
          :key="target.title"
          class="bg-white p-6 rounded-2xl border border-brand-border/80 shadow-violet-sm hover:shadow-violet-md hover:border-brand-primary/40 transition-all flex flex-col justify-between"
        >
          <div>
            <div class="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center font-bold text-sm mb-4">
              {{ target.tag }}
            </div>
            <h3 class="text-base font-bold text-brand-dark mb-1.5">{{ target.title }}</h3>
            <p class="text-xs text-brand-muted leading-relaxed">{{ target.description }}</p>
          </div>
          
          <div class="pt-4 mt-2 border-t border-brand-border/40 text-[11px] font-semibold text-brand-primary">
            {{ target.benefit }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const audiences = [
  { title: 'Startups', tag: '01', description: 'Extend cash runway while shipping MVP and core product features rapidly.', benefit: 'Faster Time-to-Market' },
  { title: 'Scale-ups', tag: '02', description: 'Expand specialized engineering and QA squads without recruiting bottlenecks.', benefit: 'High Scalability' },
  { title: 'Technology Companies', tag: '03', description: 'Augment existing core platform teams with dedicated remote full-stack specialists.', benefit: 'Velocity & Capacity' },
  { title: 'Enterprises', tag: '04', description: 'Stand up compliant 24/7 follow-the-sun security and cloud infrastructure pods.', benefit: 'Enterprise Reliability' },
  { title: 'CTOs', tag: '05', description: 'Gain trusted technical peers who write maintainable code and integrate cleanly into CI/CD.', benefit: 'Architectural Rigor' },
  { title: 'CIOs', tag: '06', description: 'Optimize IT operational expenditure without sacrificing uptime, SLAs, or security standards.', benefit: 'Budget Optimization' },
  { title: 'CISOs', tag: '07', description: 'Deploy dedicated 24/7 SOC analysts, GRC auditors, and IAM configuration experts.', benefit: 'Continuous Threat Defense' },
  { title: 'Hiring Managers', tag: '08', description: 'Skip endless resume sifting and interview only pre-assessed, high-match candidates.', benefit: '48hr Fast-Track Matching' },
];
</script>
