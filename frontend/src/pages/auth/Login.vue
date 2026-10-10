<template>
  <main class="login-page">
    <div class="login-card">
      <img class="talent-backdrop" src="/images/talent-hero-transparent.png" alt="" aria-hidden="true" />
      <div class="panel-texture" aria-hidden="true"></div>
      <svg class="panel-curve" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
        <path d="M 850 0 C 715 78 732 220 635 385 C 565 510 548 615 602 720 H 1200 V 0 Z" fill="#ffffff" />
      </svg>

      <section class="welcome-panel" aria-label="GhanaTech Global updates">
        <router-link to="/" class="brand-link" aria-label="GhanaTech Global home">
          <img src="/images/logo-on-purple.png" alt="GhanaTech Global" width="200" height="61" />
        </router-link>

        <div class="welcome-content">
          <span class="welcome-eyebrow">GHANAIAN TALENT. GLOBAL IMPACT.</span>
          <h2>Great talent.<br />Global possibilities.</h2>
          <p class="welcome-description">Connecting exceptional technology talent with opportunities that make a difference.</p>

          <form class="updates-form" aria-label="Subscribe to GhanaTech Global updates" :aria-busy="isSubscribing" @submit.prevent="subscribe">
            <h3>Stay in the loop.</h3>
            <p>Get the latest news, insights, and opportunities.</p>
            <label class="sr-only" for="updates-email">Your email for updates</label>
            <div class="updates-input-row">
              <input id="updates-email" v-model="updatesEmail" type="email" name="newsletter-email" autocomplete="email" placeholder="Your email address" maxlength="254" required :disabled="isSubscribing" :aria-describedby="subscriptionMessage ? 'updates-status' : undefined" :aria-invalid="subscriptionFailed" />
              <button type="submit" :disabled="isSubscribing" aria-label="Subscribe to updates">
                <LoaderCircle v-if="isSubscribing" class="spinner" :size="17" aria-hidden="true" />
                <ArrowRight v-else :size="19" aria-hidden="true" />
              </button>
            </div>
            <p v-if="subscriptionMessage" id="updates-status" class="updates-status" :role="subscriptionFailed ? 'alert' : 'status'">{{ subscriptionMessage }}</p>
            <p class="updates-privacy">By subscribing, you agree to our <router-link to="/privacy">Privacy Policy</router-link>.</p>
          </form>
        </div>

        <span class="welcome-footer">GhanaTech Global <span aria-hidden="true">/</span> Connecting people. Creating impact.</span>
      </section>

      <section class="signin-panel" aria-label="Administrator sign in">
        <router-link to="/" class="close-link" aria-label="Back to GhanaTech Global website" title="Back to website">
          <X :size="17" aria-hidden="true" />
        </router-link>

        <div class="signin-content">
          <div class="portal-label"><ShieldCheck :size="16" aria-hidden="true" /> ADMIN WORKSPACE</div>
          <h1>Hello there!<br /><span>Welcome back.</span></h1>
          <p class="signin-description">Sign in to your GhanaTech Global workspace.</p>

          <form class="signin-form" aria-label="Admin sign in" novalidate :aria-busy="isLoading" @submit.prevent="handleLogin">
            <p v-if="errorMessage" class="login-error" role="alert"><CircleAlert :size="17" aria-hidden="true" /> {{ errorMessage }}</p>

            <div class="field-group">
              <label for="admin-email">Email address</label>
              <div class="field-line" :class="{ 'field-invalid': emailError }">
                <Mail :size="18" aria-hidden="true" />
                <input id="admin-email" v-model="email" type="email" name="email" autocomplete="username" placeholder="Enter your email address" required :disabled="isLoading" :aria-invalid="!!emailError" :aria-describedby="emailError ? 'admin-email-error' : undefined" />
              </div>
              <p v-if="emailError" id="admin-email-error" class="field-error">{{ emailError }}</p>
            </div>

            <div class="field-group">
              <label for="admin-password">Password</label>
              <div class="field-line" :class="{ 'field-invalid': passwordError }">
                <LockKeyhole :size="18" aria-hidden="true" />
                <input id="admin-password" v-model="password" :type="showPassword ? 'text' : 'password'" name="password" autocomplete="current-password" placeholder="Enter your password" required :disabled="isLoading" :aria-invalid="!!passwordError" :aria-describedby="passwordError ? 'admin-password-error' : undefined" />
                <button class="password-toggle" type="button" :aria-label="showPassword ? 'Hide password' : 'Show password'" :aria-pressed="showPassword" :disabled="isLoading" @click="showPassword = !showPassword">
                  <EyeOff v-if="showPassword" :size="18" aria-hidden="true" />
                  <Eye v-else :size="18" aria-hidden="true" />
                </button>
              </div>
              <p v-if="passwordError" id="admin-password-error" class="field-error">{{ passwordError }}</p>
            </div>

            <button class="signin-button" type="submit" :disabled="isLoading">
              <LoaderCircle v-if="isLoading" class="spinner" :size="18" aria-hidden="true" />
              <span>{{ isLoading ? 'Signing in…' : 'Sign in' }}</span>
              <ArrowRight v-if="!isLoading" :size="17" aria-hidden="true" />
            </button>
          </form>

          <p class="access-help">Need access? <router-link to="/contact">Contact our team <ArrowUpRight :size="12" aria-hidden="true" /></router-link></p>
        </div>

        <div class="signin-footer">
          <span>© {{ year }} GhanaTech Global</span>
          <div><router-link to="/privacy">Privacy</router-link><span aria-hidden="true">·</span><router-link to="/terms">Terms</router-link></div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, ArrowUpRight, CircleAlert, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail, ShieldCheck, X } from 'lucide-vue-next';
