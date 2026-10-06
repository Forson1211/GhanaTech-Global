<template>
  <div class="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl border border-dashed border-brand-border/80 bg-brand-lightest/40">
    <div class="w-14 h-14 rounded-2xl bg-brand-soft flex items-center justify-center text-brand-primary mb-4 shadow-violet-sm">
      <slot name="icon">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </slot>
    </div>
    
    <h3 class="text-base font-bold text-brand-dark mb-1">{{ title }}</h3>
    <p v-if="description" class="text-xs text-brand-muted max-w-sm mb-5">{{ description }}</p>

    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'No items found',
  description: 'There is currently no data to display.',
});
</script>
