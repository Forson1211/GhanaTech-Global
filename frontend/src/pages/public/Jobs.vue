<template>
  <div class="min-h-screen bg-white">
    <!-- Header Hero with the exact same vibrant GhanaTech purple gradient as home hero -->
    <section class="relative bg-linear-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-24 sm:pt-40 sm:pb-32 text-white">
      <!-- Background decoration wrapped in overflow-hidden so circles don't cause page scrollbars -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="hidden sm:block absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -bottom-12 -left-12 w-[240px] h-[240px] rounded-full border border-white/15 pointer-events-none" />
        <div class="hidden sm:block absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-white/15 pointer-events-none" />
      </div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        <!-- Main Title -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Find Your Next Remote Job
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Explore remote jobs with U.S. and other global companies. Find work that matches your skills and experience.
        </p>

        <p class="mt-4 text-xs text-white/70">Browse available jobs or join our talent network to be considered for future roles.</p>
        <!-- Search Bar with Filters Button (exact match to user reference) -->
        <div class="mt-8 max-w-2xl mx-auto">
          <div class="bg-white/10 backdrop-blur-md p-1.5 rounded-full border border-white/25 shadow-2xl flex items-center gap-2">
            <!-- Search Icon & Input -->
            <div class="flex-1 flex items-center pl-4 pr-2">
              <svg class="w-5 h-5 text-white/70 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search by title, skills, or role..."
                class="w-full bg-transparent text-white placeholder-white/60 text-sm focus:outline-hidden"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="text-white/60 hover:text-white text-xs px-2"
              >
                ✕
              </button>
            </div>

            <!-- Filters Toggle Button -->
            <button
              @click="isFiltersOpen = !isFiltersOpen"
              class="px-5 py-2.5 rounded-full bg-white text-brand-primary hover:bg-slate-100 font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shrink-0"
            >
              <svg class="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Filters</span>
              <span
                v-if="selectedCategory !== 'All'"
                class="w-2 h-2 rounded-full bg-brand-primary"
              />
            </button>
          </div>

          <!-- Expandable Filters Row -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-show="isFiltersOpen"
              class="mt-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-left flex flex-wrap gap-2 items-center"
            >
              <span class="text-xs text-white/70 font-semibold mr-2">Type of Work:</span>
              <button
                v-for="cat in categories"
                :key="cat"
                @click="selectedCategory = cat"
                class="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                :class="selectedCategory === cat ? 'bg-white text-brand-primary shadow-sm' : 'bg-white/15 text-white hover:bg-white/25'"
              >
                {{ cat }}
              </button>
            </div>
          </transition>
        </div>
      </div>

      <!-- Organic Curved Wave Bottom Divider (Techwind style matching Home Hero, overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <!-- Main Content: Open Positions -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <p v-if="loadingJobs" role="status" class="text-sm text-brand-muted mb-6">Loading jobs…</p>
      <p v-if="jobsError" role="alert" class="text-sm text-red-600 mb-6">{{ jobsError }} <button class="underline" @click="loadJobs">Try again</button></p>
      <p v-if="!loadingJobs && !jobsError && !jobs.length" class="text-sm text-brand-muted mb-6">There are no job openings listed yet. <router-link to="/join-talent" class="text-brand-primary font-semibold">Join the Talent Network</router-link> so we can consider you for future jobs.</p>
      <!-- Section Header with Count (NO STROKE) -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-2">
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
            Job Openings
          </h2>
          <p class="text-sm text-slate-500 mt-1">
            Explore our current job openings and find your perfect role
          </p>
        </div>

        <!-- Role Count Badge (NO STROKE) -->
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold self-start sm:self-auto">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{{ filteredJobs.length }} open roles</span>
        </div>
      </div>

      <!-- Category Filter Pills (NO STROKE AROUND SHAPES) -->
      <div class="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all"
          :class="selectedCategory === cat
            ? 'bg-brand-primary text-white shadow-violet-sm'
            : 'bg-brand-soft/70 text-brand-dark hover:bg-brand-soft'"
        >
          {{ cat }}
          <span
            class="ml-1.5 px-2 py-0.5 rounded-full text-[10px]"
            :class="selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-white/70 text-brand-dark'"
          >
            {{ getCategoryCount(cat) }}
          </span>
        </button>
      </div>

      <!-- Role Showcase Grid (Matching Image 2: Clean, Rounded-3xl, No Stroke) -->
      <div v-if="filteredJobs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="job in filteredJobs"
          :key="job.id"
          class="group bg-white rounded-3xl p-7 shadow-violet-sm hover:shadow-violet-md transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <!-- Category Badge & Status (NO STROKE) -->
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-full bg-brand-soft text-brand-dark text-[11px] font-bold">
                {{ job.category }}
              </span>
              <span class="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Now Hiring
              </span>
            </div>

            <!-- Role Title -->
            <h3 class="text-xl font-extrabold text-brand-dark group-hover:text-brand-primary transition-colors mb-2">
              {{ job.title }}
            </h3>

            <!-- Description -->
            <p class="text-xs text-brand-muted leading-relaxed mb-5 line-clamp-3">
              {{ job.description }}
            </p>

            <!-- Metrics bar (NO STROKE) -->
            <div class="grid grid-cols-2 gap-2 text-xs py-2.5 px-3.5 rounded-2xl bg-brand-lightest/70 mb-5">
              <div>
                <span class="block text-[10px] uppercase font-bold text-brand-muted">Pay</span>
                <span class="font-extrabold text-brand-dark text-xs block truncate">{{ job.salary }}</span>
              </div>
              <div>
                <span class="block text-[10px] uppercase font-bold text-brand-muted">Where You Will Work</span>
                <span class="font-extrabold text-brand-primary text-xs block truncate">Ghana • Remote</span>
              </div>
            </div>

            <!-- Core Stack Badges (NO STROKE) -->
            <div class="mb-6">
              <span class="block text-[10px] uppercase font-bold text-brand-muted mb-2">Skills &amp; Tools</span>
              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="tech in job.techStack"
                  :key="tech"
                  class="px-2.5 py-1 rounded-lg bg-brand-soft/60 text-brand-dark text-[11px] font-medium"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Expandable Detailed Responsibilities & Requirements (Clean, NO STROKE) -->
            <div v-if="expandedJobIds.includes(job.id)" class="mb-5 pt-4 space-y-3.5 text-xs bg-brand-lightest/60 p-4 rounded-2xl">
              <div>
                <h4 class="font-bold text-brand-dark mb-1.5 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  What You Will Do:
                </h4>
                <ul class="list-disc list-inside space-y-1 text-brand-muted pl-1">
                  <li v-for="(resp, i) in job.responsibilities" :key="i">{{ resp }}</li>
                </ul>
              </div>

              <div>
                <h4 class="font-bold text-brand-dark mb-1.5 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  What You Need:
                </h4>
                <ul class="list-disc list-inside space-y-1 text-brand-muted pl-1">
                  <li v-for="(req, i) in job.requirements" :key="i">{{ req }}</li>
                </ul>
              </div>

              <div class="pt-2 text-[11px] text-brand-primary font-medium">
                Pay, working hours, and benefits depend on the job. Ask our team for details.
              </div>
            </div>
          </div>

          <!-- Action Buttons: Apply + View More (Clean, Rounded-2xl, NO STROKE) -->
          <div class="space-y-2.5 mt-auto pt-2">
            <!-- Apply for this Job Button -->
            <button
              @click="openApplyModal(job)"
              class="w-full py-3 px-4 rounded-2xl bg-brand-primary text-white hover:bg-[#5B21B6] font-bold text-xs transition-all text-center flex items-center justify-center gap-1.5 shadow-violet-sm"
            >
              <span>Apply for this Job</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>

            <!-- View More to Read About the Job -->
            <button
              @click="toggleExpand(job.id)"
              class="w-full py-2.5 px-4 rounded-2xl bg-brand-soft text-brand-dark hover:bg-brand-soft/80 font-bold text-xs transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>{{ expandedJobIds.includes(job.id) ? 'Show Less' : "Read Job Details" }}</span>
              <svg
                class="w-3.5 h-3.5 transition-transform duration-200"
                :class="expandedJobIds.includes(job.id) ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State (NO STROKE) -->
      <div v-else class="text-center py-16 bg-white rounded-3xl shadow-violet-sm p-8 space-y-4">
        <div class="w-16 h-16 rounded-full bg-purple-50 text-brand-primary flex items-center justify-center mx-auto text-2xl font-bold">
          🔍
        </div>
        <h3 class="text-xl font-bold text-slate-800">No Matching Jobs Found</h3>
        <p class="text-sm text-slate-500 max-w-md mx-auto">
          We couldn't find any openings matching "{{ searchQuery }}". Try adjusting your search query or selecting a different department.
        </p>
        <button
          @click="resetFilters"
          class="px-5 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-[#5B21B6] transition-all"
        >
          Clear Filters
        </button>
      </div>
    </main>

    <!-- Quick Apply Modal -->
    <div
      v-if="selectedJobForModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      @click.self="closeApplyModal"
    >
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <!-- Close Button -->
        <button
          @click="closeApplyModal"
          class="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm transition-colors"
        >
          ✕
        </button>

        <!-- Modal Header -->
        <div class="pr-8 mb-6">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-md bg-purple-100 text-brand-primary font-mono text-xs font-bold mb-2">
            ID {{ selectedJobForModal.id }} • {{ selectedJobForModal.category }}
          </span>
          <h3 class="text-xl font-black text-slate-900 leading-tight">
            Apply for {{ selectedJobForModal.title }}
          </h3>
          <p class="text-xs text-slate-500 mt-1">
            Send your application to the GhanaTech Global hiring team.
          </p>
        </div>

        <!-- Success Notification -->
        <div v-if="applySuccess" class="py-8 text-center space-y-3">
          <div class="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 text-2xl flex items-center justify-center mx-auto font-bold">
            ✓
          </div>
          <h4 class="text-lg font-black text-slate-900">Application Received!</h4>
          <p class="text-xs text-slate-600">
            Thank you, {{ applyForm.name }}. Our technical vetting team will review your application for <strong>{{ selectedJobForModal.title }}</strong> and contact you about the next steps.
          </p>
          <button
            @click="closeApplyModal"
            class="px-6 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-[#5B21B6] transition-all"
          >
            Done
          </button>
        </div>

        <!-- Application Form -->
        <form v-else class="space-y-4" @submit.prevent="submitJobApplication">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
            <input
              v-model="applyForm.name"
              required
              type="text"
              placeholder="e.g. Kwame Mensah"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-[#6D28D9]"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <input
                v-model="applyForm.email"
                required
                type="email"
                placeholder="kwame@example.com"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-[#6D28D9]"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Phone (WhatsApp) *</label>
              <input
                v-model="applyForm.phone"
                required
                type="tel"
                placeholder="+233 24 000 0000"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-[#6D28D9]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Years of Work Experience *</label>
              <select
                v-model="applyForm.experience"
                required
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-[#6D28D9] bg-white"
              >
                <option value="2-3">2 - 3 Years</option>
                <option value="4-6">4 - 6 Years</option>
                <option value="7-9">7 - 9 Years</option>
                <option value="10+">10+ Years (Senior/Lead)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">LinkedIn or Work Samples Link</label>
              <input
                v-model="applyForm.linkedin"
                type="url"
                placeholder="https://linkedin.com/in/..."
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-[#6D28D9]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input v-model="applyForm.location" label="City or Town" :required="true" placeholder="Accra, Ghana" />
            <Input v-model="applyForm.skills" label="Your Skills" :required="true" placeholder="Skills you have experience with" />
          </div>
          <!-- Resume / CV File Upload -->
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">CV or Resume (PDF, DOC or DOCX) *</label>
            <div class="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-brand-primary transition-colors cursor-pointer relative bg-slate-50/50">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                required
                class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                @change="handleFileUpload"
              />
              <div v-if="!resumeFile" class="space-y-1">
                <svg class="w-6 h-6 text-slate-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="text-xs font-semibold text-slate-700">Click or drag your CV here</p>
                <p class="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</p>
              </div>
              <div v-else class="flex items-center justify-center gap-2 text-xs font-bold text-brand-primary">
                <span>📄 {{ resumeFile.name }}</span>
                <span class="text-emerald-600 text-xs">✓ Ready</span>
              </div>
            </div>
          </div>

          <label class="flex items-start gap-2 text-xs text-slate-600"><input v-model="applyForm.consent" type="checkbox" required class="mt-0.5" /><span>I agree that GhanaTech Global can review my information and CV for job opportunities.</span></label>
          <div v-if="applyError" class="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
            {{ applyError }}
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-3 rounded-xl bg-brand-primary hover:bg-[#5B21B6] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>{{ isSubmitting ? 'Submitting Application...' : "Send Application" }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { publishingService } from '@/services/publishing';
import { TALENT_TECH_AREAS } from '@/utils/constants';
import { applicationService } from '@/services/applications';
import Input from '@/components/common/Input.vue';

interface Job {
  id: string;
  title: string;
  category: string;
  type: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
}

const searchQuery = ref('');
const selectedCategory = ref('All');
const isFiltersOpen = ref(false);
const expandedJobIds = ref<string[]>([]);

const categories = ['All', ...TALENT_TECH_AREAS];
const jobs = ref<Job[]>([]);
const loadingJobs = ref(true);
const jobsError = ref('');
async function loadJobs() {
  loadingJobs.value = true; jobsError.value = '';
  try { const response = await publishingService.jobs(); jobs.value = (response.data || []).map(job => ({ ...job, id: job._id })); }
  catch { jobsError.value = "Jobs could not be loaded. Please try again."; }
  finally { loadingJobs.value = false; }
}
onMounted(loadJobs);

// Filtering logic
const filteredJobs = computed(() => {
  return jobs.value.filter((job) => {
    const matchesCategory = selectedCategory.value === 'All' || job.category === selectedCategory.value;
    const q = searchQuery.value.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      job.title.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q) ||
      job.category.toLowerCase().includes(q) ||
      job.id.includes(q) ||
      job.techStack.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });
});

const getCategoryCount = (cat: string) => {
  if (cat === 'All') return jobs.value.length;
  return jobs.value.filter((j) => j.category === cat).length;
};

const toggleExpand = (id: string) => {
  if (expandedJobIds.value.includes(id)) {
    expandedJobIds.value = expandedJobIds.value.filter((x) => x !== id);
  } else {
    expandedJobIds.value.push(id);
  }
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'All';
};

// Quick Apply Modal State
const selectedJobForModal = ref<Job | null>(null);
const isSubmitting = ref(false);
const applySuccess = ref(false);
const applyError = ref('');
const resumeFile = ref<File | null>(null);

const applyForm = ref({
  name: '',
  email: '',
  phone: '',
  experience: '4-6',
  linkedin: '',
  location: '',
  skills: '',
  consent: false,
});

const openApplyModal = (job: Job) => {
  selectedJobForModal.value = job;
  applySuccess.value = false;
  applyError.value = '';
};

const closeApplyModal = () => {
  selectedJobForModal.value = null;
  applySuccess.value = false;
  applyError.value = '';
  resumeFile.value = null;
};

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    resumeFile.value = target.files[0];
  }
};

const submitJobApplication = async () => {
  if (!selectedJobForModal.value) return;
  if (isSubmitting.value) return;
  if (!applyForm.value.consent || !applyForm.value.location.trim() || !applyForm.value.skills.split(',').some(skill => skill.trim())) { applyError.value = "Add your city and skills, and agree to let us review your application."; return; }
  if (!resumeFile.value) {
    applyError.value = 'Please attach your CV or Resume (PDF/DOCX).';
    return;
  }

  isSubmitting.value = true;
  applyError.value = '';

  try {
    const formData = new FormData();
    formData.append('name', applyForm.value.name);
    formData.append('email', applyForm.value.email);
    formData.append('phone', applyForm.value.phone);
    formData.append('role', selectedJobForModal.value.title);
    formData.append('jobId', selectedJobForModal.value.id);
    formData.append('yearsExperience', String(parseInt(applyForm.value.experience, 10)));
    formData.append('location', applyForm.value.location);
    formData.append('technologyArea', selectedJobForModal.value.category);
    formData.append('consent', String(applyForm.value.consent));
    formData.append('desiredEngagement', 'Full-time');
    formData.append('skills', applyForm.value.skills);
    formData.append('linkedin', applyForm.value.linkedin || '');
    formData.append('cv', resumeFile.value);

    const result = await applicationService.submitApplication(formData);
    if (!result.success) throw new Error(result.message || 'Application could not be saved.');
    applySuccess.value = true;
  } catch (err: any) {
    applyError.value = err?.response?.data?.message || err?.message || 'Application could not be submitted. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
