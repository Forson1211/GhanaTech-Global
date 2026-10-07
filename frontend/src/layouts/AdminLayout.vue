<template>
  <div :class="{ 'admin-dark': darkMode }" :lang="language" class="admin-shell min-h-screen flex flex-col antialiased selection:bg-brand-primary selection:text-white">
    <!-- Backdrop for mobile drawer -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 z-40 bg-brand-dark/40 backdrop-blur-sm lg:hidden transition-opacity"
      @click="isSidebarOpen = false"
    />

    <!-- Admin Sidebar -->
    <AdminSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

    <!-- Main Content wrapper with left offset for desktop sidebar -->
    <div class="admin-main flex flex-col flex-1">
      <!-- Admin Top Nav -->
      <AdminTopNav @toggle-sidebar="isSidebarOpen = !isSidebarOpen" />

      <!-- Content Area -->
      <main class="admin-content flex-1">
        <router-view />
      </main>
    </div>

    <!-- Global Toast Component -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAdminPreferences } from '@/composables/useAdminPreferences';
import '@/assets/admin.css';
import AdminSidebar from '@/components/navigation/AdminSidebar.vue';
import AdminTopNav from '@/components/navigation/AdminTopNav.vue';
import Toast from '@/components/common/Toast.vue';

const isSidebarOpen = ref(false);
const { darkMode, language } = useAdminPreferences();
</script>