import { useAuth } from '@/composables/useAuth';
import { isValidEmail } from '@/utils/validators';
import api from '@/services/api';

const router = useRouter();
const { login, isAuthenticated, isLoading } = useAuth();
const year = new Date().getFullYear();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const emailError = ref('');
const passwordError = ref('');
const errorMessage = ref('');
const updatesEmail = ref('');
const isSubscribing = ref(false);
const subscriptionMessage = ref('');
const subscriptionFailed = ref(false);

onMounted(() => {
  if (isAuthenticated.value) router.replace('/admin');
});

function validate() {
  emailError.value = '';
  passwordError.value = '';
  errorMessage.value = '';
  if (!email.value.trim()) emailError.value = 'Email is required.';
  else if (!isValidEmail(email.value.trim())) emailError.value = 'Enter a valid email address.';
  if (!password.value) passwordError.value = 'Password is required.';
  return !emailError.value && !passwordError.value;
}

async function handleLogin() {
  if (isLoading.value || !validate()) return;
  try {
    await login({ email: email.value.trim(), password: password.value });
    router.push('/admin');
  } catch (err: unknown) {
    errorMessage.value = err instanceof Error ? err.message : 'Incorrect email or password.';
  }
}

async function subscribe() {
  if (isSubscribing.value) return;
  isSubscribing.value = true;
  subscriptionMessage.value = '';
  subscriptionFailed.value = false;
  try {
    await api.post('/newsletter/subscribe', { email: updatesEmail.value.trim() }, { timeout: 10000 });
    subscriptionMessage.value = 'You’re on the list. Thanks for subscribing!';
    updatesEmail.value = '';
  } catch {
    subscriptionFailed.value = true;
    subscriptionMessage.value = 'We couldn’t save your subscription. Please try again.';
  } finally {
    isSubscribing.value = false;
  }
}
</script>

