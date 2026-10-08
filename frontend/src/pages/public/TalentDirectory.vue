<template>
  <div class="bg-white min-h-screen">
    <section class="relative bg-linear-to-br from-[#6D28D9] via-[#5B21B6] to-[#4C1D95] pt-32 pb-24 sm:pt-40 sm:pb-32 text-white">
      <!-- Background decoration wrapped in overflow-hidden so circles don't cause page scrollbars -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="hidden sm:block absolute -bottom-24 -left-24 w-[380px] h-[380px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -bottom-12 -left-12 w-[240px] h-[240px] rounded-full border border-white/15 pointer-events-none" />
        <div class="hidden sm:block absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-white/10 pointer-events-none" />
        <div class="hidden sm:block absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-white/15 pointer-events-none" />
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Browse Candidate Profiles
          </h1>

          <p class="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            See candidate profiles, skills, and experience. If someone looks suitable, tell us about the job you need to fill.
          </p>

          <!-- Dual Call to Action -->
          <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <router-link
              to="/hire-talent"
              class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-brand-dark font-extrabold text-xs sm:text-sm uppercase tracking-wide shadow-lg hover:bg-brand-soft hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Hire Tech Professionals
            </router-link>
            <router-link
              to="/join-talent"
              class="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 text-white border border-white/30 text-xs sm:text-sm font-bold hover:bg-white/20 transition-all text-center"
            >
              Join Our Talent Network
            </router-link>
          </div>

          <!-- Trust Badges -->
          <div class="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/15 text-left">
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">Top 2%</span>
              <span class="text-xs font-semibold text-white/80">Candidates Who Pass Our Checks</span>
            </div>
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">48–72h</span>
              <span class="text-xs font-semibold text-white/80">Suggested Candidates</span>
            </div>
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">100%</span>
              <span class="text-xs font-semibold text-white/80">English Communication</span>
            </div>
            <div class="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
              <span class="block text-2xl sm:text-3xl font-black text-white">55%–70%</span>
              <span class="text-xs font-semibold text-white/80">Estimated Yearly Savings</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Organic Curved Wave Bottom Divider (overlapping by 2px to eliminate subpixel gap) -->
      <div class="absolute -bottom-1 sm:-bottom-2 inset-x-0 overflow-hidden leading-none pointer-events-none z-20">
        <svg class="relative block w-full h-12 sm:h-16 lg:h-20 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C320,105 880,105 1200,0 L1200,125 L0,125 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
      <Card><div class="grid grid-cols-1 sm:grid-cols-3 gap-5"><SearchInput v-model="search" placeholder="Search names, roles, or skills..." /><Select v-model="category" label="Type of Work" :options="['All', ...TALENT_TECH_AREAS]" /><Select v-model="availability" label="Availability" :options="['All', 'Available', 'Interviewing', 'Placed', 'Unavailable']" /></div></Card>
      <div v-if="error" class="text-center space-y-4"><p class="text-sm text-brand-muted">{{ error }}</p><Button @click="load">Try Again</Button></div>
      <div v-else-if="loading" class="py-12 flex justify-center"><LoadingSpinner /></div>
      <p v-else-if="!candidates.length" class="py-12 text-center text-sm text-brand-muted">No candidates match your choices. Try another type of work or send us a hiring request.</p>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><Card v-for="candidate in candidates" :key="candidate._id" padding="lg"><div class="flex items-center gap-4 mb-5"><Avatar :src="candidate.profileImage" :name="`${candidate.firstName} ${candidate.lastName}`" size="lg" /><div><h2 class="text-base font-bold text-brand-dark">{{ candidate.firstName }} {{ candidate.lastName }}</h2><p class="text-xs text-brand-muted mt-1">{{ candidate.role }}</p></div></div><StatusBadge :status="candidate.availability" /><p class="text-xs text-brand-muted mt-4">{{ candidate.yearsExperience }} years of experience &middot; {{ candidate.location }}</p><p class="text-sm text-brand-muted leading-relaxed mt-3">{{ candidate.headline }}</p><div class="flex flex-wrap gap-2 my-5"><span v-for="skill in candidate.skills.slice(0, 6)" :key="skill" class="text-xs rounded-lg bg-brand-soft text-brand-dark px-2 py-1">{{ skill }}</span></div><router-link :to="`/talent/${candidate._id}`" class="block text-center py-3 rounded-xl bg-brand-primary text-white text-xs font-bold hover:bg-brand-dark">View Profile</router-link></Card></div>
      <Pagination v-if="!loading && total" :current-page="page" :total-pages="pages" :total="total" @change="changePage" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { candidateService } from '@/services/candidates';
import type { PublicCandidate } from '@/types/candidate';
import { TALENT_TECH_AREAS } from '@/utils/constants';
import Card from '@/components/common/Card.vue';
import Avatar from '@/components/common/Avatar.vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import Select from '@/components/common/Select.vue';
import SearchInput from '@/components/common/SearchInput.vue';
import Pagination from '@/components/common/Pagination.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import Button from '@/components/common/Button.vue';
const candidates = ref<PublicCandidate[]>([]);
const search = ref(''), category = ref('All'), availability = ref('Available');
const page = ref(1), pages = ref(1), total = ref(0), loading = ref(true), error = ref('');
let requestId = 0;
async function load() {
  const id = ++requestId; loading.value = true; error.value = '';
  try { const response = await candidateService.getPublicCandidates({ search: search.value, category: category.value, availability: availability.value, page: page.value, limit: 12 }); if (id !== requestId) return; if (!response.success || !response.data) throw new Error(); candidates.value = response.data.candidates; total.value = response.data.total; pages.value = response.data.totalPages; }
  catch { if (id === requestId) error.value = "Candidate profiles could not be loaded. Please try again."; }
  finally { if (id === requestId) loading.value = false; }
}
function changePage(value: number) { page.value = value; load(); }
watch([search, category, availability], () => { page.value = 1; load(); });
onMounted(load);
</script>
