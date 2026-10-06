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
          About GhanaTech Global
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Bridging U.S. technology demand with world-class Ghanaian technical talent through rigorous vetting, global standards, and seamless operational delivery.
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
            For years, U.S. technology companies faced an exhausting dilemma: pay skyrocketing domestic recruiting premiums for talent or navigate low-fidelity offshore outsourcing characterized by communication barriers and high turnover.
          </p>
          <p>
            Meanwhile, Ghana emerged as West Africa’s most stable democratic republic, home to a burgeoning generation of mathematically rigorous, English-fluent engineers, cloud specialists, and cybersecurity practitioners.
          </p>
          <p>
            GhanaTech Global was created to unite these two worlds. We built an uncompromising technical assessment framework and legal infrastructure to make hiring a Ghanaian engineer as seamless and reliable as hiring next door in Austin or San Francisco.
          </p>
        </div>

        <div class="bg-gradient-to-br from-brand-dark to-brand-primary rounded-3xl p-8 text-white shadow-violet-lg space-y-6">
          <h3 class="text-xl font-bold">The GhanaTech Global Standard</h3>
          <div class="space-y-4 text-xs text-brand-soft">
            <div class="flex items-start space-x-3">
              <span class="text-brand-bright font-black text-base">01</span>
              <div>
                <strong class="text-white block">Merit-Based Technical Vetting</strong>
                Every candidate is evaluated on live terminal challenges and architectural case studies.
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-brand-bright font-black text-base">02</span>
              <div>
                <strong class="text-white block">Complete Transparency</strong>
                Transparent pricing, verified resumes, and direct communication with candidate shortlists.
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <span class="text-brand-bright font-black text-base">03</span>
              <div>
                <strong class="text-white block">Long-Term Career Development</strong>
                We invest in our engineers with ongoing certifications, mentorship, and high-quality equipment.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Key Pillars -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-brand-border/60">
        <div class="p-6 rounded-2xl bg-brand-lightest/40 border border-brand-border/80">
          <div class="text-2xl mb-2">🇬🇭</div>
          <h4 class="text-base font-bold text-brand-dark mb-1">Accra Innovation Hub</h4>
          <p class="text-xs text-brand-muted leading-relaxed">
            Headquartered in Accra with direct access to top universities and regional developer ecosystems.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-brand-lightest/40 border border-brand-border/80">
          <div class="text-2xl mb-2">🇺🇸</div>
          <h4 class="text-base font-bold text-brand-dark mb-1">U.S. Client Representation</h4>
          <p class="text-xs text-brand-muted leading-relaxed">
            Domestic U.S. contracts, Delaware entity backing, and legal IP assignment enforceable under U.S. law.
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-brand-lightest/40 border border-brand-border/80">
          <div class="text-2xl mb-2">⚡</div>
          <h4 class="text-base font-bold text-brand-dark mb-1">High-Velocity Matching</h4>
          <p class="text-xs text-brand-muted leading-relaxed">
            Average turnaround of 48 hours to deliver interview-ready, pre-evaluated candidate shortlists.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// About page component
</script>
