<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300"
    :class="isTransparent ? 'pt-4 sm:pt-6 px-4 sm:px-8' : 'pt-3 sm:pt-4 px-3 sm:px-6'"
  >
    <div
      class="max-w-7xl mx-auto rounded-none px-5 sm:px-8 py-3 pointer-events-auto flex items-center justify-between transition-all duration-300 relative"
      :class="[
        isTransparent
          ? 'bg-transparent text-white shadow-none'
          : 'bg-white/95 backdrop-blur-md text-brand-dark shadow-none lg:shadow-violet-md'
      ]"
    >
      <!-- Logo -->
      <router-link to="/" class="flex items-center group py-0.5" @click="closeMenuImmediate">
        <!-- Logo for Purple Hero Background (White version) -->
        <img
          src="/images/Purple%20background.png"
          alt="GhanaTech Global"
          class="h-10 sm:h-12 w-auto object-contain transition-opacity duration-200"
          :class="isTransparent ? 'block' : 'hidden'"
        />
        <!-- Logo for White Scrolled Navbar Background (Purple version) -->
        <img
          src="/images/white%20background.png"
          alt="GhanaTech Global"
          class="h-10 sm:h-12 w-auto object-contain transition-opacity duration-200"
          :class="isTransparent ? 'hidden' : 'block'"
        />
      </router-link>

      <!-- ========================================================== -->
      <!-- EXACTLY 5 DESKTOP NAV ITEMS                                -->
      <!-- 1. HOME | 2. Services ⌵ | 3. Roles We Source ⌵ | 4. About ⌵ | 5. CONTACT -->
      <!-- ========================================================== -->
      <nav class="hidden lg:flex items-center space-x-3 xl:space-x-6">
        <!-- 1. HOME -->
        <router-link
          to="/"
          class="text-xs xl:text-sm font-semibold transition-colors py-1.5 px-3 rounded-full"
          :class="isTransparent ? 'text-white hover:text-brand-soft' : 'text-brand-dark hover:text-brand-primary'"
          @click="closeMenuImmediate"
        >
          HOME
        </router-link>

        <!-- 2. Services Dropdown (Simple & Compact) -->
        <div
          class="relative py-1"
          @mouseenter="openMenu('services')"
          @mouseleave="closeMenu"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-xs xl:text-sm font-semibold transition-all duration-200 py-1.5 px-3.5 rounded-full group focus:outline-none cursor-pointer"
            :class="[
              activeDropdown === 'services'
                ? isTransparent
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'bg-brand-soft text-brand-dark shadow-sm'
                : isTransparent
                  ? 'text-white hover:text-brand-soft'
                  : 'text-brand-dark hover:text-brand-primary'
            ]"
            @click="toggleMenu('services')"
          >
            <span>SERVICES</span>
            <svg
              class="w-3.5 h-3.5 transition-transform duration-200"
              :class="{ 'rotate-180': activeDropdown === 'services' }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Compact Services Dropdown Menu -->
          <transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-95"
          >
            <div
              v-show="activeDropdown === 'services'"
              class="absolute top-full left-0 pt-2 z-50 pointer-events-auto w-[360px]"
              @mouseenter="cancelClose"
              @mouseleave="closeMenu"
            >
              <div class="bg-white rounded-2xl shadow-xl shadow-purple-950/15 border border-slate-100 p-2 text-slate-800">
                <div class="px-3 pt-2 pb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Practice Areas
                </div>

                <router-link
                  v-for="service in serviceNavItems"
                  :key="service.title"
                  :to="service.link"
                  class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-violet-50/50 transition-all duration-150 group"
                  @click="closeMenuImmediate"
                >
                  <div class="w-10 h-10 rounded-xl bg-violet-50 text-brand-primary group-hover:bg-[#6D28D9] group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-xs">
                    <NavIcon :name="service.icon" custom-class="w-5 h-5" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[13px] font-bold text-slate-800 group-hover:text-brand-primary transition-colors">
                      {{ service.title }}
                    </div>

                  </div>
                  <svg class="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>

                <div class="mt-1 pt-2 border-t border-slate-100 px-3 py-1 flex items-center justify-between text-xs font-semibold">
                  <router-link
                    to="/services"
                    class="text-slate-500 hover:text-brand-primary transition-colors"
                    @click="closeMenuImmediate"
                  >
                    View All Services
                  </router-link>
                  <router-link
                    to="/hire-talent"
                    class="text-brand-primary font-bold hover:underline flex items-center gap-1"
                    @click="closeMenuImmediate"
                  >
                    <span>Hire Squads ↗</span>
                  </router-link>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 3. Roles We Source Dropdown (Simple & Compact) -->
        <div
          class="relative py-1"
          @mouseenter="openMenu('roles')"
          @mouseleave="closeMenu"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-xs xl:text-sm font-semibold transition-all duration-200 py-1.5 px-3.5 rounded-full group focus:outline-none cursor-pointer"
            :class="[
              activeDropdown === 'roles'
                ? isTransparent
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'bg-brand-soft text-brand-dark shadow-sm'
                : isTransparent
                  ? 'text-white hover:text-brand-soft'
                  : 'text-brand-dark hover:text-brand-primary'
            ]"
            @click="toggleMenu('roles')"
          >
            <span>ROLES WE SOURCE</span>
            <svg
              class="w-3.5 h-3.5 transition-transform duration-200"
              :class="{ 'rotate-180': activeDropdown === 'roles' }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Compact Roles Dropdown Menu -->
          <transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-95"
          >
            <div
              v-show="activeDropdown === 'roles'"
              class="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 pointer-events-auto w-[360px]"
              @mouseenter="cancelClose"
              @mouseleave="closeMenu"
            >
              <div class="bg-white rounded-2xl shadow-xl shadow-purple-950/15 border border-slate-100 p-2 text-slate-800">
                <div class="px-3 pt-2 pb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Roles & Disciplines
                </div>

                <router-link
                  v-for="role in roleNavItems"
                  :key="role.title"
                  :to="role.link"
                  class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-violet-50/50 transition-all duration-150 group"
                  @click="closeMenuImmediate"
                >
                  <div class="w-10 h-10 rounded-xl bg-violet-50 text-brand-primary group-hover:bg-[#6D28D9] group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-xs">
                    <NavIcon :name="role.icon" custom-class="w-5 h-5" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[13px] font-bold text-slate-800 group-hover:text-brand-primary transition-colors">
                      {{ role.title }}
                    </div>

                  </div>
                  <svg class="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>

                <div class="mt-1 pt-2 border-t border-slate-100 px-3 py-1 flex items-center justify-between text-xs font-semibold">
                  <router-link
                    to="/talent"
                    class="text-slate-500 hover:text-brand-primary transition-colors"
                    @click="closeMenuImmediate"
                  >
                    Browse All Talent
                  </router-link>
                  <router-link
                    to="/hire-talent"
                    class="text-brand-primary font-bold hover:underline flex items-center gap-1"
                    @click="closeMenuImmediate"
                  >
                    <span>Start Hiring ↗</span>
                  </router-link>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 4. About Dropdown (Simple & Compact) -->
        <div
          class="relative py-1"
          @mouseenter="openMenu('about')"
          @mouseleave="closeMenu"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-xs xl:text-sm font-semibold transition-all duration-200 py-1.5 px-3.5 rounded-full group focus:outline-none cursor-pointer"
            :class="[
              activeDropdown === 'about'
                ? isTransparent
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'bg-brand-soft text-brand-dark shadow-sm'
                : isTransparent
                  ? 'text-white hover:text-brand-soft'
                  : 'text-brand-dark hover:text-brand-primary'
            ]"
            @click="toggleMenu('about')"
          >
            <span>ABOUT</span>
            <svg
              class="w-3.5 h-3.5 transition-transform duration-200"
              :class="{ 'rotate-180': activeDropdown === 'about' }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Compact About Dropdown Menu -->
          <transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-95"
          >
            <div
              v-show="activeDropdown === 'about'"
              class="absolute top-full right-0 sm:left-1/2 sm:-translate-x-1/2 pt-2 z-50 pointer-events-auto w-[360px]"
              @mouseenter="cancelClose"
              @mouseleave="closeMenu"
            >
              <div class="bg-white rounded-2xl shadow-xl shadow-purple-950/15 border border-slate-100 p-2 text-slate-800">
                <div class="px-3 pt-2 pb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  Company & Platform
                </div>

                <router-link
                  v-for="item in aboutNavItems"
                  :key="item.title"
                  :to="item.link"
                  class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-violet-50/50 transition-all duration-150 group"
                  @click="closeMenuImmediate"
                >
                  <div class="w-10 h-10 rounded-xl bg-violet-50 text-brand-primary group-hover:bg-[#6D28D9] group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-xs">
                    <NavIcon :name="item.icon" custom-class="w-5 h-5" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="text-[13px] font-bold text-slate-800 group-hover:text-brand-primary transition-colors">
                      {{ item.title }}
                    </div>

                  </div>
                  <svg class="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </router-link>

                <div class="mt-1 pt-2 border-t border-slate-100 px-3 py-1 flex items-center justify-between text-xs font-semibold">
                  <router-link
                    to="/faq"
                    class="text-slate-500 hover:text-brand-primary transition-colors"
                    @click="closeMenuImmediate"
                  >
                    FAQ & Knowledge Base
                  </router-link>
                  <router-link
                    to="/contact"
                    class="text-brand-primary font-bold hover:underline flex items-center gap-1"
                    @click="closeMenuImmediate"
                  >
                    <span>Contact Advisory ↗</span>
                  </router-link>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 5. CONTACT -->
        <router-link
          to="/contact"
          class="text-xs xl:text-sm font-semibold transition-colors py-1.5 px-3 rounded-full"
          :class="isTransparent ? 'text-white hover:text-brand-soft' : 'text-brand-dark hover:text-brand-primary'"
          @click="closeMenuImmediate"
        >
          CONTACT
        </router-link>
      </nav>

      <!-- Right Action Items (Techwind style icons & button) -->
      <div class="hidden sm:flex items-center space-x-3">
        <router-link
          to="/jobs"
          class="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          :class="isTransparent ? 'text-white/80 hover:text-white hover:bg-white/10' : 'bg-brand-soft text-brand-dark hover:bg-brand-border'"
          title="Search Remote Jobs"
          @click="closeMenuImmediate"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </router-link>

        <router-link
          to="/jobs"
          class="px-5 py-2.5 text-xs font-bold rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          :class="isTransparent
            ? 'bg-white text-brand-dark hover:bg-brand-soft'
            : 'bg-brand-primary text-white hover:bg-brand-dark'"
          @click="closeMenuImmediate"
        >
          FIND JOB
        </router-link>
      </div>

      <!-- Mobile Hamburger Toggle -->
      <div class="flex items-center lg:hidden">
        <button
          type="button"
          class="p-1.5 rounded-full focus:outline-none transition-colors"
          :class="isTransparent ? 'text-white hover:bg-white/10' : 'text-brand-dark hover:bg-brand-soft/60'"
          aria-label="Toggle navigation menu"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MOBILE DRAWER WITH HIERARCHICAL ACCORDIONS              -->
    <!-- ======================================================== -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="lg:hidden mt-2 max-w-6xl mx-auto bg-white rounded-3xl border border-brand-border/80 px-6 py-6 space-y-4 shadow-violet-lg pointer-events-auto text-brand-dark max-h-[80vh] overflow-y-auto"
      >
        <div class="flex flex-col space-y-2 font-semibold text-sm">
          <!-- 1. Home -->
          <router-link to="/" class="py-2 text-brand-dark hover:text-brand-primary" @click="closeMenuImmediate">
            HOME
          </router-link>

          <!-- 2. Services Mobile Accordion (with sub-dropdowns) -->
          <div class="border-y border-brand-border/40 py-2">
            <button
              type="button"
              class="w-full flex items-center justify-between text-brand-dark py-1 font-semibold"
              @click="toggleMobileSubmenu('services')"
            >
              <span>SERVICES</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': mobileSubmenu.services }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="mobileSubmenu.services" class="pl-3 mt-1.5 space-y-1.5 text-xs">
              <router-link to="/services/cybersecurity" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Cybersecurity Practice
              </router-link>
              <router-link to="/services/cloud-it" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Cloud & IT Infrastructure
              </router-link>
              <router-link to="/services/software" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Software Engineering Practice
              </router-link>
              <router-link to="/services/data" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Data & Analytics Practice
              </router-link>
              <router-link to="/services" class="block py-1.5 font-bold text-brand-primary" @click="closeMenuImmediate">
                • View All Managed Practices →
              </router-link>
            </div>
          </div>

          <!-- 3. Roles We Source Mobile Accordion (with sub-dropdowns) -->
          <div class="border-b border-brand-border/40 pb-2">
            <button
              type="button"
              class="w-full flex items-center justify-between text-brand-dark py-1 font-semibold"
              @click="toggleMobileSubmenu('roles')"
            >
              <span>ROLES WE SOURCE</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': mobileSubmenu.roles }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="mobileSubmenu.roles" class="pl-3 mt-1.5 space-y-1.5 text-xs">
              <router-link to="/talent" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Software & Web Engineers
              </router-link>
              <router-link to="/talent" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Cloud & DevOps Engineers
              </router-link>
              <router-link to="/talent" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Cybersecurity & SOC Specialists
              </router-link>
              <router-link to="/talent" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Data & AI Specialists
              </router-link>
              <router-link to="/talent" class="block py-1.5 font-bold text-brand-primary" @click="closeMenuImmediate">
                • Explore Entire Talent Directory →
              </router-link>
            </div>
          </div>

          <!-- 4. About Mobile Accordion (includes Why Ghana, How It Works, Company & FAQ) -->
          <div class="border-b border-brand-border/40 pb-2">
            <button
              type="button"
              class="w-full flex items-center justify-between text-brand-dark py-1 font-semibold"
              @click="toggleMobileSubmenu('about')"
            >
              <span>ABOUT</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': mobileSubmenu.about }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-show="mobileSubmenu.about" class="pl-3 mt-1.5 space-y-1.5 text-xs">
              <router-link to="/why-ghana" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Why Ghana
              </router-link>
              <router-link to="/how-it-works" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • How It Works
              </router-link>
              <router-link to="/about" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Our Organization & Story
              </router-link>
              <router-link to="/faq" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                • Frequently Asked Questions (FAQ)
              </router-link>
            </div>
          </div>

          <!-- 5. Contact -->
          <router-link to="/contact" class="py-2 text-brand-dark hover:text-brand-primary" @click="closeMenuImmediate">
            CONTACT
          </router-link>
        </div>

        <!-- Mobile Drawer Bottom Action Buttons -->
        <div class="pt-4 border-t border-brand-border/60 flex flex-col space-y-2">
          <router-link
            to="/hire-talent"
            class="w-full text-center py-3 text-sm font-bold text-white bg-brand-primary rounded-full shadow-violet-sm"
            @click="closeMenuImmediate"
          >
            Hire Ghanaian Talent
          </router-link>
          <router-link
            to="/jobs"
            class="w-full text-center py-2.5 text-sm font-semibold text-brand-dark bg-brand-soft rounded-full"
            @click="closeMenuImmediate"
          >
            Explore Remote Jobs
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import NavIcon from './NavIcon.vue';

