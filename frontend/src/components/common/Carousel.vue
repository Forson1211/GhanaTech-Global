<template>
  <div class="relative w-full overflow-hidden">
    <!-- Carousel Track -->
    <div
      ref="trackRef"
      class="flex transition-transform duration-500 ease-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="w-full flex-shrink-0 px-2 sm:px-4"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>

    <!-- Controls (Previous / Next) -->
    <div v-if="items.length > 1" class="flex items-center justify-between mt-6">
      <!-- Dots -->
      <div class="flex items-center space-x-2">
        <button
          v-for="(_, idx) in items"
          :key="idx"
          type="button"
          :class="[
            'h-2 rounded-full transition-all duration-300',
            currentIndex === idx ? 'w-8 bg-brand-primary' : 'w-2 bg-brand-border hover:bg-brand-bright'
          ]"
          @click="goTo(idx)"
        />
      </div>

      <!-- Arrow Buttons -->
      <div class="flex items-center space-x-2">
        <button
          type="button"
          aria-label="Previous slide"
          class="w-10 h-10 rounded-full border border-brand-border bg-white text-brand-dark hover:bg-brand-soft hover:border-brand-primary/40 flex items-center justify-center transition-all shadow-violet-sm disabled:opacity-40"
          :disabled="currentIndex === 0 && !loop"
          @click="prev"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          class="w-10 h-10 rounded-full border border-brand-border bg-white text-brand-dark hover:bg-brand-soft hover:border-brand-primary/40 flex items-center justify-center transition-all shadow-violet-sm disabled:opacity-40"
          :disabled="currentIndex === items.length - 1 && !loop"
          @click="next"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  items: any[];
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autoPlay: false,
  interval: 5000,
  loop: true,
});

const currentIndex = ref(0);
let timer: any = null;

const next = () => {
  if (currentIndex.value < props.items.length - 1) {
    currentIndex.value++;
  } else if (props.loop) {
    currentIndex.value = 0;
  }
};

const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else if (props.loop) {
    currentIndex.value = props.items.length - 1;
  }
};

const goTo = (index: number) => {
  currentIndex.value = index;
};

onMounted(() => {
  if (props.autoPlay && props.items.length > 1) {
    timer = setInterval(next, props.interval);
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
