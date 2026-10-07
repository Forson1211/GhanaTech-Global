<template>
  <span
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border',
      statusClass
    ]"
  >
    <span class="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-75" />
    {{ t(status) }}
  </span>
</template>

<script setup lang="ts">
import { useUiTranslation } from '@/composables/useUiTranslation';
const { t } = useUiTranslation();
import { computed } from 'vue';

interface Props {
  status: string;
}

const props = defineProps<Props>();

const statusClass = computed(() => {
  switch (props.status) {
    case 'Approved':
    case 'Available':
    case 'Qualified':
    case 'Accepted':
    case 'Verified':
    case 'Talent Pool':
    case 'Selected':
    case 'published':
      return 'bg-brand-primary text-white border-brand-primary';

    case 'New':
    case 'Applied':
    case 'Presented':
    case 'Client Interview':
    case 'Candidates Presented':
    case 'Client Interviews':
    case 'Offer':
    case 'Interviewing':
    case 'Shortlisted':
    case 'Proposal':
    case 'Ready for Placement':
      return 'bg-brand-bright text-white border-brand-bright';

    case 'Pending':
    case 'Reviewing':
    case 'Contacted':
    case 'Discovery Scheduled':
    case 'Job Requirement Received':
    case 'Technical Assessment':
    case 'Technically Assessed':
    case 'Screening':
      return 'bg-brand-soft text-brand-dark border-brand-border';

    case 'Placed':
    case 'Closed':
    case 'Closed Won':
    case 'Evaluated':
      return 'bg-brand-dark text-white border-brand-dark';

    case 'Rejected':
    case 'Unavailable':
    case 'draft':
    default:
      return 'bg-brand-lightest text-brand-muted border-brand-border/60';
  }
});
</script>
