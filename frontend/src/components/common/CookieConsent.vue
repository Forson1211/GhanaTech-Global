<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-6 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-6 scale-95"
  >
    <div
      v-if="isVisible"
      class="fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-brand-border/80 shadow-2xl text-slate-800"
      role="region"
      aria-label="Cookie and Privacy Consent"
    >
      <div class="flex items-start gap-3.5">
        <div class="w-10 h-10 rounded-2xl bg-brand-soft text-brand-primary flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <div class="space-y-1.5 flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-extrabold text-brand-dark">Privacy &amp; Data Security</h4>
            <span class="text-[10px] font-bold text-brand-primary bg-brand-soft px-2 py-0.5 rounded-full">Act 843 &amp; GDPR</span>
          </div>
          <p class="text-xs text-brand-muted leading-relaxed">
            GhanaTech Global uses essential session tokens and encrypted telemetry to evaluate applications and ensure security. We never sell your personal data.
          </p>
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-brand-border/40 flex items-center justify-between gap-2">
        <router-link
          to="/privacy"
          class="text-xs font-semibold text-brand-primary hover:underline"
        >
          Privacy Policy
        </router-link>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-3 py-1.5 text-xs font-bold text-brand-muted hover:text-brand-dark rounded-full transition-colors"
            @click="acceptEssential"
          >
            Essential Only
          </button>
          <button
            type="button"
            class="px-4 py-1.5 text-xs font-bold text-white bg-brand-primary hover:bg-brand-dark rounded-full transition-all shadow-violet-sm"
            @click="acceptAll"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isVisible = ref(false);
const CONSENT_KEY = 'gtg_cookie_consent';

onMounted(() => {
  const existingConsent = localStorage.getItem(CONSENT_KEY);
  if (!existingConsent) {
    // Show after slight delay for polite entrance
    setTimeout(() => {
      isVisible.value = true;
    }, 1200);
  }
});

const acceptAll = () => {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ type: 'all', timestamp: new Date().toISOString() }));
  isVisible.value = false;
};

const acceptEssential = () => {
  localStorage.setItem(CONSENT_KEY, JSON.stringify({ type: 'essential', timestamp: new Date().toISOString() }));
  isVisible.value = false;
};
</script>
