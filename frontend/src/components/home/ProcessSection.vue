<template>
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
          HOW IT WORKS
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
          From Requirement to Deployment in 5 Steps
        </h2>
        <p class="mt-3 text-base text-brand-muted">
          Our streamlined hiring lifecycle removes friction, guesswork, and administrative drag.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        <div
          v-for="(step, i) in steps"
          :key="step.number"
          class="relative bg-white rounded-2xl p-5 border border-brand-border/80 shadow-violet-sm hover:border-brand-primary/50 transition-all flex flex-col justify-between"
        >
          <div>
            <div class="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary font-black font-mono text-base flex items-center justify-center mb-4">
              {{ step.number }}
            </div>
            <h3 class="text-sm font-bold text-brand-dark mb-2">
              {{ step.title }}
            </h3>
            <p class="text-xs text-brand-muted leading-relaxed">
              {{ step.description }}
            </p>
          </div>
          
          <div class="pt-4 text-[10px] font-bold text-brand-primary uppercase tracking-wider">
            Step {{ i + 1 }}
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
    title: 'Tell Us What You Need',
    description: 'Share your specific skill stack, seniority, headcount requirements, and engagement model.',
  },
  {
    number: '02',
    title: "We Find & Check Candidates",
    description: 'We query our active Ghanaian database and run technical evaluations tailored to your stack.',
  },
  {
    number: '03',
    title: "Review Suggested Candidates",
    description: 'Review complete vetted candidate profiles, assessment summaries, and verified repositories.',
  },
  {
    number: '04',
    title: 'Interview & Hire',
    description: 'Conduct final team video interviews. Select your preferred talent with zero upfront commitment.',
  },
  {
    number: '05',
    title: 'Ongoing Support',
    description: 'We manage compliance, equipment delivery, performance check-ins, and replacement guarantees.',
  },
];
</script>
