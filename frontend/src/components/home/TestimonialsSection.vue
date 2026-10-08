<template>
  <section v-if="testimonials.length" class="py-20 bg-white border-b border-brand-border/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
          Working together, across borders.
        </h2>
      </div>

      <!-- Carousel -->
      <div class="max-w-4xl mx-auto">
        <Carousel :items="testimonials" :auto-play="false">
          <template #default="{ item }">
            <div class="bg-brand-lightest/50 rounded-xl p-6 sm:p-12 text-center relative flex flex-col items-center">
              <!-- Quote text -->
              <blockquote class="text-xl sm:text-2xl font-medium text-brand-dark max-w-2xl leading-relaxed mb-8">
                "{{ item.quote }}"
              </blockquote>

              <!-- Author details -->
              <div class="flex items-center space-x-3.5">
                <Avatar :name="item.name" size="md" />
                <div class="text-left">
                  <p class="text-base font-bold text-brand-dark">{{ item.name }}</p>
                  <p class="text-sm text-brand-muted leading-relaxed">{{ item.role }} â€¢ {{ item.company }}</p>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { testimonialService } from '@/services/testimonials';
import type { TestimonialItem } from '@/types/common';
import Carousel from '@/components/common/Carousel.vue';
import Avatar from '@/components/common/Avatar.vue';

const testimonials = ref<TestimonialItem[]>([]);

onMounted(async () => {
  try {
    const res = await testimonialService.getTestimonials();
    if (res.success && res.data) {
      testimonials.value = res.data;
    }
  } catch {
    // Reviews remain hidden when approved records cannot be loaded.
  }
});
</script>
