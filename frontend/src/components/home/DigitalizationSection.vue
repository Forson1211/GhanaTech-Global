<template>
  <section class="py-16 sm:py-24 bg-white overflow-hidden border-b border-brand-border/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Left Content Column -->
        <div class="lg:col-span-6 space-y-6">
          <div class="inline-block">
            <span class="text-xs font-bold uppercase tracking-wider text-indigo-600">
              FAST &amp; EFFECTIVE
            </span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            Powerful Digitalization <br class="hidden sm:inline" />
            With Techwind
          </h2>

          <p class="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl">
            Get instant helpful resources about anything on the go, easily implement secure money transfer solutions, boost your daily efficiency, connect to other app users and create your own Techwind network, and much more with just a few taps. commodo consequat. Duis aute irure.
          </p>

          <div class="pt-2 flex flex-wrap items-center gap-4">
            <router-link
              to="/hire-talent"
              class="bg-[#4F46E5] hover:bg-[#4338CA] active:scale-[0.99] text-white font-medium text-sm px-6 py-3 rounded-lg shadow-xs hover:shadow-sm transition-all duration-200 inline-flex items-center gap-2.5"
            >
              <!-- Calendar / Checklist Icon matching the screenshot -->
              <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Get Started</span>
            </router-link>

            <router-link
              to="/jobs"
              class="text-sm font-semibold text-slate-600 hover:text-indigo-600 px-4 py-3 transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore Roles</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Right Visual Column: Signature Techwind Curved Blob with Inset Circle -->
        <div class="lg:col-span-6 relative flex justify-center items-center">
          <div class="relative w-full max-w-[500px]">
            <!-- Main SVG Masked Curved Blob Image -->
            <svg viewBox="0 0 540 500" class="w-full h-auto drop-shadow-xl overflow-visible select-none pointer-events-none">
              <defs>
                <clipPath id="techwindBlobShape">
                  <path d="M 220 20 C 380 -10, 500 50, 525 190 C 540 280, 520 340, 470 370 C 430 395, 390 350, 330 355 C 280 360, 260 430, 200 455 C 130 480, 60 480, 30 430 C -10 370, 0 260, 25 180 C 55 90, 110 40, 220 20 Z" />
                </clipPath>
              </defs>

              <!-- Subtle background lavender glow offset -->
              <path
                d="M 220 20 C 380 -10, 500 50, 525 190 C 540 280, 520 340, 470 370 C 430 395, 390 350, 330 355 C 280 360, 260 430, 200 455 C 130 480, 60 480, 30 430 C -10 370, 0 260, 25 180 C 55 90, 110 40, 220 20 Z"
                fill="#EDE9FE"
                transform="translate(8, 8)"
                opacity="0.6"
              />

              <!-- Clipped Tech Team Office Photo -->
              <image
                href="/images/tech-team-office.jpg"
                x="0"
                y="0"
                width="540"
                height="500"
                preserveAspectRatio="xMidYMid slice"
                clip-path="url(#techwindBlobShape)"
              />
            </svg>

            <!-- Circular Inset Image of Hands Typing on Laptop -->
            <div class="absolute -bottom-4 right-4 sm:-bottom-6 sm:right-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 sm:border-[6px] border-white shadow-2xl overflow-hidden z-20">
              <img
                src="/images/typing-hands.jpg"
                alt="Typing Hands"
                class="w-full h-full object-cover select-none pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Techwind style 2-column feature section with organic fluid droplet image and circular inset
</script>
