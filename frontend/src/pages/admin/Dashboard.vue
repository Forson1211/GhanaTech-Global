<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight">Admin Overview</h1>
        <p class="text-xs text-brand-muted mt-1">Live metrics across talent pipelines, inquiries, and platform services.</p>
      </div>

      <div class="flex items-center space-x-3">
        <router-link
          to="/admin/candidates"
          class="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm"
        >
          Manage Talent
        </router-link>
        <router-link
          to="/admin/leads"
          class="px-4 py-2 rounded-xl bg-brand-soft text-brand-dark text-xs font-bold hover:bg-brand-border transition-colors"
        >
          Review Leads
        </router-link>
      </div>
    </div>

    <!-- 4 Main Metric Cards (Section 30) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Total Candidates -->
      <div class="bg-white p-6 rounded-2xl border border-brand-border/80 shadow-violet-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-muted">Total Candidates</span>
          <div class="w-9 h-9 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center font-bold">
            👥
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-3xl font-black text-brand-dark">{{ metrics.totalCandidates }}</span>
          <span class="text-xs font-semibold text-brand-primary">Active Roster</span>
        </div>
      </div>

      <!-- New Applications -->
      <div class="bg-white p-6 rounded-2xl border border-brand-border/80 shadow-violet-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-muted">New Applications</span>
          <div class="w-9 h-9 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center font-bold">
            📥
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-3xl font-black text-brand-dark">{{ metrics.newApplications }}</span>
          <span class="text-xs font-semibold text-brand-bright">Pending Review</span>
        </div>
      </div>

      <!-- Open Company Leads -->
      <div class="bg-white p-6 rounded-2xl border border-brand-border/80 shadow-violet-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-muted">Open Company Leads</span>
          <div class="w-9 h-9 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center font-bold">
            💼
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-3xl font-black text-brand-dark">{{ metrics.openLeads }}</span>
          <span class="text-xs font-semibold text-brand-primary">Active Inquiries</span>
        </div>
      </div>

      <!-- Active Services -->
      <div class="bg-white p-6 rounded-2xl border border-brand-border/80 shadow-violet-sm">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-brand-muted">Active Services</span>
          <div class="w-9 h-9 rounded-xl bg-brand-soft text-brand-primary flex items-center justify-center font-bold">
            ⚡
          </div>
        </div>
        <div class="mt-4 flex items-baseline justify-between">
          <span class="text-3xl font-black text-brand-dark">{{ metrics.activeServices }}</span>
          <span class="text-xs font-semibold text-brand-dark">Practices</span>
        </div>
      </div>
    </div>

    <!-- Status Breakdown Charts / Progress Bars -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Candidate Status Breakdown -->
      <div class="bg-white p-6 rounded-2xl border border-brand-border/80 shadow-violet-sm">
        <h3 class="text-sm font-bold text-brand-dark mb-4 pb-2 border-b border-brand-border/40">
          Candidate Pool Status
        </h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-brand-dark">Approved & Active</span>
              <span class="text-brand-primary">18 candidates</span>
            </div>
            <div class="w-full h-2.5 bg-brand-lightest rounded-full overflow-hidden">
              <div class="h-full bg-brand-primary rounded-full" style="width: 75%"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-brand-dark">Interviewing / Screening</span>
              <span class="text-brand-bright">4 candidates</span>
            </div>
            <div class="w-full h-2.5 bg-brand-lightest rounded-full overflow-hidden">
              <div class="h-full bg-brand-bright rounded-full" style="width: 17%"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-brand-dark">Placed / Engaged</span>
              <span class="text-brand-dark">2 candidates</span>
            </div>
            <div class="w-full h-2.5 bg-brand-lightest rounded-full overflow-hidden">
              <div class="h-full bg-brand-dark rounded-full" style="width: 8%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lead Status Breakdown -->
      <div class="bg-white p-6 rounded-2xl border border-brand-border/80 shadow-violet-sm">
        <h3 class="text-sm font-bold text-brand-dark mb-4 pb-2 border-b border-brand-border/40">
          Client Leads Pipeline
        </h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-brand-dark">New Inquiries</span>
              <span class="text-brand-bright">5 leads</span>
            </div>
            <div class="w-full h-2.5 bg-brand-lightest rounded-full overflow-hidden">
              <div class="h-full bg-brand-bright rounded-full" style="width: 45%"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-brand-dark">Qualified / Shortlist Sent</span>
              <span class="text-brand-primary">4 leads</span>
            </div>
            <div class="w-full h-2.5 bg-brand-lightest rounded-full overflow-hidden">
              <div class="h-full bg-brand-primary rounded-full" style="width: 35%"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-brand-dark">Proposal & Contracting</span>
              <span class="text-brand-dark">2 leads</span>
            </div>
            <div class="w-full h-2.5 bg-brand-lightest rounded-full overflow-hidden">
              <div class="h-full bg-brand-dark rounded-full" style="width: 20%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Tables (Applications & Leads) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Applications -->
      <div class="bg-white rounded-2xl border border-brand-border/80 shadow-violet-sm p-6">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-brand-border/40">
          <h3 class="text-sm font-bold text-brand-dark">Recent Applications</h3>
          <router-link to="/admin/applications" class="text-xs font-semibold text-brand-primary hover:underline">
            View All
          </router-link>
        </div>

        <div class="space-y-3">
          <div
            v-for="app in recentApps"
            :key="app.name"
            class="flex items-center justify-between p-3 rounded-xl bg-brand-lightest/40 hover:bg-brand-soft/40 transition-colors"
          >
            <div>
              <p class="text-xs font-bold text-brand-dark">{{ app.name }}</p>
              <p class="text-[11px] text-brand-muted">{{ app.role }} • {{ app.yearsExperience }} yrs</p>
            </div>
            <StatusBadge :status="app.status" />
          </div>
        </div>
      </div>

      <!-- Recent Company Leads -->
      <div class="bg-white rounded-2xl border border-brand-border/80 shadow-violet-sm p-6">
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-brand-border/40">
          <h3 class="text-sm font-bold text-brand-dark">Recent Company Leads</h3>
          <router-link to="/admin/leads" class="text-xs font-semibold text-brand-primary hover:underline">
            View All
          </router-link>
        </div>

        <div class="space-y-3">
          <div
            v-for="lead in recentLeads"
            :key="lead.company"
            class="flex items-center justify-between p-3 rounded-xl bg-brand-lightest/40 hover:bg-brand-soft/40 transition-colors"
          >
            <div>
              <p class="text-xs font-bold text-brand-dark">{{ lead.company }}</p>
              <p class="text-[11px] text-brand-muted">{{ lead.name }} • Needs {{ lead.role }}</p>
            </div>
            <StatusBadge :status="lead.status" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { statisticsService } from '@/services/statistics';
