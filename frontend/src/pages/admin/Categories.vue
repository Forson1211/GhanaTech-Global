<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight"> {{ t("Job Categories") }} </h1>
        <p class="text-xs text-brand-muted mt-0.5"> {{ t("Manage the 4 primary technology domains and catalog classifications.") }} </p>
      </div>

      <Button variant="primary" size="md" @click="openCreateModal">
        <template #icon-left>
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </template> {{ t("Add Category") }} </Button>
    </div>

    <!-- Categories Table -->
    <Table :loading="loading" :empty="categories.length === 0" :col-span="4">
      <template #header>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Category Name") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Slug") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Status") }} </th>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider text-right"> {{ t("Actions") }} </th>
      </template>

      <tr v-for="cat in categories" :key="cat._id" class="hover:bg-brand-lightest/40 transition-colors">
        <td class="py-4 px-6">
          <p class="font-bold text-brand-dark text-sm">{{ cat.name }}</p>
          <p class="text-xs text-brand-muted">{{ cat.description }}</p>
        </td>

        <td class="py-4 px-4 font-mono text-xs text-brand-primary">
          {{ cat.slug }}
        </td>

        <td class="py-4 px-4">
          <StatusBadge :status="cat.status || 'published'" />
        </td>

        <td class="py-4 px-6 text-right space-x-2">
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-soft rounded-lg transition-colors"
            @click="openEditModal(cat)"
          > {{ t("Edit") }} </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 rounded-lg transition-colors"
            @click="confirmDelete(cat._id, cat.name)"
          > {{ t("Delete") }} </button>
        </td>
      </tr>
    </Table>

    <!-- Modal -->
    <Modal v-model="showModal" :title="isEditing ? 'Edit Category' : 'Add Category'" max-width="md">
      <form class="space-y-4" @submit.prevent="saveCategory">
        <Input v-model="form.name" label="Category Name" placeholder="Cybersecurity" :required="true" />
        <Input v-model="form.slug" label="Slug" placeholder="cybersecurity" :required="true" />
        <Textarea v-model="form.description" label="Description" :rows="3" />
        <Select v-model="form.status" label="Status" :options="['published', 'draft']" />

        <div class="pt-4 border-t border-brand-border/40 flex justify-end space-x-3">
          <Button variant="ghost" size="sm" @click="showModal = false"> {{ t("Cancel") }} </Button>
          <Button type="submit" variant="primary" size="sm" :loading="isSaving"> {{ t("Save Category") }} </Button>
        </div>
      </form>
    </Modal>

    <!-- Confirm Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete Category"
      :message="`Are you sure you want to delete category '${catToDeleteName}'?`"
      confirm-text="Delete Category"
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
import type { TechnologyCategory } from '@/types/service';
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

const categories = ref<TechnologyCategory[]>([]);
const loading = ref(true);
const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const currentId = ref<string | null>(null);

const form = ref<any>({
  name: '',
  slug: '',
  description: '',
  status: 'published',
});

const showDeleteDialog = ref(false);
const catToDeleteId = ref<string | null>(null);
const catToDeleteName = ref('');

const fetchCategories = async () => {
  loading.value = true;
  try {
    const res = await servicesService.getAdminCategories();
    if (res.success && res.data) {
      categories.value = res.data;
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
  form.value = { name: '', slug: '', description: '', status: 'published' };
  showModal.value = true;
};

const openEditModal = (cat: TechnologyCategory) => {
  isEditing.value = true;
  currentId.value = cat._id;
  form.value = { ...cat };
  showModal.value = true;
};

const saveCategory = async () => {
  isSaving.value = true;
  try {
    if (isEditing.value && currentId.value) {
      await servicesService.updateCategory(currentId.value, form.value);
      toast.success('Category updated.');
    } else {
      await servicesService.createCategory(form.value);
      toast.success('Category created.');
    }
    showModal.value = false;
    fetchCategories();
  } catch {
    toast.error('Failed to save category.');
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = (id: string, name: string) => {
  catToDeleteId.value = id;
  catToDeleteName.value = name;
  showDeleteDialog.value = true;
};

const executeDelete = async () => {
  if (!catToDeleteId.value) return;
  try {
    await servicesService.deleteCategory(catToDeleteId.value);
    toast.success('Category deleted.');
    showDeleteDialog.value = false;
    fetchCategories();
  } catch {
    toast.error('Failed to delete category.');
  }
};

onMounted(() => {
  fetchCategories();
});
</script>
