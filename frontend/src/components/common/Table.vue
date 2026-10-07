<template>
  <div class="w-full overflow-hidden bg-white border border-brand-border/70 rounded-xl shadow-violet-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-sm">
        <thead>
          <tr class="border-b border-brand-border/60 bg-brand-lightest/70">
            <slot name="header" />
          </tr>
        </thead>
        <tbody class="divide-y divide-brand-border/40">
          <slot v-if="!loading && !empty" />
          
          <!-- Loading skeleton rows -->
          <template v-else-if="loading">
            <tr v-for="n in 5" :key="n" class="animate-pulse">
              <td :colspan="colSpan" class="py-4 px-6">
                <div class="h-4 bg-brand-soft/60 rounded w-3/4"></div>
              </td>
            </tr>
          </template>

          <!-- Empty state row -->
          <tr v-else-if="empty">
            <td :colspan="colSpan" class="py-12 px-6 text-center text-brand-muted">
              <slot name="empty">
                <div class="flex flex-col items-center justify-center">
                  <div class="w-12 h-12 rounded-full bg-brand-soft/60 flex items-center justify-center text-brand-primary mb-3">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p class="text-sm font-medium text-brand-dark">{{ t('No records found') }}</p>
                  <p class="text-xs text-brand-muted mt-1">{{ t('Try adjusting your search or filters.') }}</p>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Optional Footer / Pagination slot -->
    <div v-if="$slots.footer" class="border-t border-brand-border/40 px-6 py-3 bg-brand-lightest/30 flex items-center justify-between">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiTranslation } from '@/composables/useUiTranslation';
const { t } = useUiTranslation();
interface Props {
  loading?: boolean;
  empty?: boolean;
  colSpan?: number;
}

withDefaults(defineProps<Props>(), {
  loading: false,
  empty: false,
  colSpan: 6,
});
</script>
