<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight"> {{ t("Job Applications") }} </h1>
        <p class="text-xs text-brand-muted mt-0.5"> {{ t("Review incoming talent submissions, view CVs, and log recruiter internal notes.") }} </p>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="bg-white p-4 rounded-2xl border border-brand-border/80 shadow-violet-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="w-full md:w-80">
        <SearchInput v-model="searchQuery" placeholder="Search applicant by name, email, or role..." @search="fetchApplications" />
      </div>

      <div class="flex items-center space-x-3 w-full md:w-auto">
        <select
          v-model="filterStatus"
          class="text-xs border border-brand-border/80 rounded-xl px-3 py-2 bg-white text-brand-dark font-medium cursor-pointer"
          @change="fetchApplications"
        >
          <option value=""> {{ t("All Application Statuses") }} </option>
          <option v-for="status in APPLICATION_STATUSES" :key="status" :value="status">{{ status }}</option>
        </select>
      </div>
    </div>

    <!-- Applications Table -->
    <Table :loading="loading" :empty="applications.length === 0" :col-span="6">
      <template #header>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Applicant") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Target Role & Area") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Experience") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Status") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("CV Resume") }} </th>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider text-right"> {{ t("Actions") }} </th>
      </template>

      <tr v-for="app in applications" :key="app._id" class="hover:bg-brand-lightest/40 transition-colors">
        <!-- Applicant Name & Contact -->
        <td class="py-4 px-6">
          <p class="font-bold text-brand-dark text-xs sm:text-sm">{{ app.name }}</p>
          <p class="text-[11px] text-brand-muted">{{ app.email }} • {{ app.phone }}</p>
          <p class="text-[10px] text-brand-muted/80"> {{ t("Applied:") }} {{ formatDate(app.createdAt) }}</p>
        </td>

        <!-- Role -->
        <td class="py-4 px-4">
          <p class="font-semibold text-brand-dark text-xs">{{ app.role }}</p>
          <span class="text-[10px] text-brand-primary bg-brand-soft px-2 py-0.5 rounded">{{ app.technologyArea }}</span>
        </td>

        <!-- Experience -->
        <td class="py-4 px-4 text-xs font-semibold text-brand-dark">
          {{ app.yearsExperience }} {{ t("Years") }} </td>

        <!-- Status Dropdown -->
        <td class="py-4 px-4">
          <select
            :value="app.status"
            class="text-xs border border-brand-border/60 rounded-lg px-2 py-1 bg-white text-brand-dark cursor-pointer font-medium"
            @change="updateStatus(app._id, ($event.target as HTMLSelectElement).value as any)"
          >
            <option v-for="status in APPLICATION_STATUSES" :key="status" :value="status">{{ status }}</option>
          </select>
        </td>

        <!-- CV File Link -->
        <td class="py-4 px-4">
          <button
            v-if="app.cvUrl"
            type="button"
            @click="downloadCV(app)"
            class="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-brand-soft text-brand-primary hover:bg-brand-border text-xs font-bold transition-colors"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span> {{ t("Download CV") }} </span>
          </button>
          <span v-else class="text-xs text-brand-muted"> {{ t("No File") }} </span>
        </td>

        <!-- Actions -->
        <td class="py-4 px-6 text-right space-x-2">
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-soft rounded-lg transition-colors"
            @click="viewDetails(app)"
          > {{ t("Notes & Details") }} </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 rounded-lg transition-colors"
            @click="confirmDelete(app._id, app.name)"
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

    <!-- Details & Internal Notes Modal -->
    <Modal v-model="showDetailsModal" :title="`Application: ${selectedApp?.name || ''}`" max-width="xl">
      <div v-if="selectedApp" class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span class="text-brand-muted block"> {{ t("Applicant Name:") }} </span>
            <strong class="text-brand-dark text-sm">{{ selectedApp.name }}</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Contact Email:") }} </span>
            <strong class="text-brand-dark">{{ selectedApp.email }}</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Phone:") }} </span>
            <strong class="text-brand-dark">{{ selectedApp.phone }}</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Location:") }} </span>
            <strong class="text-brand-dark">{{ selectedApp.location }}</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Role / Area:") }} </span>
            <strong class="text-brand-dark">{{ selectedApp.role }} ({{ selectedApp.technologyArea }})</strong>
          </div>
          <div>
            <span class="text-brand-muted block"> {{ t("Experience & Availability:") }} </span>
            <strong class="text-brand-dark">{{ selectedApp.yearsExperience }} yrs • {{ selectedApp.availability }}</strong>
          </div>
        </div>

        <div>
          <span class="text-xs text-brand-muted block mb-1"> {{ t("Declared Skills:") }} </span>
          <div class="flex flex-wrap gap-1">
            <span v-for="s in selectedApp.skills" :key="s" class="text-xs font-semibold px-2 py-0.5 rounded bg-brand-soft text-brand-dark">
              {{ s }}
            </span>
          </div>
        </div>

        <div v-if="selectedApp.cvUrl" class="p-3 bg-brand-lightest rounded-xl border border-brand-border/60 flex items-center justify-between">
          <span class="text-xs font-semibold text-brand-dark"> {{ t("Attached Resume / CV File") }} </span>
          <button type="button" @click="downloadCV(selectedApp)" class="text-xs font-bold text-brand-primary underline"> {{ t("Open / Download Document") }} </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div><span class="text-brand-muted block"> {{ t("Employment Status:") }} </span><strong class="text-brand-dark">{{ selectedApp.employmentStatus || 'Not specified' }}</strong></div>
          <div><span class="text-brand-muted block"> {{ t("Education:") }} </span><strong class="text-brand-dark">{{ selectedApp.education || 'Not specified' }}</strong></div>
          <div><span class="text-brand-muted block"> {{ t("Certifications:") }} </span><strong class="text-brand-dark">{{ selectedApp.certifications?.join(', ') || 'Not specified' }}</strong></div>
          <div><span class="text-brand-muted block"> {{ t("Employment Preferences:") }} </span><strong class="text-brand-dark">{{ selectedApp.employmentPreferences?.join(', ') || selectedApp.desiredEngagement }}</strong></div>
          <div><span class="text-brand-muted block"> {{ t("Authorization:") }} </span><strong class="text-brand-dark">{{ selectedApp.consent ? 'Provided on ' + formatDate(selectedApp.consentAt) : 'Not recorded for this application' }}</strong></div>
        </div>
        <div v-if="selectedApp.statusHistory?.length" class="space-y-2"><p class="text-xs font-bold text-brand-dark"> {{ t("Talent Pipeline History") }} </p><p v-for="(entry, index) in selectedApp.statusHistory" :key="index" class="text-xs text-brand-muted">{{ entry.status }} &middot; {{ formatDate(entry.changedAt) }}</p></div>
        <!-- Recruiter Internal Notes (NEVER EXPOSED PUBLICLY) -->
        <div class="pt-4 border-t border-brand-border/40">
          <Textarea
            v-model="internalNotes"
            label="Recruiter Internal Notes (Confidential)"
            placeholder="Add interview assessment notes, screening impressions, salary targets..."
            :rows="4"
          />
        </div>

        <div class="flex justify-end space-x-3 pt-2">
          <Button variant="ghost" size="sm" @click="showDetailsModal = false"> {{ t("Close") }} </Button>
          <Button variant="primary" size="sm" :loading="isSavingNotes" @click="saveNotes"> {{ t("Save Internal Notes") }} </Button>
        </div>
      </div>
    </Modal>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete Application"
      :message="`Are you sure you want to permanently delete application for ${appToDeleteName}?`"
      confirm-text="Delete Application"
      @confirm="executeDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAdminPreferences } from '@/composables/useAdminPreferences';
