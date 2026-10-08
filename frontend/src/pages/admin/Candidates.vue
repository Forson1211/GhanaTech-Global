<template>
  <div class="space-y-6">
    <!-- Top Action Bar -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-brand-dark tracking-tight"> {{ t("Candidate Profiles") }} </h1>
        <p class="text-xs text-brand-muted mt-0.5"> {{ t("Manage candidate profiles, skills, approval, and availability.") }} </p>
      </div>

      <Button variant="primary" size="md" @click="openCreateModal">
        <template #icon-left>
          <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </template> {{ t("Add New Candidate") }} </Button>
    </div>

    <!-- Filter and Search Header -->
    <div class="bg-white p-4 rounded-2xl border border-brand-border/80 shadow-violet-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="w-full md:w-80">
        <SearchInput v-model="searchQuery" placeholder="Search candidate by name, role, skill..." @search="fetchCandidates" />
      </div>

      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <select
          v-model="filterStatus"
          class="text-xs border border-brand-border/80 rounded-xl px-3 py-2 bg-white text-brand-dark font-medium cursor-pointer"
          @change="fetchCandidates"
        >
          <option value=""> {{ t("All Statuses") }} </option>
          <option value="Approved"> {{ t("Approved") }} </option>
          <option value="Pending"> {{ t("Pending") }} </option>
          <option value="Rejected"> {{ t("Rejected") }} </option>
        </select>

        <select
          v-model="filterAvailability"
          class="text-xs border border-brand-border/80 rounded-xl px-3 py-2 bg-white text-brand-dark font-medium cursor-pointer"
          @change="fetchCandidates"
        >
          <option value=""> {{ t("All Availability") }} </option>
          <option value="Available"> {{ t("Available") }} </option>
          <option value="Interviewing"> {{ t("Interviewing") }} </option>
          <option value="Placed"> {{ t("Placed") }} </option>
          <option value="Unavailable"> {{ t("Unavailable") }} </option>
        </select>

        <select
          v-model="filterCategory"
          class="text-xs border border-brand-border/80 rounded-xl px-3 py-2 bg-white text-brand-dark font-medium cursor-pointer"
          @change="fetchCandidates"
        >
          <option value=""> {{ t("All Disciplines") }} </option>
          <option value="Cybersecurity"> {{ t("Cybersecurity") }} </option>
          <option value="Cloud & IT"> {{ t("Cloud & IT") }} </option>
          <option value="Software Engineering"> {{ t("Software") }} </option>
          <option value="Data & Analytics"> {{ t("Data") }} </option>
        </select>
      </div>
    </div>

    <!-- Candidates Table (Section 53) -->
    <Table :loading="loading" :empty="candidates.length === 0" :col-span="6">
      <template #header>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Candidate") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Role & Discipline") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Experience") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Availability") }} </th>
        <th class="py-3.5 px-4 font-bold text-brand-dark text-xs uppercase tracking-wider"> {{ t("Profile Status") }} </th>
        <th class="py-3.5 px-6 font-bold text-brand-dark text-xs uppercase tracking-wider text-right"> {{ t("Actions") }} </th>
      </template>

      <tr v-for="c in candidates" :key="c._id" class="hover:bg-brand-lightest/40 transition-colors">
        <!-- Candidate info -->
        <td class="py-4 px-6">
          <div class="flex items-center space-x-3">
            <Avatar :src="c.profileImage" :name="`${c.firstName} ${c.lastName}`" size="md" />
            <div>
              <p class="font-bold text-brand-dark text-xs sm:text-sm">{{ c.firstName }} {{ c.lastName }}</p>
              <p class="text-[11px] text-brand-muted">{{ c.location }}, {{ c.country }}</p>
            </div>
          </div>
        </td>

        <!-- Role -->
        <td class="py-4 px-4">
          <p class="font-semibold text-brand-dark text-xs">{{ c.role }}</p>
          <span class="text-[10px] text-brand-primary bg-brand-soft px-2 py-0.5 rounded-sm">{{ c.category }}</span>
        </td>

        <!-- Experience -->
        <td class="py-4 px-4 text-xs font-semibold text-brand-dark">
          {{ c.yearsExperience }} {{ t("Years") }} </td>

        <!-- Availability selector -->
        <td class="py-4 px-4">
          <select
            :value="c.availability"
            class="text-xs border border-brand-border/60 rounded-lg px-2 py-1 bg-white text-brand-dark cursor-pointer font-medium"
            @change="updateAvailability(c._id, ($event.target as HTMLSelectElement).value as any)"
          >
            <option value="Available"> {{ t("Available") }} </option>
            <option value="Interviewing"> {{ t("Interviewing") }} </option>
            <option value="Placed"> {{ t("Placed") }} </option>
            <option value="Unavailable"> {{ t("Unavailable") }} </option>
          </select>
        </td>

        <!-- Status & Quick Approval -->
        <td class="py-4 px-4">
          <div class="flex items-center space-x-2">
            <StatusBadge :status="c.profileStatus" />
            <button
              v-if="c.profileStatus !== 'Approved'"
              type="button"
              class="text-[10px] font-bold text-brand-primary bg-brand-soft px-2 py-0.5 rounded-sm hover:bg-brand-primary hover:text-white transition-colors"
              @click="updateStatus(c._id, 'Approved')"
            > {{ t("Approve") }} </button>
            <button
              v-if="c.profileStatus !== 'Rejected'"
              type="button"
              class="text-[10px] font-bold text-brand-muted hover:text-brand-dark bg-brand-lightest px-2 py-0.5 rounded-sm transition-colors"
              @click="updateStatus(c._id, 'Rejected')"
            > {{ t("Reject") }} </button>
          </div>
        </td>

        <!-- Actions -->
        <td class="py-4 px-6 text-right space-x-2">
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-brand-soft rounded-lg transition-colors"
            @click="openEditModal(c)"
          > {{ t("Edit") }} </button>
          <button
            type="button"
            class="px-2.5 py-1 text-xs font-semibold text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 rounded-lg transition-colors"
            @click="confirmDelete(c._id, `${c.firstName} ${c.lastName}`)"
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

    <!-- Create / Edit Candidate Modal -->
    <Modal v-model="showEditModal" :title="isEditing ? 'Edit Candidate Profile' : 'Add New Candidate'" max-width="2xl">
      <form class="space-y-4" @submit.prevent="saveCandidate">
        <div class="grid grid-cols-2 gap-4">
          <Input v-model="editForm.firstName" label="First Name" :required="true" />
          <Input v-model="editForm.lastName" label="Last Name" :required="true" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <Input v-model="editForm.headline" label="Professional Headline" placeholder="Senior DevOps Engineer..." :required="true" />
          <Input v-model="editForm.location" label="Location" placeholder="Accra, Ghana" :required="true" />
        </div>

        <div class="grid grid-cols-3 gap-4">
          <Select v-model="editForm.category" label="Discipline" :options="['Cybersecurity', 'Cloud & IT', 'Software Engineering', 'Data & Analytics']" :required="true" />
          <Select v-model="editForm.role" label="Role" :options="rolesList" :required="true" />
          <Input v-model.number="editForm.yearsExperience" type="number" label="Years Experience" :required="true" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <Select v-model="editForm.availability" label="Availability" :options="['Available', 'Interviewing', 'Placed', 'Unavailable']" />
          <Select v-model="editForm.assessmentStatus" label="Vetting Status" :options="['Screening', 'Technically Assessed', 'Evaluated', 'Ready for Placement']" />
        </div>

        <Input v-model="skillsInput" label="Skills (comma-separated)" placeholder="TypeScript, Vue 3, Node.js, Docker" :required="true" />

        <Textarea v-model="editForm.bio" label="Bio / Summary" :rows="3" />

        <div class="grid grid-cols-3 gap-3">
          <Input v-model="editForm.linkedinUrl" label="LinkedIn URL" />
          <Input v-model="editForm.githubUrl" label="GitHub URL" />
          <Input v-model="editForm.portfolioUrl" label="Portfolio URL" />
        </div>

        <div class="pt-4 border-t border-brand-border/40 flex justify-end space-x-3">
          <Button variant="ghost" size="sm" @click="showEditModal = false"> {{ t("Cancel") }} </Button>
          <Button type="submit" variant="primary" size="sm" :loading="isSaving"> {{ t("Save Candidate") }} </Button>
        </div>
      </form>
    </Modal>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-model="showDeleteDialog"
      title="Delete Candidate Record"
      :message="`Are you sure you want to delete candidate ${candidateToDeleteName}?`"
      sub-message="This candidate will be removed from the public talent directory immediately."
      confirm-text="Delete Record"
      @confirm="executeDelete"
      @cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useAdminPreferences } from '@/composables/useAdminPreferences';
