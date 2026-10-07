<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight"> {{ t("Services") }} </h1>
        <p class="text-xs text-brand-muted mt-0.5"> {{ t("Publish, edit, and configure managed service offerings and capability items.") }} </p>
      </div>

      <Button variant="primary" size="md" @click="openCreateModal">
        <template #icon-left>
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </template> {{ t("Add Managed Service") }} </Button>
    </div>

    <!-- Services Table -->
    <Table :loading="loading" :empty="services.length === 0" :col-span="5">
      <template #header>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Service Title") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Slug") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Capabilities") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Status") }} </th>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider text-right"> {{ t("Actions") }} </th>
      </template>

      <tr v-for="s in services" :key="s._id" class="hover:bg-brand-lightest/40 transition-colors">
        <td class="py-4 px-6">
          <p class="font-bold text-brand-dark text-sm">{{ s.title }}</p>
          <p class="text-xs text-brand-muted line-clamp-1 max-w-sm">{{ s.description }}</p>
        </td>

        <td class="py-4 px-4 font-mono text-xs text-brand-primary">
          /services/{{ s.slug }}
        </td>

        <td class="py-4 px-4 text-xs font-semibold text-brand-dark">
          {{ s.capabilities.length }} capabilities
        </td>

        <td class="py-4 px-4">
          <StatusBadge :status="s.status" />
        </td>

        <td class="py-4 px-6 text-right space-x-2">
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-soft rounded-lg transition-colors"
            @click="togglePublish(s)"
          >
            {{ s.status === 'published' ? 'Unpublish' : 'Publish' }}
          </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-dark hover:bg-brand-soft rounded-lg transition-colors"
            @click="openEditModal(s)"
          > {{ t("Edit") }} </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 rounded-lg transition-colors"
            @click="confirmDelete(s._id, s.title)"
          > {{ t("Delete") }} </button>
        </td>
      </tr>
    </Table>

    <!-- Create / Edit Modal -->
    <Modal v-model="showModal" :title="isEditing ? 'Edit Managed Service' : 'Add Managed Service'" max-width="lg">
      <form class="space-y-4" @submit.prevent="saveService">
        <Input v-model="form.title" label="Service Title" placeholder="Cybersecurity" :required="true" />
        <Input v-model="form.slug" label="URL Slug" placeholder="cybersecurity" :required="true" />
        <Textarea v-model="form.description" label="Service Description" :rows="3" :required="true" />
        <Textarea
          v-model="capabilitiesInput"
          label="Capabilities (one per line)"
          placeholder="24/7 SOC Monitoring&#10;SIEM Tuning&#10;IAM Governance"
          :rows="4"
          :required="true"
        />
        <Select v-model="form.status" label="Publish Status" :options="['published', 'draft']" />

        <div class="pt-4 border-t border-brand-border/40 flex justify-end space-x-3">
          <Button variant="ghost" size="sm" @click="showModal = false"> {{ t("Cancel") }} </Button>
          <Button type="submit" variant="primary" size="sm" :loading="isSaving"> {{ t("Save Service") }} </Button>
        </div>
      </form>
    </Modal>

    <!-- Confirm Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete Service"
      :message="`Are you sure you want to delete service '${serviceToDeleteTitle}'?`"
      confirm-text="Delete Service"
      @confirm="executeDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAdminPreferences } from '@/composables/useAdminPreferences';
const { t } = useAdminPreferences();
import { ref, onMounted } from 'vue';
import { servicesService } from '@/services/services';
import type { ServiceItem } from '@/types/service';
import { useToast } from '@/composables/useToast';
import Table from '@/components/common/Table.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import Input from '@/components/common/Input.vue';
import Select from '@/components/common/Select.vue';
import Textarea from '@/components/common/Textarea.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

const toast = useToast();

const services = ref<ServiceItem[]>([]);
const loading = ref(true);
const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const currentId = ref<string | null>(null);

const capabilitiesInput = ref('');
const form = ref<any>({
  title: '',
  slug: '',
  description: '',
  status: 'published',
});

const showDeleteDialog = ref(false);
const serviceToDeleteId = ref<string | null>(null);
const serviceToDeleteTitle = ref('');

const fetchServices = async () => {
  loading.value = true;
  try {
    const res = await servicesService.getAdminServices();
    if (res.success && res.data) {
      services.value = res.data;
    }
  } catch {
    // Keep fallback list
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  currentId.value = null;
  form.value = {
    title: '',
    slug: '',
    description: '',
    status: 'published',
  };
  capabilitiesInput.value = '';
  showModal.value = true;
};

const openEditModal = (s: ServiceItem) => {
  isEditing.value = true;
  currentId.value = s._id;
  form.value = {
    title: s.title,
    slug: s.slug,
    description: s.description,
    status: s.status,
  };
  capabilitiesInput.value = Array.isArray(s.capabilities)
    ? s.capabilities.map((c: any) => (typeof c === 'string' ? c : c.title)).join('\n')
    : '';
  showModal.value = true;
};

const saveService = async () => {
  isSaving.value = true;
  try {
    const payload = {
      ...form.value,
      capabilities: capabilitiesInput.value.split('\n').map(c => c.trim()).filter(Boolean),
    };

    if (isEditing.value && currentId.value) {
      await servicesService.updateService(currentId.value, payload);
      toast.success('Service updated.');
    } else {
      await servicesService.createService(payload);
      toast.success('Service created.');
    }
    showModal.value = false;
    fetchServices();
  } catch {
    toast.error('Failed to save service.');
  } finally {
    isSaving.value = false;
  }
};

const togglePublish = async (s: ServiceItem) => {
  try {
    const newStatus = s.status === 'published' ? 'draft' : 'published';
    await servicesService.updateService(s._id, { status: newStatus });
    toast.success(`Service status changed to ${newStatus}.`);
    fetchServices();
  } catch {
    toast.error('Failed to update status.');
  }
};

const confirmDelete = (id: string, title: string) => {
  serviceToDeleteId.value = id;
  serviceToDeleteTitle.value = title;
  showDeleteDialog.value = true;
};

const executeDelete = async () => {
  if (!serviceToDeleteId.value) return;
  try {
    await servicesService.deleteService(serviceToDeleteId.value);
    toast.success('Service deleted.');
    showDeleteDialog.value = false;
    fetchServices();
  } catch {
    toast.error('Failed to delete service.');
  }
};

onMounted(() => {
  fetchServices();
});
</script>
