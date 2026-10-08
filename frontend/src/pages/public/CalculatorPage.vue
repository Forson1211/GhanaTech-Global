<template>
  <div class="bg-white min-h-screen">
    <!-- Header Hero with GhanaTech purple gradient and organic curve -->
    <section class="relative bg-linear-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-24 sm:pt-40 sm:pb-32 text-white">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="hidden sm:block absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -bottom-12 -left-12 w-[240px] h-[240px] rounded-full border border-white/15 pointer-events-none" />
        <div class="hidden sm:block absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-white/15 pointer-events-none" />
      </div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div class="inline-flex items-center px-4 py-1 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold mb-4 border border-white/20">
          ENGINEERING TALENT ROI
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Technology Cost &amp; Savings Calculator
        </h1>
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Compare market rates between U.S. domestic engineering salaries and vetted Ghanaian technology professionals. Calculate immediate annual savings for your engineering organization.
        </p>
      </div>

      <!-- Organic Curved Wave Bottom Divider -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-brand-lightest/50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <!-- Interactive Calculator -->
    <ValueCalculatorSection />

    <!-- Why GhanaTech Model Works -->
    <section class="py-16 sm:py-24 bg-white border-b border-brand-border/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-soft px-3 py-1 rounded-full">
            THE GHANATECH ADVANTAGE
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight mt-3">
            How You Save 55% to 70% Without Compromising Quality
          </h2>
          <p class="mt-3 text-sm text-brand-muted">
            Our compensation benchmarks reflect high-tier local compensation packages that attract the top 2% of engineering talent in West Africa.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/80 shadow-violet-sm">
            <div class="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center font-bold text-lg mb-4">
              01
            </div>
            <h3 class="text-base font-bold text-brand-dark mb-2">Zero Domestic Overhead</h3>
            <p class="text-xs text-brand-muted leading-relaxed">
              No U.S. state payroll tax burdens, 401(k) matching friction, or local healthcare administration overhead.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/80 shadow-violet-sm">
            <div class="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center font-bold text-lg mb-4">
              02
            </div>
            <h3 class="text-base font-bold text-brand-dark mb-2">Synchronous Working Hours</h3>
            <p class="text-xs text-brand-muted leading-relaxed">
              Ghana operates on GMT / UTC+0. Enjoy 4 to 6 hours of synchronous daytime overlap with East Coast and European squads.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/80 shadow-violet-sm">
            <div class="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center font-bold text-lg mb-4">
              03
            </div>
            <h3 class="text-base font-bold text-brand-dark mb-2">Top 2% Vetted Engineers</h3>
            <p class="text-xs text-brand-muted leading-relaxed">
              Multi-phase technical code reviews, architecture discussions, and spoken English assessments before client matching.
            </p>
          </div>

          <div class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/80 shadow-violet-sm">
            <div class="w-10 h-10 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center font-bold text-lg mb-4">
              04
            </div>
            <h3 class="text-base font-bold text-brand-dark mb-2">90-Day Placement Guarantee</h3>
            <p class="text-xs text-brand-muted leading-relaxed">
              We stand by our placements. If a placed professional is not an ideal match within 90 days, we re-match at zero extra charge.
            </p>
          </div>
        </div>

        <div class="mt-14 text-center">
          <router-link
            to="/hire-talent"
            class="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-primary text-white font-bold text-xs uppercase tracking-wide hover:bg-brand-dark transition-all shadow-violet-md"
          >
            <span>Request Candidates With These Rates</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ValueCalculatorSection from '@/components/home/ValueCalculatorSection.vue';
</script>
