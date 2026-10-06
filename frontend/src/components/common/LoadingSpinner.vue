<template>
  <div :class="['flex flex-col items-center justify-center p-6', center ? 'min-h-[240px]' : '']">
    <div
      :class="[
        'animate-spin rounded-full border-solid border-brand-primary border-t-transparent',
        sizeClasses[size]
      ]"
    />
    <p v-if="text" class="mt-3 text-xs font-medium text-brand-dark animate-pulse">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  center?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  text: '',
  center: false,
});

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-3',
  xl: 'w-16 h-16 border-4',
};
</script>
