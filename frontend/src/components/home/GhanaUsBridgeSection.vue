<template>
  <section class="career-bridge" aria-labelledby="career-bridge-title">
    <div class="bridge-container">
      <div class="bridge-intro">
        <div class="bridge-copy">
          <h2 id="career-bridge-title">Easy way to <span class="headline-highlight">find</span><br />your next U.S. job.</h2>
          <p class="bridge-description">
            Connect with U.S. employers, discover remote technology roles,
            and take the next step in your career from right here in Ghana.
          </p>
          <form class="bridge-signup" @submit.prevent="startApplication">
            <label for="bridge-email" class="sr-only">Your email address</label>
            <input id="bridge-email" v-model="email" type="email" name="email" autocomplete="email" placeholder="Your email address" maxlength="254" required />
            <button type="submit">Get started <ArrowRight :size="18" aria-hidden="true" /></button>
          </form>
          <p class="bridge-help">Looking for help? <router-link to="/contact">Get in touch with us</router-link></p>
        </div>

        <div class="bridge-visual">
          <div class="bridge-photo">
            <img src="/images/career-opportunities-woman.jpg" alt="Smiling African professional pointing toward the talent network signup" width="1254" height="1254" loading="lazy" decoding="async" />
          </div>
          <div class="journey-card">
            <h3>Your career journey</h3>
            <div class="journey-labels"><span>Ghana</span><span>U.S. opportunities</span></div>
            <div class="journey-track" aria-hidden="true"><span /></div>
          </div>
          <router-link to="/jobs" class="opportunity-card">
            <span class="opportunity-icon"><Monitor :size="28" :stroke-width="1.8" aria-hidden="true" /></span>
            <div><span>Remote opportunities</span><strong>Explore jobs</strong></div>
            <ArrowUpRight :size="20" class="opportunity-arrow" aria-hidden="true" />
          </router-link>
        </div>
      </div>

      <div class="bridge-path">
        <div class="path-heading"><h3>Three steps to your next opportunity.</h3></div>
        <ol class="path-steps">
          <li v-for="step in steps" :key="step.number" class="path-step">
            <div class="step-icon" :class="step.iconClass"><component :is="step.icon" :size="56" :stroke-width="1.7" aria-hidden="true" /></div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.description }}</p>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, MessagesSquare, Monitor, UserRound } from 'lucide-vue-next';
import { isValidEmail } from '@/utils/validators';

const email = ref('');
const router = useRouter();

function startApplication() {
  const address = email.value.trim();
  if (isValidEmail(address)) router.push({ path: '/join-talent', query: { email: address } });
}

const steps = [
  { number: '01', icon: UserRound, iconClass: 'step-icon-profile', title: 'Introduce yourself', description: 'Join the talent network. Share your skills, experience, and the kind of role you’re looking for.' },
  { number: '02', icon: BriefcaseBusiness, iconClass: 'step-icon-opportunity', title: 'Find your opportunity', description: 'Explore U.S. job openings and apply to the roles that align with your strengths and goals.' },
  { number: '03', icon: MessagesSquare, iconClass: 'step-icon-interview', title: 'Take the next step', description: 'If shortlisted, connect with the hiring team to discuss the role and show what you can bring.' },
];
</script>