const route = useRoute();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeDropdown = ref<string | null>(null);
const isTransparent = computed(() => !isScrolled.value);
let closeTimeout: ReturnType<typeof setTimeout> | null = null;
const mobileSubmenu = ref<Record<string, boolean>>({
  services: false,
  roles: false,
  about: false,
});

// ========================================================
// DROPDOWNS NAVIGATION DATA (SIMPLE, CLEAN & COMPACT)
// ========================================================
const serviceNavItems = [
  {
    title: 'Cybersecurity Practice',

    link: '/services/cybersecurity',
    icon: 'cyber',
  },
  {
    title: 'Cloud & Infrastructure',

    link: '/services/cloud-it',
    icon: 'cloud',
  },
  {
    title: 'Software Engineering',

    link: '/services/software',
    icon: 'software',
  },
  {
    title: 'Data & Analytics',

    link: '/services/data',
    icon: 'data',
  },
];

const roleNavItems = [
  {
    title: 'Software & Web Engineers',

    link: '/talent',
    icon: 'software',
  },
  {
    title: 'Cloud & DevOps Engineers',

    link: '/talent',
    icon: 'cloud',
  },
  {
    title: 'Cybersecurity Specialists',

    link: '/talent',
    icon: 'cyber',
  },
  {
    title: 'Data & AI Specialists',

    link: '/talent',
    icon: 'data',
  },
];

