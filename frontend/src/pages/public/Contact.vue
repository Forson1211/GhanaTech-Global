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
          Contact GhanaTech Global
        </h1>

        <!-- Subtitle -->
        <p class="mt-4 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Have a question about hiring, jobs, building a team, or our services? We are here to help.
        </p>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <!-- Top 3 Info Cards (Phone, Email, Location) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
        <!-- Phone Card -->
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
          </div>
          <h4 class="text-lg font-semibold text-slate-900 tracking-tight">Phone</h4>
          <p class="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-[270px]">
            Call us to talk about hiring or your technology project.
          </p>
          <a
            :href="'tel:' + settings.supportPhone.replace(/[^+0-9]/g, '')"
            class="inline-block mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {{ settings.supportPhone }}
          </a>
        </div>

        <!-- Email Card -->
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <h4 class="text-lg font-semibold text-slate-900 tracking-tight">Email</h4>
          <p class="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-[270px]">
            Email us about hiring people, building a team, or getting help with a project.
          </p>
          <a
            :href="'mailto:' + settings.contactEmail"
            class="inline-block mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            {{ settings.contactEmail }}
          </a>
        </div>

        <!-- Location Card -->
        <div class="flex flex-col items-center">
          <div class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-105">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.75">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <h4 class="text-lg font-semibold text-slate-900 tracking-tight">Location</h4>
          <p class="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-[270px]">
            {{ settings.accraOfficeAddress }}
          </p>
          <a
            :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(settings.accraOfficeAddress)"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View on Google map
          </a>
        </div>
      </div>

      <!-- Bottom 2-Column Section (Illustration + Get in touch Form) -->
      <div class="mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <!-- Left: Illustration -->
        <div class="lg:col-span-6 flex justify-center items-center">
          <img
            src="/images/contact-illustration.jpg"
            alt="Contact Us"
            class="w-full max-w-[480px] object-contain drop-shadow-sm select-none pointer-events-none"
          />
        </div>

        <!-- Right: Form Card -->
        <div class="lg:col-span-6">
          <div class="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 p-7 sm:p-9 md:p-10">
            <h3 class="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h3>

            <div v-if="submitted" class="py-10 text-center space-y-4">
              <div class="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h4 class="text-xl font-bold text-slate-900">Message Sent!</h4>
              <p class="text-sm text-slate-500 max-w-sm mx-auto">
                Thank you for getting in touch. Our team will review your message and respond promptly.
              </p>
              <button
                type="button"
                @click="resetForm"
                class="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-700 underline cursor-pointer"
              >
                Send another message
              </button>
            </div>

            <form v-else class="space-y-4 sm:space-y-5" @submit.prevent="submitContact">
              <!-- Name & Email Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-2">Your Name:</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      v-model="name"
                      type="text"
                      required
                      placeholder="Name :"
                      class="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-2">Your Email:</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      v-model="email"
                      type="email"
                      required
                      placeholder="Email :"
                      class="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <!-- Question / Subject Row -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-2">Subject:</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    v-model="subject"
                    type="text"
                    required
                    placeholder="Subject :"
                    class="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>
              </div>

              <!-- Comment / Message Row -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-2">Message:</label>
                <div class="relative">
                  <div class="absolute top-3.5 left-0 pl-3.5 flex items-start pointer-events-none text-slate-400">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <textarea
                    v-model="message"
                    required
                    rows="4"
                    placeholder="Message :"
                    class="w-full pl-10 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-y min-h-[110px]"
                  ></textarea>
                </div>
              </div>

              <!-- Send Message Button -->
              <div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="bg-[#4F46E5] hover:bg-[#4338CA] active:scale-[0.99] text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 inline-flex items-center justify-center cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span v-if="!loading">Send Message</span>
                  <span v-else class="flex items-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Sending...
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSiteSettings } from '@/composables/useSiteSettings';
import { leadService } from '@/services/leads';
import { useToast } from '@/composables/useToast';

const toast = useToast();
const { settings } = useSiteSettings();

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
const loading = ref(false);
const submitted = ref(false);

const resetForm = () => {
  name.value = '';
  email.value = '';
  subject.value = '';
  message.value = '';
  submitted.value = false;
};

const submitContact = async () => {
  if (loading.value || !name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) return;
  loading.value = true;
  try {
    const response = await leadService.submitContact({ name: name.value, email: email.value, subject: subject.value, message: message.value });
    if (!response.success) throw new Error(response.message);
    submitted.value = true;
    toast.success("Our team has received your message.");
  } catch (error: any) { toast.error(error?.response?.data?.message || 'Your message could not be sent. Please try again.'); }
  finally { loading.value = false; }
};

</script>
