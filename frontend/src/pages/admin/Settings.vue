<template>
  <div class="space-y-6 max-w-4xl">
    <div>
      <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight">Site & Platform Settings</h1>
      <p class="text-xs text-brand-muted mt-0.5">Configure platform branding, contact destinations, and operational parameters.</p>
    </div>

    <div class="bg-white p-8 rounded-3xl border border-brand-border/80 shadow-violet-sm space-y-6">
      <h3 class="text-base font-bold text-brand-dark border-b border-brand-border/40 pb-3">General Information</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input v-model="settings.companyName" label="Company Name" />
        <Input v-model="settings.tagline" label="Tagline" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input v-model="settings.contactEmail" label="Notification Inbound Email" />
        <Input v-model="settings.supportPhone" label="Contact Phone" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input v-model="settings.accraOfficeAddress" label="Ghana Office Location" />
        <Input v-model="settings.usOfficeAddress" label="U.S. Representation Location" />
      </div>

      <h3 class="text-base font-bold text-brand-dark border-b border-brand-border/40 pb-3 pt-4">Operational Flags</h3>

      <div class="space-y-3">
        <label class="flex items-center space-x-3 text-xs font-semibold text-brand-dark cursor-pointer">
          <input
            v-model="settings.allowPublicApplications"
            type="checkbox"
            class="rounded border-brand-border text-brand-primary focus:ring-brand-primary h-4 w-4"
          />
          <span>Enable Public Candidate Applications (/join-talent)</span>
        </label>

        <label class="flex items-center space-x-3 text-xs font-semibold text-brand-dark cursor-pointer">
          <input
            v-model="settings.allowLeadSubmissions"
            type="checkbox"
            class="rounded border-brand-border text-brand-primary focus:ring-brand-primary h-4 w-4"
          />
          <span>Enable Inbound Company Leads (/hire-talent)</span>
        </label>
      </div>

      <div class="pt-4 border-t border-brand-border/40 flex justify-end">
        <Button variant="primary" size="md" :loading="saving" @click="saveSettings">
          Save Platform Settings
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from '@/composables/useToast';
import Input from '@/components/common/Input.vue';
import Button from '@/components/common/Button.vue';

const toast = useToast();
const saving = ref(false);

const settings = ref({
  companyName: 'GhanaTech Global',
  tagline: 'U.S.–Ghana Technology Talent & Services',
  contactEmail: 'advisors@ghanatechglobal.com',
  supportPhone: '+1 (726) 227-2605',
  accraOfficeAddress: 'Airport Residential Area, Accra, Ghana',
  usOfficeAddress: 'Austin, TX & New York, NY',
  allowPublicApplications: true,
  allowLeadSubmissions: true,
});

const saveSettings = () => {
  saving.value = true;
  setTimeout(() => {
    saving.value = false;
    toast.success('Platform settings saved successfully.');
  }, 400);
};
</script>