const aboutNavItems = [
  {
    title: 'Why Ghana?',

    link: '/why-ghana',
    icon: 'why-ghana',
  },
  {
    title: 'How It Works',

    link: '/how-it-works',
    icon: 'how-it-works',
  },
  {
    title: 'Our Organization',

    link: '/about',
    icon: 'company',
  },
  {
    title: 'FAQ & Trust Center',

    link: '/faq',
    icon: 'resources',
  },
];

// ========================================================
// MENU HOVER & INTERACTION HANDLERS
// ========================================================
const cancelClose = () => {
  if (closeTimeout) clearTimeout(closeTimeout);
};

const openMenu = (name: string) => {
  if (closeTimeout) clearTimeout(closeTimeout);
  activeDropdown.value = name;
};

const closeMenu = () => {
  if (closeTimeout) clearTimeout(closeTimeout);
  closeTimeout = setTimeout(() => {
    activeDropdown.value = null;
  }, 220);
};

const toggleMenu = (name: string) => {
  if (closeTimeout) clearTimeout(closeTimeout);
  activeDropdown.value = activeDropdown.value === name ? null : name;
};

const closeMenuImmediate = () => {
  if (closeTimeout) clearTimeout(closeTimeout);
  activeDropdown.value = null;
  isMobileMenuOpen.value = false;
};

const toggleMobileSubmenu = (name: string) => {
  mobileSubmenu.value[name] = !mobileSubmenu.value[name];
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40;
};

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (!target.closest('header')) {
    activeDropdown.value = null;
  }
};

watch(() => route.path, () => {
  closeMenuImmediate();
  handleScroll();
});

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>
