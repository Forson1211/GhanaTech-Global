<template>
  <teleport to="body">
    <transition
      enter-active-class="ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto bg-brand-dark/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        @click.self="closeOnBackdrop && close()"
      >
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="modelValue"
            :class="[
              'relative bg-white rounded-2xl shadow-violet-lg border border-brand-border/70 overflow-hidden w-full transition-all flex flex-col max-h-[90vh]',
              maxWidthClasses[maxWidth]
            ]"
          >
            <!-- Header -->
            <div v-if="title || $slots.header" class="px-6 py-4 border-b border-brand-border/40 flex items-center justify-between">
              <slot name="header">
                <h3 class="text-base font-bold text-brand-dark">{{ t(title) }}</h3>
              </slot>
              <button
                type="button"
                class="rounded-lg p-1.5 text-brand-muted hover:text-brand-dark hover:bg-brand-soft/50 transition-colors"
                @click="close"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div class="px-6 py-5 overflow-y-auto flex-1">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="px-6 py-3.5 border-t border-brand-border/40 bg-brand-lightest/40 flex items-center justify-end space-x-3">
              <slot name="footer" :close="close" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { useUiTranslation } from '@/composables/useUiTranslation';
const { t } = useUiTranslation();
interface Props {
  modelValue: boolean;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
  closeOnBackdrop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  maxWidth: 'md',
  closeOnBackdrop: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'close'): void;
}>();

const close = () => {
  emit('update:modelValue', false);
  emit('close');
};

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
};
</script>
