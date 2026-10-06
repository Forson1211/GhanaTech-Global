<template>
  <svg
    :class="customClass"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- ============================================== -->
    <!-- BIG PRIMARY CATEGORY ICONS                     -->
    <!-- ============================================== -->

    <!-- Cybersecurity: Heavy shield with digital lock & keyhole -->
    <g v-if="name === 'cyber'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <rect x="9" y="11" width="6" height="5" rx="1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V9a2 2 0 014 0v2" />
    </g>

    <!-- Cloud & Infrastructure: Cloud server architecture with uplink & nodes -->
    <g v-else-if="name === 'cloud'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h11a5 5 0 001.5-9.77A7 7 0 006.1 8.8 4.002 4.002 0 003 15z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12v6m-3-3l3 3 3-3" />
    </g>

    <!-- Software Engineering: Developer workstation terminal with code brackets -->
    <g v-else-if="name === 'software'">
      <rect x="2" y="3" width="20" height="15" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 21h8M12 18v3" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8l3 2.5-3 2.5m5-0.5h4" />
    </g>

    <!-- Data & Analytics: Multi-tier data warehouse with growth analytics -->
    <g v-else-if="name === 'data'">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11v6M8 13v4M16 9v8" />
    </g>

    <!-- Why Ghana: Global connectivity coordinate sphere -->
    <g v-else-if="name === 'why-ghana'">
      <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </g>

    <!-- How It Works: Multi-stage pipeline workflow -->
    <g v-else-if="name === 'how-it-works'">
      <circle cx="6" cy="6" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="6" cy="18" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9v6m3 3h9a3 3 0 003-3V9a3 3 0 00-3-3H9" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3l3 3-3 3" />
    </g>

    <!-- Our Organization: Enterprise tech headquarters / bridge pillars -->
    <g v-else-if="name === 'company'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1" />
    </g>

    <!-- Trust & Resources: Legal contract certificate & verified seal -->
    <g v-else-if="name === 'resources'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2v6h6M16 13H8m8 4H8m2-8H8" />
    </g>

    <!-- ============================================== -->
    <!-- MINI ICONS FOR CAPABILITIES, ROLES & TOPICS    -->
    <!-- ============================================== -->

    <g v-else-if="name === 'radar'">
      <circle cx="12" cy="12" r="9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12l4-4M12 3a9 9 0 019 9" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </g>

    <g v-else-if="name === 'terminal'">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8l3 3-3 3m5 0h4" />
    </g>

    <g v-else-if="name === 'shield-check'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
    </g>

    <g v-else-if="name === 'key'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 11-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 0121 9z" />
    </g>

    <g v-else-if="name === 'cloud-lock'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h4m6-8a5 5 0 00-7.5-4.3M6.1 8.8A4.002 4.002 0 003 15" />
      <rect x="13" y="13" width="8" height="6" rx="1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13v-2a2 2 0 014 0v2" />
    </g>

    <g v-else-if="name === 'scan'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4h4m8 0h4v4m0 8v4h-4m-8 0H4v-4m4-4h8" />
    </g>

    <g v-else-if="name === 'cloud-upload'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8" />
    </g>

    <g v-else-if="name === 'code-block'">
      <polyline points="16 18 22 12 16 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <polyline points="8 6 2 12 8 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <g v-else-if="name === 'container'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </g>

    <g v-else-if="name === 'rocket'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.5 8.5l-4-4a2 2 0 00-2.83 0L3 10.17V17l6.83 6.83a2 2 0 002.83 0l4-4M15.5 8.5l4 4M15.5 8.5L20 4l-4.5 4.5" />
      <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
    </g>

    <g v-else-if="name === 'server'">
      <rect x="2" y="2" width="20" height="8" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="2" y="14" width="20" height="8" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="6" y1="6" x2="6.01" y2="6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="6" y1="18" x2="6.01" y2="18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <g v-else-if="name === 'chart'">
      <line x1="18" y1="20" x2="18" y2="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="12" y1="20" x2="12" y2="4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="6" y1="20" x2="6" y2="14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="2" y1="20" x2="22" y2="20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <g v-else-if="name === 'users'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </g>

    <g v-else-if="name === 'nodes'">
      <circle cx="18" cy="5" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="6" cy="12" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="18" cy="19" r="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <g v-else-if="name === 'layout'">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="3" y1="9" x2="21" y2="9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="9" y1="21" x2="9" y2="9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <g v-else-if="name === 'database'">
      <ellipse cx="12" cy="5" rx="9" ry="3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </g>

    <g v-else-if="name === 'check-circle'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </g>

    <g v-else-if="name === 'sparkles'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </g>

    <g v-else-if="name === 'warehouse'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v4m4-4v4m4-4v4" />
    </g>

    <g v-else-if="name === 'transform'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </g>

    <g v-else-if="name === 'lightning'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </g>

    <g v-else-if="name === 'presentation'">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="8" y1="21" x2="16" y2="21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="12" y1="17" x2="12" y2="21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="7" y1="10" x2="11" y2="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="7" y1="13" x2="17" y2="13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <g v-else-if="name === 'filter'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </g>

    <g v-else-if="name === 'brain'">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="9" y="9" width="6" height="6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="9" y1="1" x2="9" y2="4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="15" y1="1" x2="15" y2="4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="9" y1="20" x2="9" y2="23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="15" y1="20" x2="15" y2="23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="20" y1="9" x2="23" y2="9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="20" y1="14" x2="23" y2="14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="1" y1="9" x2="4" y2="9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="1" y1="14" x2="4" y2="14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <g v-else-if="name === 'layers'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </g>

    <g v-else-if="name === 'smartphone'">
      <rect x="5" y="2" width="14" height="20" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="12" y1="18" x2="12.01" y2="18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <g v-else-if="name === 'globe'">
      <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <line x1="2" y1="12" x2="22" y2="12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </g>

    <g v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <polyline points="12 6 12 12 16 14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>

    <g v-else-if="name === 'academic'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </g>

    <g v-else-if="name === 'document-text'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </g>

    <g v-else-if="name === 'scale'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </g>

    <g v-else-if="name === 'chat'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </g>

    <g v-else-if="name === 'briefcase'">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </g>

    <g v-else-if="name === 'building'">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
    </g>

    <g v-else-if="name === 'flag'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H19a2 2 0 012 2v7a2 2 0 01-2 2h-6.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
    </g>

    <g v-else-if="name === 'question'">
      <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.08 4h.01" />
    </g>

    <g v-else-if="name === 'mail'">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </g>

    <!-- Fallback check circle -->
    <g v-else>
      <circle cx="12" cy="12" r="10" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    default: 'w-5 h-5',
  },
});
</script>
