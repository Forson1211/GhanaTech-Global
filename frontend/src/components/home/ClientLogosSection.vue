<template>
  <section class="company-section" aria-label="Companies we work with">
    <div class="company-container">
      <div class="company-heading">
        <p>TRUSTED COMPANIES WE WORK WITH</p>
      </div>
      <div class="company-marquee">
        <div class="company-track">
          <div v-for="copy in 2" :key="copy" class="company-logo-group" :class="{ 'company-logo-copy': copy === 2 }" :aria-hidden="copy === 2 ? true : undefined">
            <div v-for="company in companies" :key="company.file" class="company-logo-slot">
              <img :src="'/images/companies/' + company.file + '.svg'" :alt="copy === 1 ? company.name : ''" :style="{ width: company.width + 'px' }" width="220" height="72" decoding="async" draggable="false" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const companies = [
  { name: 'Amazon', file: 'amazon', width: 200 },
  { name: 'Google', file: 'google', width: 180 },
  { name: 'Lenovo', file: 'lenovo', width: 190 },
  { name: 'PayPal', file: 'paypal', width: 210 },
  { name: 'Shopify', file: 'shopify', width: 220 },
  { name: 'Spotify', file: 'spotify', width: 210 },
  { name: 'Microsoft', file: 'microsoft', width: 230 },
  { name: 'Slack', file: 'slack', width: 195 },
  { name: 'Stripe', file: 'stripe', width: 150 },
];
</script>

<style scoped>
.company-section { padding: 48px 0 52px; overflow: hidden; background: #fff; }
.company-container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
.company-heading { text-align: center; margin-bottom: 32px; }
.company-heading > p { color: #62596d; font-size: 15px; font-weight: 700; letter-spacing: 1px; line-height: 1.7; }
.company-marquee { position: relative; overflow: hidden; }
.company-marquee::before, .company-marquee::after { content: ''; position: absolute; top: 0; bottom: 0; width: 45px; pointer-events: none; z-index: 1; }
.company-marquee::before { left: 0; background: linear-gradient(90deg, #fff, transparent); }
.company-marquee::after { right: 0; background: linear-gradient(270deg, #fff, transparent); }
.company-track { display: flex; width: max-content; padding: 12px 0; animation: company-scroll 48s linear infinite; }
.company-marquee:hover .company-track { animation-play-state: paused; }
.company-logo-group { display: flex; align-items: center; gap: 48px; padding-right: 48px; flex-shrink: 0; }
.company-logo-slot { display: flex; align-items: center; justify-content: center; width: 230px; height: 100px; flex-shrink: 0; }
.company-logo-slot img { display: block; max-width: 100%; height: 72px; object-fit: contain; filter: none; opacity: 1; }
@keyframes company-scroll { to { transform: translateX(-50%); } }
@media (max-width: 767px) {
  .company-section { padding: 36px 0; }
  .company-container { padding: 0 20px; }
  .company-heading { margin-bottom: 20px; }
  .company-heading > p { font-size: 14px; letter-spacing: .5px; }
  .company-logo-group { gap: 32px; padding-right: 32px; }
  .company-logo-slot { width: 185px; height: 86px; }
  .company-logo-slot img { height: 60px; }
  .company-marquee::before, .company-marquee::after { width: 24px; }
}
@media (prefers-reduced-motion: reduce) {
  .company-track { animation: none; width: 100%; }
  .company-logo-group { width: 100%; flex-wrap: wrap; justify-content: center; gap: 24px; padding-right: 0; }
  .company-logo-copy, .company-marquee::before, .company-marquee::after { display: none; }
}
</style>
