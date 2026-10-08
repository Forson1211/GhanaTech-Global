<template>
  <div
    :class="[
      'relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold select-none border border-brand-border/60',
      sizeClasses[size],
      customClass
    ]"
  >
    <img
      v-if="src && !hasError"
      :src="src"
      :alt="alt || name"
      class="w-full h-full object-cover"
      @error="hasError = true"
    />
    <div
      v-else
      class="w-full h-full bg-linear-to-br from-brand-soft to-brand-border text-brand-dark flex items-center justify-center"
    >
      {{ initials }}
    </div>

    <!-- Status indicator dot if provided -->
    <span
      v-if="status"
      :class="[
        'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
        statusDotSizeClasses[size],
        status === 'Available' ? 'bg-brand-primary' : 'bg-brand-muted'
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  src?: string;
  name?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: string;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Candidate',
  size: 'md',
  customClass: '',
});

const hasError = ref(false);

watch(() => props.src, () => {
  hasError.value = false;
});

const initials = computed(() => {
  const parts = props.name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return (props.name[0] || 'C').toUpperCase();
});

const sizeClasses = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
  '2xl': 'w-28 h-28 text-2xl',
};

const statusDotSizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5',
};
</script>
