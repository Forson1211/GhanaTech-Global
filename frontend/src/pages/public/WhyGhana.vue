<template>
  <div class="bg-white min-h-screen">
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
          Why Ghana?
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Discover skilled tech professionals, clear English communication, and ways to work with teams in Ghana.
        </p>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      <!-- 4 Pillars Section Details -->
      <div class="space-y-12 mb-20">
        <!-- Pillar 1 -->
        <div class="p-8 rounded-3xl bg-brand-lightest/40 border border-brand-border/80 flex flex-col md:flex-row items-start gap-6">
          <div class="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-violet-sm">
            01
          </div>
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-dark">Technical Talent</h2>
            <p class="text-sm text-brand-muted leading-relaxed">
              Ghana has universities, training communities, and experienced professionals working in technology.
            </p>
            <p class="text-xs text-brand-muted leading-relaxed">
              You can find people with experience in websites, software, cloud systems, cybersecurity, and data.
            </p>
          </div>
        </div>

        <!-- Pillar 2 -->
        <div class="p-8 rounded-3xl bg-brand-lightest/40 border border-brand-border/80 flex flex-col md:flex-row items-start gap-6">
          <div class="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-violet-sm">
            02
          </div>
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-dark">English-Speaking Professionals</h2>
            <p class="text-sm text-brand-muted leading-relaxed">
              English is widely used in education and business in Ghana.
            </p>
            <p class="text-xs text-brand-muted leading-relaxed">
              Our candidate review includes communication checks so teams can discuss work, write updates, and join meetings clearly.
            </p>
          </div>
        </div>

        <!-- Pillar 3 -->
        <div class="p-8 rounded-3xl bg-brand-lightest/40 border border-brand-border/80 flex flex-col md:flex-row items-start gap-6">
          <div class="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-violet-sm">
            03
          </div>
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-dark">Working Across Time Zones</h2>
            <p class="text-sm text-brand-muted leading-relaxed">
              Ghana uses GMT throughout the year. Your team can agree on working hours and meeting times before work starts.
            </p>
            <p class="text-xs text-brand-muted leading-relaxed">
              Teams in Ghana and the U.S. can plan shared meeting times and clear handovers between working hours.
            </p>
          </div>
        </div>

        <!-- Pillar 4 -->
        <div class="p-8 rounded-3xl bg-brand-lightest/40 border border-brand-border/80 flex flex-col md:flex-row items-start gap-6">
          <div class="w-14 h-14 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-violet-sm">
            04
          </div>
          <div class="space-y-3">
            <h2 class="text-2xl font-bold text-brand-dark">Reliable Teamwork</h2>
            <p class="text-sm text-brand-muted leading-relaxed">
              Agree on responsibilities, communication, security needs, and expected results before the work begins.
            </p>
            <p class="text-xs text-brand-muted leading-relaxed">
              GhanaTech Global helps you discuss these arrangements and understand the next steps.
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom CTA Card -->
      <div class="bg-brand-darkest text-white rounded-3xl p-8 sm:p-12 text-center shadow-violet-lg">
        <h3 class="text-2xl font-extrabold mb-3">Ready to Meet Candidates from Ghana?</h3>
        <p class="text-xs sm:text-sm text-brand-soft max-w-xl mx-auto mb-8">
          Browse candidate profiles or talk to our team about the people you need.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <router-link to="/talent" class="px-8 py-3 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-bright transition-colors shadow-violet-sm">
            Browse Candidate Profiles
          </router-link>
          <router-link to="/hire-talent" class="px-8 py-3 rounded-full bg-white text-brand-dark text-xs font-bold hover:bg-brand-lightest transition-colors">
            Send a Hiring Request
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// WhyGhana page component
</script>
