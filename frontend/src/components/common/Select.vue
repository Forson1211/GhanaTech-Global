<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-brand-dark mb-1.5">
      {{ t(label) }}
      <span v-if="required" class="text-brand-bright">*</span>
    </label>

    <div class="relative rounded-lg shadow-sm">
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :class="[
          'block w-full rounded-lg border appearance-none transition-all duration-200 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:bg-brand-lightest/50 disabled:cursor-not-allowed cursor-pointer bg-white py-2.5 pl-3.5 pr-10',
          error ? 'border-brand-primary ring-1 ring-brand-primary' : 'border-brand-border hover:border-brand-bright/50'
        ]"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-if="placeholder" value="" disabled :selected="!modelValue">
          {{ t(placeholder) }}
        </option>
        <slot>
          <option
            v-for="opt in options"
            :key="typeof opt === 'string' ? opt : opt.value"
            :value="typeof opt === 'string' ? opt : opt.value"
          >
            {{ t(typeof opt === 'string' ? opt : opt.label) }}
          </option>
        </slot>
      </select>

      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-brand-primary">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <p v-if="error" class="mt-1 text-xs text-brand-dark font-medium">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-xs text-brand-muted">{{ t(hint) }}</p>
  </div>
</template>

<script setup lang="ts">
import { useUiTranslation } from '@/composables/useUiTranslation';
const { t } = useUiTranslation();
interface OptionItem {
  label: string;
  value: string | number;
}

interface Props {
  modelValue?: string | number;
  label?: string;
  id?: string;
  placeholder?: string;
  options?: readonly (string | OptionItem)[] | (string | OptionItem)[];
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: () => `select-${Math.random().toString(36).substring(2, 9)}`,
  placeholder: '',
  options: () => [],
  disabled: false,
  required: false,
});

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>
