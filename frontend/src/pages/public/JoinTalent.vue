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
          Join the GhanaTech Global Talent Network
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Connect directly with ambitious U.S. technology companies. Enjoy full-time compensation, flexible remote work, and international career exposure.
        </p>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      <!-- Application Form Card -->
      <div class="bg-white rounded-3xl p-8 sm:p-12 border border-brand-border/80 shadow-violet-md">
        <!-- Success State -->
        <div v-if="isSubmitted" class="py-10 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-brand-soft text-brand-primary flex items-center justify-center mx-auto text-2xl font-bold shadow-violet-sm">
            ✓
          </div>
          <h2 class="text-2xl font-extrabold text-brand-dark">Application Successfully Submitted!</h2>
          <p class="text-sm text-brand-muted max-w-md mx-auto">
            Our talent assessment team has received your application and resume. We will review your profile within 48 hours and send next steps regarding Phase 2 technical assessment to <strong class="text-brand-dark">{{ form.email }}</strong>.
          </p>
          <div class="pt-6">
            <router-link
              to="/"
              class="px-6 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm inline-block"
            >
              Return to Homepage
            </router-link>
          </div>
        </div>

        <!-- The Application Form -->
        <form v-else class="space-y-6" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              v-model="form.name"
              label="Full Legal Name"
              placeholder="e.g. Kwame Mensah"
              :required="true"
              :error="errors.name"
            />

            <Input
              v-model="form.email"
              type="email"
              label="Email Address"
              placeholder="kwame@example.com"
              :required="true"
              :error="errors.email"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              v-model="form.phone"
              type="tel"
              label="Phone Number (WhatsApp preferred)"
              placeholder="+233 24 000 0000"
              :required="true"
              :error="errors.phone"
            />

            <Input
              v-model="form.location"
              label="Current Location (City, Country)"
              placeholder="Accra, Ghana"
              :required="true"
              :error="errors.location"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              v-model="form.technologyArea"
              label="Primary Technology Area"
              :options="['Cybersecurity', 'Cloud & IT', 'Software Engineering', 'Data & Analytics']"
              :required="true"
            />

            <Select
              v-model="form.role"
              label="Primary Role"
              :options="rolesList"
              :required="true"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              v-model.number="form.yearsExperience"
              type="number"
              label="Years of Professional Experience"
              placeholder="e.g. 5"
              :required="true"
              :error="errors.yearsExperience"
            />

            <Select
              v-model="form.availability"
              label="Current Availability"
              :options="['Available', 'Interviewing', 'Placed', 'Unavailable']"
              :required="true"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              v-model="form.desiredEngagement"
              label="Desired Engagement"
              :options="['Full-time', 'Contract', 'Part-time']"
              :required="true"
            />

            <Input
              v-model="skillsInput"
              label="Key Skills (comma separated)"
              placeholder="Vue 3, TypeScript, Node.js, AWS, Docker"
              :required="true"
              :error="errors.skills"
            />
          </div>

          <!-- Professional Links -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              v-model="form.linkedin"
              label="LinkedIn URL"
              placeholder="https://linkedin.com/in/..."
            />

            <Input
              v-model="form.github"
              label="GitHub URL"
              placeholder="https://github.com/..."
            />

            <Input
              v-model="form.portfolio"
              label="Portfolio / Website"
              placeholder="https://..."
            />
          </div>

          <!-- CV File Upload -->
          <FileUpload
            label="Upload Your Resume / CV"
            :required="true"
            help-text="PDF, DOC, DOCX up to 10MB"
            :error="errors.cv"
            @file-selected="onFileSelected"
          />

          <!-- Error Alert Banner -->
          <div v-if="serverError" class="p-3.5 rounded-xl bg-brand-lightest border border-brand-primary text-xs font-semibold text-brand-dark">
            {{ serverError }}
          </div>

          <!-- Submit Button -->
          <div class="pt-4 flex items-center justify-between">
            <p class="text-xs text-brand-muted">
              ✓ Free to apply. Never any charges to candidates.
            </p>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              :loading="isSubmitting"
            >
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { applicationService } from '@/services/applications';
import { POPULAR_ROLES } from '@/utils/constants';
import { isValidEmail } from '@/utils/validators';
import { useToast } from '@/composables/useToast';
import Input from '@/components/common/Input.vue';
import Select from '@/components/common/Select.vue';
import FileUpload from '@/components/common/FileUpload.vue';
import Button from '@/components/common/Button.vue';

const toast = useToast();
const route = useRoute();
const initialEmail = typeof route.query.email === 'string' && isValidEmail(route.query.email)
  ? route.query.email.trim()
  : '';
const rolesList = POPULAR_ROLES;

const skillsInput = ref('TypeScript, Node.js, Vue, REST APIs, Git');
const selectedCvFile = ref<File | null>(null);

const form = ref({
  name: '',
  email: initialEmail,
  phone: '',
  location: 'Accra, Ghana',
  technologyArea: 'Software Engineering',
  role: 'Full-Stack Developer',
  yearsExperience: 4,
  linkedin: '',
  github: '',
  portfolio: '',
  availability: 'Available',
  desiredEngagement: 'Full-time',
});

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const isSubmitted = ref(false);
const serverError = ref<string | null>(null);

const onFileSelected = (file: File | null) => {
  selectedCvFile.value = file;
  if (errors.value.cv) errors.value.cv = '';
};

const validate = () => {
  errors.value = {};
  if (!form.value.name.trim()) errors.value.name = 'Full legal name is required';
  if (!form.value.email.trim()) {
    errors.value.email = 'Email address is required';
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Please provide a valid email';
  }
  if (!form.value.phone.trim()) errors.value.phone = 'Phone number is required';
  if (!form.value.location.trim()) errors.value.location = 'Location is required';
  if (!form.value.yearsExperience || form.value.yearsExperience < 0) {
    errors.value.yearsExperience = 'Please specify years of experience';
  }
  if (!skillsInput.value.trim()) errors.value.skills = 'Please specify key skills';

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;
  isSubmitting.value = true;
  serverError.value = null;

  try {
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('email', form.value.email);
    formData.append('phone', form.value.phone);
    formData.append('location', form.value.location);
    formData.append('technologyArea', form.value.technologyArea);
    formData.append('role', form.value.role);
    formData.append('yearsExperience', String(form.value.yearsExperience));
    formData.append('skills', skillsInput.value);
    formData.append('availability', form.value.availability);
    formData.append('desiredEngagement', form.value.desiredEngagement);
    if (form.value.linkedin) formData.append('linkedin', form.value.linkedin);
    if (form.value.github) formData.append('github', form.value.github);
    if (form.value.portfolio) formData.append('portfolio', form.value.portfolio);

    if (selectedCvFile.value) {
      formData.append('cv', selectedCvFile.value);
    }

    const res = await applicationService.submitApplication(formData);
    if (res.success) {
      isSubmitted.value = true;
      toast.success('Your application has been received successfully!');
    }
  } catch (err: any) {
    serverError.value = err?.response?.data?.message || 'Failed to submit application. Please try again.';
    toast.error(serverError.value || 'Failed to submit application');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
