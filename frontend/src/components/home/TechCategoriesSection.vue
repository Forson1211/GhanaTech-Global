<template>
  <section class="career-areas" aria-labelledby="career-areas-title">
    <div class="areas-container">
      <div class="areas-heading">
        <div>
          <h2 id="career-areas-title">Find Your Type of Work.</h2>
          <p>Explore jobs in software, cloud, security, and data.</p>
        </div>
        <router-link to="/jobs" class="areas-link">Explore jobs <ArrowRight :size="20" aria-hidden="true" /></router-link>
      </div>
      <div class="areas-grid">
        <article v-for="category in categories" :key="category.title" class="area-card">
          <div class="area-icon"><component :is="category.icon" :size="40" :stroke-width="1.7" aria-hidden="true" /></div>
          <h3>{{ category.title }}</h3>
          <p>{{ category.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Cloud, CodeXml, Database, ShieldCheck } from 'lucide-vue-next';

const categories = [
  { title: 'Cybersecurity', icon: ShieldCheck, description: "Help protect systems and data from online threats." },
  { title: 'Cloud & IT', icon: Cloud, description: "Build and support cloud systems and business computers." },
  { title: 'Software Engineering', icon: CodeXml, description: "Build websites and apps, or test software." },
  { title: 'Data & Analytics', icon: Database, description: "Work with data, reports, and business dashboards." },
];
</script>

<style scoped>
.career-areas { padding: 88px 0; background: #fff; }
.areas-container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
.areas-heading { display: flex; align-items: center; justify-content: space-between; gap: 32px; margin-bottom: 40px; }
.areas-heading h2 { color: #32114f; font-size: clamp(30px, 3vw, 40px); font-weight: 700; line-height: 1.25; letter-spacing: -1px; }
.areas-heading p { margin-top: 16px; font-size: 18px; color: #62596d; line-height: 1.7; }
.areas-link { display: inline-flex; align-items: center; gap: 10px; color: #6d28d9; font-size: 16px; font-weight: 700; flex-shrink: 0; }
.areas-link:hover { color: #4c1d95; }
.areas-link:focus-visible { outline: 3px solid #a78bfa; outline-offset: 6px; border-radius: 4px; }
.areas-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px; }
.area-card { padding: 32px 24px; background: #faf9fd; border-radius: 10px; }
.area-icon { color: #6d28d9; margin-bottom: 24px; }
.area-card h3 { color: #32114f; font-size: 20px; font-weight: 700; line-height: 1.45; }
.area-card p { margin-top: 14px; color: #62596d; font-size: 16px; line-height: 1.75; }
@media (max-width: 1023px) {
  .areas-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 767px) {
  .career-areas { padding: 60px 0; }
  .areas-container { padding: 0 20px; }
  .areas-heading { align-items: center; flex-direction: column; gap: 20px; margin-bottom: 32px; text-align: center; }
  .areas-heading p { font-size: 17px; }
  .areas-grid { grid-template-columns: 1fr; gap: 20px; }
  .area-card { padding: 28px; text-align: center; }
  .area-icon { display: flex; justify-content: center; }
}
</style>