<style scoped>
.career-bridge { padding: 64px 0 80px; background: linear-gradient(180deg, #e4dfff 0%, #f7f5ff 70%, #faf9fd 100%); }
.bridge-container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
.bridge-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 68px; align-items: center; padding-right: 24px; }
.bridge-copy { padding: 36px 0; min-width: 0; }
.bridge-copy h2 { margin: 0; color: #171021; font-size: clamp(36px, 3.6vw, 50px); font-weight: 700; letter-spacing: -1.3px; line-height: 1.6; }
.headline-highlight { position: relative; display: inline-block; isolation: isolate; padding: 0 8px; color: #fff; }
.headline-highlight::before { content: ''; position: absolute; z-index: -1; inset: 6px 0; background: #6d28d9; transform: skewY(-3deg); }
.bridge-description { max-width: 525px; margin-top: 28px; color: #726d87; font-size: 18px; line-height: 1.8; }
.bridge-signup { display: flex; align-items: center; width: 100%; max-width: 565px; margin-top: 28px; padding: 3px; border: 1px solid #e8e3f3; border-radius: 999px; background: #fff; box-shadow: 0 2px 5px #35214806; }
.bridge-signup input { width: 100%; min-width: 0; flex: 1; padding: 14px 20px; background: transparent; border: 0; border-radius: 999px; font-size: 16px; color: #32114f; outline: none; }
.bridge-signup input::placeholder { color: #888095; }
.bridge-signup:focus-within { outline: 3px solid #c4b5fd; outline-offset: 3px; }
.bridge-signup button { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; gap: 10px; min-height: 52px; padding: 12px 24px; border-radius: 999px; background: #6d28d9; color: #fff; font-size: 16px; font-weight: 600; cursor: pointer; transition: background .2s; }
.bridge-signup button:hover { background: #5520aa; }
.bridge-help { margin-top: 14px; font-size: 16px; line-height: 1.7; color: #726d87; }
.bridge-help a { color: #6d28d9; }
.bridge-help a:hover { text-decoration: underline; }
.bridge-signup button:focus-visible, .bridge-help a:focus-visible, .opportunity-card:focus-visible { outline: 3px solid #a78bfa; outline-offset: 4px; }
.bridge-visual { position: relative; display: grid; min-width: 0; }
.bridge-photo { grid-row: 2; aspect-ratio: .94; overflow: hidden; background: #f9f9fa; border-radius: 16px; box-shadow: 0 8px 18px #35214814; }
.bridge-photo img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center bottom; }
.journey-card { position: relative; grid-row: 1; justify-self: end; right: -44px; width: 270px; margin-bottom: -16px; padding: 20px; border-radius: 10px; background: #fff; box-shadow: 0 8px 24px #25113412; z-index: 1; }
.journey-card h3 { color: #21162d; font-size: 20px; font-weight: 500; line-height: 1.4; }
.journey-labels { display: flex; justify-content: space-between; gap: 16px; margin-top: 18px; color: #82788e; font-size: 14px; line-height: 1.5; }
.journey-track { height: 7px; margin-top: 10px; border-radius: 999px; background: #f1eef8; overflow: hidden; }
.journey-track span { display: block; width: 84%; height: 100%; background: #6d28d9; border-radius: inherit; }
.opportunity-card { position: absolute; bottom: 9%; left: -48px; display: flex; align-items: center; gap: 14px; padding: 18px; border-radius: 10px; background: #fff; box-shadow: 0 8px 24px #25113412; }
.opportunity-icon { display: flex; align-items: center; justify-content: center; width: 68px; height: 68px; flex-shrink: 0; border-radius: 50%; background: #f5f2ff; color: #6d28d9; }
.opportunity-card > div { display: flex; flex-direction: column; gap: 3px; }
.opportunity-card > div > span { color: #82788e; font-size: 14px; }
.opportunity-card strong { color: #21162d; font-size: 20px; font-weight: 600; }
.opportunity-arrow { color: #6d28d9; margin-left: 6px; }
.bridge-path { margin-top: 64px; }
.path-heading { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 21px; }
.path-heading h3 { color: #352148; font-size: 24px; font-weight: 700; letter-spacing: -.4px; }
.path-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; margin: 0; padding: 0; list-style: none; }
.path-step { position: relative; display: flex; flex-direction: column; align-items: center; padding: 44px 30px 40px; background: #fff; border-radius: 6px; box-shadow: 0 3px 20px rgba(48, 25, 76, .055); text-align: center; }
.step-icon { display: flex; align-items: center; justify-content: center; width: 112px; height: 112px; flex-shrink: 0; border-radius: 50%; color: #fff; margin-bottom: 26px; }
.step-icon-profile { background: #5b21b6; }
.step-icon-opportunity { background: #7c3aed; }
.step-icon-interview { background: #9471d5; }
.path-step h4 { font-size: 20px; font-weight: 700; color: #32114f; line-height: 1.5; }
.path-step p { max-width: 285px; margin-top: 17px; font-size: 16px; color: #62596d; line-height: 1.8; }

@media (max-width: 1100px) {
  .bridge-intro { gap: 44px; }
  .bridge-copy h2 { font-size: 40px; }
  .journey-card { right: -24px; width: 245px; }
  .opportunity-card { left: -28px; padding: 16px; gap: 10px; }
  .opportunity-icon { width: 56px; height: 56px; }
  .bridge-signup button { padding: 12px 18px; }
  .path-steps { gap: 20px; }
  .path-step { padding: 36px 22px; }
}
@media (max-width: 900px) {
  .career-bridge { padding: 60px 0; }
  .bridge-intro { grid-template-columns: 1fr; gap: 40px; padding-right: 0; }
  .bridge-copy { max-width: 600px; padding: 0; }
  .bridge-copy h2 { font-size: clamp(36px, 5.5vw, 48px); }
  .bridge-visual { width: calc(100% - 48px); max-width: 540px; margin: 0 auto; }
  .bridge-path { margin-top: 64px; }
}
@media (max-width: 767px) {
  .path-steps { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; gap: 24px; }
  .path-step { padding: 36px 28px; }
  .path-step p { max-width: 290px; }
  .step-icon { width: 104px; height: 104px; margin-bottom: 24px; }
}
@media (max-width: 560px) {
  .bridge-container { padding: 0 20px; }
  .bridge-copy h2 { font-size: clamp(30px, 7.2vw, 38px); letter-spacing: -.8px; line-height: 1.6; }
  .bridge-description { margin-top: 22px; font-size: 17px; }
  .bridge-signup input { padding: 14px 12px; }
  .bridge-signup button { padding: 12px 16px; font-size: 15px; gap: 6px; }
  .bridge-signup button svg { display: none; }
  .bridge-help { font-size: 15px; }
  .bridge-visual { width: calc(100% - 24px); }
  .journey-card { right: -12px; width: 210px; padding: 16px; }
  .journey-card h3 { font-size: 18px; }
  .journey-labels { margin-top: 12px; gap: 10px; font-size: 12px; }
  .opportunity-card { left: -12px; bottom: 7%; padding: 12px; gap: 10px; }
  .opportunity-icon { width: 48px; height: 48px; }
  .opportunity-card strong { font-size: 18px; }
  .opportunity-card > div > span { font-size: 13px; }
  .opportunity-arrow { display: none; }
  .bridge-path { margin-top: 48px; }
}
</style>
