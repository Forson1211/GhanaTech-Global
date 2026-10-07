<template>
  <section class="py-20 bg-white border-b border-brand-border/60">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
          GOT QUESTIONS?
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
          Common Questions
        </h2>
        <p class="mt-3 text-base text-brand-muted">
          Everything you need to know about partnering with GhanaTech Global.
        </p>
      </div>

      <!-- Animated Accordion Component -->
      <Accordion :items="faqs" />

      <!-- Support CTA -->
      <div class="mt-12 p-6 rounded-2xl bg-brand-lightest/50 border border-brand-border/80 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-left">
          <h4 class="text-sm font-bold text-brand-dark">Have a custom requirement or question?</h4>
          <p class="text-xs text-brand-muted">Speak directly with our technical staffing advisors.</p>
        </div>
        <router-link
          to="/contact"
          class="px-5 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm whitespace-nowrap"
        >
          Contact Our Team
        </router-link>
      </div>
    </div>
  </section>
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
    // Keep defaults
  }
});
</script>
