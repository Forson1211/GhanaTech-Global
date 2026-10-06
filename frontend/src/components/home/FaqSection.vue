<template>
  <section class="py-20 bg-white border-b border-brand-border/60">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <div class="inline-flex items-center px-3.5 py-1 rounded-full bg-brand-soft text-brand-dark text-xs font-bold mb-3 border border-brand-border">
          GOT QUESTIONS?
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
          Frequently Asked Questions
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
    // Keep defaults
  }
});
</script>
