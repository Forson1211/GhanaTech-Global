<template>
  <div class="bg-white min-h-screen">
    <!-- Header Hero with GhanaTech purple gradient and organic curve -->
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
          Frequently Asked Questions
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Comprehensive answers to common questions about vetting, contracting, security, pricing, and placement timelines.
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
          <p class="text-xs text-brand-muted mt-1">Our technical staffing team is available to discuss specific stacks and timelines.</p>
        </div>
        <router-link
          to="/contact"
          class="px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark transition-colors shadow-violet-sm whitespace-nowrap"
        >
          Contact Our Advisors
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
    question: 'What technology professionals do you provide?',
    answer: 'We provide vetted professionals across four core domains: Cybersecurity (SOC analysts, security engineers, GRC specialists, IAM consultants), Cloud & IT (AWS/Azure architects, DevOps engineers, Linux sysadmins), Software Engineering (frontend, backend, full-stack developers in Vue, React, Node, Python, Java, Go, plus QA engineers), and Data & Analytics (data engineers, BI analysts, pipeline specialists).',
    isPublished: true,
  },
  {
    order: 2,
    question: 'How are candidates assessed?',
    answer: 'Our 4-stage assessment process includes rigorous profile screening, hands-on timed technical challenges and domain-specific code reviews, a comprehensive video evaluation focusing on English fluency and problem-solving, and verified background/credential verification.',
    isPublished: true,
  },
  {
    order: 3,
    question: 'How quickly can I receive candidates?',
    answer: 'From receiving your specific requirements, our team typically delivers a curated shortlist of 2 to 3 pre-vetted candidates ready for interviews within 48 to 72 hours.',
    isPublished: true,
  },
  {
    order: 4,
    question: 'Can I hire one professional?',
    answer: 'Yes. You can hire a single individual contributor dedicated full-time to your team, whether you need one frontend developer, one SOC analyst, or a specialized DevOps engineer.',
    isPublished: true,
  },
  {
    order: 5,
    question: 'Can I build an entire team?',
    answer: 'Absolutely. Many U.S. clients scale up entire dedicated squads or pods (e.g., 1 lead architect, 3 full-stack engineers, and 1 QA analyst, or a complete 24/7 3-shift SOC tier 1/2 rotation).',
    isPublished: true,
  },
  {
    order: 6,
    question: 'Do you provide managed cybersecurity?',
    answer: 'Yes. Beyond direct staffing, we deliver managed cybersecurity services including 24/7 SOC monitoring, SIEM management, continuous vulnerability assessments, and SOC 2/ISO 27001 readiness.',
    isPublished: true,
  },
  {
    order: 7,
    question: 'Do you provide cloud and DevOps services?',
    answer: 'Yes. We offer managed cloud migrations, AWS/Azure infrastructure architecture, Terraform automation, Kubernetes cluster setup, and 24/7 on-call infrastructure reliability support.',
    isPublished: true,
  },
  {
    order: 8,
    question: 'Can you support software projects?',
    answer: 'Yes. We provide turnkey custom software development, modernizing legacy systems, building customer-facing web and mobile applications, and creating scalable API microservices.',
    isPublished: true,
  },
  {
    order: 9,
    question: 'How does pricing work?',
    answer: 'We operate with simple, transparent billing. Clients typically save 60% to 75% compared to equivalent U.S. domestic salaries. For direct placements, we offer straightforward hiring options; for managed services, we offer predictable monthly retainers with zero hidden fees.',
    isPublished: true,
  },
  {
    order: 10,
    question: 'How do I get started?',
    answer: 'Simply click "Hire Talent" to submit your role requirements or schedule an intro call. A technical director will review your stack and schedule candidate interviews right away.',
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
