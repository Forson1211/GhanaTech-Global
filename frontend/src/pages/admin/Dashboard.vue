<template>
  <div class="overview-dashboard">
    <div class="dashboard-heading"><div><p class="eyebrow">GHANATECH GLOBAL</p><h1> {{ t("Dashboard") }} </h1><p> {{ t("Connecting exceptional Ghanaian talent with global opportunities.") }} </p></div><div class="heading-actions"><router-link to="/admin/applications" class="dashboard-button"><FileText :size="17" /> {{ t("Review Applications") }} </router-link><button class="dashboard-button primary" :disabled="!summary" @click="downloadReport"><Download :size="17" /> {{ t("Export Report") }} </button></div></div>
    <div v-if="error" class="dashboard-notice" role="alert">{{ error }} <button @click="loadDashboard"> {{ t("Try again") }} </button></div>
    <div class="metric-grid" :aria-busy="loading">
      <router-link v-for="(card, index) in cards" :key="card.label" :to="card.to" class="metric-card" :style="{ background: card.color }">
        <div class="metric-top"><span>{{ loading ? '\u2014' : summary ? card.value.toLocaleString() : '\u2014' }}</span><component :is="card.icon" :size="23" /></div><h2>{{ t(card.label) }}</h2><p>{{ t(card.caption) }}</p>
        <svg class="metric-decoration" viewBox="0 0 320 70" preserveAspectRatio="none" aria-hidden="true"><template v-if="index === 2"><rect v-for="n in 15" :key="n" :x="n * 22 - 16" :y="20 + (n % 4) * 9" width="10" height="65" fill="white" opacity=".17" /></template><template v-else><path d="M0 47 Q40 15 75 32 T150 31 T225 30 T320 20 V70 H0Z" fill="white" opacity=".14" /><path d="M0 47 Q40 15 75 32 T150 31 T225 30 T320 20" fill="none" stroke="white" stroke-width="1.3" /></template></svg>
      </router-link>
    </div>
    <div class="dashboard-two-column">
      <section class="dashboard-panel"><div class="panel-heading"><h2> {{ t("Talent Pool Overview") }} </h2><router-link to="/admin/candidates"> {{ t("View Directory") }} <ArrowUpRight :size="15" /></router-link></div><p class="panel-description"> {{ t("Current candidate availability across your talent pipeline.") }} </p>
        <div v-if="availability.length" class="availability-chart" role="img" aria-label="Candidate counts by availability"><div v-for="item in availability" :key="item._id" class="availability-column"><span>{{ item.count }}</span><div class="bar-track"><div :style="{ height: `${item.count / maxAvailability * 100}%`, background: statusColor(item._id) }"></div></div><small>{{ item._id || 'Unspecified' }}</small></div></div><div v-else class="dashboard-empty">{{ loading ? 'Loading talent overview...' : 'No candidate availability data to display.' }}</div>
        <div class="chart-footnote"><span><i></i> {{ t("Live talent directory") }} </span><span>{{ metrics.totalCandidates }} {{ t("total candidates") }} </span></div>
      </section>
      <section class="dashboard-panel"><div class="panel-heading"><h2> {{ t("Key Statistics") }} </h2><ChartNoAxesCombined :size="20" class="muted" /></div><div v-for="stat in keyStats" :key="stat.label" class="key-stat"><strong>{{ summary ? stat.value.toLocaleString() : '\u2014' }}</strong><p>{{ t(stat.label) }}</p><div class="stat-progress"><span :style="{ color: stat.color }">{{ stat.percent }}%</span><div><i :style="{ width: `${stat.percent}%`, background: stat.color }"></i></div><small>{{ t(stat.context) }}</small></div></div></section>
    </div>
    <div class="dashboard-two-column">
      <section class="dashboard-panel applications-panel"><div class="panel-heading"><h2> {{ t("Recent Talent Applications") }} </h2><router-link to="/admin/applications"> {{ t("View All") }} </router-link></div><div class="dashboard-table-wrap"><table class="dashboard-table"><thead><tr><th> {{ t("Applicant") }} </th><th> {{ t("Role") }} </th><th> {{ t("Status") }} </th><th> {{ t("Experience") }} </th><th> {{ t("Received") }} </th></tr></thead><tbody><tr v-for="app in summary?.recentApplications || []" :key="app._id"><td><div class="table-person"><span class="table-avatar">{{ initials(app.name) }}</span><div><strong>{{ app.name }}</strong><small>{{ app.technologyArea || app.location }}</small></div></div></td><td>{{ app.role }}</td><td><StatusBadge :status="app.status" /></td><td>{{ app.yearsExperience }} yrs</td><td>{{ date(app.createdAt) }}</td></tr><tr v-if="!summary?.recentApplications.length"><td colspan="5" class="empty-cell">{{ loading ? 'Loading applications...' : 'No applications to display.' }}</td></tr></tbody></table></div></section>
      <section class="dashboard-panel"><div class="panel-heading"><h2> {{ t("Company Requests") }} </h2><router-link to="/admin/leads"> {{ t("View All") }} </router-link></div><div v-for="lead in summary?.recentLeads || []" :key="lead._id || lead.company" class="lead-row"><span class="company-avatar"><Building2 :size="20" /></span><div><strong>{{ lead.company }}</strong><small>{{ lead.role || lead.technologyNeed }}</small></div><StatusBadge :status="lead.status" /></div><div v-if="!summary?.recentLeads.length" class="dashboard-empty">{{ loading ? 'Loading leads...' : 'No company leads to display.' }}</div></section>
    </div>
    <div class="dashboard-bottom-grid">
      <section class="dashboard-panel"><div class="panel-heading"><h2> {{ t("Application Pipeline") }} </h2><router-link to="/admin/applications"><ArrowUpRight :size="19" /></router-link></div><div class="pipeline-highlight"><div><strong>{{ summary ? metrics.newApplications : '\u2014' }}</strong><span> {{ t("New applications") }} </span></div><div><strong>{{ summary ? metrics.totalApplications : '\u2014' }}</strong><span> {{ t("Total applications") }} </span></div></div><p class="panel-description"> {{ t("Review new applicants and help skilled professionals take their next career step.") }} </p><router-link to="/admin/applications" class="text-action"> {{ t("Manage applications") }} <ArrowRight :size="16" /></router-link></section>
      <section class="dashboard-panel"><div class="panel-heading"><h2> {{ t("Platform Management") }} </h2><Settings :size="19" class="muted" /></div><router-link v-for="link in platformLinks" :key="link.to" :to="link.to" class="platform-row"><span>{{ t(link.label) }}</span><ChevronRight :size="17" /></router-link></section>
      <section class="dashboard-panel"><div class="panel-heading"><h2> {{ t("Talent Approval Rate") }} </h2><Users :size="20" class="muted" /></div><div class="approval-number">{{ summary ? approvalRate + '%' : '\u2014' }}</div><p class="panel-description"> {{ t("Approved profiles in your talent directory") }} </p><div class="approval-track"><i :style="{ width: `${approvalRate}%` }"></i></div><div class="approval-caption"><span>{{ metrics.approvedCandidates }} {{ t("approved") }} </span><span>{{ metrics.pendingCandidates }} {{ t("pending") }} </span></div><router-link to="/admin/candidates" class="text-action"> {{ t("Review talent profiles") }} <ArrowRight :size="16" /></router-link></section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAdminPreferences } from '@/composables/useAdminPreferences';
