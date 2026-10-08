<template>
  <div class="min-h-screen flex flex-col bg-white text-brand-text font-sans antialiased selection:bg-brand-primary selection:text-white">
    <!-- Public Navbar -->
    <Navbar />

    <!-- Main Content Area -->
    <main class="grow">
      <router-view />
    </main>

    <!-- Public Footer -->
    <Footer />

    <!-- Cookie & Privacy Consent Banner -->
    <CookieConsent />

    <!-- Global Toast Notifications -->
    <Toast />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/navigation/Navbar.vue';
import Footer from '@/components/navigation/Footer.vue';
import Toast from '@/components/common/Toast.vue';
import CookieConsent from '@/components/common/CookieConsent.vue';
</script>
