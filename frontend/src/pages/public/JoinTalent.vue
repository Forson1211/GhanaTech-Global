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
          Join Our Talent Network
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Tell us about your skills and the work you want. Our team will review your application for jobs with companies around the world.
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
          <h2 class="text-2xl font-extrabold text-brand-dark">We Have Received Your Application</h2>
          <p class="text-sm text-brand-muted max-w-md mx-auto">
            Our team has received your application and CV. We will review your information and contact you about the next steps at <strong class="text-brand-dark">{{ form.email }}</strong>.
          </p>
          <div class="pt-6">
            <router-link
              to="/"
              class="px-6 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm inline-block"
            >
              Back to Home
            </router-link>
          </div>
        </div>

        <!-- The Application Form -->
        <form v-else class="space-y-6" @submit.prevent="handleSubmit">
          <h2 class="text-base font-bold text-brand-dark">About You</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input v-model="form.firstName" label="First Name" :required="true" :error="errors.firstName" />
            <Input v-model="form.lastName" label="Last Name" :required="true" :error="errors.lastName" />
          </div>
          <Input v-model="form.email" type="email" label="Email Address" placeholder="kwame@example.com" :required="true" :error="errors.email" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              v-model="form.phone"
              type="tel"
              label="Phone or WhatsApp Number"
              placeholder="+233 24 000 0000"
              :required="true"
              :error="errors.phone"
            />

            <Input
              v-model="form.location"
              label="City or Town"
              placeholder="Accra, Ghana"
              :required="true"
              :error="errors.location"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              v-model="form.technologyArea"
              label="Type of Work"
              :options="TALENT_TECH_AREAS"
              :required="true"
            />

            <Input v-model="form.role" label="Current Job Title" list="talent-roles" :required="true" />
            <datalist id="talent-roles"><option v-for="role in rolesList" :key="role" :value="role" /></datalist>
          </div>

          <h2 class="text-base font-bold text-brand-dark">Experience</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              v-model.number="form.yearsExperience"
              type="number"
              :min="0" :max="80"
              label="Years of Work Experience"
              placeholder="e.g. 5"
              :required="true"
              :error="errors.yearsExperience"
            />

            <Select
              v-model="form.availability"
              label="Are You Available for Work?"
              :options="['Available', 'Interviewing', 'Placed', 'Unavailable']"
              :required="true"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select v-model="form.employmentStatus" label="Current Work Situation" :options="['Employed', 'Self-employed', 'Seeking opportunities', 'Student']" :required="true" />
            <Input v-model="form.education" label="Education" placeholder="Your qualification and school or university" />
            <Input v-model="certificationsInput" label="Certificates" placeholder="AWS, Security+, Scrum Master" />
          </div>
          <h2 class="text-base font-bold text-brand-dark">Your Skills &amp; Work Choices</h2>
          <fieldset class="space-y-3">
            <legend class="text-sm font-medium text-brand-dark mb-2">Choose Your Skills</legend>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label v-for="skill in suggestedSkills" :key="skill" class="flex items-center gap-2 text-xs text-brand-dark"><input v-model="selectedSkills" type="checkbox" :value="skill" class="rounded border-brand-border text-brand-primary focus:ring-brand-primary" />{{ skill }}</label>
            </div>
          </fieldset>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              v-model="form.desiredEngagement"
              label="Preferred Type of Work"
              :options="EMPLOYMENT_PREFERENCES"
              :required="true"
            />

            <Input
              v-model="skillsInput"
              label="Other Skills"
              placeholder="Vue 3, TypeScript, Node.js, AWS, Docker"
              :error="errors.skills"
            />
          </div>

          <fieldset class="space-y-3">
            <legend class="text-sm font-medium text-brand-dark mb-2">Types of Work You Would Consider *</legend>
            <div class="flex flex-wrap gap-4"><label v-for="preference in EMPLOYMENT_PREFERENCES" :key="preference" class="flex items-center gap-2 text-xs text-brand-dark"><input v-model="form.employmentPreferences" type="checkbox" :value="preference" class="rounded border-brand-border text-brand-primary focus:ring-brand-primary" />{{ preference }}</label></div>
            <p v-if="errors.employmentPreferences" class="text-xs text-brand-dark">{{ errors.employmentPreferences }}</p>
          </fieldset>
          <!-- Professional Links -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              v-model="form.linkedin"
              label="LinkedIn Profile Link"
              placeholder="https://linkedin.com/in/..."
            />

            <Input
              v-model="form.github"
              label="GitHub Profile Link"
              placeholder="https://github.com/..."
            />

            <Input
              v-model="form.portfolio"
              label="Your Website or Work Samples"
              placeholder="https://..."
            />
          </div>

          <!-- CV File Upload -->
          <FileUpload
            label="Upload Your CV or Resume"
            :required="true"
            help-text="PDF, DOC, DOCX up to 10MB"
            :error="errors.cv"
            @file-selected="onFileSelected"
          />

          <label class="flex items-start gap-3 text-xs text-brand-muted leading-relaxed"><input v-model="form.consent" type="checkbox" required class="mt-0.5 rounded border-brand-border text-brand-primary focus:ring-brand-primary" /><span>I agree that GhanaTech Global can review my information and CV for job opportunities and contact me about my application.</span></label>
          <p v-if="errors.consent" class="text-xs text-brand-dark">{{ errors.consent }}</p>
          <!-- Error Alert Banner -->
          <div v-if="serverError" class="p-3.5 rounded-xl bg-brand-lightest border border-brand-primary text-xs font-semibold text-brand-dark">
            {{ serverError }}
          </div>

          <!-- Submit Button -->
          <div class="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p class="text-xs text-brand-muted">
              ✓ Applying is free.
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
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { applicationService } from '@/services/applications';
import { POPULAR_ROLES, TALENT_TECH_AREAS, SKILLS_BY_AREA, EMPLOYMENT_PREFERENCES } from '@/utils/constants';
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

