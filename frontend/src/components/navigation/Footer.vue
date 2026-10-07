<template>
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-newsletter">
        <div class="newsletter-copy">
          <h2>Stay connected to your next opportunity.</h2>
          <p>Get news, career insights, and GhanaTech Global updates in your inbox.</p>
        </div>
        <form class="newsletter-form" @submit.prevent="subscribe" :aria-busy="isSubscribing">
          <div class="newsletter-input-row">
            <label for="footer-newsletter-email" class="sr-only">Email address</label>
            <input id="footer-newsletter-email" v-model="email" type="email" name="email" autocomplete="email" placeholder="Your email address" maxlength="254" required :disabled="isSubscribing" :aria-invalid="!!subscriptionError" :aria-describedby="subscriptionError || subscriptionMessage ? 'footer-newsletter-status' : undefined" />
            <button type="submit" :disabled="isSubscribing">{{ isSubscribing ? 'SENDING…' : 'SUBSCRIBE' }}<ArrowUpRight :size="16" aria-hidden="true" /></button>
          </div>
          <p v-if="subscriptionError || subscriptionMessage" id="footer-newsletter-status" class="newsletter-status" :class="{ 'newsletter-error': subscriptionError }" :role="subscriptionError ? 'alert' : 'status'">{{ subscriptionError || subscriptionMessage }}</p>
        </form>
      </div>

      <div class="footer-brand-row">
        <router-link to="/" class="footer-logo" aria-label="GhanaTech Global home">
          <img src="/images/Purple%20background.png" alt="GhanaTech Global" width="240" height="60" loading="lazy" />
        </router-link>
        <nav class="footer-socials" aria-label="Social media">
          <a v-for="social in socialLinks" :key="social.name" :href="settings.socialLinks?.[social.name] || social.url" target="_blank" rel="noopener noreferrer" :aria-label="`GhanaTech Global on ${social.name}`">
            <svg v-if="social.name === 'X'" viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.8 22H2.5l7.7-8.8L.5 2h6.8l4.7 6.2L18.9 2Zm-1.2 18h1.8L6.3 3.9h-2L17.7 20Z" /></svg>
            <component v-else :is="social.icon" :size="20" aria-hidden="true" />
          </a>
        </nav>
      </div>

      <div class="footer-columns">
        <div v-for="(group, index) in linkGroups" :key="group.title" class="footer-column">
          <h3>
            <span class="footer-column-title">{{ group.title }}</span>
            <button class="footer-toggle" type="button" :aria-expanded="openSection === index" :aria-controls="`footer-links-${index}`" @click="toggleSection(index)">
              {{ group.title }}<ChevronDown :size="18" :class="{ 'footer-chevron-open': openSection === index }" aria-hidden="true" />
            </button>
          </h3>
          <ul :id="`footer-links-${index}`" class="footer-section-content" :class="{ 'is-open': openSection === index }">
            <li v-for="link in group.links" :key="link.label"><router-link :to="link.to">{{ link.label }}</router-link></li>
          </ul>
        </div>

        <div class="footer-column footer-contact">
          <h3>
            <span class="footer-column-title">Get in touch</span>
            <button class="footer-toggle" type="button" :aria-expanded="openSection === linkGroups.length" aria-controls="footer-contact-details" @click="toggleSection(linkGroups.length)">
              Get in touch<ChevronDown :size="18" :class="{ 'footer-chevron-open': openSection === linkGroups.length }" aria-hidden="true" />
            </button>
          </h3>
          <div id="footer-contact-details" class="footer-section-content" :class="{ 'is-open': openSection === linkGroups.length }">
          <address>
            <div class="contact-item"><MapPin :size="17" aria-hidden="true" /><span>{{ contactDetails.accraOffice }}</span></div>
            <div class="contact-item"><Globe2 :size="17" aria-hidden="true" /><span>{{ contactDetails.usOffice }}</span></div>
            <a class="contact-item" :href="contactDetails.phoneLink"><Phone :size="17" aria-hidden="true" /><span>{{ contactDetails.phone }}</span></a>
            <a class="contact-item contact-email" :href="`mailto:${contactDetails.email}`"><Mail :size="17" aria-hidden="true" /><span>{{ contactDetails.email }}</span></a>
          </address>
          <router-link to="/contact" class="footer-contact-link">Contact our team <ArrowUpRight :size="15" aria-hidden="true" /></router-link>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} GhanaTech Global Inc. All rights reserved.</p>
        <p>Rooted in Ghana. Connected to the world.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSiteSettings } from '@/composables/useSiteSettings';
