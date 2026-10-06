<template>
  <header class="h-16 bg-white border-b border-brand-border/70 flex items-center justify-between px-4 sm:px-8 z-30 shadow-violet-sm">
    <div class="flex items-center space-x-3">
      <!-- Mobile Sidebar Toggle -->
      <button
        type="button"
        class="lg:hidden text-brand-dark p-2 rounded-xl hover:bg-brand-soft/60 focus:outline-none"
        aria-label="Open navigation menu"
        @click="$emit('toggleSidebar')"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div class="hidden sm:block">
        <h2 class="text-sm font-bold text-brand-dark">GhanaTech Global Portal</h2>
      </div>
    </div>

    <!-- Right Controls -->
    <div class="flex items-center space-x-3 sm:space-x-4">
      <router-link
        to="/"
        target="_blank"
        class="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-brand-border text-xs font-semibold text-brand-primary hover:bg-brand-lightest transition-colors"
      >
        <span>View Public Site</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </router-link>

      <div class="h-6 w-px bg-brand-border/60" />

      <!-- User info -->
      <div class="flex items-center space-x-2.5">
        <div class="w-8 h-8 rounded-full bg-brand-soft border border-brand-border flex items-center justify-center text-xs font-bold text-brand-primary">
          {{ userInitials }}
        </div>
        <div class="hidden md:block text-left">
          <p class="text-xs font-bold text-brand-dark leading-tight">{{ user?.name || 'Administrator' }}</p>
          <span class="text-[10px] text-brand-muted uppercase font-semibold">{{ user?.role || 'admin' }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '@/composables/useAuth';

defineEmits<{
  (e: 'toggleSidebar'): void;
}>();

const { user } = useAuth();

const userInitials = computed(() => {
  if (!user.value?.name) return 'A';
  return user.value.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
});
</script>
