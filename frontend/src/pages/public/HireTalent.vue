<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Header Hero with GhanaTech purple gradient and organic curve -->
    <section class="relative bg-linear-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-20 sm:pt-40 sm:pb-28 text-white">
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
          Hire Tech Professionals from Ghana
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Tell us who you need, the skills they should have, and when you want them to start. Our team will help you find suitable candidates.
        </p>

        <!-- Candidate specific banner if requesting specific candidate -->
        <div v-if="candidateName" class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/25 text-xs font-semibold text-white shadow-lg">
          <span>🎯 You would like to interview:</span>
          <span class="text-emerald-300 font-bold underline">{{ candidateName }}</span>
        </div>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      <!-- Main Form Card -->
      <div class="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border/80 shadow-violet-md">
        <!-- Success State -->
        <div v-if="isSubmitted" class="py-10 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center mx-auto text-2xl font-bold shadow-violet-sm">
            ✓
          </div>
          <h2 class="text-2xl font-extrabold text-brand-dark">We have received your hiring request.</h2>
          <p class="text-sm text-brand-muted max-w-md mx-auto">
            Our team will review your request and contact you at <strong class="text-brand-dark">{{ form.email }}</strong> about the next steps.
          </p>
          <div class="pt-6">
            <button
              type="button"
              class="px-6 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm"
              @click="isSubmitted = false; resetForm()"
            >
              Send Another Request
            </button>
          </div>
        </div>

        <!-- The Form -->
        <form v-else class="space-y-6" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Full Name -->
            <Input
              v-model="form.name"
              label="Full Name"
              placeholder="e.g. Sarah Connor"
              :required="true"
              :error="errors.name"
            />

            <!-- Work Email -->
            <Input
              v-model="form.email"
              type="email"
              label="Work Email"
              placeholder="name@company.com"
              :required="true"
              :error="errors.email"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Company Name -->
            <Input
              v-model="form.company"
              label="Company Name"
              placeholder="Acme Tech Inc."
              :required="true"
              :error="errors.company"
            />

            <!-- Phone -->
            <Input
              v-model="form.phone"
              type="tel"
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Company Size -->
            <Select
              v-model="form.companySize"
              label="Company Size"
              :options="companySizes"
              :required="true"
            />

            <!-- Technology Need / Practice -->
            <Select
              v-model="form.technologyNeed"
              label="Type of Work"
              :options="[...TALENT_TECH_AREAS, 'Multiple Disciplines']"
              :required="true"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Role Needed -->
            <Input v-model="form.role" label="Job Title" list="hiring-roles" :required="true" />
            <datalist id="hiring-roles"><option v-for="role in rolesList" :key="role" :value="role" /></datalist>

            <!-- Number of Professionals -->
            <Input v-model.number="form.numberOfProfessionals" type="number" label="How Many People Do You Need?" :min="1" :max="1000" :step="1" :required="true" :error="errors.numberOfProfessionals" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Engagement Type -->
            <Select
              v-model="form.engagementType"
              label="How Would You Like to Hire?"
              :options="engagementTypes"
              :required="true"
            />

            <!-- Budget Range -->
            <Select
              v-model="form.budgetRange"
              label="Yearly Budget for Each Person"
              :options="budgetRanges"
              :required="true"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input v-model="form.requiredSkills" label="Skills Needed" placeholder="AWS, Python, Kubernetes" :required="true" :error="errors.requiredSkills" />
            <Select v-model="form.experienceLevel" label="Experience Level" :options="['Junior', 'Mid-Level', 'Senior', 'Lead', 'Not sure']" :required="true" />
            <Select v-model="form.employmentType" label="Type of Job" :options="['Full-time', 'Part-time', 'Contract', 'Project']" :required="true" />
            <Input v-model="form.desiredStartDate" type="date" label="Preferred Start Date" />
          </div>
          <Textarea v-model="form.jobDescription" label="Job Description" placeholder="Describe the work, the skills needed, and the team they will join." :rows="4" :required="true" :error="errors.jobDescription" />
          <!-- Message -->
          <Textarea
            v-model="form.message"
            label="More About Your Project"
            placeholder="Tell us about your project, the tools you use, and your preferred working hours."
            :rows="4"
          />

          <!-- Error Alert Banner -->
          <div v-if="serverError" class="p-3.5 rounded-xl bg-brand-lightest border border-brand-primary text-xs font-semibold text-brand-dark">
            {{ serverError }}
          </div>

          <!-- Submit Button -->
          <div class="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p class="text-xs text-brand-muted">
              🔒 Your request is shared with our team for review.
            </p>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              :loading="isSubmitting"
            >
              Send Hiring Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { leadService } from '@/services/leads';
