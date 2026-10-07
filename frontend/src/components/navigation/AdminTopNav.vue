<template>
  <header ref="header" class="admin-topnav" @keydown.esc="openMenu = null">
    <div class="topnav-links">
      <button class="lg:hidden" aria-label="Open navigation" @click="$emit('toggleSidebar')"><Menu :size="23" /></button>
      <router-link to="/admin" :class="{ active: route.path === '/admin' }">{{ t('Dashboard') }}</router-link>
      <router-link to="/admin/candidates" class="hidden sm:inline-flex">{{ t('Talent') }}</router-link>
      <router-link to="/admin/services" class="hidden sm:inline-flex">{{ t('Services') }}</router-link>
    </div>
    <div class="topnav-controls">
      <router-link to="/" target="_blank" class="public-link hidden sm:flex">{{ t('View site') }} <ExternalLink :size="15" /></router-link>
      <div class="topnav-dropdown-anchor">
        <button class="topnav-icon-button notification-trigger" :aria-label="t('Notifications')" :aria-expanded="openMenu === 'notifications'" aria-controls="admin-notifications" @click="toggleMenu('notifications')"><Bell :size="23" /><i v-if="pendingCount" /></button>
        <div v-if="openMenu === 'notifications'" id="admin-notifications" class="admin-dropdown notifications-dropdown"><h3>{{ t('Notifications') }}</h3><p v-if="notificationError">{{ t('Unable to load notifications.') }}</p><p v-else-if="!pendingCount">{{ t('No pending reviews.') }}</p><template v-else><router-link v-if="notifications.newApplications" to="/admin/applications" @click="openMenu = null"><FileText :size="19" /><span>{{ t('New applications') }}</span><strong>{{ notifications.newApplications }}</strong></router-link><router-link v-if="notifications.openLeads" to="/admin/leads" @click="openMenu = null"><Building2 :size="19" /><span>{{ t('Company Requests') }}</span><strong>{{ notifications.openLeads }}</strong></router-link></template></div>
      </div>
      <div class="topnav-dropdown-anchor">
        <button class="language-trigger" :aria-label="t('Language')" :aria-expanded="openMenu === 'language'" aria-controls="admin-languages" @click="toggleMenu('language')"><span class="language-flag" :class="'flag-' + language" aria-hidden="true">{{ language === 'en' ? '★' : '' }}</span></button>
        <div v-if="openMenu === 'language'" id="admin-languages" class="admin-dropdown language-dropdown"><h3>{{ t('Language') }}</h3><button v-for="option in languages" :key="option.code" :class="{ 'language-selected': language === option.code }" @click="selectLanguage(option.code)"><span class="language-flag" :class="'flag-' + option.code" aria-hidden="true">{{ option.code === 'en' ? '★' : '' }}</span><span>{{ option.label }}</span><Check v-if="language === option.code" :size="17" /></button><p>{{ t('Language') }}</p></div>
      </div>
      <div class="topnav-dropdown-anchor">
        <button class="profile-avatar profile-trigger" :aria-label="t('Your Profile')" :aria-expanded="openMenu === 'profile'" aria-controls="admin-profile-menu" @click="toggleMenu('profile')"><UserRound :size="18" /></button>
        <div v-if="openMenu === 'profile'" id="admin-profile-menu" class="admin-dropdown profile-dropdown">
          <div class="profile-menu-header"><span class="profile-avatar">{{ initials }}</span><div><strong>{{ user?.name || 'Administrator' }}</strong><small>{{ user?.email }}</small></div></div>
          <div class="profile-menu-items"><button @click="showDialog('profile')"><UserRound :size="20" />{{ t('View Profile') }}</button><router-link to="/admin/account" @click="openMenu = null"><Settings :size="20" />{{ t('My Account') }}</router-link><button @click="showDialog('activity')"><Activity :size="20" />{{ t('Login Activity') }}</button><button role="switch" :aria-checked="darkMode" @click="toggleDarkMode"><Moon :size="20" />{{ t('Dark Mode') }}<span class="theme-switch" :class="{ enabled: darkMode }"><i /></span></button></div>
          <div class="profile-menu-footer"><button @click="logout"><LogOut :size="20" />{{ t('Sign Out') }}</button></div>
        </div>
      </div>
    </div>
    <Teleport to="body"><div v-if="dialog" class="admin-account-backdrop" @click.self="dialog = null" @keydown.esc="dialog = null"><section ref="dialogPanel" class="admin-account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-dialog-title" tabindex="-1" @keydown.tab="trapDialogFocus"><div class="panel-heading"><h2 id="account-dialog-title">{{ t(dialog === 'profile' ? 'Your Profile' : 'Login Activity') }}</h2><button :aria-label="t('Close')" @click="dialog = null"><X :size="21" /></button></div><template v-if="dialog === 'profile'"><div class="account-profile-summary"><span class="profile-avatar">{{ initials }}</span><strong>{{ user?.name }}</strong></div><dl><dt>{{ t('Name') }}</dt><dd>{{ user?.name }}</dd><dt>{{ t('Email') }}</dt><dd>{{ user?.email }}</dd><dt>{{ t('Role') }}</dt><dd>{{ user?.role }}</dd></dl></template><template v-else><p>{{ t('Last successful sign-in') }}</p><strong class="last-login-value">{{ lastLogin }}</strong><p v-if="activityError" class="text-red-600 text-sm">{{ t('Sign-in history could not be loaded.') }}</p><ul class="mt-5 space-y-3 max-h-64 overflow-y-auto"><li v-for="entry in activity" :key="entry._id" class="text-xs border-t border-brand-border/40 pt-3"><strong>{{ new Date(entry.signedInAt).toLocaleString(language) }}</strong><p class="break-all mt-1 text-brand-muted">{{ entry.device }}</p></li></ul></template><button class="dashboard-button primary" @click="dialog = null">{{ t('Close') }}</button></section></div></Teleport>
  </header>
