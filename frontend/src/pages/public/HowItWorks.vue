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
          How It Works
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Tell us who you need. We check candidates, help you arrange interviews, and support the next steps after hiring.
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

      <!-- Part 1: The 5-Step Client Process -->
      <div class="mb-20">
        <h2 class="text-2xl font-bold text-brand-dark mb-8 text-center sm:text-left">
          Five Steps to Hiring
        </h2>
        <div class="space-y-4">
          <div
            v-for="(step, idx) in steps"
            :key="step.number"
            class="p-6 rounded-3xl bg-brand-lightest/40 border border-brand-border/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 rounded-2xl bg-brand-primary text-white font-mono font-black text-lg flex items-center justify-center flex-shrink-0 shadow-violet-sm">
                {{ step.number }}
              </div>
              <div>
                <h3 class="text-base font-bold text-brand-dark">{{ step.title }}</h3>
                <p class="text-xs text-brand-muted mt-1 leading-relaxed max-w-xl">{{ step.description }}</p>
              </div>
            </div>
            <span class="text-xs font-semibold text-brand-primary bg-brand-soft px-3 py-1 rounded-full whitespace-nowrap">
              {{ step.timeline }}
            </span>
          </div>
        </div>
      </div>

      <!-- Part 2: Technical Assessment Standard -->
      <div class="bg-brand-darkest text-white rounded-3xl p-8 sm:p-12 shadow-violet-lg mb-16">
        <span class="text-xs font-bold text-brand-bright uppercase tracking-wider block mb-2">How We Check Candidates</span>
        <h2 class="text-2xl sm:text-3xl font-extrabold mb-4">We Review Experience and Check Skills</h2>
        <p class="text-xs sm:text-sm text-brand-soft leading-relaxed max-w-2xl mb-8">
          Our team reviews each candidate before recommending them for an interview.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span class="font-mono text-xl font-black text-brand-bright block mb-1">01</span>
            <strong class="text-white text-sm block mb-1">CV &amp; Background Review</strong>
            <p class="text-[11px] text-brand-soft/70">We review education, previous work, and identity details.</p>
          </div>
          <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span class="font-mono text-xl font-black text-brand-bright block mb-1">02</span>
            <strong class="text-white text-sm block mb-1">Practical Skill Test</strong>
            <p class="text-[11px] text-brand-soft/70">Candidates complete tasks related to the work they will do.</p>
          </div>
          <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span class="font-mono text-xl font-black text-brand-bright block mb-1">03</span>
            <strong class="text-white text-sm block mb-1">Interview &amp; Communication Check</strong>
            <p class="text-[11px] text-brand-soft/70">We discuss their experience and check communication and problem-solving skills.</p>
          </div>
          <div class="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span class="font-mono text-xl font-black text-brand-bright block mb-1">04</span>
            <strong class="text-white text-sm block mb-1">Meet Suitable Candidates</strong>
            <p class="text-[11px] text-brand-soft/70">Review suggested candidates and choose who you would like to interview.</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center">
        <router-link
          to="/hire-talent"
          class="px-8 py-3.5 rounded-full bg-brand-primary text-white text-sm font-bold hover:bg-brand-dark transition-colors shadow-violet-md inline-block"
        >
          Send a Hiring Request
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    number: '01',
    title: 'Tell Us What You Need',
    description: "Tell us the job title, skills needed, number of people, and how you would like to hire.",
    timeline: 'Day 1',
  },
  {
    number: '02',
    title: "We Find & Check Candidates",
    description: "We look for suitable people and check their experience and skills.",
    timeline: 'Days 1 - 2',
  },
  {
    number: '03',
    title: "Review Suggested Candidates",
    description: "Review candidate profiles, work samples, and the results of their skill checks.",
    timeline: 'Within 48 Hours',
  },
  {
    number: '04',
    title: 'Interview & Hire',
    description: "Interview the candidates you like, choose who to hire, and agree on pay and working arrangements.",
    timeline: 'Days 3 - 5',
  },
  {
    number: '05',
    title: 'Ongoing Support',
    description: "We agree on the support you need and check in after the person starts work.",
    timeline: 'Continuous',
  },
];
</script>
