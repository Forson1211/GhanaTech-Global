<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-300"
    @keydown.esc="handleEscape"
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

      <!-- Four dropdowns and Contact keep exactly five main navigation tabs. -->
      <nav class="hidden lg:flex items-center space-x-3 xl:space-x-6" aria-label="Main navigation">
        <div
          v-for="(group, index) in navigationGroups"
          :key="group.key"
          class="relative py-1"
          @mouseenter="openMenu(group.key)"
          @mouseleave="closeMenu"
        >
          <button
            :id="'nav-toggle-' + group.key"
            type="button"
            class="inline-flex items-center gap-1.5 text-xs xl:text-sm font-semibold transition-all duration-200 py-1.5 px-3.5 rounded-full group focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer whitespace-nowrap"
            :class="[
              activeDropdown === group.key
                ? isTransparent
                  ? 'bg-white/20 text-white shadow-xs'
                  : 'bg-brand-soft text-brand-dark shadow-xs'
                : isTransparent
                  ? 'text-white hover:text-brand-soft'
                  : 'text-brand-dark hover:text-brand-primary'
            ]"
            :aria-expanded="activeDropdown === group.key"
            :aria-controls="'nav-dropdown-' + group.key"
            @click="toggleMenu(group.key)"
          >
            <span class="uppercase">{{ group.title }}</span>
            <svg
              class="w-3.5 h-3.5 transition-transform duration-200"
              :class="{ 'rotate-180': activeDropdown === group.key }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="opacity-0 translate-y-1 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-1 scale-95"
          >
            <div
              :id="'nav-dropdown-' + group.key"
              v-show="activeDropdown === group.key"
              class="absolute top-full pt-2 z-50 pointer-events-auto w-[360px]"
              :class="index === 0 ? 'left-0' : 'left-1/2 -translate-x-1/2'"
              @mouseenter="cancelClose"
              @mouseleave="closeMenu"
            >
              <div class="bg-white rounded-2xl shadow-xl shadow-purple-950/15 border border-slate-100 p-2 text-slate-800">
                <div class="px-3 pt-2 pb-1 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  {{ group.title }}
                </div>
                <template v-for="item in group.items" :key="item.title">
                  <router-link
                    v-if="item.link"
                    :to="item.link"
                    class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-violet-50/50 transition-all duration-150 group"
                    @click="closeMenuImmediate"
                  >
                    <div class="w-10 h-10 rounded-xl bg-violet-50 text-brand-primary group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center shrink-0 transition-all shadow-2xs">
                      <NavIcon :name="item.icon" custom-class="w-5 h-5" />
                    </div>
                    <div class="flex-1 min-w-0 text-[13px] font-bold text-slate-800 group-hover:text-brand-primary transition-colors">
                      {{ item.title }}
                    </div>
                    <svg class="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </router-link>
                  <div v-else class="flex items-center gap-3 p-2.5 rounded-xl text-slate-400" aria-disabled="true">
                    <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                      <NavIcon :name="item.icon" custom-class="w-5 h-5" />
                    </div>
                    <span class="flex-1 text-[13px] font-bold">{{ item.title }}</span>
                    <span class="text-[10px] font-semibold bg-slate-50 rounded-full px-2 py-1">Coming soon</span>
                  </div>
                </template>
              </div>
            </div>
          </transition>
        </div>

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
          class="px-5 py-2.5 text-xs font-bold rounded-full transition-all duration-200 shadow-xs hover:shadow-md"
          :class="isTransparent
            ? 'bg-white text-brand-dark hover:bg-brand-soft'
            : 'bg-brand-primary text-white hover:bg-brand-dark'"
          @click="closeMenuImmediate"
        >
          FIND JOBS
        </router-link>
      </div>

      <!-- Mobile Hamburger Toggle -->
      <div class="flex items-center lg:hidden">
        <button
          type="button"
          class="p-1.5 rounded-full focus:outline-hidden transition-colors"
          :class="isTransparent ? 'text-white hover:bg-white/10' : 'text-brand-dark hover:bg-brand-soft/60'"
          id="mobile-navigation-toggle"
          aria-label="Toggle navigation menu"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-navigation"
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
        id="mobile-navigation"
        v-if="isMobileMenuOpen"
        class="lg:hidden mt-2 max-w-6xl mx-auto bg-white rounded-3xl border border-brand-border/80 px-6 py-6 space-y-4 shadow-violet-lg pointer-events-auto text-brand-dark max-h-[80vh] overflow-y-auto"
      >
        <nav class="flex flex-col space-y-2 font-semibold text-sm" aria-label="Mobile main navigation">
          <div
            v-for="(group, index) in navigationGroups"
            :key="group.key"
            :class="index === 0 ? 'border-y border-brand-border/40 py-2' : 'border-b border-brand-border/40 pb-2'"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between text-brand-dark py-1 font-semibold focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2"
              :aria-expanded="mobileSubmenu[group.key]"
              :aria-controls="'mobile-submenu-' + group.key"
              @click="toggleMobileSubmenu(group.key)"
            >
              <span class="uppercase">{{ group.title }}</span>
              <svg
                class="w-4 h-4 transition-transform duration-200"
                :class="{ 'rotate-180': mobileSubmenu[group.key] }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div :id="'mobile-submenu-' + group.key" v-show="mobileSubmenu[group.key]" class="pl-3 mt-1.5 space-y-1.5 text-xs">
              <template v-for="item in group.items" :key="item.title">
                <router-link v-if="item.link" :to="item.link" class="block py-1.5 text-slate-600 hover:text-brand-primary" @click="closeMenuImmediate">
                  &bull; {{ item.title }}
                </router-link>
                <div v-else class="flex items-center justify-between gap-2 py-1.5 text-slate-400" aria-disabled="true">
                  <span>&bull; {{ item.title }}</span>
                  <span class="text-[10px] font-semibold">Coming soon</span>
                </div>
              </template>
            </div>
          </div>
          <router-link to="/contact" class="py-2 text-brand-dark hover:text-brand-primary" @click="closeMenuImmediate">
            CONTACT
          </router-link>
        </nav>

        <!-- Mobile Drawer Bottom Action Buttons -->
        <div class="pt-4 border-t border-brand-border/60 flex flex-col space-y-2">
          <router-link
            to="/hire-talent"
            class="w-full text-center py-3 text-sm font-bold text-white bg-brand-primary rounded-full shadow-violet-sm"
            @click="closeMenuImmediate"
          >
            Hire Tech Professionals
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
const isTransparent = computed(() => !isScrolled.value && !route.path.startsWith('/talent/'));
let closeTimeout: ReturnType<typeof setTimeout> | null = null;
const mobileSubmenu = ref<Record<string, boolean>>({
  solutions: false,
  employers: false,
  talent: false,
  about: false,
});

