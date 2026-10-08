<template>
  <div class="bg-white min-h-screen">
    <!-- Header Hero with GhanaTech purple gradient and organic curve -->
    <section class="relative bg-linear-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-20 sm:pt-40 sm:pb-28 text-white">
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
          Common Questions
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Answers to common questions about hiring, skill checks, costs, and working with us.
        </p>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

      <!-- FAQ Accordion Component -->
      <Accordion :items="faqs" />

      <!-- Bottom Card -->
      <div class="mt-16 p-8 rounded-3xl bg-brand-lightest/50 border border-brand-border/80 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
        <div class="text-left">
          <h3 class="text-base font-bold text-brand-dark">Still have questions?</h3>
          <p class="text-xs text-brand-muted mt-1">Our team can help with questions about skills, costs, and start dates.</p>
        </div>
        <router-link
          to="/contact"
          class="px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm whitespace-nowrap"
        >
          Talk to Our Team
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { faqService } from '@/services/faq';
import type { FAQItem } from '@/types/common';
import Accordion from '@/components/common/Accordion.vue';

const defaultFaqs: FAQItem[] = [
  {
    order: 1,
    question: "What kinds of professionals can I hire?",
    answer: "We help you hire people for cybersecurity, cloud systems, software development, data and reporting, IT support, and business or project management.",
    isPublished: true,
  },
  {
    order: 2,
    question: "How do you check candidates?",
    answer: "We review each CV, check background details and practical skills, and interview candidates about their experience and communication.",
    isPublished: true,
  },
  {
    order: 3,
    question: "How soon can I meet candidates?",
    answer: "For candidates already checked in our network, we usually suggest profiles within 48 to 72 hours. Starting work depends on interviews, availability, and the job.",
    isPublished: true,
  },
  {
    order: 4,
    question: "Can I hire just one person?",
    answer: "Yes. Tell us the job and skills you need, and we can help you find one suitable person.",
    isPublished: true,
  },
  {
    order: 5,
    question: "Can you help me build a team?",
    answer: "Yes. We can help you build a team of developers, testers, cloud engineers, or other professionals, with the right mix of skills for your project.",
    isPublished: true,
  },
  {
    order: 6,
    question: "Can you help with cybersecurity?",
    answer: "Yes. We can help monitor security threats, check for weaknesses, manage account access, and prepare for security reviews. Talk to us about the support you need.",
    isPublished: true,
  },
  {
    order: 7,
    question: "Can you help with cloud and IT systems?",
    answer: "Yes. We can help set up, move, and manage cloud systems, automate software updates, and keep your IT systems running.",
    isPublished: true,
  },
  {
    order: 8,
    question: "Can you help with software projects?",
    answer: "Yes. We can help build websites and mobile apps, improve existing software, and connect your business systems.",
    isPublished: true,
  },
  {
    order: 9,
    question: "How much does it cost?",
    answer: "Costs depend on the job, experience, number of people, and support you need. Our team will explain the pricing before you agree to hire or start a project.",
    isPublished: true,
  },
  {
    order: 10,
    question: "How do I get started?",
    answer: "Choose Hire Tech Professionals, fill in the hiring form, and our team will contact you to discuss the next steps.",
    isPublished: true,
  },
];

const faqs = ref<FAQItem[]>(defaultFaqs);

onMounted(async () => {
  try {
    const res = await faqService.getFaqs();
    if (res.success && res.data && res.data.length > 0) {
      faqs.value = res.data;
    }
  } catch {
    // Keep fallback
  }
});
</script>
