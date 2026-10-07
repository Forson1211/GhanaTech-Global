<template>
  <section ref="statisticsSection" class="statistics-section" aria-label="GhanaTech Global in numbers">
    <div class="statistics-container">
      <div class="statistics-grid">
        <div v-for="stat in statistics" :key="stat.key" class="stat-item">
          <span class="stat-icon"><component :is="statisticIcon(stat.key)" :size="25" :stroke-width="1.7" aria-hidden="true" /></span>
          <div class="stat-value" :class="{ 'stat-value-text': !parseCountValue(stat.value) }">
            <span aria-hidden="true">{{ animatedValues[stat.key] ?? stat.value }}</span>
            <span class="sr-only">{{ stat.value }}</span>
          </div>
          <h2 class="stat-label">{{ stat.label }}</h2>
          <p v-if="stat.description" class="stat-description">{{ stat.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { BriefcaseBusiness, Globe2, Layers3, UsersRound } from 'lucide-vue-next';
import { statisticsService } from '@/services/statistics';
import { parseCountValue, formatCountValue } from '@/utils/countUp';
import type { StatisticItem } from '@/types/common';

const fallbackStats: StatisticItem[] = [
  { key: 'professionals', value: '100+', label: "Tech Professionals", description: 'Skilled Ghanaian tech talent', order: 1, isPublished: true },
  { key: 'roles', value: '25+', label: "Types of Jobs", description: 'Across software, cloud & security', order: 2, isPublished: true },
  { key: 'disciplines', value: '4', label: "Types of Work", description: "Areas our professionals work in", order: 3, isPublished: true },
  { key: 'network', value: 'U.S. ↔ Ghana', label: "Our Global Network", description: 'Local talent. Global opportunities.', order: 4, isPublished: true },
];

const statistics = ref<StatisticItem[]>(fallbackStats);
const statisticsSection = ref<HTMLElement | null>(null);
const animatedValues = ref<Record<string, string>>({});
const requestController = new AbortController();
let observer: IntersectionObserver | null = null;
let animationFrame: number | null = null;
let motionPreference: MediaQueryList | null = null;
let hasAnimated = false;
let disposed = false;

function statisticIcon(key: string) {
  return ({ professionals: UsersRound, roles: BriefcaseBusiness, disciplines: Layers3, network: Globe2 } as Record<string, typeof Globe2>)[key] ?? Globe2;
}

function showFinalValues() {
  if (animationFrame !== null) cancelAnimationFrame(animationFrame);
  animationFrame = null;
  animatedValues.value = {};
}

function animateStatistics() {
  if (hasAnimated || disposed) return;
  hasAnimated = true;
  if (motionPreference?.matches) {
    showFinalValues();
    return;
  }
  const counters = statistics.value.flatMap(stat => {
    const parsed = parseCountValue(stat.value);
    return parsed ? [{ key: stat.key, parsed }] : [];
  });
  if (!counters.length) return;
  const duration = 1600;
  let startedAt: number | null = null;
  for (const counter of counters) animatedValues.value[counter.key] = formatCountValue(counter.parsed, 0);

  function update(timestamp: number) {
    if (disposed) return;
    if (startedAt === null) startedAt = timestamp;
    const progress = Math.min(Math.max((timestamp - startedAt) / duration, 0), 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    for (const counter of counters) {
      animatedValues.value[counter.key] = formatCountValue(counter.parsed, counter.parsed.target * easedProgress);
    }
    if (progress < 1) animationFrame = requestAnimationFrame(update);
    else showFinalValues();
  }
  animationFrame = requestAnimationFrame(update);
}

function handleMotionPreference(event: MediaQueryListEvent) {
  if (event.matches) {
    hasAnimated = true;
    observer?.disconnect();
    showFinalValues();
  }
}

// Late API data updates the totals without replaying an animation the visitor has already seen.
watch(statistics, () => {
  if (hasAnimated) showFinalValues();
});

onMounted(async () => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionPreference.addEventListener('change', handleMotionPreference);
  if (motionPreference.matches) {
    hasAnimated = true;
  } else if ('IntersectionObserver' in window && statisticsSection.value) {
    observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        animateStatistics();
        observer?.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(statisticsSection.value);
  } else {
    animateStatistics();
  }

  try {
    const res = await statisticsService.getPublicStatistics(requestController.signal);
    if (!disposed && res.success && res.data?.length) {
      statistics.value = res.data.filter(stat => stat.isPublished).sort((a, b) => a.order - b.order);
    }
  } catch {
    // Keep the existing site totals when the API is unavailable.
  }
});

onBeforeUnmount(() => {
  disposed = true;
  requestController.abort();
  observer?.disconnect();
  motionPreference?.removeEventListener('change', handleMotionPreference);
  showFinalValues();
});
</script>

<style scoped>
.statistics-section { padding: 40px 0 56px; background: #fff; }
.statistics-container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
.statistics-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding: 34px 0; background: #faf9fd; border: 1px solid #ebe5f4; border-radius: 18px; }
.stat-item { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 24px; }
.stat-item + .stat-item { border-left: 1px solid #e6ddef; }
.stat-icon { width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 14px; background: #ede7fa; color: #7541bd; margin-bottom: 14px; }
.stat-value { display: flex; align-items: center; justify-content: center; min-height: 65px; color: #6d28d9; font-size: clamp(40px, 4.2vw, 54px); font-weight: 800; letter-spacing: -1.8px; line-height: 1.15; font-variant-numeric: tabular-nums; }
.stat-value-text { font-size: clamp(22px, 2.3vw, 28px); letter-spacing: -1px; }
.stat-label { max-width: 230px; margin-top: 12px; color: #352148; font-size: 18px; font-weight: 700; line-height: 1.5; }
.stat-description { max-width: 230px; margin-top: 10px; color: #62596d; font-size: 15px; line-height: 1.7; }
@media (max-width: 1023px) {
  .statistics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); padding: 0; }
  .stat-item { padding: 28px 24px; }
  .stat-item:nth-child(odd) { border-left: none; }
  .stat-item:nth-child(n + 3) { border-top: 1px solid #e6ddef; }
  .stat-value { font-size: 46px; }
  .stat-value-text { font-size: 28px; }
}
@media (max-width: 767px) {
  .statistics-section { padding: 20px 0 28px; }
  .statistics-container { padding: 0 20px; }
  .statistics-grid { gap: 12px; padding: 0; border: 0; border-radius: 0; background: transparent; }
  .stat-item { min-height: 156px; padding: 16px 12px; border-radius: 12px; background: #faf9fd; box-shadow: 0 2px 10px #35214808; }
  .stat-item + .stat-item, .stat-item:nth-child(n + 3) { border: 0; }
  .stat-icon { width: 32px; height: 32px; border-radius: 9px; margin-bottom: 8px; }
  .stat-icon svg { width: 19px; height: 19px; }
  .stat-value { min-height: 36px; font-size: 30px; letter-spacing: -1px; }
  .stat-value-text { font-size: clamp(16px, 4.5vw, 20px); letter-spacing: -.5px; white-space: nowrap; }
  .stat-label { max-width: 150px; margin-top: 8px; font-size: 14px; line-height: 1.5; }
  .stat-description { display: none; }
}
</style>
