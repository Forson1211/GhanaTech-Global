<template>
  <div class="w-full">
    <label v-if="label" :for="id" class="block text-sm font-medium text-brand-dark mb-1.5">
      {{ label }}
      <span v-if="required" class="text-brand-bright">*</span>
    </label>

    <div class="relative rounded-lg shadow-sm">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-muted">
        <slot name="prefix" />
      </div>

      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'block w-full rounded-lg border transition-all duration-200 text-brand-text placeholder-brand-muted/70 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:bg-brand-lightest/50 disabled:cursor-not-allowed',
          $slots.prefix ? 'pl-10' : 'pl-3.5',
          $slots.suffix ? 'pr-10' : 'pr-3.5',
          error ? 'border-brand-primary ring-1 ring-brand-primary' : 'border-brand-border hover:border-brand-bright/50 bg-white',
          size === 'sm' ? 'py-1.5 text-xs' : size === 'lg' ? 'py-3 text-base' : 'py-2.5 text-sm'
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />

      <div v-if="$slots.suffix" class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-brand-muted">
        <slot name="suffix" />
      </div>
    </div>

    <p v-if="error" class="mt-1 text-xs text-brand-dark font-medium">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-xs text-brand-muted">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number;
  label?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: () => `input-${Math.random().toString(36).substring(2, 9)}`,
  type: 'text',
  placeholder: '',
  disabled: false,
  required: false,
  size: 'md',
});

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'blur', event: FocusEvent): void;
  (e: 'focus', event: FocusEvent): void;
}>();
</script>
