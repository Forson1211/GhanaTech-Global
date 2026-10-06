<template>
  <section class="py-16 sm:py-20 bg-gradient-to-br from-brand-dark via-brand-primary to-brand-bright text-white relative overflow-hidden">

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-10">
      <div class="flex-1 min-w-0 max-w-2xl text-left">
        <h2 class="text-3xl sm:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight mb-5">
          Build your next technology team with Ghana.
        </h2>

        <p class="text-lg text-white/90 max-w-xl leading-relaxed">
          Connect with skilled Ghanaian professionals and find the right people for your team.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center lg:justify-end gap-3 w-full lg:w-auto lg:shrink-0">
        <router-link
          to="/talent"
          class="w-full sm:w-auto px-7 xl:px-8 py-4 rounded-lg bg-white text-brand-primary font-bold text-base hover:bg-brand-lightest transition-colors text-center whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Find Talent
        </router-link>

        <router-link
          to="/hire-talent"
          class="w-full sm:w-auto px-7 xl:px-8 py-4 rounded-lg bg-transparent text-white border border-white/80 hover:bg-white/10 font-bold text-base transition-colors text-center whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          Talk to our team
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// FinalCtaSection component
</script>
