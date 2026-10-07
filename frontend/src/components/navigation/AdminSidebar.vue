<template>
  <aside :class="['admin-sidebar', isOpen ? 'is-open' : '']">
    <div class="sidebar-brand">
      <router-link to="/admin" @click="$emit('close')"><img src="/images/white%20background.png" alt="GhanaTech Global" /><span>{{ t('ADMIN PANEL') }}</span></router-link>
      <button class="lg:hidden" aria-label="Close navigation" @click="$emit('close')"><X :size="20" /></button>
    </div>
    <nav class="sidebar-navigation" aria-label="Admin navigation">
      <div v-for="group in groups" :key="group.title" class="nav-group">
        <p>{{ t(group.title) }}</p>
        <router-link v-for="item in group.items" :key="item.to" :to="item.to" :class="{ selected: route.path === item.to }" @click="$emit('close')">
          <component :is="item.icon" :size="22" :stroke-width="1.7" /><span>{{ t(item.label) }}</span><ChevronRight v-if="item.to !== '/admin'" :size="15" class="nav-chevron" />
        </router-link>
      </div>
    </nav>
    <div class="sidebar-profile"><span class="profile-avatar">{{ initials }}</span><div><strong>{{ user?.name || 'Administrator' }}</strong><small>{{ user?.role || 'admin' }}</small></div><button aria-label="Sign out" @click="logout"><LogOut :size="19" /></button></div>
  </aside>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useAdminPreferences } from '@/composables/useAdminPreferences';
const { t } = useAdminPreferences();
import { useRoute } from 'vue-router';
import { LayoutDashboard, Users, FileText, Building2, BriefcaseBusiness, Layers, Calculator, MessageSquare, CircleHelp, ChartNoAxesCombined, Settings, ChevronRight, X, LogOut } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
defineProps<{ isOpen: boolean }>();
defineEmits<{ (e: 'close'): void }>();
const route = useRoute();
const { user, logout } = useAuth();
const initials = computed(() => user.value?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'A');
const groups = [
  { title: 'OVERVIEW', items: [{ label: 'Dashboard', to: '/admin', icon: LayoutDashboard }] },
  { title: 'PEOPLE & HIRING', items: [
    { label: 'Candidate Profiles', to: '/admin/candidates', icon: Users },
    { label: 'Job Applications', to: '/admin/applications', icon: FileText },
    { label: 'Company Requests', to: '/admin/leads', icon: Building2 },
  ] },
  { title: 'WEBSITE & SETTINGS', items: [
    { label: 'Job Openings', to: '/admin/jobs', icon: BriefcaseBusiness },
    { label: 'Pages & Articles', to: '/admin/content', icon: FileText },
    { label: 'Emails & Subscribers', to: '/admin/communications', icon: MessageSquare },
    { label: 'My Account', to: '/admin/account', icon: Users },
    { label: 'Services', to: '/admin/services', icon: BriefcaseBusiness },
    { label: 'Job Categories', to: '/admin/categories', icon: Layers },
    { label: 'Cost Calculator', to: '/admin/calculator', icon: Calculator },
    { label: 'Customer Reviews', to: '/admin/testimonials', icon: MessageSquare },
    { label: 'Common Questions', to: '/admin/faqs', icon: CircleHelp },
    { label: 'Homepage Numbers', to: '/admin/statistics', icon: ChartNoAxesCombined },
    { label: 'Website Settings', to: '/admin/settings', icon: Settings },
  ] },
];
</script>
