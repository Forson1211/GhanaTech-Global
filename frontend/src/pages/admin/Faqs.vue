<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight"> {{ t("Common Questions") }} </h1>
        <p class="text-xs text-brand-muted mt-0.5"> {{ t("Edit questions and answers displayed in the public accordion.") }} </p>
      </div>

      <Button variant="primary" size="md" @click="openCreateModal">
        <template #icon-left>
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </template> {{ t("Add FAQ Question") }} </Button>
    </div>

    <!-- Table -->
    <Table :loading="loading" :empty="faqs.length === 0" :col-span="5">
      <template #header>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider w-16"> {{ t("Order") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Question & Answer") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Status") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Reorder") }} </th>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider text-right"> {{ t("Actions") }} </th>
      </template>

      <tr v-for="(faq, idx) in faqs" :key="faq._id || idx" class="hover:bg-brand-lightest/40 transition-colors">
        <td class="py-4 px-6 font-mono font-bold text-xs text-brand-primary">
          #{{ faq.order }}
        </td>

        <td class="py-4 px-4">
          <p class="font-bold text-brand-dark text-xs sm:text-sm">{{ faq.question }}</p>
          <p class="text-xs text-brand-muted line-clamp-1 max-w-md mt-0.5">{{ faq.answer }}</p>
        </td>

        <td class="py-4 px-4">
          <StatusBadge :status="faq.isPublished ? 'published' : 'draft'" />
        </td>

        <td class="py-4 px-4 space-x-1">
          <button
            type="button"
            :disabled="idx === 0"
            class="p-1 rounded text-brand-dark hover:bg-brand-soft disabled:opacity-30"
            title="Move Up"
            @click="moveFaq(idx, -1)"
          >
            ↑
          </button>
          <button
            type="button"
            :disabled="idx === faqs.length - 1"
            class="p-1 rounded text-brand-dark hover:bg-brand-soft disabled:opacity-30"
            title="Move Down"
            @click="moveFaq(idx, 1)"
          >
            ↓
          </button>
        </td>

        <td class="py-4 px-6 text-right space-x-2">
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-soft rounded-lg transition-colors"
            @click="togglePublish(faq)"
          >
            {{ faq.isPublished ? 'Unpublish' : 'Publish' }}
          </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-dark hover:bg-brand-soft rounded-lg transition-colors"
            @click="openEditModal(faq)"
          > {{ t("Edit") }} </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 rounded-lg transition-colors"
            @click="confirmDelete(faq._id!, faq.question)"
          > {{ t("Delete") }} </button>
        </td>
      </tr>
    </Table>

    <!-- Modal -->
    <Modal v-model="showModal" :title="isEditing ? 'Edit FAQ Item' : 'Add FAQ Item'" max-width="lg">
      <form class="space-y-4" @submit.prevent="saveFaq">
        <Input v-model="form.question" label="Question" placeholder="e.g. How are candidates assessed?" :required="true" />
        <Textarea v-model="form.answer" label="Answer" :rows="4" :required="true" />
        <Input v-model.number="form.order" type="number" label="Display Order" :required="true" />

        <div class="pt-4 border-t border-brand-border/40 flex justify-end space-x-3">
          <Button variant="ghost" size="sm" @click="showModal = false"> {{ t("Cancel") }} </Button>
          <Button type="submit" variant="primary" size="sm" :loading="isSaving"> {{ t("Save Question") }} </Button>
        </div>
      </form>
    </Modal>

    <!-- Confirm Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete FAQ"
      :message="`Are you sure you want to delete question: '${faqToDeleteQuestion}'?`"
      confirm-text="Delete FAQ"
      @confirm="executeDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAdminPreferences } from '@/composables/useAdminPreferences';
const { t } = useAdminPreferences();
import { ref, onMounted } from 'vue';
import { faqService } from '@/services/faq';
import type { FAQItem } from '@/types/common';
import { useToast } from '@/composables/useToast';
import Table from '@/components/common/Table.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import Input from '@/components/common/Input.vue';
import Textarea from '@/components/common/Textarea.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

const toast = useToast();

const faqs = ref<FAQItem[]>([]);
const loading = ref(true);
const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const currentId = ref<string | null>(null);

const form = ref<any>({
  question: '',
  answer: '',
  order: 1,
  isPublished: true,
});

const showDeleteDialog = ref(false);
const faqToDeleteId = ref<string | null>(null);
const faqToDeleteQuestion = ref('');

const fetchFaqs = async () => {
  loading.value = true;
  try {
    const res = await faqService.getAllFaqs();
    if (res.success && res.data) {
      faqs.value = res.data;
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
    question: '',
    answer: '',
    order: faqs.value.length + 1,
    isPublished: true,
  };
  showModal.value = true;
};

const openEditModal = (faq: FAQItem) => {
  isEditing.value = true;
  currentId.value = faq._id || null;
  form.value = { ...faq };
  showModal.value = true;
};

const saveFaq = async () => {
  isSaving.value = true;
  try {
    if (isEditing.value && currentId.value) {
      await faqService.updateFaq(currentId.value, form.value);
      toast.success('FAQ updated.');
    } else {
      await faqService.createFaq(form.value);
      toast.success('FAQ added.');
    }
    showModal.value = false;
    fetchFaqs();
  } catch {
    toast.error('Failed to save FAQ.');
  } finally {
    isSaving.value = false;
  }
};

const togglePublish = async (faq: FAQItem) => {
  try {
    const newStatus = !faq.isPublished;
    await faqService.togglePublish(faq._id!, newStatus);
    toast.success(`FAQ ${newStatus ? 'published' : 'unpublished'}.`);
    fetchFaqs();
  } catch {
    toast.error('Failed to update status.');
  }
};

const moveFaq = async (idx: number, direction: number) => {
  const targetIdx = idx + direction;
  if (targetIdx < 0 || targetIdx >= faqs.value.length) return;

  const current = faqs.value[idx];
  const target = faqs.value[targetIdx];

  const tempOrder = current.order;
  current.order = target.order;
  target.order = tempOrder;

  // Swap array
  faqs.value.splice(idx, 1);
  faqs.value.splice(targetIdx, 0, current);

  try {
    const orders = faqs.value.map(f => ({ id: f._id || '', order: f.order }));
    await faqService.reorderFaqs(orders);
    toast.success('Order saved.');
  } catch {
    fetchFaqs();
  }
};

const confirmDelete = (id: string, q: string) => {
  faqToDeleteId.value = id;
  faqToDeleteQuestion.value = q;
  showDeleteDialog.value = true;
};

const executeDelete = async () => {
  if (!faqToDeleteId.value) return;
  try {
    await faqService.deleteFaq(faqToDeleteId.value);
    toast.success('FAQ deleted.');
    showDeleteDialog.value = false;
    fetchFaqs();
  } catch {
    toast.error('Failed to delete FAQ.');
  }
};

onMounted(() => {
  fetchFaqs();
});
</script>