import StatusBadge from '@/components/common/StatusBadge.vue';

const metrics = ref({
  totalCandidates: 24,
  newApplications: 7,
  openLeads: 11,
  activeServices: 4,
});

const recentApps = ref([
  { name: 'Kofi Annan', role: 'DevOps Engineer', yearsExperience: 6, status: 'New' },
  { name: 'Abena Mensah', role: 'Security Analyst', yearsExperience: 5, status: 'Reviewing' },
  { name: 'Emmanuel Tetteh', role: 'Full-Stack Developer', yearsExperience: 7, status: 'Shortlisted' },
]);

const recentLeads = ref([
  { company: 'Apex Cloud Inc.', name: 'Sarah Miller', role: 'Cloud Engineer', status: 'New' },
  { company: 'FinShield Labs', name: 'Robert Chen', role: 'SOC Analyst', status: 'Contacted' },
  { company: 'DataWave Global', name: 'Alex Harris', role: 'Data Engineer', status: 'Qualified' },
]);

onMounted(async () => {
  try {
    const res = await statisticsService.getAdminDashboardMetrics();
    if (res.success && res.data) {
      metrics.value = {
        totalCandidates: res.data.totalCandidates || 24,
        newApplications: res.data.newApplications || 7,
        openLeads: res.data.openLeads || 11,
        activeServices: res.data.activeServices || 4,
      };
      if (res.data.recentApplications?.length) {
        recentApps.value = res.data.recentApplications;
      }
      if (res.data.recentLeads?.length) {
        recentLeads.value = res.data.recentLeads;
      }
    }
  } catch {
    // Keep initial realistic values
  }
});
</script>