import { ArrowUpRight, ChevronDown, Facebook, Globe2, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-vue-next';
import api from '@/services/api';

const currentYear = new Date().getFullYear();
const email = ref('');
const isSubscribing = ref(false);
const subscriptionMessage = ref('');
const subscriptionError = ref('');
const openSection = ref<number | null>(null);

function toggleSection(index: number) {
  openSection.value = openSection.value === index ? null : index;
}

const { settings } = useSiteSettings();
const contactDetails = computed(() => ({ email: settings.value.contactEmail, phone: settings.value.supportPhone, phoneLink: 'tel:' + settings.value.supportPhone.replace(/[^+0-9]/g, ''), accraOffice: settings.value.accraOfficeAddress, usOffice: settings.value.usOfficeAddress }));
const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/ghanatechglobal', icon: Facebook },
  { name: 'Instagram', url: 'https://www.instagram.com/ghanatechglobal/', icon: Instagram },
  { name: 'X', url: 'https://x.com/ghanatechglobal', icon: null },
  { name: 'YouTube', url: 'https://www.youtube.com/@ghanatechglobal', icon: Youtube },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ghanatech-global/', icon: Linkedin },
];

const linkGroups = [
  { title: 'Find remote jobs', links: [
    { label: 'Explore all jobs', to: '/jobs' },
    { label: 'Software engineering', to: '/jobs' },
    { label: 'Cybersecurity & SOC', to: '/jobs' },
    { label: 'Cloud & DevOps', to: '/jobs' },
    { label: 'Data & AI systems', to: '/jobs' },
    { label: 'Join the talent network', to: '/join-talent' },
  ] },
  { title: "For Employers", links: [
    { label: 'Hire Ghanaian talent', to: '/hire-talent' },
    { label: "Browse candidate profiles", to: '/talent-directory' },
    { label: "How we check skills", to: '/how-it-works' },
    { label: 'Why hire from Ghana', to: '/why-ghana' },
    { label: "Hiring questions", to: '/faq' },
  ] },
  { title: 'Our services', links: [
    { label: 'Cybersecurity', to: '/services/cybersecurity' },
    { label: "Cloud & IT support", to: '/services/cloud-it' },
    { label: 'Software engineering', to: '/services/software' },
    { label: "Data & reporting", to: '/services/data' },
    { label: 'Explore all services', to: '/services' },
  ] },
  { title: 'Company & support', links: [
    { label: 'About GhanaTech', to: '/about' },
    { label: 'How it works', to: '/how-it-works' },
    { label: 'Why Ghana', to: '/why-ghana' },
    { label: "Common questions", to: '/faq' },
    { label: 'Contact our team', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Use', to: '/terms' },
  ] },
];

async function subscribe() {
  if (isSubscribing.value) return;
  isSubscribing.value = true;
  subscriptionMessage.value = '';
  subscriptionError.value = '';
  try {
    await api.post('/newsletter/subscribe', { email: email.value.trim() }, { timeout: 10000 });
    subscriptionMessage.value = 'You’re on the list. Thanks for subscribing!';
    email.value = '';
  } catch {
    subscriptionError.value = 'We couldn’t save your subscription. Please try again shortly.';
  } finally {
    isSubscribing.value = false;
  }
}
</script>

<style scoped>
.site-footer { background: #39005c; color: #fff; border-top: 1px solid #4d0a7a; }
.footer-container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }
.footer-newsletter { display: flex; align-items: center; justify-content: space-between; gap: 40px; padding: 48px 0; border-bottom: 1px solid #ffffff26; }
.newsletter-copy { flex: 1; min-width: 0; }
.newsletter-copy h2 { font-size: clamp(22px, 2.3vw, 30px); font-weight: 800; letter-spacing: -.8px; line-height: 1.35; color: #fff; }
.newsletter-copy > p { color: #ded0e7; font-size: 13px; line-height: 1.7; margin-top: 9px; }
.newsletter-form { width: 410px; flex-shrink: 0; }
.newsletter-input-row { display: flex; min-height: 52px; }
.newsletter-input-row input { flex: 1; min-width: 0; background: #fff; padding: 15px 18px; color: #321341; border: 0; outline: none; font-size: 13px; border-radius: 0; }
.newsletter-input-row input::placeholder { color: #85758f; }
.newsletter-input-row input:focus-visible { box-shadow: inset 0 0 0 3px #c4b5fd; }
.newsletter-input-row button { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 20px; background: #7c3aed; color: #fff; border: 0; font-size: 11px; font-weight: 800; letter-spacing: .4px; cursor: pointer; transition: background .2s; }
.newsletter-input-row button:hover { background: #6d28d9; }
.newsletter-input-row button:disabled { opacity: .65; cursor: wait; }
.newsletter-status { font-size: 12px; line-height: 1.6; color: #e9dcff; margin-top: 10px; }
.newsletter-error { color: #ffd3de; }
.footer-brand-row { display: flex; justify-content: space-between; align-items: center; gap: 32px; padding: 35px 0; border-bottom: 1px solid #ffffff26; }
.footer-logo { display: inline-flex; flex-shrink: 0; }
.footer-logo img { width: auto; height: 54px; max-width: 240px; object-fit: contain; }
.footer-socials { display: flex; align-items: center; gap: 22px; }
.footer-socials a { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 32px; color: #d8c8e3; transition: color .2s; }
.footer-socials a:hover { color: #fff; }
.footer-columns { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(0, 1.2fr); gap: 30px; padding: 46px 0 50px; }
.footer-column h3 { font-size: 14px; font-weight: 700; color: #fff; padding-bottom: 13px; border-bottom: 1px solid #ffffff2b; margin-bottom: 15px; }
.footer-toggle { display: none; }
.footer-section-content { display: block; }
.footer-column ul { list-style: none; margin: 0; padding: 0; }
.footer-column li + li { margin-top: 11px; }
.footer-column a { color: #d8c8e3; font-size: 12px; line-height: 1.7; text-decoration: none; transition: color .2s; }
.footer-column a:hover { color: #fff; }
.footer-contact address { font-style: normal; display: flex; flex-direction: column; gap: 13px; }
.contact-item { display: flex; align-items: flex-start; gap: 9px; font-size: 12px; line-height: 1.8; color: #d8c8e3; }
.contact-item > svg { margin-top: 3px; flex-shrink: 0; color: #c4a6ef; }
.contact-item > span { min-width: 0; }
.contact-email > span { overflow-wrap: anywhere; }
.footer-column .footer-contact-link { display: inline-flex; align-items: center; gap: 7px; margin-top: 18px; padding: 8px 11px; border: 1px solid #ffffff33; color: #f1e5ff; font-size: 11px; font-weight: 600; }
.footer-contact-link:hover { background: #ffffff0a; }
.footer-bottom { border-top: 1px solid #ffffff26; padding: 23px 0; display: flex; justify-content: space-between; gap: 24px; color: #c6b3d1; font-size: 10px; line-height: 1.8; }
.site-footer a:focus-visible, .site-footer button:focus-visible { outline: 2px solid #d8c1f5; outline-offset: 4px; }
@media (max-width: 1100px) {
  .footer-newsletter { gap: 30px; }
  .newsletter-form { width: 360px; }
  .footer-columns { gap: 22px; }
}
@media (max-width: 900px) {
  .footer-newsletter { flex-direction: column; align-items: flex-start; gap: 22px; }
  .newsletter-form { width: 100%; max-width: 500px; }
  .footer-columns { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; }
  .footer-brand-row { padding: 30px 0; }
}
@media (max-width: 767px) {
  .footer-container { padding: 0 20px; }
  .footer-newsletter { padding: 36px 0; }
  .newsletter-copy h2 { font-size: 24px; max-width: 330px; }
  .newsletter-copy > p { font-size: 13px; }
  .newsletter-input-row input { padding: 14px 12px; font-size: 14px; }
  .newsletter-input-row button { padding: 0 12px; font-size: 11px; gap: 5px; }
  .newsletter-input-row button > svg { display: none; }
  .footer-brand-row { align-items: center; flex-direction: row; gap: 12px; padding: 24px 0; }
  .footer-logo { min-width: 0; flex-shrink: 1; }
  .footer-logo img { width: clamp(108px, 32vw, 140px); height: auto; max-width: 100%; }
  .footer-socials { gap: 6px; flex-shrink: 0; }
  .footer-socials a { width: 24px; height: 44px; }
  .footer-socials svg { width: 18px; height: 18px; }
  .footer-columns { display: block; padding: 0 0 12px; }
  .footer-column { border-bottom: 1px solid #ffffff26; }
  .footer-column h3 { margin: 0; padding: 0; border: 0; }
  .footer-column-title { display: none; }
  .footer-toggle { display: flex; align-items: center; justify-content: space-between; gap: 16px; width: 100%; padding: 16px 0; border: 0; background: transparent; color: #fff; text-align: left; font-size: 15px; font-weight: 700; line-height: 1.5; cursor: pointer; }
  .footer-toggle svg { flex-shrink: 0; color: #d8c8e3; transition: transform .2s ease; }
  .footer-chevron-open { transform: rotate(180deg); }
  .footer-section-content { display: none; }
  .footer-section-content.is-open { display: block; padding-bottom: 20px; }
  .footer-column a, .contact-item { font-size: 14px; }
  .footer-column li + li { margin-top: 12px; }
  .footer-column .footer-contact-link { font-size: 13px; }
  .footer-bottom { flex-direction: column; align-items: flex-start; gap: 8px; padding: 16px 0 24px; border-top: 0; font-size: 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .footer-toggle svg { transition: none; }
}
</style>
