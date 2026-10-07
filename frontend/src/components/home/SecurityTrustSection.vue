<template>
  <section class="trust-section" aria-labelledby="trust-section-title">
    <div class="trust-container">
      <div class="trust-heading">
        <h2 id="trust-section-title">Confidence in every connection.</h2>
        <p>Protecting your work, your team, and your peace of mind.</p>
      </div>

      <div class="trust-grid">
        <article v-for="item in assurances" :key="item.title" class="trust-card">
          <div class="trust-icon" :class="item.iconClass">
            <component :is="item.icon" :size="56" :stroke-width="1.7" aria-hidden="true" />
          </div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ClipboardCheck, Handshake, UserRoundCheck } from 'lucide-vue-next';

const assurances = [
  {
    title: "Work Ownership & Privacy",
    description: "Your agreements explain who owns the code and other work, and how private information is protected.",
    icon: Handshake,
    iconClass: 'trust-icon-protection',
  },
  {
    title: 'Background Checks',
    description: 'Identity, education, employment history, and criminal records are checked before candidates are introduced.',
    icon: ClipboardCheck,
    iconClass: 'trust-icon-verification',
  },
  {
    title: "Support After Hiring",
    description: "If a new hire is not the right fit, talk to our team about the next steps and agreed replacement terms.",
    icon: UserRoundCheck,
    iconClass: 'trust-icon-support',
  },
];
</script>

<style scoped>
.trust-section {
  padding: 80px 0;
  background: #faf9fd;
  border-bottom: 1px solid #ebe5f4;
}
.trust-container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
.trust-heading { max-width: 760px; margin: 0 auto 48px; text-align: center; }
.trust-heading h2 { color: #32114f; font-size: clamp(30px, 3vw, 40px); font-weight: 700; letter-spacing: -1px; line-height: 1.3; }
.trust-heading > p { margin-top: 16px; color: #62596d; font-size: 18px; line-height: 1.8; }
.trust-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px; }
.trust-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px 30px 40px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 3px 20px rgba(48, 25, 76, .055);
  text-align: center;
}
.trust-icon { display: flex; align-items: center; justify-content: center; width: 112px; height: 112px; flex-shrink: 0; border-radius: 50%; color: #fff; margin-bottom: 26px; }
.trust-icon-protection { background: #5b21b6; }
.trust-icon-verification { background: #7c3aed; }
.trust-icon-support { background: #9471d5; }
.trust-card h3 { color: #32114f; font-size: 20px; font-weight: 700; line-height: 1.5; }
.trust-card > p { max-width: 280px; margin-top: 17px; color: #62596d; font-size: 16px; line-height: 1.8; }
@media (max-width: 1024px) {
  .trust-grid { gap: 20px; }
  .trust-card { padding: 36px 22px; }
}
@media (max-width: 767px) {
  .trust-section { padding: 56px 0; }
  .trust-container { padding: 0 20px; }
  .trust-heading { margin-bottom: 32px; }
  .trust-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; gap: 24px; }
  .trust-card { padding: 36px 28px; }
  .trust-card > p { max-width: 290px; }
  .trust-icon { width: 104px; height: 104px; margin-bottom: 24px; }
}
</style>