const { t } = useAdminPreferences();
import { ref, onMounted } from 'vue';
import { candidateService } from '@/services/candidates';
import type { AdminCandidate, CandidateAvailability, CandidateStatus } from '@/types/candidate';
import { POPULAR_ROLES } from '@/utils/constants';
import { useToast } from '@/composables/useToast';
import Table from '@/components/common/Table.vue';
import Pagination from '@/components/common/Pagination.vue';
import Avatar from '@/components/common/Avatar.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import Button from '@/components/common/Button.vue';
import Modal from '@/components/common/Modal.vue';
import Input from '@/components/common/Input.vue';
import Select from '@/components/common/Select.vue';
import Textarea from '@/components/common/Textarea.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

const toast = useToast();
const rolesList = POPULAR_ROLES;

const candidates = ref<AdminCandidate[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const filterStatus = ref('');
const filterAvailability = ref('');
const filterCategory = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);

const showEditModal = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const currentId = ref<string | null>(null);

const skillsInput = ref('');
const editForm = ref<any>({
  firstName: '',
  lastName: '',
  headline: '',
  location: 'Accra',
  country: 'Ghana',
  role: 'Full-Stack Developer',
  category: 'Software Engineering',
  yearsExperience: 5,
  availability: 'Available',
  assessmentStatus: 'Ready for Placement',
  profileStatus: 'Approved',
  bio: '',
  linkedinUrl: '',
  githubUrl: '',
  portfolioUrl: '',
});

