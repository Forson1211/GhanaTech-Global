<template>
  <div class="min-h-screen bg-slate-50">
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
          {{ content.title }}
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          {{ content.intro }}
        </p>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <p class="text-sm text-brand-muted leading-relaxed max-w-3xl">{{ content.description }}</p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6"><Card v-for="item in content.items" :key="item.title" padding="lg"><h2 class="text-lg font-bold text-brand-dark mb-3">{{ item.title }}</h2><p class="text-sm text-brand-muted leading-relaxed">{{ item.text }}</p></Card></div>
      <Card padding="lg"><h2 class="text-xl font-bold text-brand-dark mb-5">{{ content.processTitle }}</h2><ol class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"><li v-for="(step, index) in content.steps" :key="step" class="text-sm text-brand-dark"><span class="block text-2xl font-black text-brand-primary/40 mb-2">{{ String(index + 1).padStart(2, '0') }}</span>{{ step }}</li></ol></Card>
      <div class="flex flex-col sm:flex-row gap-4"><router-link :to="content.ctaLink" class="px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-bold text-center hover:bg-brand-dark transition-colors">{{ content.cta }}</router-link><router-link to="/how-it-works" class="px-6 py-3 rounded-full border border-brand-border text-brand-dark text-xs font-bold text-center hover:bg-brand-soft transition-colors">How It Works</router-link></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Card from '@/components/common/Card.vue';
const route = useRoute();
const pages = {
  'ManagedTeams': { title: 'Dedicated Managed Technology Teams', intro: 'Build a dedicated team of Ghanaian technology professionals aligned with your delivery goals.', description: 'GhanaTech Global helps global employers define the right team, assess skills, match professionals, and coordinate ongoing delivery. Choose technology talent, a managed team, or a technology project based on your requirements.', items: [{ title: "Find Tech Professionals", text: 'Recruit, vet, and place professionals for individual roles through direct placement or managed talent engagements.' }, { title: "Build a Team", text: 'Build a dedicated team with the right combination of engineering, QA, cloud, data, and delivery skills. Agree responsibilities, communication, and milestones together.' }, { title: "Technology Services", text: 'Access technical expertise across cybersecurity, cloud, software, data, QA, and IT infrastructure for a defined project or ongoing service.' }], processTitle: 'From requirement to supported delivery', steps: ['Submit your requirement and preferred engagement.', 'Qualify your needs in a discovery call.', 'Review matched candidates and conduct interviews.', 'Confirm placement and plan 30/60/90-day follow-ups.'], cta: 'Discuss Your Team Requirements', ctaLink: '/hire-talent?engagementType=Managed%20talent' },
  'ForTalent': { title: 'Your Talent. Global Opportunities.', intro: 'Join a network connecting exceptional Ghanaian technology professionals with global companies.', description: 'Vetted Technology Talent. Global Delivery. Share your experience, skills, and employment preferences so our talent team can consider you for relevant opportunities. Joining is free; an application does not guarantee placement.', items: [{ title: 'Opportunities That Fit', text: 'Tell us whether you prefer full-time, contract, project, or managed-team work. We consider your experience and availability when matching opportunities.' }, { title: 'Show Your Expertise', text: 'Build a profile with your skills, education, certifications, and CV. Screening and technical assessment help employers understand what you can deliver.' }, { title: 'A Clear Talent Journey', text: 'Move through screening, technical assessment, interview, verification, client presentation, selection, and placement with the talent team.' }], processTitle: 'Join the Talent Network', steps: ['Share your information and employment preferences.', 'Upload your CV and authorize application review.', 'Complete screening, assessment, and interviews.', 'Join the verified pool for suitable client opportunities.'], cta: 'Join the Talent Network', ctaLink: '/join-talent' },
  'Industries': { title: 'Technology Expertise for Your Industry', intro: 'Match the right technical skills to your business needs and delivery environment.', description: 'Tell us about your industry, tools, security requirements, and team structure. We will help define the talent or technology engagement that fits your requirements.', items: [{ title: 'Financial & Professional Services', text: 'Cybersecurity, IAM, GRC, data reporting, business analysis, and secure platform engineering.' }, { title: 'Software, Commerce & Digital Products', text: 'Frontend, backend, mobile, QA automation, cloud infrastructure, product management, and dedicated delivery teams.' }, { title: 'Operations & Enterprise IT', text: 'Help desk, systems administration, networking, BI, infrastructure, project management, and technical support.' }], processTitle: 'Define Your Requirements', steps: ['Describe your business and technology environment.', 'Specify skills, experience, headcount, and start date.', 'Choose direct placement, managed talent, or a project.', 'Meet our team to agree next steps.'], cta: 'Submit Your Requirements', ctaLink: '/hire-talent' },
};
const content = computed(() => pages[route.name as keyof typeof pages] || pages.ManagedTeams);
</script>
