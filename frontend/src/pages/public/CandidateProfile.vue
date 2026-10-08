<template>
  <div class="pt-32 pb-12 bg-brand-lightest/40 min-h-screen">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Back Link -->
      <router-link
        to="/talent-directory"
        class="inline-flex items-center text-xs font-bold text-brand-muted hover:text-brand-primary mb-6 transition-colors gap-1.5"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Candidate Profiles</span>
      </router-link>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-3xl p-8 border border-brand-border animate-pulse space-y-6">
        <div class="flex items-center space-x-6">
          <div class="w-24 h-24 rounded-full bg-brand-soft"></div>
          <div class="space-y-3 flex-1">
            <div class="h-6 bg-brand-soft rounded-sm w-1/3"></div>
            <div class="h-4 bg-brand-lightest rounded-sm w-1/4"></div>
          </div>
        </div>
        <div class="h-24 bg-brand-lightest rounded-2xl"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="!candidate" class="py-12 text-center bg-white rounded-3xl p-8 border border-brand-border">
        <p class="text-base font-bold text-brand-dark">Candidate profile not found</p>
        <p class="text-xs text-brand-muted mt-1">This candidate profile may have been updated or placed.</p>
        <router-link to="/talent-directory" class="mt-4 inline-block px-5 py-2 rounded-full bg-brand-primary text-white text-xs font-bold">
          Browse Candidate Profiles
        </router-link>
      </div>

      <!-- Candidate Profile View -->
      <div v-else class="space-y-8">
        <!-- Main Header Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border/80 shadow-violet-sm relative">
          <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
              <Avatar
                :src="candidate.profileImage"
                :name="`${candidate.firstName} ${candidate.lastName}`"
                size="2xl"
                :status="candidate.availability"
              />

              <div class="space-y-2">
                <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 class="text-2xl sm:text-3xl font-extrabold text-brand-dark tracking-tight">
                    {{ candidate.firstName }} {{ candidate.lastName }}
                  </h1>
                  <StatusBadge :status="candidate.availability" />
                </div>

                <p class="text-base font-semibold text-brand-primary">
                  {{ candidate.role }} • {{ candidate.category }}
                </p>

                <p class="text-xs text-brand-muted flex items-center justify-center sm:justify-start gap-2">
                  <span>📍 {{ candidate.location }}, {{ candidate.country }}</span>
                  <span>•</span>
                  <span>🕒 GMT (+0) Working Hours</span>
                  <span>•</span>
                  <span class="font-semibold text-brand-dark">{{ candidate.yearsExperience }}+ Years Experience</span>
                </p>

                <!-- External public links if provided -->
                <div class="pt-2 flex items-center justify-center sm:justify-start space-x-3">
                  <a
                    v-if="candidate.githubUrl"
                    :href="candidate.githubUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs text-brand-muted hover:text-brand-primary transition-colors flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    v-if="candidate.linkedinUrl"
                    :href="candidate.linkedinUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs text-brand-muted hover:text-brand-primary transition-colors flex items-center gap-1"
                  >
                    <span>LinkedIn</span>
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <a
                    v-if="candidate.portfolioUrl"
                    :href="candidate.portfolioUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs text-brand-muted hover:text-brand-primary transition-colors flex items-center gap-1"
                  >
                    <span>Portfolio</span>
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- CTA Button -->
            <div class="w-full md:w-auto">
              <router-link
                :to="{ path: '/hire-talent', query: { candidateId: candidate._id, candidateName: `${candidate.firstName} ${candidate.lastName}`, role: candidate.role } }"
                class="w-full md:w-auto px-8 py-3.5 rounded-full bg-brand-primary text-white font-extrabold text-sm hover:bg-brand-dark transition-all duration-200 shadow-violet-md block text-center"
              >
                Ask About This Candidate
              </router-link>
            </div>
          </div>
        </div>

        <!-- Two Column Detailed Info -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left: Professional Summary & Experience (2 cols) -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Headline / Executive Summary -->
            <div class="bg-white rounded-3xl p-8 border border-brand-border/80 shadow-violet-sm">
              <h2 class="text-base font-bold text-brand-dark mb-3">About This Person</h2>
              <p class="text-sm text-brand-muted leading-relaxed whitespace-pre-line">
                {{ candidate.bio || candidate.headline }}
              </p>
            </div>

            <!-- Assessment Badge Notice -->
            <div class="bg-brand-lightest/70 rounded-3xl p-6 border border-brand-border flex items-center space-x-4">
              <div class="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center font-bold text-lg shadow-violet-sm shrink-0">
                ✓
              </div>
              <div>
                <h3 class="text-xs font-bold text-brand-dark uppercase tracking-wider">GhanaTech Global Candidate Profiles</h3>
                <p class="text-xs text-brand-muted mt-0.5">
                  Review their skills and experience, then ask our team whether they could be right for your job.
                </p>
              </div>
            </div>
          </div>

          <!-- Right Sidebar: Technical Stack & Details (1 col) -->
          <div class="space-y-6">
            <div class="bg-white rounded-3xl p-6 border border-brand-border/80 shadow-violet-sm space-y-5">
              <h3 class="text-sm font-bold text-brand-dark border-b border-brand-border/40 pb-3">
                Skills &amp; Tools
              </h3>

              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in candidate.skills"
                  :key="skill"
                  class="px-3 py-1 rounded-xl bg-brand-soft text-brand-dark text-xs font-semibold border border-brand-border/60"
                >
                  {{ skill }}
                </span>
              </div>

              <div class="pt-4 border-t border-brand-border/40 space-y-3 text-xs">
                <div class="flex justify-between">
                  <span class="text-brand-muted">Experience Level</span>
                  <span class="font-bold text-brand-dark">{{ candidate.yearsExperience }}+ Years</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-brand-muted">Skill Check Status</span>
                  <span class="font-bold text-brand-primary">{{ candidate.assessmentStatus }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-brand-muted">Ready for Work</span>
                  <span class="font-bold text-brand-dark">{{ candidate.availability }}</span>
                </div>
              </div>

              <div class="pt-4">
                <router-link
                  :to="{ path: '/hire-talent', query: { candidateId: candidate._id, candidateName: `${candidate.firstName} ${candidate.lastName}`, role: candidate.role } }"
                  class="w-full py-3 rounded-xl bg-brand-soft hover:bg-brand-primary hover:text-white text-brand-dark font-bold text-xs transition-colors text-center block"
                >
                  Request an Interview
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { candidateService } from '@/services/candidates';
import type { PublicCandidate } from '@/types/candidate';
import Avatar from '@/components/common/Avatar.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';

const route = useRoute();
const candidate = ref<PublicCandidate | null>(null);
const loading = ref(true);

watch(() => route.params.id, async () => {
  loading.value = true;
  candidate.value = null;
  const id = route.params.id as string;
  try {
    const res = await candidateService.getPublicCandidateById(id);
    if (res.success && res.data) {
      candidate.value = res.data;
    }
  } catch {
    candidate.value = null;
  } finally {
    loading.value = false;
  }
}, { immediate: true });
</script>
