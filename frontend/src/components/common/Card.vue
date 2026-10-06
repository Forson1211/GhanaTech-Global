<template>
  <div
    :class="[
      'bg-white rounded-2xl border transition-all duration-300',
      hover ? 'hover:-translate-y-1 hover:shadow-violet-md hover:border-brand-primary/40 cursor-pointer' : '',
      shadow ? 'shadow-violet-sm' : '',
      border ? 'border-brand-border/60' : 'border-transparent',
      paddingClasses[padding],
      customClass
    ]"
    @click="$emit('click', $event)"
  >
    <div v-if="$slots.header" class="border-b border-brand-border/40 pb-4 mb-4">
      <slot name="header" />
    </div>

    <slot />

    <div v-if="$slots.footer" class="border-t border-brand-border/40 pt-4 mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hover?: boolean;
  shadow?: boolean;
  border?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  customClass?: string;
}

withDefaults(defineProps<Props>(), {
  hover: false,
  shadow: true,
  border: true,
  padding: 'md',
  customClass: '',
});

defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};
</script>
