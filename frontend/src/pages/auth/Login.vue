<template>
  <div class="min-h-screen bg-brand-lightest/40 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-brand-primary selection:text-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <!-- Logo icon -->
      <router-link to="/" class="inline-flex items-center space-x-3 group mb-4">
        <div class="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white shadow-violet-md group-hover:bg-brand-dark transition-all">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="12" cy="12" r="9" />
            <path d="M3.6 9h16.8M3.6 15h16.8" />
            <circle cx="12" cy="12" r="3" fill="#EDE9FE" />
          </svg>
        </div>
      </router-link>

      <h1 class="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
        GhanaTech Global Admin
      </h1>
      <p class="mt-2 text-xs sm:text-sm text-brand-muted">
        Sign in to manage talent, applications, client leads, and site content.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
      <div class="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-brand-border/80 shadow-violet-md space-y-6">
        <!-- Error Alert Message -->
        <div
          v-if="errorMessage"
          class="p-3.5 rounded-xl bg-brand-lightest border border-brand-primary text-xs font-semibold text-brand-dark flex items-center space-x-2"
        >
          <svg class="w-4 h-4 text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{{ errorMessage }}</span>
        </div>

        <form class="space-y-5" @submit.prevent="handleLogin">
          <!-- Email Input -->
          <Input
            v-model="email"
            type="email"
            label="Email Address"
            placeholder="admin@ghanatechglobal.com"
            :required="true"
            :error="emailError"
          >
            <template #prefix>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </template>
          </Input>

          <!-- Password Input -->
          <Input
            v-model="password"
            type="password"
            label="Password"
            placeholder="••••••••••••"
            :required="true"
            :error="passwordError"
          >
            <template #prefix>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </template>
          </Input>

          <!-- Remember me & Forgot Password -->
          <div class="flex items-center justify-between text-xs">
            <label class="flex items-center text-brand-muted cursor-pointer">
              <input
                type="checkbox"
                class="rounded border-brand-border text-brand-primary focus:ring-brand-primary h-3.5 w-3.5 mr-2"
              />
              <span>Remember this session</span>
            </label>
          </div>

          <!-- Sign In Button -->
          <Button
            type="submit"
            variant="primary"
            size="lg"
            :full-width="true"
            :loading="isLoading"
          >
            Sign In
          </Button>
        </form>

        <!-- Default Credentials Helper Banner for Development -->
        <div class="p-3.5 rounded-xl bg-brand-soft/70 border border-brand-border text-[11px] text-brand-dark space-y-1">
          <p class="font-bold text-brand-dark uppercase tracking-wider">Default Dev Credentials:</p>
          <p><strong>Admin:</strong> admin@ghanatechglobal.com / AdminPass123!</p>
          <p><strong>Recruiter:</strong> recruiter@ghanatechglobal.com / RecruiterPass123!</p>
        </div>

        <div class="text-center pt-2">
          <router-link to="/" class="text-xs text-brand-muted hover:text-brand-primary transition-colors">
            ← Back to GhanaTech Global Public Site
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';
import { isValidEmail } from '@/utils/validators';
import Input from '@/components/common/Input.vue';
import Button from '@/components/common/Button.vue';

const router = useRouter();
const { login, isAuthenticated, isLoading } = useAuth();

const email = ref('admin@ghanatechglobal.com');
const password = ref('AdminPass123!');
const emailError = ref('');
const passwordError = ref('');
const errorMessage = ref('');

onMounted(() => {
  // If already authenticated: redirect away from login (Section 61/66)
  if (isAuthenticated.value) {
    router.replace('/admin');
  }
});

const validate = () => {
  emailError.value = '';
  passwordError.value = '';
  errorMessage.value = '';

  let valid = true;
  if (!email.value.trim()) {
    emailError.value = 'Email is required';
    valid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.value = 'Enter a valid email address';
    valid = false;
  }

  if (!password.value) {
    passwordError.value = 'Password is required';
    valid = false;
  }

  return valid;
};

const handleLogin = async () => {
  if (!validate()) return;

  try {
    await login({ email: email.value, password: password.value });
    // After successful login: redirect to /admin
    router.push('/admin');
  } catch (err: any) {
    errorMessage.value = err.message || 'Incorrect email or password.';
  }
};
</script>
