<template>
  <div class="space-y-6 max-w-4xl">
    <div><h1 class="text-2xl font-extrabold text-brand-dark">{{ t('My Account') }}</h1><p class="text-xs text-brand-muted mt-1">{{ t('Manage your profile, password, and sign-in history.') }}</p></div>
    <form class="bg-white p-6 sm:p-8 rounded-3xl border border-brand-border/80 space-y-6" @submit.prevent="save">
      <h2 class="text-base font-bold text-brand-dark">{{ t('Your Profile') }}</h2>
      <div class="grid sm:grid-cols-2 gap-5"><Input v-model="form.name" :label="t('Name')" required /><Input v-model="form.email" :label="t('Email')" type="email" required /></div>
      <h2 class="text-base font-bold text-brand-dark border-t border-brand-border/40 pt-5">{{ t('Change Password') }}</h2>
      <p class="text-xs text-brand-muted">{{ t('Leave password fields blank to keep your current password.') }}</p>
      <Input v-model="form.currentPassword" :label="t('Current Password')" type="password" autocomplete="current-password" />
      <div class="grid sm:grid-cols-2 gap-5"><Input v-model="form.newPassword" :label="t('New Password')" type="password" autocomplete="new-password" /><Input v-model="confirmation" :label="t('Confirm Password')" type="password" autocomplete="new-password" /></div>
      <p v-if="error" role="alert" class="text-sm text-red-600">{{ error }}</p>
      <Button type="submit" :loading="saving">{{ t('Save Changes') }}</Button>
    </form>
    <section class="space-y-4"><h2 class="text-base font-bold text-brand-dark">{{ t('Login Activity') }}</h2><p class="text-xs text-brand-muted">{{ t('Recent successful sign-ins, retained for 90 days.') }}</p><p v-if="activityError" role="alert" class="text-sm text-red-600">{{ activityError }}</p>
      <Table :loading="loading" :empty="!activity.length" :col-span="2"><template #header><th class="px-6 py-3">{{ t('Date') }}</th><th class="px-6 py-3">{{ t('Device') }}</th></template><tr v-for="entry in activity" :key="entry._id"><td class="px-6 py-4 whitespace-nowrap">{{ new Date(entry.signedInAt).toLocaleString(language) }}</td><td class="px-6 py-4 break-all text-xs">{{ entry.device }}</td></tr></Table>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { authService } from '@/services/auth';
import { useAuth } from '@/composables/useAuth';
import { useAdminPreferences } from '@/composables/useAdminPreferences';
import { useToast } from '@/composables/useToast';
import Input from '@/components/common/Input.vue';
import Button from '@/components/common/Button.vue';
import Table from '@/components/common/Table.vue';
const { user, checkAuth } = useAuth();
const { t, language } = useAdminPreferences();
const toast = useToast();
const form = ref({ name: user.value?.name || '', email: user.value?.email || '', currentPassword: '', newPassword: '' });
const confirmation = ref(''), error = ref(''), activityError = ref('');
const saving = ref(false), loading = ref(true);
const activity = ref<{ _id: string; signedInAt: string; device: string }[]>([]);
async function save() {
  error.value = '';
  if (form.value.newPassword && (form.value.newPassword.length < 12 || form.value.newPassword !== confirmation.value || !form.value.currentPassword)) { error.value = t('Use at least 12 characters, confirm the password, and enter your current password.'); return; }
  saving.value = true;
  try {
    const { name, email, currentPassword, newPassword } = form.value;
    const result = await authService.updateProfile({ name, email, ...(newPassword ? { currentPassword, newPassword } : {}) });
    if (!result.success) throw new Error(result.message);
    await checkAuth(); form.value.currentPassword = ''; form.value.newPassword = ''; confirmation.value = '';
    toast.success(t('Profile saved.'));
  } catch (err: any) { error.value = err?.response?.data?.message || t('Your profile could not be saved.'); }
  finally { saving.value = false; }
}
onMounted(async () => {
  await checkAuth(); form.value.name = user.value?.name || ''; form.value.email = user.value?.email || '';
  try { const result = await authService.getActivity(); activity.value = result.data || []; }
  catch { activityError.value = t('Sign-in history could not be loaded.'); }
  finally { loading.value = false; }
});
</script>
