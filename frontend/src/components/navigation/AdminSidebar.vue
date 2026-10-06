<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 w-64 bg-brand-sidebar text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-brand-dark',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    ]"
  >
    <!-- Brand Header -->
    <div class="h-20 flex items-center justify-between px-6 border-b border-white/10 bg-brand-sidebartop">
      <router-link to="/admin" class="flex items-center space-x-3" @click="$emit('close')">
        <div class="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-violet-sm">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="9" />
            <path d="M3.6 9h16.8M3.6 15h16.8" />
            <circle cx="12" cy="12" r="3" fill="#EDE9FE" />
          </svg>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-bold tracking-tight text-white">GhanaTech Admin</span>
          <span class="text-[10px] text-brand-soft/70 uppercase tracking-widest">Management Suite</span>
        </div>
      </router-link>

      <!-- Mobile Close Button -->
      <button
        type="button"
        class="lg:hidden text-brand-soft hover:text-white p-1"
        @click="$emit('close')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation Menu Items -->
    <div class="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 scrollbar-thin">
      <div class="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-brand-soft/50">
        Operations & Pipeline
      </div>

      <router-link
        to="/admin"
        exact
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke-width="2" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke-width="2" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke-width="2" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke-width="2" />
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link
        to="/admin/candidates"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>Talent Directory</span>
      </router-link>

      <router-link
        to="/admin/applications"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span>Talent Applications</span>
      </router-link>

      <router-link
        to="/admin/leads"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span>Company Leads</span>
      </router-link>

      <div class="px-3 pt-5 pb-2 text-[10px] font-bold uppercase tracking-wider text-brand-soft/50">
        Content & Systems
      </div>

      <router-link
        to="/admin/services"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <span>Services</span>
      </router-link>

      <router-link
        to="/admin/categories"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        <span>Technology Categories</span>
      </router-link>

      <router-link
        to="/admin/calculator"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span>Calculator Config</span>
      </router-link>

      <router-link
        to="/admin/testimonials"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>Testimonials</span>
      </router-link>

      <router-link
        to="/admin/faqs"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>FAQs</span>
      </router-link>

      <router-link
        to="/admin/statistics"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span>Homepage Statistics</span>
      </router-link>

      <router-link
        to="/admin/settings"
        class="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-brand-soft/80 hover:text-white hover:bg-brand-adminhover transition-all"
        active-class="bg-brand-primary text-white shadow-violet-sm"
        @click="$emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>Site Settings</span>
      </router-link>
    </div>

    <!-- User Profile & Logout Bottom Section -->
    <div class="p-4 border-t border-white/10 bg-brand-sidebartop/70 flex items-center justify-between">
      <div class="flex items-center space-x-3 overflow-hidden">
        <div class="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
          {{ userInitials }}
        </div>
        <div class="overflow-hidden">
          <p class="text-xs font-bold text-white truncate">{{ user?.name || 'Administrator' }}</p>
          <span class="text-[10px] text-brand-soft uppercase font-semibold">{{ user?.role || 'admin' }}</span>
        </div>
      </div>

      <button
        type="button"
        title="Logout"
        class="text-brand-soft/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        @click="handleLogout"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '@/composables/useAuth';

defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
}>();

const { user, logout } = useAuth();

const userInitials = computed(() => {
  if (!user.value?.name) return 'A';
  return user.value.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
});

const handleLogout = async () => {
  await logout();
};
</script>