interface NavigationItem {
  title: string;
  link?: string;
  icon: string;
}

// Desktop dropdowns and mobile accordions share the same destinations.
const navigationGroups: { key: string; title: string; items: NavigationItem[] }[] = [
  {
    key: 'solutions',
    title: 'Solutions',
    items: [
      { title: "Find Tech Professionals", link: '/talent', icon: 'software' },
      { title: "Build a Team", link: '/managed-teams', icon: 'company' },
      { title: "Technology Services", link: '/services', icon: 'cloud' },
      { title: 'How It Works', link: '/how-it-works', icon: 'how-it-works' },
    ],
  },
  {
    key: 'employers',
    title: 'Employers',
    items: [
      { title: "Hire Tech Professionals", link: '/hire-talent', icon: 'software' },
      { title: 'Industries', link: '/industries', icon: 'company' },
      { title: "Services for Employers", link: '/services', icon: 'cloud' },
      { title: 'Contact', link: '/contact', icon: 'resources' },
    ],
  },
  {
    key: 'talent',
    title: 'Talents',
    items: [
      { title: "For Job Seekers", link: '/for-talent', icon: 'company' },
      { title: "Join Our Talent Network", link: '/join-talent', icon: 'how-it-works' },
      { title: "Find Jobs", link: '/jobs', icon: 'resources' },
    ],
  },
  {
    key: 'about',
    title: 'About',
    items: [
      { title: 'About GhanaTech Global', link: '/about', icon: 'company' },
      { title: "Our Team", link: '/leadership', icon: 'company' },
      { title: 'Why Ghana', link: '/why-ghana', icon: 'why-ghana' },
      { title: "News & Advice", link: '/insights', icon: 'resources' },
    ],
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

const handleEscape = () => {
  const dropdown = activeDropdown.value;
  const mobileOpen = isMobileMenuOpen.value;
  closeMenuImmediate();
  if (dropdown) document.getElementById('nav-toggle-' + dropdown)?.focus();
  else if (mobileOpen) document.getElementById('mobile-navigation-toggle')?.focus();
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
  cancelClose();
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
});
</script>
