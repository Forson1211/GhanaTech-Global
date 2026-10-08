<template>
  <Modal :model-value="modelValue" :title="title" max-width="sm" @close="$emit('cancel')">
    <div class="flex items-start space-x-3.5">
      <div class="w-10 h-10 rounded-xl bg-brand-soft flex items-center justify-center shrink-0 text-brand-primary">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <p class="text-sm text-brand-dark font-medium">{{ message }}</p>
        <p v-if="subMessage" class="text-xs text-brand-muted mt-1">{{ subMessage }}</p>
      </div>
    </div>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-xs font-medium text-brand-dark hover:bg-brand-soft/60 rounded-lg transition-colors"
        @click="$emit('cancel')"
      >
        {{ t(cancelText) }}
      </button>
      <button
        type="button"
        class="px-4 py-2 text-xs font-semibold text-white bg-brand-dark hover:bg-brand-primary rounded-lg transition-colors shadow-violet-sm"
        @click="$emit('confirm')"
      >
        {{ t(confirmText) }}
      </button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { useUiTranslation } from '@/composables/useUiTranslation';
const { t } = useUiTranslation();
import Modal from './Modal.vue';

interface Props {
  modelValue: boolean;
  title?: string;
  message?: string;
  subMessage?: string;
  confirmText?: string;
  cancelText?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Confirm Action',
  message: 'Are you sure you want to perform this action?',
  subMessage: 'This action cannot be undone.',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
});

defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>
