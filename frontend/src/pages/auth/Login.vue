<template>
  <div class="login-page relative isolate min-h-screen bg-brand-primary flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-brand-primary selection:text-white">
    <div class="login-backdrop" aria-hidden="true">
      <span class="login-glow login-glow--top"></span>
      <span class="login-glow login-glow--bottom"></span>
      <span class="login-orbit login-orbit--left"></span>
      <span class="login-orbit login-orbit--right"></span>
      <span v-for="particle in 6" :key="particle" class="login-particle"></span>
    </div>
    <div class="relative z-10 w-full sm:mx-auto sm:max-w-md">
      <div class="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-brand-border/80 shadow-violet-md space-y-6">
        <form class="space-y-5" aria-label="Admin sign in" @submit.prevent="handleLogin">
          <div class="text-center">
            <router-link to="/" class="inline-flex items-center" aria-label="GhanaTech Global home">
              <img
                src="/images/white%20background.png"
                alt="GhanaTech Global"
                class="h-16 sm:h-20 w-auto max-w-full object-contain"
              />
            </router-link>
          </div>

          <!-- Error Alert Message -->
          <div
            v-if="errorMessage"
            class="p-3.5 rounded-xl bg-brand-lightest border border-brand-primary text-xs font-semibold text-brand-dark flex items-center space-x-2"
          >
            <svg class="w-4 h-4 text-brand-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>

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
                class="rounded-sm border-brand-border text-brand-primary focus:ring-brand-primary h-3.5 w-3.5 mr-2"
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

<style scoped>
.login-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.login-glow {
  position: absolute;
  width: clamp(360px, 60vw, 850px);
  aspect-ratio: 1;
  border-radius: 50%;
  animation: login-glow-drift 24s ease-in-out infinite alternate;
}
.login-glow--top {
  top: -30%;
  left: -16%;
  background: radial-gradient(circle, #c4b5fd45 0%, #a78bfa18 38%, transparent 70%);
}
.login-glow--bottom {
  bottom: -35%;
  right: -18%;
  background: radial-gradient(circle, #ede9fe30 0%, #a78bfa20 38%, transparent 70%);
  animation-delay: -12s;
  animation-direction: alternate-reverse;
}

.login-orbit {
  position: absolute;
  width: clamp(240px, 34vw, 490px);
  aspect-ratio: 1;
  border: 1px solid #ffffff24;
  border-radius: 50%;
  animation: login-orbit-turn 70s linear infinite;
}
.login-orbit::before {
  content: '';
  position: absolute;
  inset: 12%;
  border: 1px solid #ffffff12;
  border-radius: 50%;
}
.login-orbit::after {
  content: '';
  position: absolute;
  top: -3px;
  left: calc(50% - 3px);
  width: 6px;
  height: 6px;
  background: #ede9fe99;
  border-radius: 50%;
  box-shadow: 0 0 14px #ede9fe66;
}
.login-orbit--left { top: 14%; left: -13%; }
.login-orbit--right { right: -12%; bottom: 8%; animation-direction: reverse; animation-delay: -30s; }

.login-particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ede9fe;
  opacity: .35;
  animation: login-particle-float 14s ease-in-out infinite alternate;
}
.login-particle:nth-of-type(5) { left: 12%; top: 67%; animation-delay: -4s; }
.login-particle:nth-of-type(6) { left: 23%; top: 21%; width: 3px; height: 3px; animation-delay: -9s; }
.login-particle:nth-of-type(7) { left: 79%; top: 17%; animation-delay: -2s; }
.login-particle:nth-of-type(8) { left: 90%; top: 72%; width: 3px; height: 3px; animation-delay: -11s; }
.login-particle:nth-of-type(9) { left: 68%; top: 85%; width: 6px; height: 6px; animation-delay: -7s; }
.login-particle:nth-of-type(10) { left: 45%; top: 8%; animation-delay: -5s; }

@keyframes login-glow-drift {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(7%, 10%, 0) scale(1.12); }
}
@keyframes login-orbit-turn {
  to { transform: rotate(360deg); }
}
@keyframes login-particle-float {
  from { transform: translate3d(0, 0, 0); opacity: .2; }
  to { transform: translate3d(16px, -36px, 0); opacity: .5; }
}

@media (prefers-reduced-motion: reduce) {
  .login-glow, .login-orbit, .login-particle { animation: none; }
}
</style>
