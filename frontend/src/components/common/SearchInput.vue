<template>
  <div class="relative w-full">
    <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
      <svg class="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <input
      type="text"
      :value="modelValue"
      :placeholder="t(placeholder)"
      class="block w-full pl-10 pr-9 py-2.5 bg-white border border-brand-border rounded-xl text-sm text-brand-text placeholder-brand-muted/70 focus:outline-hidden focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-violet-sm"
      @input="handleInput"
    />

    <button
      v-if="modelValue"
      type="button"
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-brand-muted hover:text-brand-dark transition-colors"
      @click="clear"
    >
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUiTranslation } from '@/composables/useUiTranslation';
const { t } = useUiTranslation();
import { ref } from 'vue';

interface Props {
  modelValue: string;
  placeholder?: string;
  debounceMs?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search...',
  debounceMs: 300,
});

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
  (e: 'search', val: string): void;
}>();

let timer: any = null;

const handleInput = (event: Event) => {
  const val = (event.target as HTMLInputElement).value;
  emit('update:modelValue', val);
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    emit('search', val);
  }, props.debounceMs);
};

const clear = () => {
  emit('update:modelValue', '');
  emit('search', '');
};
</script>
