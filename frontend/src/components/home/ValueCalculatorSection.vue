<template>
  <section id="calculator" class="py-20 bg-brand-lightest/50 border-b border-brand-border/60 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-14">
        <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
          REAL-TIME ROI CALCULATOR
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
          See the value of building your technology team with GhanaTech Global.
        </h2>
        <p class="mt-3 text-base text-brand-muted">
          Compare market rates between U.S. domestic engineering compensation and thoroughly assessed, full-time Ghanaian technology professionals.
        </p>
      </div>

      <!-- Calculator Card Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        <!-- Left: Input Controls -->
        <div class="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-brand-border/80 shadow-violet-md space-y-6">
          <h3 class="text-base font-bold text-brand-dark pb-2 border-b border-brand-border/40 flex items-center justify-between">
            <span>Configure Your Team</span>
            <span class="text-xs font-semibold text-brand-primary bg-brand-soft px-2.5 py-0.5 rounded-full">
              Live Backend Assumptions
            </span>
          </h3>

          <!-- Role Selection -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
              Select Role
            </label>
            <select
              v-model="selectedRole"
              class="w-full bg-brand-lightest/40 border border-brand-border rounded-xl px-4 py-3 text-sm font-semibold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary cursor-pointer transition-all"
              @change="computeValues"
            >
              <option v-for="r in rolesList" :key="r" :value="r">
                {{ r }}
              </option>
            </select>
          </div>

          <!-- Seniority Selection -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-brand-dark mb-2">
              Seniority Level
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="lvl in seniorityLevels"
                :key="lvl"
                type="button"
                :class="[
                  'py-2.5 px-3 rounded-xl text-xs font-bold transition-all text-center border',
                  selectedSeniority === lvl
                    ? 'bg-brand-primary text-white border-brand-primary shadow-violet-sm'
                    : 'bg-white text-brand-dark border-brand-border hover:bg-brand-soft/50'
                ]"
                @click="selectedSeniority = lvl; computeValues()"
              >
                {{ lvl }}
              </button>
            </div>
          </div>

          <!-- Number of Professionals (Slider) -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-bold uppercase tracking-wider text-brand-dark">
                Number of Professionals
              </label>
              <span class="text-sm font-extrabold text-brand-primary px-3 py-0.5 rounded-full bg-brand-soft border border-brand-border/60">
                {{ count }} {{ count === 1 ? 'Engineer' : 'Engineers' }}
              </span>
            </div>
            <input
              v-model.number="count"
              type="range"
              min="1"
              max="20"
              class="w-full h-2 bg-brand-soft rounded-lg appearance-none cursor-pointer accent-brand-primary"
              @input="computeValues"
            />
            <div class="flex justify-between text-[11px] text-brand-muted mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
              <span>15</span>
              <span>20+</span>
            </div>
          </div>
        </div>

        <!-- Right: Calculated Results Display -->
        <div class="lg:col-span-6 bg-brand-dark text-white p-6 sm:p-8 rounded-3xl shadow-violet-lg border border-brand-border/30 space-y-6 relative overflow-hidden">
          <div class="absolute -right-16 -top-16 w-48 h-48 bg-brand-primary/20 rounded-full blur-2xl pointer-events-none" />

          <div>
            <span class="text-xs font-bold text-brand-bright uppercase tracking-wider">Annual Projected Impact</span>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {{ formatCurrency(annualDifference) }}
              </span>
              <span class="text-xs text-brand-soft/80 font-medium">/ year saved</span>
            </div>
            <div class="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-brand-primary text-white text-xs font-bold shadow-violet-sm">
              Save ~{{ percentageDifference }}% compared to US domestic cost
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <span class="text-[11px] text-brand-soft/70 uppercase tracking-wider font-semibold block">Estimated U.S. Cost</span>
              <span class="text-xl sm:text-2xl font-bold text-white mt-1 block">
                {{ formatCurrency(estimatedUsCost) }}
              </span>
              <span class="text-[10px] text-brand-soft/50 mt-0.5 block">Avg US compensation + benefits</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-brand-primary/30 border border-brand-primary/40">
              <span class="text-[11px] text-brand-soft uppercase tracking-wider font-semibold block">GhanaTech Global</span>
              <span class="text-xl sm:text-2xl font-bold text-brand-bright mt-1 block">
                {{ formatCurrency(estimatedGhanaTechCost) }}
              </span>
              <span class="text-[10px] text-brand-soft/70 mt-0.5 block">Full-time vetted + managed</span>
            </div>
          </div>

          <!-- CTA to Book Team -->
          <div class="pt-2">
            <router-link
              :to="{ path: '/hire-talent', query: { role: selectedRole, seniority: selectedSeniority, count: count } }"
              class="w-full py-3.5 px-6 rounded-2xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-bright transition-all shadow-violet-md text-center flex items-center justify-center gap-2 group"
            >
              <span>Build Team With These Savings</span>
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </router-link>
            <p class="text-center text-[11px] text-brand-soft/60 mt-2">
              Values updated in real-time from administrator baseline configurations.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { calculatorService } from '@/services/calculator';
import { formatCurrency } from '@/utils/formatters';
import { POPULAR_ROLES, SENIORITY_LEVELS, DEFAULT_CALCULATOR_DATA } from '@/utils/constants';

const rolesList = POPULAR_ROLES;
const seniorityLevels = SENIORITY_LEVELS;

const selectedRole = ref<string>('Full-Stack Developer');
const selectedSeniority = ref<'Junior' | 'Mid-Level' | 'Senior'>('Mid-Level');
const count = ref<number>(2);

const estimatedUsCost = ref<number>(280000);
const estimatedGhanaTechCost = ref<number>(88000);
const annualDifference = ref<number>(192000);
const percentageDifference = ref<number>(68);

const configMap = ref<any[]>(DEFAULT_CALCULATOR_DATA);

const computeValues = () => {
  // Find baseline match
  const match = configMap.value.find(
    (c) => c.role.toLowerCase() === selectedRole.value.toLowerCase()
  );

  let usBaseline = match ? (match.usEstimatedAnnualCost || match.us) : 130000;
  let ghanaBaseline = match ? (match.ghanaTechEstimatedAnnualCost || match.ghana) : 40000;

  // Seniority multiplier
  const multiplier = selectedSeniority.value === 'Junior' ? 0.75 : selectedSeniority.value === 'Senior' ? 1.4 : 1.0;

  const usPerPerson = Math.round(usBaseline * multiplier);
  const ghanaPerPerson = Math.round(ghanaBaseline * multiplier);

  estimatedUsCost.value = usPerPerson * count.value;
  estimatedGhanaTechCost.value = ghanaPerPerson * count.value;
  annualDifference.value = estimatedUsCost.value - estimatedGhanaTechCost.value;
  percentageDifference.value = Math.round((annualDifference.value / (estimatedUsCost.value || 1)) * 100);
};

onMounted(async () => {
  try {
    const res = await calculatorService.getConfigurations();
    if (res.success && res.data && res.data.length > 0) {
      configMap.value = res.data;
    }
  } catch {
    // Keep baseline fallback
  }
  computeValues();
});
</script>
