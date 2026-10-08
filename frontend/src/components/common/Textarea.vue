<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-brand-dark mb-1.5">
      {{ t(label) }}
      <span v-if="required" class="text-brand-bright">*</span>
    </label>

    <div class="relative rounded-lg shadow-xs">
      <textarea
        :id="id"
        :value="modelValue"
        :rows="rows"
        :placeholder="t(placeholder)"
        :disabled="disabled"
        :required="required"
        :class="[
          'block w-full rounded-lg border transition-all duration-200 text-brand-text placeholder-brand-muted/70 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:bg-brand-lightest/50 disabled:cursor-not-allowed bg-white p-3.5',
          error ? 'border-brand-primary ring-1 ring-brand-primary' : 'border-brand-border hover:border-brand-bright/50'
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
    </div>

    <p v-if="error" class="mt-1 text-xs text-brand-dark font-medium">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-xs text-brand-muted">{{ t(hint) }}</p>
  </div>
</template>

<script setup lang="ts">
import { useUiTranslation } from '@/composables/useUiTranslation';
const { t } = useUiTranslation();
interface Props {
  modelValue?: string;
  label?: string;
  id?: string;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: () => `textarea-${Math.random().toString(36).substring(2, 9)}`,
  rows: 4,
  placeholder: '',
  disabled: false,
  required: false,
});

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();
</script>
