<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary active:scale-[0.98]',
      sizeClasses[size],
      variantClasses[variant],
      roundedClasses[rounded],
      fullWidth ? 'w-full' : '',
      disabled || loading ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
      customClass
    ]"
    @click="$emit('click', $event)"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>

    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  rounded: 'full',
  loading: false,
  disabled: false,
  fullWidth: false,
  customClass: '',
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3 text-base gap-2.5 font-semibold',
  xl: 'px-9 py-3.5 text-lg gap-3 font-semibold',
};

const variantClasses = {
  primary: 'bg-brand-primary text-white hover:bg-brand-dark shadow-violet-sm hover:shadow-violet-md',
  secondary: 'bg-brand-soft text-brand-dark hover:bg-brand-border',
  outline: 'border border-brand-primary text-brand-primary hover:bg-brand-lightest',
  ghost: 'text-brand-dark hover:bg-brand-lightest',
  white: 'bg-white text-brand-primary hover:bg-brand-lightest shadow-violet-sm',
};

const roundedClasses = {
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};
</script>
