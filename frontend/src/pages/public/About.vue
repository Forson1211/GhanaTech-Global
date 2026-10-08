<template>
  <div class="bg-white min-h-screen">
    <!-- Header Hero with GhanaTech purple gradient and organic curve -->
    <section class="relative bg-linear-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-20 sm:pt-40 sm:pb-28 text-white">
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
          About GhanaTech Global
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          We connect skilled Ghanaian tech professionals with U.S. and other global companies. Our team checks skills and experience and helps with hiring.
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

      <!-- Story Narrative -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
        <div class="space-y-4 text-sm text-brand-muted leading-relaxed">
          <h2 class="text-2xl font-bold text-brand-dark">Why We Built GhanaTech Global</h2>
          <p>
            Many companies need skilled tech professionals but find hiring expensive or time-consuming.
          </p>
          <p>
            Ghana has skilled developers, cloud engineers, security specialists, and other tech professionals looking for opportunities to work with global companies.
          </p>
          <p>
            GhanaTech Global brings these companies and professionals together. We review candidates, check their skills, and help both sides understand the steps to working together.
          </p>
        </div>

        <div class="bg-linear-to-br from-brand-dark to-brand-primary rounded-3xl p-8 text-white shadow-violet-lg space-y-6">
          <h3 class="text-xl font-bold">What You Can Expect</h3>
          <div class="space-y-4 text-xs text-brand-soft">
            <div class="flex items-start space-x-3">
              <span class="text-brand-bright font-black text-base">01</span>
              <div>
                <strong class="text-white block">Skills Come First</strong>
                We check practical skills with tasks related to the job.
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-brand-bright font-black text-base">02</span>
              <div>
                <strong class="text-white block">Clear Information</strong>
                Understand costs, review candidate profiles, and speak with suitable candidates.
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-brand-bright font-black text-base">03</span>
              <div>
                <strong class="text-white block">Career Support</strong>
                We help professionals understand opportunities and the skills employers need.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Pillars -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-brand-border/60">
        <div class="p-6 rounded-2xl bg-brand-lightest/40 border border-brand-border/80">
          <div class="text-2xl mb-2">🇬🇭</div>
          <h4 class="text-base font-bold text-brand-dark mb-1">Based in Accra</h4>
          <p class="text-xs text-brand-muted leading-relaxed">
            Connecting companies with skilled technology professionals in Ghana.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-brand-lightest/40 border border-brand-border/80">
          <div class="text-2xl mb-2">🇺🇸</div>
          <h4 class="text-base font-bold text-brand-dark mb-1">Support for U.S. Companies</h4>
          <p class="text-xs text-brand-muted leading-relaxed">
            Helping U.S. companies understand hiring steps and working with professionals in Ghana.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-brand-lightest/40 border border-brand-border/80">
          <div class="text-2xl mb-2">⚡</div>
          <h4 class="text-base font-bold text-brand-dark mb-1">Help Finding the Right People</h4>
          <p class="text-xs text-brand-muted leading-relaxed">
            Candidates are suggested based on the skills and experience your role needs.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page component
</script>
