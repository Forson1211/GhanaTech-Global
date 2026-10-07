<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="text-2xl font-extrabold text-brand-dark">{{ t(isJobs ? 'Job Openings' : 'Pages & Articles') }}</h1><p class="text-xs text-brand-muted mt-1">{{ t('Draft, review, and publish approved information.') }}</p></div><Button @click="open()">{{ t('Add New') }}</Button></div>
    <div class="grid sm:grid-cols-2 gap-4"><SearchInput v-model="search" :placeholder="t('Search titles...')" /><Select v-if="!isJobs" v-model="kindFilter" :label="t('Content Type')" :options="['All', 'leadership', 'insight', 'privacy', 'terms']" /></div>
    <p v-if="loadError" class="text-sm text-red-600" role="alert">{{ loadError }} <button class="underline" @click="load">{{ t('Retry') }}</button></p>
    <Table :loading="loading" :empty="!filtered.length" :col-span="4"><template #header><th class="px-6 py-3">{{ t('Title') }}</th><th class="px-6 py-3">{{ t(isJobs ? 'Category' : 'Content Type') }}</th><th class="px-6 py-3">{{ t('Status') }}</th><th class="px-6 py-3">{{ t('Actions') }}</th></template>
      <tr v-for="record in filtered" :key="record._id"><td class="px-6 py-4 font-semibold text-brand-dark">{{ record.title }}</td><td class="px-6 py-4">{{ 'category' in record ? record.category : record.kind }}</td><td class="px-6 py-4"><StatusBadge :status="record.status" /></td><td class="px-6 py-4"><div class="flex gap-2"><Button size="sm" variant="ghost" @click="open(record)">{{ t('Edit') }}</Button><Button size="sm" variant="ghost" @click="deleting = record">{{ t('Delete') }}</Button></div></td></tr>
    </Table>
    <Modal v-model="showModal" :title="t(editingId ? 'Edit Record' : 'Add New')" max-width="2xl">
      <form class="space-y-5" @submit.prevent="save">
        <Input v-model="form.title" :label="t('Title')" required />
        <template v-if="isJobs">
          <div class="grid sm:grid-cols-2 gap-4"><Select v-model="form.category" :label="t('Technology Area')" :options="TALENT_TECH_AREAS" /><Select v-model="form.type" :label="t('Employment Type')" :options="['Full-time', 'Part-time', 'Contract', 'Project', 'Managed team']" /></div>
          <div class="grid sm:grid-cols-2 gap-4"><Input v-model="form.location" :label="t('Location')" required /><Input v-model="form.salary" :label="t('Compensation')" /></div>
          <Textarea v-model="form.description" :label="t('Description')" :rows="4" required />
          <Textarea v-model="responsibilities" :label="t('Responsibilities (one per line)')" :rows="3" /><Textarea v-model="requirements" :label="t('Requirements (one per line)')" :rows="3" /><Input v-model="skills" :label="t('Skills (comma separated)')" />
          <Input v-model="closingDate" :label="t('Closing Date')" type="date" />
        </template>
        <template v-else>
          <div class="grid sm:grid-cols-2 gap-4"><Select v-model="form.kind" :label="t('Content Type')" :options="['leadership', 'insight', 'privacy', 'terms']" /><Input v-if="!['privacy','terms'].includes(form.kind)" v-model="form.slug" :label="t('URL Slug')" placeholder="example-article" required /></div>
          <Input v-model="form.author" :label="t('Author / Role')" /><Textarea v-model="form.summary" :label="t('Summary')" :rows="2" /><Textarea v-model="form.body" :label="t('Content')" :rows="10" required />
          <div class="grid sm:grid-cols-2 gap-4"><Input v-model="form.imageUrl" :label="t('Image URL')" type="url" /><Input v-model="form.order" :label="t('Display Order')" type="number" /></div>
          <p class="text-xs text-brand-muted">{{ t('Publish policies only after reviewing and approving their content.') }}</p>
        </template>
        <Select v-model="form.status" :label="t('Status')" :options="isJobs ? ['draft','published','closed'] : ['draft','published']" />
        <p v-if="saveError" role="alert" class="text-sm text-red-600">{{ saveError }}</p>
        <div class="flex justify-end gap-3 border-t border-brand-border/40 pt-4"><Button variant="ghost" @click="showModal = false">{{ t('Cancel') }}</Button><Button type="submit" :loading="saving">{{ t('Save Changes') }}</Button></div>
      </form>
    </Modal>
    <ConfirmDialog :model-value="!!deleting" :title="t('Delete Record')" :message="t('Delete this record permanently?')" @cancel="deleting = null" @confirm="remove" />
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { publishingService, type JobPosting, type SiteContent } from '@/services/publishing';
import { TALENT_TECH_AREAS } from '@/utils/constants';
import { useAdminPreferences } from '@/composables/useAdminPreferences';
import { useToast } from '@/composables/useToast';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import Select from '@/components/common/Select.vue';
import Textarea from '@/components/common/Textarea.vue';
import Modal from '@/components/common/Modal.vue';
import Table from '@/components/common/Table.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
const route = useRoute(), toast = useToast();
const { t } = useAdminPreferences();
const isJobs = computed(() => route.path === '/admin/jobs');
const resource = computed(() => isJobs.value ? 'jobs' : 'content');
const records = ref<(JobPosting | SiteContent)[]>([]), deleting = ref<JobPosting | SiteContent | null>(null);
const loading = ref(false), saving = ref(false), showModal = ref(false);
const loadError = ref(''), saveError = ref(''), search = ref(''), kindFilter = ref('All'), editingId = ref<string>();
const responsibilities = ref(''), requirements = ref(''), skills = ref(''), closingDate = ref('');
const form = ref<any>({});
const filtered = computed(() => records.value.filter(record => record.title.toLowerCase().includes(search.value.toLowerCase()) && (isJobs.value || kindFilter.value === 'All' || ('kind' in record && record.kind === kindFilter.value))));
async function load() {
  loading.value = true; loadError.value = '';
  try { const result = await publishingService.list(resource.value); records.value = result.data || []; }
  catch { loadError.value = t('Records could not be loaded.'); }
  finally { loading.value = false; }
}
function open(record?: JobPosting | SiteContent) {
  editingId.value = record?._id; saveError.value = '';
  form.value = record ? { ...record } : isJobs.value ? { title: '', category: TALENT_TECH_AREAS[0], type: 'Full-time', location: 'Remote — Ghana', salary: 'Discussed during matching', description: '', status: 'draft' } : { kind: 'insight', title: '', slug: '', summary: '', body: '', imageUrl: '', author: '', order: 0, status: 'draft' };
  const job = record && 'category' in record ? record : undefined;
  responsibilities.value = job?.responsibilities.join('\n') || ''; requirements.value = job?.requirements.join('\n') || ''; skills.value = job?.techStack.join(', ') || ''; closingDate.value = job?.closesAt?.slice(0,10) || ''; showModal.value = true;
}
const lines = (value: string) => value.split('\n').map(item => item.trim()).filter(Boolean);
async function save() {
  if (saving.value) return; saving.value = true; saveError.value = '';
  try {
    const value = isJobs.value ? { ...form.value, responsibilities: lines(responsibilities.value), requirements: lines(requirements.value), techStack: skills.value.split(',').map(item => item.trim()).filter(Boolean), closesAt: closingDate.value ? new Date(closingDate.value + 'T23:59:59Z').toISOString() : null } : { ...form.value, slug: ['privacy','terms'].includes(form.value.kind) ? form.value.kind : form.value.slug, order: Number(form.value.order) };
    await publishingService.save(resource.value, value, editingId.value); showModal.value = false; toast.success(t('Record saved.')); await load();
  } catch (error: any) { saveError.value = error?.response?.data?.message || t('Record could not be saved.'); }
  finally { saving.value = false; }
}
async function remove() { if (!deleting.value) return; try { await publishingService.remove(resource.value, deleting.value._id); deleting.value = null; toast.success(t('Record deleted.')); await load(); } catch { toast.error(t('Record could not be deleted.')); } }
watch(resource, () => { records.value = []; showModal.value = false; search.value = ''; kindFilter.value = 'All'; load(); }, { immediate: true });
</script>