</template>
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { Menu, ExternalLink, Bell, UserRound, Settings, Activity, Moon, LogOut, Check, X, FileText, Building2 } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
import { useAdminPreferences, type AdminLanguage } from '@/composables/useAdminPreferences';
import { statisticsService } from '@/services/statistics';
import { authService } from '@/services/auth';
defineEmits<{ (e: 'toggleSidebar'): void }>();
const route = useRoute();
const { user, logout } = useAuth();
const { language, darkMode, t, setLanguage, toggleDarkMode } = useAdminPreferences();
const header = ref<HTMLElement | null>(null);
const dialogPanel = ref<HTMLElement | null>(null);
const openMenu = ref<'profile' | 'language' | 'notifications' | null>(null);
const dialog = ref<'profile' | 'activity' | null>(null);
const activity = ref<{ _id: string; signedInAt: string; device: string }[]>([]);
const activityError = ref(false);
let previousFocus: HTMLElement | null = null;
const notifications = ref({ newApplications: 0, openLeads: 0 });
const notificationError = ref(false);
const pendingCount = computed(() => notifications.value.newApplications + notifications.value.openLeads);
const languages: { code: AdminLanguage; label: string }[] = [{ code: 'en', label: 'English' }, { code: 'fr', label: 'Français' }, { code: 'es', label: 'Español' }];
const initials = computed(() => user.value?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'A');
const lastLogin = computed(() => user.value?.lastLogin && !Number.isNaN(Date.parse(user.value.lastLogin)) ? new Date(user.value.lastLogin).toLocaleString(language.value, { dateStyle: 'medium', timeStyle: 'short' }) : t('No sign-in timestamp is available.'));
function toggleMenu(menu: NonNullable<typeof openMenu.value>) { openMenu.value = openMenu.value === menu ? null : menu; }
function selectLanguage(value: AdminLanguage) { setLanguage(value); openMenu.value = null; }
async function showDialog(value: NonNullable<typeof dialog.value>) {
  previousFocus = document.activeElement as HTMLElement; dialog.value = value; openMenu.value = null;
  if (value === 'activity') { activity.value = []; activityError.value = false; try { activity.value = (await authService.getActivity()).data || []; } catch { activityError.value = true; } }
}
function trapDialogFocus(event: KeyboardEvent) {
  const buttons = dialogPanel.value?.querySelectorAll<HTMLButtonElement>('button');
  if (!buttons?.length) return;
  const first = buttons[0], last = buttons[buttons.length - 1];
  if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogPanel.value)) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}
onClickOutside(header, () => { openMenu.value = null; });
watch(() => route.path, () => { openMenu.value = null; });
watch(dialog, async value => { await nextTick(); if (value) dialogPanel.value?.focus(); else if (previousFocus?.isConnected) previousFocus.focus(); else header.value?.querySelector<HTMLButtonElement>('.profile-trigger')?.focus(); });
onMounted(async () => { try { const result = await statisticsService.getAdminDashboardMetrics(); if (!result.success || !result.data) throw new Error(); notifications.value = result.data.cards; } catch { notificationError.value = true; } });
</script>
