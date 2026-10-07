<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight"> {{ t("Customer Reviews") }} </h1>
        <p class="text-xs text-brand-muted mt-0.5"> {{ t("Manage demo feedback and client reviews displayed in the homepage carousel.") }} </p>
      </div>

      <Button variant="primary" size="md" @click="openCreateModal">
        <template #icon-left>
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </template> {{ t("Add Testimonial") }} </Button>
    </div>

    <!-- Table -->
    <Table :loading="loading" :empty="testimonials.length === 0" :col-span="5">
      <template #header>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Client & Role") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Company") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Quote Snippet") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Status") }} </th>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider text-right"> {{ t("Actions") }} </th>
      </template>

      <tr v-for="testimonial in testimonials" :key="testimonial._id" class="hover:bg-brand-lightest/40 transition-colors">
        <td class="py-4 px-6">
          <p class="font-bold text-brand-dark text-sm">{{ testimonial.name }}</p>
          <p class="text-xs text-brand-muted">{{ testimonial.role }}</p>
        </td>

        <td class="py-4 px-4 text-xs font-semibold text-brand-dark">
          {{ testimonial.company }}
        </td>

        <td class="py-4 px-4 text-xs text-brand-muted line-clamp-2 max-w-sm">
          "{{ testimonial.quote }}"
        </td>

        <td class="py-4 px-4">
          <StatusBadge :status="testimonial.status" />
        </td>

        <td class="py-4 px-6 text-right space-x-2">
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-soft rounded-lg transition-colors"
            @click="togglePublish(testimonial)"
          >
            {{ testimonial.status === 'published' ? 'Unpublish' : 'Publish' }}
          </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-dark hover:bg-brand-soft rounded-lg transition-colors"
            @click="openEditModal(testimonial)"
          > {{ t("Edit") }} </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 rounded-lg transition-colors"
            @click="confirmDelete(testimonial._id!, testimonial.name)"
          > {{ t("Delete") }} </button>
        </td>
      </tr>
    </Table>

    <!-- Modal -->
    <Modal v-model="showModal" :title="isEditing ? 'Edit Testimonial' : 'Add Testimonial'" max-width="lg">
      <form class="space-y-4" @submit.prevent="saveTestimonial">
        <div class="grid grid-cols-2 gap-4">
          <Input v-model="form.name" label="Client Name" placeholder="Marcus Vance" :required="true" />
          <Input v-model="form.role" label="Role / Title" placeholder="VP of Engineering" :required="true" />
        </div>
        <Input v-model="form.company" label="Company Name & Location" placeholder="FinTech Platform (Austin, TX)" :required="true" />
        <Textarea v-model="form.quote" label="Quote / Feedback" :rows="4" :required="true" />
        <Select v-model="form.status" label="Status" :options="['published', 'draft']" />

        <div class="pt-4 border-t border-brand-border/40 flex justify-end space-x-3">
          <Button variant="ghost" size="sm" @click="showModal = false"> {{ t("Cancel") }} </Button>
          <Button type="submit" variant="primary" size="sm" :loading="isSaving"> {{ t("Save Testimonial") }} </Button>
        </div>
      </form>
    </Modal>

    <!-- Confirm Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete Testimonial"
      :message="`Are you sure you want to delete testimonial by ${testimonialToDeleteName}?`"
      confirm-text="Delete Testimonial"
      @confirm="executeDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAdminPreferences } from '@/composables/useAdminPreferences';
const { t } = useAdminPreferences();
import { ref, onMounted } from 'vue';
import { testimonialService } from '@/services/testimonials';
import type { TestimonialItem } from '@/types/common';
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

const testimonials = ref<TestimonialItem[]>([]);
const loading = ref(true);
const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const currentId = ref<string | null>(null);

const form = ref<any>({
  name: '',
  role: '',
  company: '',
  quote: '',
  status: 'published',
});

const showDeleteDialog = ref(false);
const testimonialToDeleteId = ref<string | null>(null);
const testimonialToDeleteName = ref('');

const fetchTestimonials = async () => {
  loading.value = true;
  try {
    const res = await testimonialService.getAllTestimonials();
    if (res.success && res.data) {
      testimonials.value = res.data;
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
  form.value = { name: '', role: '', company: '', quote: '', status: 'published' };
  showModal.value = true;
};

const openEditModal = (testimonial: TestimonialItem) => {
  isEditing.value = true;
  currentId.value = testimonial._id || null;
  form.value = { ...testimonial };
  showModal.value = true;
};

const saveTestimonial = async () => {
  isSaving.value = true;
  try {
    if (isEditing.value && currentId.value) {
      await testimonialService.updateTestimonial(currentId.value, form.value);
      toast.success('Testimonial updated.');
    } else {
      await testimonialService.createTestimonial(form.value);
      toast.success('Testimonial added.');
    }
    showModal.value = false;
    fetchTestimonials();
  } catch {
    toast.error('Failed to save testimonial.');
  } finally {
    isSaving.value = false;
  }
};

const togglePublish = async (testimonial: TestimonialItem) => {
  try {
    const newStatus = testimonial.status === 'published' ? 'draft' : 'published';
    await testimonialService.togglePublish(testimonial._id!, newStatus);
    toast.success(`Testimonial status changed to ${newStatus}.`);
    fetchTestimonials();
  } catch {
    toast.error('Failed to update status.');
  }
};

const confirmDelete = (id: string, name: string) => {
  testimonialToDeleteId.value = id;
  testimonialToDeleteName.value = name;
  showDeleteDialog.value = true;
};

const executeDelete = async () => {
  if (!testimonialToDeleteId.value) return;
  try {
    await testimonialService.deleteTestimonial(testimonialToDeleteId.value);
    toast.success('Testimonial deleted.');
    showDeleteDialog.value = false;
    fetchTestimonials();
  } catch {
    toast.error('Failed to delete testimonial.');
  }
};

onMounted(() => {
  fetchTestimonials();
});
</script>