import { POPULAR_ROLES, COMPANY_SIZES, ENGAGEMENT_TYPES, BUDGET_RANGES, TALENT_TECH_AREAS } from '@/utils/constants';
import { isValidEmail } from '@/utils/validators';
import { useToast } from '@/composables/useToast';
import Input from '@/components/common/Input.vue';
import Select from '@/components/common/Select.vue';
import Textarea from '@/components/common/Textarea.vue';
import Button from '@/components/common/Button.vue';

const route = useRoute();
const toast = useToast();

const rolesList = POPULAR_ROLES;
const companySizes = COMPANY_SIZES;
const engagementTypes = ENGAGEMENT_TYPES;
const budgetRanges = BUDGET_RANGES;

const candidateId = ref<string>((route.query.candidateId as string) || '');
const candidateName = ref<string>((route.query.candidateName as string) || '');

const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  companySize: '11 - 50 employees',
  technologyNeed: (route.query.technologyNeed as string) || 'Software Engineering',
  role: (route.query.role as string) || 'Full-Stack Developer',
  numberOfProfessionals: Number(route.query.count) || 1,
  engagementType: engagementTypes.includes(route.query.engagementType as any) ? String(route.query.engagementType) : 'Direct placement',
  budgetRange: '$45k - $70k / year',
  message: '',
  requiredSkills: '',
  experienceLevel: 'Mid-Level',
  employmentType: 'Full-time',
  desiredStartDate: '',
  jobDescription: '',
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const serverError = ref<string | null>(null);

const resetForm = () => {
  form.value = {
    name: '',
    company: '',
    email: '',
    phone: '',
    companySize: '11 - 50 employees',
    technologyNeed: 'Software Engineering',
    role: 'Full-Stack Developer',
    numberOfProfessionals: 1,
    engagementType: 'Direct placement',
    budgetRange: '$45k - $70k / year',
    message: '',
  requiredSkills: '',
  experienceLevel: 'Mid-Level',
  employmentType: 'Full-time',
  desiredStartDate: '',
  jobDescription: '',
  };
  errors.value = {};
  serverError.value = null;
};

const validate = () => {
  errors.value = {};
  if (!form.value.name.trim()) errors.value.name = 'Full name is required';
  if (!form.value.company.trim()) errors.value.company = 'Company name is required';
  if (!form.value.email.trim()) {
    errors.value.email = 'Work email is required';
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Please provide a valid work email address';
  }
  if (!Number.isInteger(Number(form.value.numberOfProfessionals)) || Number(form.value.numberOfProfessionals) < 1 || Number(form.value.numberOfProfessionals) > 1000) errors.value.numberOfProfessionals = 'Enter a whole number from 1 to 1000';
  if (!form.value.requiredSkills.split(',').some(skill => skill.trim())) errors.value.requiredSkills = "Tell us which skills you need.";
  if (!form.value.jobDescription.trim()) errors.value.jobDescription = "Describe the job and what the person will do.";
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (isSubmitting.value || !validate()) return;
  isSubmitting.value = true;
  serverError.value = null;

  try {
    const payload = {
      ...form.value,
      numberOfProfessionals: Number(form.value.numberOfProfessionals),
      requiredSkills: form.value.requiredSkills.split(',').map(skill => skill.trim()).filter(Boolean),
      candidateId: candidateId.value || undefined,
      candidateName: candidateName.value || undefined,
    };
    const res = await leadService.submitHireLead(payload);
    if (res.success) {
      isSubmitted.value = true;
      toast.success("Your hiring request has been received. Our team will contact you about the next steps.");
    }
  } catch (err: any) {
    serverError.value = err?.response?.data?.message || 'Failed to submit request. Please try again.';
    toast.error(serverError.value || 'Failed to submit request');
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  if (route.query.role) {
    form.value.role = route.query.role as string;
  }
  if (route.query.technologyNeed) {
    form.value.technologyNeed = route.query.technologyNeed as string;
  } else if (route.query.category) {
    form.value.technologyNeed = route.query.category as string;
  }
  if (route.query.count) {
    form.value.numberOfProfessionals = Number(route.query.count) || 1;
  }
});
</script>
