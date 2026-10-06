<template>
  <span
    :class="[
      'inline-flex items-center font-medium rounded-full transition-colors',
      sizeClasses[size],
      variantClasses[variant],
      customClass
    ]"
  >
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-80" />
    <slot name="icon" />
    <slot />
  </span>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'soft' | 'outline' | 'dark' | 'bright';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'soft',
  size: 'md',
  dot: false,
  customClass: '',
});

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs tracking-wide',
  lg: 'px-3.5 py-1.5 text-sm font-semibold',
};

const variantClasses = {
  primary: 'bg-brand-primary text-white shadow-violet-sm',
  soft: 'bg-brand-soft text-brand-dark border border-brand-border/60',
  outline: 'border border-brand-primary/40 text-brand-primary bg-white',
  dark: 'bg-brand-dark text-white',
  bright: 'bg-brand-bright text-white',
};
</script>
