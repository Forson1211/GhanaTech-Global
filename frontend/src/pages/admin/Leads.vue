<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight"> {{ t("Company Requests") }} </h1>
        <p class="text-xs text-brand-muted mt-0.5"> {{ t("Track inbound hiring requests from U.S. technology leaders and enterprise buyers.") }} </p>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="bg-white p-4 rounded-2xl border border-brand-border/80 shadow-violet-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="w-full md:w-80">
        <SearchInput v-model="searchQuery" placeholder="Search lead by company, contact name, or role..." @search="fetchLeads" />
      </div>

      <div class="flex items-center space-x-3 w-full md:w-auto">
        <select
          v-model="filterStatus"
          class="text-xs border border-brand-border/80 rounded-xl px-3 py-2 bg-white text-brand-dark font-medium cursor-pointer"
          @change="fetchLeads"
        >
          <option value=""> {{ t("All Lead Statuses") }} </option>
          <option v-for="status in LEAD_STATUSES" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
    </div>

    <!-- Leads Table -->
    <Table :loading="loading" :empty="leads.length === 0" :col-span="6">
      <template #header>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Company & Contact") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Need & Role") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Headcount & Type") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Target Budget") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Pipeline Status") }} </th>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider text-right"> {{ t("Actions") }} </th>
      </template>

      <tr v-for="lead in leads" :key="lead._id" class="hover:bg-brand-lightest/40 transition-colors">
        <!-- Company & Contact -->
        <td class="py-4 px-6">
          <p class="font-bold text-brand-dark text-xs sm:text-sm">{{ lead.company }}</p>
          <p class="text-[11px] text-brand-muted">{{ lead.name }} • {{ lead.email }}</p>
          <p class="text-[10px] text-brand-muted/80"> {{ t("Received:") }} {{ formatDate(lead.createdAt) }}</p>
        </td>

        <!-- Need & Role -->
        <td class="py-4 px-4">
          <p class="font-semibold text-brand-dark text-xs">{{ lead.role }}</p>
          <span class="text-[10px] text-brand-primary bg-brand-soft px-2 py-0.5 rounded">{{ lead.technologyNeed }}</span>
        </td>

        <!-- Headcount & Type -->
        <td class="py-4 px-4 text-xs font-semibold text-brand-dark">
          {{ lead.numberOfProfessionals }} pro{{ lead.numberOfProfessionals > 1 ? 's' : '' }}
          <span class="block text-[10px] text-brand-muted font-normal">{{ lead.engagementType }}</span>
        </td>

        <!-- Budget -->
        <td class="py-4 px-4 text-xs font-medium text-brand-dark">
          {{ lead.budgetRange || 'Flexible' }}
        </td>

        <!-- Pipeline Status -->
        <td class="py-4 px-4">
          <select
            :value="lead.status"
            class="text-xs border border-brand-border/60 rounded-lg px-2 py-1 bg-white text-brand-dark cursor-pointer font-medium"
            @change="updateStatus(lead._id!, ($event.target as HTMLSelectElement).value as any)"
          >
            <option v-for="status in LEAD_STATUSES" :key="status" :value="status">{{ status }}</option>
          </select>
        </td>

        <!-- Actions -->
        <td class="py-4 px-6 text-right space-x-2">
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-soft rounded-lg transition-colors"
            @click="viewDetails(lead)"
          > {{ t("View Details") }} </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 rounded-lg transition-colors"
            @click="confirmDelete(lead._id!, lead.company)"
          > {{ t("Delete") }} </button>
        </td>
      </tr>

      <template #footer>
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          :total="totalCount"
          @change="onPageChange"
        />
      </template>
    </Table>

    <!-- Details Modal -->
    <Modal v-model="showDetailsModal" :title="`Lead Details: ${selectedLead?.company || ''}`" max-width="xl">
      <div v-if="selectedLead" class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span class="text-brand-muted block"> {{ t("Client Representative:") }} </span>
            <strong class="text-brand-dark text-sm">{{ selectedLead.name }}</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Company Name:") }} </span>
            <strong class="text-brand-dark">{{ selectedLead.company }}</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Email:") }} </span>
            <strong class="text-brand-dark">{{ selectedLead.email }}</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Phone:") }} </span>
            <strong class="text-brand-dark">{{ selectedLead.phone || 'Not provided' }}</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Company Size:") }} </span>
            <strong class="text-brand-dark">{{ selectedLead.companySize || 'Unknown' }}</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Role / Quantity:") }} </span>
            <strong class="text-brand-dark">{{ selectedLead.role }} ({{ selectedLead.numberOfProfessionals }} {{ t("required)") }} </strong>
          </div>
        </div>

        <div v-if="selectedLead.message" class="p-3.5 bg-brand-lightest rounded-xl border border-brand-border/60">
          <span class="text-[11px] font-bold uppercase tracking-wider text-brand-dark block mb-1"> {{ t("Message / Requirements") }} </span>
          <p class="text-xs text-brand-dark whitespace-pre-line leading-relaxed">{{ selectedLead.message }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div><span class="text-brand-muted block"> {{ t("Experience Level:") }} </span><strong class="text-brand-dark">{{ selectedLead.experienceLevel || 'Not specified' }}</strong></div>
          <div><span class="text-brand-muted block"> {{ t("Employment Type:") }} </span><strong class="text-brand-dark">{{ selectedLead.employmentType || 'Not specified' }}</strong></div>
          <div><span class="text-brand-muted block"> {{ t("Desired Start:") }} </span><strong class="text-brand-dark">{{ selectedLead.desiredStartDate || 'Not specified' }}</strong></div>
          <div><span class="text-brand-muted block"> {{ t("Required Skills:") }} </span><strong class="text-brand-dark">{{ selectedLead.requiredSkills?.join(', ') || 'Not specified' }}</strong></div>
        </div>
        <div v-if="selectedLead.jobDescription" class="p-3.5 bg-brand-lightest rounded-xl border border-brand-border/60"><span class="text-[11px] font-bold text-brand-dark"> {{ t("Job Description") }} </span><p class="text-xs text-brand-dark whitespace-pre-line mt-2">{{ selectedLead.jobDescription }}</p></div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><Input v-model="discoveryAt" type="datetime-local" label="Discovery Call" /><Input v-model="placedAt" type="date" label="Placement Date" /></div>
        <div v-if="followUps.length" class="space-y-3"><p class="text-xs font-bold text-brand-dark"> {{ t("Placement Follow-ups") }} </p><label v-for="followUp in followUps" :key="followUp.day" class="flex items-center gap-3 text-xs text-brand-dark"><input v-model="followUp.completed" type="checkbox" class="rounded border-brand-border text-brand-primary" /><span>{{ followUp.day }} {{ t("-day follow-up:") }} {{ formatDate(followUp.dueAt) }}</span></label></div>
        <div v-if="selectedLead.statusHistory?.length" class="space-y-2"><p class="text-xs font-bold text-brand-dark"> {{ t("Pipeline History") }} </p><p v-for="(entry, index) in selectedLead.statusHistory" :key="index" class="text-xs text-brand-muted">{{ entry.status }} &middot; {{ formatDate(entry.changedAt) }}</p></div>
        <!-- Notes -->
        <div class="pt-3 border-t border-brand-border/40">
          <Textarea
            v-model="internalNotes"
            label="Internal Deal Notes"
            placeholder="Log call notes, candidate shortlist sent, contract terms..."
            :rows="4"
          />
        </div>

        <div class="flex justify-end space-x-3 pt-2">
          <Button variant="ghost" size="sm" @click="showDetailsModal = false"> {{ t("Close") }} </Button>
          <Button variant="primary" size="sm" :loading="isSavingNotes" @click="saveNotes"> {{ t("Save Deal Notes") }} </Button>
        </div>
      </div>
    </Modal>

    <!-- Delete Confirmation -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete Company Lead"
      :message="`Are you sure you want to delete lead from ${leadToDeleteName}?`"
      confirm-text="Delete Lead"
      @confirm="executeDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAdminPreferences } from '@/composables/useAdminPreferences';
const { t } = useAdminPreferences();
import { ref, onMounted } from 'vue';
import { LEAD_STATUSES } from '@/utils/constants';
import { leadService } from '@/services/leads';
import type { CompanyLead, LeadStatus } from '@/types/lead';
import { formatDate } from '@/utils/formatters';
import { useToast } from '@/composables/useToast';
import Table from '@/components/common/Table.vue';
import Pagination from '@/components/common/Pagination.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import Modal from '@/components/common/Modal.vue';
import Textarea from '@/components/common/Textarea.vue';
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

const toast = useToast();

const leads = ref<CompanyLead[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const filterStatus = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);

const selectedLead = ref<CompanyLead | null>(null);
const internalNotes = ref('');
const discoveryAt = ref('');
const placedAt = ref('');
const followUps = ref<NonNullable<CompanyLead['followUps']>>([]);
const showDetailsModal = ref(false);
const isSavingNotes = ref(false);

const showDeleteDialog = ref(false);
const leadToDeleteId = ref<string | null>(null);
const leadToDeleteName = ref('');

const fetchLeads = async () => {
  loading.value = true;
  try {
    const res = await leadService.getLeads({
      page: currentPage.value,
      limit: 10,
      search: searchQuery.value,
      status: filterStatus.value,
    });
    if (res.success && res.data) {
      leads.value = res.data.leads;
      totalCount.value = res.data.total;
      totalPages.value = res.data.totalPages || 1;
    }
  } catch {
    leads.value = [];
    toast.error('Company leads could not be loaded.');
  } finally {
    loading.value = false;
  }
};

const onPageChange = (p: number) => {
  currentPage.value = p;
  fetchLeads();
};

const updateStatus = async (id: string, status: LeadStatus) => {
  try {
    await leadService.updateLeadStatus(id, status);
    toast.success(`Lead status updated to ${status}.`);
    fetchLeads();
  } catch {
    toast.error('Failed to update status.');
  }
};

const localDateTime = (value: string) => { const date = new Date(value); return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16); };

const viewDetails = (lead: CompanyLead) => {
  selectedLead.value = lead;
  discoveryAt.value = lead.discoveryAt ? localDateTime(lead.discoveryAt) : '';
  placedAt.value = lead.placedAt?.slice(0, 10) || '';
  followUps.value = (lead.followUps || []).map(item => ({ ...item }));
  internalNotes.value = lead.internalNotes || '';
  showDetailsModal.value = true;
};

const saveNotes = async () => {
  if (!selectedLead.value?._id) return;
  isSavingNotes.value = true;
  try {
    await leadService.updateLeadWorkflow(selectedLead.value._id, { internalNotes: internalNotes.value, discoveryAt: discoveryAt.value ? new Date(discoveryAt.value).toISOString() : undefined, placedAt: placedAt.value ? new Date(placedAt.value).toISOString() : undefined, followUps: followUps.value.map(item => ({ day: item.day, completed: item.completed })) });
    toast.success('Lead notes saved.');
    showDetailsModal.value = false;
    fetchLeads();
  } catch {
    toast.error('Failed to save notes.');
  } finally {
    isSavingNotes.value = false;
  }
};

const confirmDelete = (id: string, name: string) => {
  leadToDeleteId.value = id;
  leadToDeleteName.value = name;
  showDeleteDialog.value = true;
};

const executeDelete = async () => {
  if (!leadToDeleteId.value) return;
  try {
    await leadService.deleteLead(leadToDeleteId.value);
    toast.success('Lead record deleted.');
    showDeleteDialog.value = false;
    fetchLeads();
  } catch {
    toast.error('Failed to delete lead.');
  }
};

onMounted(() => {
  fetchLeads();
});
</script>
