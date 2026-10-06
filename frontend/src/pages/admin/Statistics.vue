<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight">Homepage Statistics</h1>
        <p class="text-xs text-brand-muted mt-0.5">Edit trust metrics shown on the public landing page (Section 11 & 39).</p>
      </div>
    </div>

    <!-- Stats Table / Edit Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="stat in statistics"
        :key="stat.key"
        class="bg-white p-6 rounded-2xl border border-brand-border/80 shadow-violet-sm space-y-4"
      >
        <div class="flex items-center justify-between border-b border-brand-border/40 pb-3">
          <span class="font-mono text-xs font-bold text-brand-primary uppercase">Key: {{ stat.key }}</span>
          <StatusBadge :status="stat.isPublished ? 'published' : 'draft'" />
        </div>

        <div class="space-y-3">
          <Input v-model="stat.value" label="Displayed Value (e.g. 100+)" />
          <Input v-model="stat.label" label="Label Description (e.g. Technology Professionals)" />
          <Input v-model="stat.description" label="Subtext / Details" />
        </div>

        <div class="pt-2 flex justify-end">
          <Button variant="primary" size="sm" :loading="savingKey === stat.key" @click="saveStat(stat)">
            Update Statistic
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { statisticsService } from '@/services/statistics';
import type { StatisticItem } from '@/types/common';
import { useToast } from '@/composables/useToast';
import Input from '@/components/common/Input.vue';
import Button from '@/components/common/Button.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';

const toast = useToast();

const savingKey = ref<string | null>(null);

const fallbackStats: StatisticItem[] = [
  { key: 'professionals', value: '100+', label: 'Technology Professionals', description: 'Vetted & battle-tested engineers', order: 1, isPublished: true },
  { key: 'roles', value: '25+', label: 'Technology Roles', description: 'Across cybersecurity, cloud & code', order: 2, isPublished: true },
  { key: 'disciplines', value: '4', label: 'Technology Disciplines', description: 'Specialized focus practices', order: 3, isPublished: true },
  { key: 'network', value: 'U.S. ↔ Ghana', label: 'Global Technology Network', description: 'Seamless offshore-onshore bridge', order: 4, isPublished: true },
];

const statistics = ref<StatisticItem[]>(fallbackStats);

const fetchStatistics = async () => {
  try {
    const res = await statisticsService.getAllStatistics();
    if (res.success && res.data && res.data.length > 0) {
      statistics.value = res.data;
    }
  } catch {
    // Keep fallback
  }
};

const saveStat = async (stat: StatisticItem) => {
  savingKey.value = stat.key;
  try {
    if (stat._id) {
      await statisticsService.updateStatistic(stat._id, stat);
    }
    toast.success(`Statistic "${stat.label}" updated.`);
  } catch {
    toast.error('Failed to update statistic.');
  } finally {
    savingKey.value = null;
  }
};

onMounted(() => {
  fetchStatistics();
});
</script>
