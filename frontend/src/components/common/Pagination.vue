<template>
  <div class="flex items-center justify-between w-full text-sm">
    <div class="text-xs text-brand-muted">
      Showing <span class="font-medium text-brand-dark">{{ startItem }}</span> to
      <span class="font-medium text-brand-dark">{{ endItem }}</span> of
      <span class="font-medium text-brand-dark">{{ total }}</span> results
    </div>

    <div class="flex items-center space-x-1.5">
      <button
        type="button"
        :disabled="currentPage <= 1"
        class="px-2.5 py-1.5 rounded-lg border border-brand-border/80 text-xs font-medium text-brand-dark hover:bg-brand-soft/50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        @click="$emit('change', currentPage - 1)"
      >
        Previous
      </button>

      <template v-for="p in visiblePages" :key="p">
        <button
          v-if="typeof p === 'number'"
          type="button"
          :class="[
            'w-8 h-8 rounded-lg text-xs font-medium transition-colors flex items-center justify-center',
            p === currentPage
              ? 'bg-brand-primary text-white shadow-violet-sm'
              : 'text-brand-dark hover:bg-brand-soft/50 border border-brand-border/60'
          ]"
          @click="$emit('change', p)"
        >
          {{ p }}
        </button>
        <span v-else class="px-1 text-xs text-brand-muted">...</span>
      </template>

      <button
        type="button"
        :disabled="currentPage >= totalPages"
        class="px-2.5 py-1.5 rounded-lg border border-brand-border/80 text-xs font-medium text-brand-dark hover:bg-brand-soft/50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
        @click="$emit('change', currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  currentPage: number;
  totalPages: number;
  total: number;
  limit?: number;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 1,
  total: 0,
  limit: 10,
});

defineEmits<{
  (e: 'change', page: number): void;
}>();

const startItem = computed(() => {
  if (props.total === 0) return 0;
  return (props.currentPage - 1) * props.limit + 1;
});

const endItem = computed(() => {
  return Math.min(props.currentPage * props.limit, props.total);
});

const visiblePages = computed(() => {
  const current = props.currentPage;
  const total = props.totalPages;
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [1];
  if (current > 3) pages.push('...');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push('...');
  pages.push(total);
  return pages;
});
</script>