const { t } = useAdminPreferences();
import { computed, onMounted, ref } from 'vue';
import { Users, FileText, Building2, BriefcaseBusiness, Download, ArrowUpRight, ArrowRight, ChevronRight, ChartNoAxesCombined, Settings } from 'lucide-vue-next';
import { statisticsService, type AdminDashboardStats } from '@/services/statistics';
import StatusBadge from '@/components/common/StatusBadge.vue';
const summary = ref<AdminDashboardStats | null>(null);
const loading = ref(true);
const error = ref('');
const metrics = computed(() => summary.value?.cards || { totalCandidates: 0, approvedCandidates: 0, pendingCandidates: 0, totalApplications: 0, newApplications: 0, totalLeads: 0, openLeads: 0, activeServices: 0 });
const cards = computed(() => [
  { label: 'Total Candidates', value: metrics.value.totalCandidates, caption: 'Your Ghanaian talent directory', color: '#7338ef', icon: Users, to: '/admin/candidates' },
  { label: 'New Applications', value: metrics.value.newApplications, caption: 'Ready for your review', color: '#0895fa', icon: FileText, to: '/admin/applications' },
  { label: 'Open Company Leads', value: metrics.value.openLeads, caption: 'Global hiring opportunities', color: '#ff981b', icon: Building2, to: '/admin/leads' },
  { label: 'Published Services', value: metrics.value.activeServices, caption: 'Solutions available on your site', color: '#f43e76', icon: BriefcaseBusiness, to: '/admin/services' },
]);
const availability = computed(() => summary.value?.candidatesByAvailability || []);
const maxAvailability = computed(() => Math.max(1, ...availability.value.map(item => item.count)));
const percent = (value: number, total: number) => total ? Math.round(value / total * 100) : 0;
const approvalRate = computed(() => percent(metrics.value.approvedCandidates, metrics.value.totalCandidates));
const keyStats = computed(() => [
  { label: 'Approved candidates', value: metrics.value.approvedCandidates, percent: approvalRate.value, color: '#7338ef', context: 'of talent pool' },
  { label: 'Applications awaiting review', value: metrics.value.newApplications, percent: percent(metrics.value.newApplications, metrics.value.totalApplications), color: '#f43e76', context: 'of applications' },
  { label: 'Open hiring leads', value: metrics.value.openLeads, percent: percent(metrics.value.openLeads, metrics.value.totalLeads), color: '#0cc681', context: 'of company leads' },
]);
const platformLinks = [{ label: 'Services', to: '/admin/services' }, { label: 'Job Categories', to: '/admin/categories' }, { label: 'Cost Calculator', to: '/admin/calculator' }, { label: 'Customer Reviews', to: '/admin/testimonials' }, { label: 'Homepage Numbers', to: '/admin/statistics' }];
const statusColor = (status: string) => ({ Available: '#7338ef', Interviewing: '#0895fa', Placed: '#0cc681', Unavailable: '#ff981b' }[status] || '#8995ad');
const initials = (name: string) => name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
const date = (value?: string) => value && !Number.isNaN(Date.parse(value)) ? new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) : '\u2014';
async function loadDashboard() {
  loading.value = true; error.value = '';
  try { const result = await statisticsService.getAdminDashboardMetrics(); if (!result.success || !result.data) throw new Error(); summary.value = result.data; }
  catch { error.value = 'Dashboard data could not be loaded. Please retry.'; }
  finally { loading.value = false; }
}
function downloadReport() {
  if (!summary.value) return;
  const csv = ['Metric,Value', ...Object.entries(summary.value.cards).map(([key, value]) => `${key},${value}`)].join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'ghanatech-dashboard-report.csv'; anchor.click(); URL.revokeObjectURL(url);
}
onMounted(loadDashboard);
</script>
