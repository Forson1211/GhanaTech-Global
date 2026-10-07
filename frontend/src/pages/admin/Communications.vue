<template>
  <div class="space-y-6"><div class="flex flex-col sm:flex-row justify-between gap-4"><div><h1 class="text-2xl font-extrabold text-brand-dark">{{ t('Emails & Subscribers') }}</h1><p class="text-xs text-brand-muted mt-1">{{ t('Confirmation messages, placement reminders, and newsletter subscribers.') }}</p></div><Button :loading="processing" :disabled="!state.enabled || !state.configured" @click="process">{{ t('Process Email Queue') }}</Button></div>
    <div class="bg-white p-6 rounded-2xl border border-brand-border/80"><p class="text-sm">{{ t(state.enabled && state.configured ? 'Email delivery is enabled.' : 'Email delivery needs provider configuration.') }}</p><p class="text-xs text-brand-muted mt-2">{{ t('Sent means accepted by the email provider. Inbox delivery is not guaranteed.') }}</p></div>
    <p v-if="error" class="text-red-600 text-sm" role="alert">{{ error }}</p>
    <h2 class="text-base font-bold text-brand-dark">{{ t('Recent Email Messages') }}</h2>
    <Table :loading="loading" :empty="!state.messages.length" :col-span="4"><template #header><th class="px-6 py-3">{{ t('Recipient') }}</th><th class="px-6 py-3">{{ t('Subject') }}</th><th class="px-6 py-3">{{ t('Status') }}</th><th class="px-6 py-3">{{ t('Attempts') }}</th></template><tr v-for="message in state.messages" :key="message._id"><td class="px-6 py-4 text-xs">{{ message.to }}</td><td class="px-6 py-4 text-sm">{{ message.subject }}<p v-if="message.lastError" class="text-xs text-red-600 mt-1">{{ message.lastError }}</p></td><td class="px-6 py-4 text-xs">{{ t(message.status) }}</td><td class="px-6 py-4">{{ message.attempts || 0 }}</td></tr></Table>
    <h2 class="text-base font-bold text-brand-dark">{{ t('Newsletter Subscribers') }}</h2><Table :loading="loading" :empty="!state.subscribers.length" :col-span="2"><template #header><th class="px-6 py-3">{{ t('Email') }}</th><th class="px-6 py-3">{{ t('Date') }}</th></template><tr v-for="subscriber in state.subscribers" :key="subscriber._id"><td class="px-6 py-4">{{ subscriber.email }}</td><td class="px-6 py-4">{{ new Date(subscriber.createdAt).toLocaleDateString(language) }}</td></tr></Table>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import type { ApiResponse } from '@/types/common';
import { useAdminPreferences } from '@/composables/useAdminPreferences';
import { useToast } from '@/composables/useToast';
import Button from '@/components/common/Button.vue';
import Table from '@/components/common/Table.vue';
const { t, language } = useAdminPreferences(), toast = useToast();
const state = ref<{ enabled: boolean; configured: boolean; messages: { _id: string; to: string; subject: string; status: string; attempts: number; lastError?: string }[]; subscribers: { _id: string; email: string; createdAt: string }[] }>({ enabled: false, configured: false, messages: [], subscribers: [] });
const loading = ref(true), processing = ref(false), error = ref('');
async function load() { loading.value = true; error.value = ''; try { const result = await api.get('/admin/communications') as unknown as ApiResponse<typeof state.value>; state.value = result.data; } catch { error.value = t('Communications could not be loaded.'); } finally { loading.value = false; } }
async function process() { if (processing.value) return; processing.value = true; try { await api.post('/admin/communications/process'); toast.success(t('Email queue processed.')); await load(); } catch { toast.error(t('Email processing failed.')); } finally { processing.value = false; } }
onMounted(load);
</script>