<style scoped>
.login-page { min-height: 100dvh; display: grid; place-items: center; padding: 48px 32px; background: radial-gradient(ellipse at 50% 40%, #8863c8 0%, #7550b4 55%, #65419f 100%); color: #423753; }
.login-card { position: relative; isolation: isolate; display: grid; grid-template-columns: 55% 45%; width: min(940px, 100%); min-height: 560px; overflow: hidden; border: 0; border-radius: 0; background: linear-gradient(135deg, #927bf2 0%, #8070ed 48%, #7564df 100%); box-shadow: 0 25px 75px #45346a14, 0 3px 14px #45346a0b; }
.talent-backdrop { position: absolute; z-index: -1; left: -4%; bottom: -13%; width: 62%; height: 112%; object-fit: contain; object-position: bottom; opacity: .07; filter: grayscale(1); mix-blend-mode: luminosity; pointer-events: none; }
.panel-texture { position: absolute; z-index: -1; inset: 0; background-image: radial-gradient(#fff5 .8px, transparent .8px); background-size: 15px 15px; mask-image: linear-gradient(transparent 62%, #000); opacity: .35; pointer-events: none; }
.panel-curve { position: absolute; z-index: -1; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.welcome-panel { display: flex; flex-direction: column; align-items: flex-start; padding: 30px 36px 24px; color: #fff; }
.brand-link { display: inline-flex; border-radius: 0; }
.brand-link img { width: 154px; height: auto; }
.welcome-content { width: 100%; max-width: 350px; margin: auto 0; padding: 26px 0 24px; }
.welcome-eyebrow { font-size: 10px; font-weight: 650; letter-spacing: 2px; color: #eee7ff; }
.welcome-content h2 { margin-top: 14px; font-size: 34px; font-weight: 600; line-height: 1.22; letter-spacing: -1px; }
.welcome-description { max-width: 290px; margin-top: 14px; font-size: 12px; line-height: 1.8; color: #eeeaff; }
.updates-form { max-width: 280px; margin-top: 28px; }
.updates-form h3 { font-size: 17px; font-weight: 550; letter-spacing: -.3px; }
.updates-form > p { margin-top: 6px; font-size: 11px; line-height: 1.7; color: #eeeaff; }
.updates-input-row { display: flex; align-items: center; gap: 16px; margin-top: 19px; padding-bottom: 9px; border-bottom: 1px solid #d9cdff8c; }
.updates-input-row:focus-within { border-color: #fff; }
.updates-input-row input { flex: 1; min-width: 0; padding: 8px 0; border: 0; background: transparent; font-size: 12px; color: #fff; outline: none; }
.updates-input-row input::placeholder { color: #efe9ff; opacity: .85; }
.updates-input-row button { display: grid; place-items: center; width: 39px; height: 30px; flex-shrink: 0; border: 0; border-radius: 0; background: #fff; color: #816ae8; cursor: pointer; transition: background .2s, transform .2s; }
.updates-input-row button:hover { background: #f1ebff; transform: translateX(2px); }
.updates-form > .updates-privacy { margin-top: 12px; font-size: 9px; color: #e5ddff; }
.updates-privacy a { text-decoration: underline; text-underline-offset: 2px; }
.updates-form > .updates-status { font-size: 11px; color: #fff; }
.welcome-footer { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-size: 9px; color: #eee8ff; letter-spacing: .15px; }
.welcome-footer > span { opacity: .5; }
.signin-panel { position: relative; display: flex; flex-direction: column; justify-content: center; padding: 54px 34px 24px 36px; }
.close-link { position: absolute; top: 27px; right: 28px; display: grid; place-items: center; width: 30px; height: 30px; border-radius: 0; color: #fff; background: #8a75ed; box-shadow: 0 2px 6px #8975e62b; transition: background .2s; }
.close-link:hover { background: #7052d5; }
.signin-content { width: 100%; max-width: 280px; margin: auto 0 auto auto; padding: 16px 0; }
.portal-label { display: flex; align-items: center; gap: 7px; color: #7a688f; font-size: 9px; font-weight: 650; letter-spacing: 1.7px; }
.portal-label svg { color: #8a74e4; }
.signin-content h1 { margin-top: 18px; color: #8872e5; font-size: 27px; font-weight: 600; letter-spacing: -.8px; line-height: 1.24; }
.signin-content h1 span { color: #6e55ce; }
.signin-description { margin-top: 12px; font-size: 12px; line-height: 1.8; color: #7f718e; }
.signin-form { margin-top: 26px; }
.field-group + .field-group { margin-top: 18px; }
.field-group > label { display: block; margin-bottom: 6px; color: #7f6f96; font-size: 11px; }
.field-line { display: flex; align-items: center; gap: 11px; min-height: 39px; border-bottom: 1px solid #dbd1f5; transition: border-color .2s; }
.field-line > svg { flex-shrink: 0; color: #ac96ee; }
.field-line:focus-within { border-color: #8065df; }
.field-line input { width: 100%; min-width: 0; padding: 9px 0; border: 0; background: transparent; color: #493b61; outline: none; font-size: 13px; }
.field-line input::placeholder { color: #7f718e; }
.password-toggle { display: grid; place-items: center; flex-shrink: 0; width: 28px; height: 28px; border: 0; border-radius: 0; background: transparent; color: #b1a0cc; cursor: pointer; }
.password-toggle:hover { background: #f6f2fc; color: #8065df; }
.field-invalid { border-color: #bd5575; }
.field-error { margin-top: 6px; color: #a84063; font-size: 11px; }
.login-error { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 20px; padding: 12px; border: 0; border-radius: 0; background: #fdf7f9; color: #a84063; font-size: 11px; line-height: 1.6; }
.login-error svg { flex-shrink: 0; margin-top: 1px; }
.signin-button { display: flex; align-items: center; justify-content: center; gap: 12px; width: 100%; min-height: 44px; margin-top: 24px; border: 0; border-radius: 0; background: #8a73ed; color: #fff; font-size: 12px; font-weight: 550; box-shadow: 0 4px 10px #8a73ed14; cursor: pointer; transition: background .2s, box-shadow .2s; }
.signin-button:hover { background: #775ddc; box-shadow: 0 5px 15px #8a73ed33; }
button:disabled { opacity: .65; cursor: wait; }
.access-help { margin-top: 20px; text-align: center; color: #7f718e; font-size: 11px; }
.access-help a { display: inline-flex; align-items: center; gap: 2px; margin-left: 3px; color: #8a73da; }
.access-help a:hover { color: #6244bf; }
.signin-footer { display: flex; flex-wrap: wrap; justify-content: flex-end; align-items: center; gap: 16px; color: #7f718e; font-size: 10px; }
.signin-footer > div { display: flex; gap: 9px; }
.signin-footer a:hover { color: #8065df; }
a:focus-visible, button:focus-visible { outline: 2px solid #8065df; outline-offset: 4px; }
.welcome-panel a:focus-visible, .welcome-panel button:focus-visible { outline-color: #fff; }
.spinner { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (max-width: 1000px) {
  .login-page { padding: 18px 14px; align-items: start; }
  .login-card { display: flex; flex-direction: column; width: min(540px, 100%); min-height: auto; border-width: 0; border-radius: 0; }
  .panel-curve { display: none; }
  .talent-backdrop { width: 80%; height: 410px; left: 27%; top: -15px; bottom: auto; opacity: .08; }
  .panel-texture { background-size: 13px 13px; mask-image: linear-gradient(#000, transparent 45%); }
  .welcome-panel { padding: 22px 24px 24px; }
  .brand-link img { width: 140px; }
  .welcome-content { max-width: none; padding: 20px 0 0; }
  .welcome-eyebrow { font-size: 8px; letter-spacing: 1.4px; }
  .welcome-content h2 { margin-top: 10px; font-size: 25px; }
  .welcome-description { max-width: 270px; margin-top: 12px; font-size: 12px; }
  .updates-form, .welcome-footer { display: none; }
  .signin-panel { padding: 28px 24px 20px; border-radius: 0; background: #fff; }
  .close-link { top: 23px; right: 24px; width: 27px; height: 27px; }
  .signin-content { max-width: 420px; margin: 0 auto; padding: 10px 0 24px; }
  .signin-content h1 { margin-top: 16px; font-size: 26px; }
  .signin-description { font-size: 12px; }
  .signin-form { margin-top: 22px; }
  .field-group > label { font-size: 11px; }
  .field-line { min-height: 45px; }
  .field-line input { font-size: 16px; }
  .field-line input::placeholder { font-size: 12px; }
  .signin-button { min-height: 47px; font-size: 13px; }
  .access-help { font-size: 11px; }
  .signin-footer { justify-content: space-between; width: 100%; max-width: 420px; margin: 0 auto; font-size: 10px; gap: 10px; }
}
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
</style>