const skillsInput = ref('');
const certificationsInput = ref('');
const selectedSkills = ref<string[]>([]);
const suggestedSkills = computed(() => SKILLS_BY_AREA[form.value.technologyArea] || []);
const allSkills = computed(() => [...new Set([...selectedSkills.value, ...skillsInput.value.split(',').map(skill => skill.trim()).filter(Boolean)])]);
const selectedCvFile = ref<File | null>(null);

const form = ref({
  firstName: '',
  lastName: '',
  education: '',
  employmentStatus: 'Seeking opportunities',
  employmentPreferences: ['Full-time'] as string[],
  consent: false,
  email: initialEmail,
  phone: '',
  location: 'Accra, Ghana',
  technologyArea: 'Software Engineering',
  role: 'Full-Stack Developer',
  yearsExperience: 0,
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
  if (!form.value.firstName.trim()) errors.value.firstName = 'First name is required';
  if (!form.value.lastName.trim()) errors.value.lastName = 'Last name is required';
  if (!form.value.consent) errors.value.consent = "Please agree to let us review your application.";
  if (!form.value.employmentPreferences.length) errors.value.employmentPreferences = "Choose at least one type of work.";
  if (!form.value.email.trim()) {
    errors.value.email = 'Email address is required';
  } else if (!isValidEmail(form.value.email)) {
    errors.value.email = 'Please provide a valid email';
  }
  if (!form.value.phone.trim()) errors.value.phone = 'Phone number is required';
  if (!form.value.location.trim()) errors.value.location = 'Location is required';
  if (!Number.isFinite(Number(form.value.yearsExperience)) || Number(form.value.yearsExperience) < 0) {
    errors.value.yearsExperience = "Enter your years of work experience.";
  }
  if (!allSkills.value.length) errors.value.skills = "Choose or add your skills.";
  if (!selectedCvFile.value) errors.value.cv = 'Please attach your CV.';
  else if (!/\.(pdf|doc|docx)$/i.test(selectedCvFile.value.name) || selectedCvFile.value.size <= 0 || selectedCvFile.value.size > 10 * 1024 * 1024) {
    errors.value.cv = 'Choose a PDF, DOC or DOCX document up to 10 MB.';
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (isSubmitting.value || !validate()) return;
  isSubmitting.value = true;
  serverError.value = null;

  try {
    const formData = new FormData();
    formData.append('name', `${form.value.firstName.trim()} ${form.value.lastName.trim()}`);
    formData.append('firstName', form.value.firstName);
    formData.append('lastName', form.value.lastName);
    formData.append('employmentStatus', form.value.employmentStatus);
    formData.append('education', form.value.education);
    formData.append('certifications', certificationsInput.value);
    formData.append('employmentPreferences', form.value.employmentPreferences.join(','));
    formData.append('consent', String(form.value.consent));
    formData.append('email', form.value.email);
    formData.append('phone', form.value.phone);
    formData.append('location', form.value.location);
    formData.append('technologyArea', form.value.technologyArea);
    formData.append('role', form.value.role);
    formData.append('yearsExperience', String(form.value.yearsExperience));
    formData.append('skills', allSkills.value.join(','));
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
    serverError.value = err?.response?.data?.message || err?.message || 'Failed to submit application. Please try again.';
    toast.error(serverError.value || 'Failed to submit application');
  } finally {
    isSubmitting.value = false;
  }
};
</script>
