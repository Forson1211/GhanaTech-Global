<template>
  <div class="min-h-screen bg-brand-lightest/40 flex flex-col antialiased selection:bg-brand-primary selection:text-white">
    <!-- Backdrop for mobile drawer -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-brand-dark/40 backdrop-blur-sm lg:hidden transition-opacity"
      @click="isSidebarOpen = false"
    />

    <!-- Admin Sidebar -->
    <AdminSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Main Content wrapper with left offset for desktop sidebar -->
    <div class="lg:pl-64 flex flex-col flex-1">
      <!-- Admin Top Nav -->
      <AdminTopNav @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

      <!-- Content Area -->
      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <router-view />
      </main>
    </div>

    <!-- Global Toast Component -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AdminSidebar from '@/components/navigation/AdminSidebar.vue';
import AdminTopNav from '@/components/navigation/AdminTopNav.vue';
import Toast from '@/components/common/Toast.vue';

const isSidebarOpen = ref(false);
</script>
