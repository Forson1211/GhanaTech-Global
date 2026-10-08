<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight"> {{ t("Cost Calculator") }} </h1>
        <p class="text-xs text-brand-muted mt-0.5"> {{ t("Edit role salary baselines. Admin updates immediately affect the public value calculator.") }} </p>
      </div>

      <Button variant="primary" size="md" @click="openCreateModal">
        <template #icon-left>
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </template> {{ t("Add Role Baseline") }} </Button>
    </div>

    <!-- Table -->
    <Table :loading="loading" :empty="configs.length === 0" :col-span="6">
      <template #header>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Role Title") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Seniority Baseline") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Estimated U.S. Cost") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("GhanaTech Cost") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Annual Savings") }} </th>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider text-right"> {{ t("Actions") }} </th>
      </template>

      <tr v-for="cfg in configs" :key="cfg._id || cfg.role" class="hover:bg-brand-lightest/40 transition-colors">
        <td class="py-4 px-6 font-bold text-brand-dark text-xs sm:text-sm">
          {{ cfg.role }}
        </td>

        <td class="py-4 px-4 text-xs font-semibold text-brand-primary">
          {{ cfg.seniority }}
        </td>

        <td class="py-4 px-4 text-xs font-bold text-brand-dark">
          {{ formatCurrency(cfg.usEstimatedAnnualCost) }}
        </td>

        <td class="py-4 px-4 text-xs font-bold text-brand-primary">
          {{ formatCurrency(cfg.ghanaTechEstimatedAnnualCost) }}
        </td>

        <td class="py-4 px-4 text-xs font-bold text-brand-dark">
          {{ formatCurrency(cfg.usEstimatedAnnualCost - cfg.ghanaTechEstimatedAnnualCost) }}
          <span class="block text-[10px] text-brand-muted font-normal">
            {{ Math.round(((cfg.usEstimatedAnnualCost - cfg.ghanaTechEstimatedAnnualCost) / cfg.usEstimatedAnnualCost) * 100) }} {{ t("% saved") }} </span>
        </td>

        <td class="py-4 px-6 text-right space-x-2">
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-soft rounded-lg transition-colors"
            @click="openEditModal(cfg)"
          > {{ t("Edit Baseline") }} </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 rounded-lg transition-colors"
            @click="confirmDelete(cfg._id || cfg.id, cfg.role)"
          > {{ t("Delete") }} </button>
        </td>
      </tr>
    </Table>

    <!-- Modal -->
    <Modal v-model="showModal" :title="isEditing ? 'Edit Calculator Assumption' : 'Add Role Assumption'" max-width="md">
      <form class="space-y-4" @submit.prevent="saveConfig">
        <Input v-model="form.role" label="Role Title" placeholder="e.g. Security Engineer" :required="true" />
        <Select v-model="form.seniority" label="Seniority Baseline" :options="['Junior', 'Mid-Level', 'Senior']" :required="true" />
        <Input
          v-model.number="form.usEstimatedAnnualCost"
          type="number"
          label="U.S. Estimated Annual Cost ($)"
          placeholder="130000"
          :min="0.01"
          step="0.01"
          :required="true"
        />
        <Input
          v-model.number="form.ghanaTechEstimatedAnnualCost"
          type="number"
          label="GhanaTech Estimated Annual Cost ($)"
          placeholder="42000"
          :min="0"
          step="0.01"
          :required="true"
        />

        <div class="pt-4 border-t border-brand-border/40 flex justify-end space-x-3">
          <Button variant="ghost" size="sm" @click="showModal = false"> {{ t("Cancel") }} </Button>
          <Button type="submit" variant="primary" size="sm" :loading="isSaving"> {{ t("Save Assumptions") }} </Button>
        </div>
      </form>
    </Modal>

    <!-- Confirm Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete Calculator Role"
      :message="`Are you sure you want to delete ${roleToDeleteName}?`"
      confirm-text="Delete Role"
      @confirm="executeDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAdminPreferences } from '@/composables/useAdminPreferences';
const { t } = useAdminPreferences();
import { ref, onMounted } from 'vue';
import { calculatorService } from '@/services/calculator';
import type { CalculatorConfigItem } from '@/types/common';
import { formatCurrency } from '@/utils/formatters';
import { useToast } from '@/composables/useToast';
import Table from '@/components/common/Table.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import Input from '@/components/common/Input.vue';
import Select from '@/components/common/Select.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

const toast = useToast();

const configs = ref<CalculatorConfigItem[]>([]);
const loading = ref(true);
const showModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const currentId = ref<string | null>(null);

const form = ref<CalculatorConfigItem>({
  role: '',
  seniority: 'Mid-Level',
  usEstimatedAnnualCost: 130000,
  ghanaTechEstimatedAnnualCost: 40000,
});

const showDeleteDialog = ref(false);
const roleToDeleteId = ref<string | null>(null);
const roleToDeleteName = ref('');

const fetchConfigs = async () => {
  loading.value = true;
  try {
    const res = await calculatorService.getAllConfigurations();
    if (res.success && res.data) {
      configs.value = res.data;
    }
  } catch {
    toast.error('Failed to load calculator assumptions. Please try again.');
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
  isEditing.value = false;
  currentId.value = null;
  form.value = {
    role: '',
    seniority: 'Mid-Level',
    usEstimatedAnnualCost: 130000,
    ghanaTechEstimatedAnnualCost: 40000,
  };
  showModal.value = true;
};

const openEditModal = (cfg: CalculatorConfigItem) => {
  isEditing.value = true;
  currentId.value = cfg._id || cfg.id || null;
  form.value = { ...cfg };
  showModal.value = true;
};

const saveConfig = async () => {
  if (isSaving.value) return;
  if (!form.value.role.trim() || !Number.isFinite(Number(form.value.usEstimatedAnnualCost)) || Number(form.value.usEstimatedAnnualCost) <= 0 || !Number.isFinite(Number(form.value.ghanaTechEstimatedAnnualCost)) || Number(form.value.ghanaTechEstimatedAnnualCost) < 0) {
    toast.error('Enter a role, a positive U.S. cost, and a nonnegative GhanaTech cost.');
    return;
  }
  isSaving.value = true;
  try {
    if (isEditing.value && currentId.value) {
      await calculatorService.updateConfiguration(currentId.value, form.value);
      toast.success('Calculator assumption updated.');
    } else {
      await calculatorService.createConfiguration(form.value);
      toast.success('Role assumption added.');
    }
    showModal.value = false;
    fetchConfigs();
  } catch {
    toast.error('Failed to save assumption.');
  } finally {
    isSaving.value = false;
  }
};

const confirmDelete = (id: string | undefined, role: string) => {
  if (!id) return;
  roleToDeleteId.value = id;
  roleToDeleteName.value = role;
  showDeleteDialog.value = true;
};

const executeDelete = async () => {
  if (!roleToDeleteId.value) return;
  try {
    await calculatorService.deleteConfiguration(roleToDeleteId.value);
    toast.success('Role removed.');
    showDeleteDialog.value = false;
    fetchConfigs();
  } catch {
    toast.error('Failed to delete role.');
  }
};

onMounted(() => {
  fetchConfigs();
});
</script>
