<template>
  <div class="bg-slate-50 min-h-screen">
    <!-- Header Hero with GhanaTech purple gradient and organic curve -->
    <section class="relative bg-gradient-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-20 sm:pt-40 sm:pb-28 text-white">
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
          Hire Top Ghanaian Technology Talent
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Tell us about your technical requirements, team size, and tech stack. We will match you with pre-vetted engineers within 48 hours.
        </p>

        <!-- Candidate specific banner if requesting specific candidate -->
        <div v-if="candidateName" class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-md rounded-full border border-white/25 text-xs font-semibold text-white shadow-lg">
          <span>🎯 You are requesting to interview candidate:</span>
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
          <h2 class="text-2xl font-extrabold text-brand-dark">Thank You! Your Request is Received</h2>
          <p class="text-sm text-brand-muted max-w-md mx-auto">
            Our technical staffing director is reviewing your requirements and will reach out to <strong class="text-brand-dark">{{ form.email }}</strong> within 24 hours with a candidate shortlist.
          </p>
          <div class="pt-6">
            <button
              type="button"
              class="px-6 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm"
              @click="isSubmitted = false; resetForm()"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>

        <!-- The Form -->
        <form v-else class="space-y-6" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Full Name -->
            <Input
              v-model="form.name"
              label="Your Full Name"
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
              label="Primary Technology Area"
              :options="['Cybersecurity', 'Cloud & IT', 'Software Engineering', 'Data & Analytics', 'Multiple Disciplines']"
              :required="true"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Role Needed -->
            <Select
              v-model="form.role"
              label="Target Role"
              :options="rolesList"
              :required="true"
            />

            <!-- Number of Professionals -->
            <Select
              v-model.number="form.numberOfProfessionals"
              label="Number of Professionals Needed"
              :options="[
                { label: '1 Professional', value: 1 },
                { label: '2 Professionals', value: 2 },
                { label: '3 - 5 Professionals (Pod)', value: 4 },
                { label: '6 - 10 Professionals (Squad)', value: 8 },
                { label: '10+ Professionals', value: 12 },
              ]"
              :required="true"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Engagement Type -->
            <Select
              v-model="form.engagementType"
              label="Engagement Type"
              :options="engagementTypes"
              :required="true"
            />

            <!-- Budget Range -->
            <Select
              v-model="form.budgetRange"
              label="Annual Target Budget (Per Professional)"
              :options="budgetRanges"
              :required="true"
            />
          </div>

          <!-- Message -->
          <Textarea
            v-model="form.message"
            label="Project Description & Tech Stack Details"
            placeholder="Tell us about the project, specific tools/frameworks needed, desired start date, and timezone preference..."
            :rows="4"
          />

          <!-- Error Alert Banner -->
          <div v-if="serverError" class="p-3.5 rounded-xl bg-brand-lightest border border-brand-primary text-xs font-semibold text-brand-dark">
            {{ serverError }}
          </div>

          <!-- Submit Button -->
          <div class="pt-4 flex items-center justify-between">
            <p class="text-xs text-brand-muted">
              🔒 Your information is confidential under strict NDA.
            </p>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              :loading="isSubmitting"
            >
              Submit Hiring Request
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
import { POPULAR_ROLES, COMPANY_SIZES, ENGAGEMENT_TYPES, BUDGET_RANGES } from '@/utils/constants';
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
  engagementType: 'Full-Time Dedicated',
  budgetRange: '$45k - $70k / year',
  message: '',
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
    engagementType: 'Full-Time Dedicated',
    budgetRange: '$45k - $70k / year',
    message: '',
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
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;
  isSubmitting.value = true;
  serverError.value = null;

  try {
    const payload = {
      ...form.value,
      candidateId: candidateId.value || undefined,
      candidateName: candidateName.value || undefined,
    };
    const res = await leadService.submitHireLead(payload);
    if (res.success) {
      isSubmitted.value = true;
      toast.success('Hiring inquiry submitted successfully. We will follow up in 24 hours!');
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