const showDeleteDialog = ref(false);
const candidateToDeleteId = ref<string | null>(null);
const candidateToDeleteName = ref('');

const fetchCandidates = async () => {
  loading.value = true;
  try {
    const res = await candidateService.getAdminCandidates({
      page: currentPage.value,
      limit: 10,
      search: searchQuery.value,
      status: filterStatus.value,
      availability: filterAvailability.value,
      category: filterCategory.value,
    });
    if (res.success && res.data) {
      candidates.value = res.data.candidates;
      totalCount.value = res.data.total;
      totalPages.value = res.data.totalPages || 1;
    }
  } catch {
    candidates.value = [];
  } finally {
    loading.value = false;
  }
};

const onPageChange = (p: number) => {
  currentPage.value = p;
  fetchCandidates();
};

const openCreateModal = () => {
  isEditing.value = false;
  currentId.value = null;
  skillsInput.value = 'TypeScript, Vue, Node.js';
  editForm.value = {
    firstName: '',
    lastName: '',
    headline: '',
    location: 'Accra',
    country: 'Ghana',
    role: 'Full-Stack Developer',
    category: 'Software Engineering',
    yearsExperience: 4,
    availability: 'Available',
    assessmentStatus: 'Ready for Placement',
    profileStatus: 'Approved',
    bio: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
  };
  showEditModal.value = true;
};

const openEditModal = (c: AdminCandidate) => {
  isEditing.value = true;
  currentId.value = c._id;
  skillsInput.value = c.skills.join(', ');
  editForm.value = { ...c };
  showEditModal.value = true;
};

const saveCandidate = async () => {
  isSaving.value = true;
  try {
    const payload = {
      ...editForm.value,
      skills: skillsInput.value.split(',').map(s => s.trim()).filter(Boolean),
    };

    if (isEditing.value && currentId.value) {
      await candidateService.updateCandidate(currentId.value, payload);
      toast.success('Candidate profile updated.');
    } else {
      await candidateService.createCandidate(payload);
      toast.success('New candidate profile added.');
    }
    showEditModal.value = false;
    fetchCandidates();
  } catch (err: any) {
    toast.error(err.message || 'Failed to save candidate.');
  } finally {
    isSaving.value = false;
  }
};

const updateStatus = async (id: string, status: CandidateStatus) => {
  try {
    await candidateService.updateCandidateStatus(id, status);
    toast.success(`Candidate status marked as ${status}.`);
    fetchCandidates();
  } catch (err: any) {
    toast.error('Failed to update status');
  }
};

const updateAvailability = async (id: string, availability: CandidateAvailability) => {
  try {
    await candidateService.updateCandidateAvailability(id, availability);
    toast.success(`Availability updated to ${availability}.`);
    fetchCandidates();
  } catch (err: any) {
    toast.error('Failed to update availability');
  }
};

const confirmDelete = (id: string, name: string) => {
  candidateToDeleteId.value = id;
  candidateToDeleteName.value = name;
  showDeleteDialog.value = true;
};

const executeDelete = async () => {
  if (!candidateToDeleteId.value) return;
  try {
    await candidateService.deleteCandidate(candidateToDeleteId.value);
    toast.success('Candidate record deleted.');
    showDeleteDialog.value = false;
    fetchCandidates();
  } catch (err: any) {
    toast.error('Failed to delete candidate.');
  }
};

onMounted(() => {
  fetchCandidates();
});
</script>