const { t } = useAdminPreferences();
import { ref, onMounted } from 'vue';
import { APPLICATION_STATUSES } from '@/utils/constants';
import { applicationService } from '@/services/applications';
import type { TalentApplication, ApplicationStatus } from '@/types/candidate';
import { formatDate } from '@/utils/formatters';
import { useToast } from '@/composables/useToast';
import Table from '@/components/common/Table.vue';
import Pagination from '@/components/common/Pagination.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import Modal from '@/components/common/Modal.vue';
import Textarea from '@/components/common/Textarea.vue';
import Button from '@/components/common/Button.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

const toast = useToast();

const applications = ref<TalentApplication[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const filterStatus = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);

const selectedApp = ref<TalentApplication | null>(null);
const internalNotes = ref('');
const showDetailsModal = ref(false);
const isSavingNotes = ref(false);

const showDeleteDialog = ref(false);
const appToDeleteId = ref<string | null>(null);
const appToDeleteName = ref('');

const fetchApplications = async () => {
  loading.value = true;
  try {
    const res = await applicationService.getApplications({
      page: currentPage.value,
      limit: 10,
      search: searchQuery.value,
      status: filterStatus.value,
    });
    if (res.success && res.data) {
      applications.value = res.data.applications;
      totalCount.value = res.data.total;
      totalPages.value = res.data.totalPages || 1;
    }
  } catch {
    applications.value = [];
    toast.error('Applications could not be loaded.');
  } finally {
    loading.value = false;
  }
};

const onPageChange = (p: number) => {
  currentPage.value = p;
  fetchApplications();
};

const updateStatus = async (id: string, status: ApplicationStatus) => {
  try {
    await applicationService.updateApplicationStatus(id, status);
    toast.success(`Application marked as ${status}.`);
    fetchApplications();
  } catch {
    toast.error('Failed to update status.');
  }
};

const viewDetails = (app: TalentApplication) => {
  selectedApp.value = app;
  internalNotes.value = app.internalNotes || '';
  showDetailsModal.value = true;
};

const saveNotes = async () => {
  if (!selectedApp.value) return;
  isSavingNotes.value = true;
  try {
    await applicationService.updateApplicationNotes(selectedApp.value._id, internalNotes.value);
    toast.success('Internal notes saved securely.');
    showDetailsModal.value = false;
    fetchApplications();
  } catch {
    toast.error('Failed to save notes.');
  } finally {
    isSavingNotes.value = false;
  }
};

const confirmDelete = (id: string, name: string) => {
  appToDeleteId.value = id;
  appToDeleteName.value = name;
  showDeleteDialog.value = true;
};

const executeDelete = async () => {
  if (!appToDeleteId.value) return;
  try {
    await applicationService.deleteApplication(appToDeleteId.value);
    toast.success('Application deleted.');
    showDeleteDialog.value = false;
    fetchApplications();
  } catch {
    toast.error('Failed to delete application.');
  }
};

const downloadCV = async (application: TalentApplication) => {
  try {
    await applicationService.downloadCV(application._id, application.cvOriginalName || 'resume.pdf');
  } catch {
    toast.error('Could not download this CV. Please check your sign-in and try again.');
  }
};

onMounted(() => {
  fetchApplications();
});
</script>
