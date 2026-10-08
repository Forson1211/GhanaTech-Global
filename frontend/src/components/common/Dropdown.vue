<template>
  <div class="relative inline-block text-left" ref="dropdownRef">
    <div @click="toggle">
      <slot name="trigger" :isOpen="isOpen">
        <button
          type="button"
          class="inline-flex justify-center w-full rounded-lg border border-brand-border px-3 py-2 bg-white text-xs font-medium text-brand-dark hover:bg-brand-lightest focus:outline-hidden"
        >
          Options
        </button>
      </slot>
    </div>

    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="[
          'origin-top-right absolute z-50 mt-1.5 w-48 rounded-xl shadow-violet-md bg-white border border-brand-border/80 focus:outline-hidden py-1.5',
          align === 'right' ? 'right-0' : 'left-0'
        ]"
      >
        <slot :close="close" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  align?: 'left' | 'right';
}

withDefaults(defineProps<Props>(), {
  align: 'right',
});

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
