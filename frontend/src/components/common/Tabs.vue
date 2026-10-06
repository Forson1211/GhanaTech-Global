<template>
  <div class="w-full">
    <div class="flex items-center space-x-1 border-b border-brand-border/60 pb-px overflow-x-auto scrollbar-none">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        :class="[
          'px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 -mb-px flex items-center space-x-2',
          modelValue === tab.value
            ? 'border-brand-primary text-brand-primary'
            : 'border-transparent text-brand-muted hover:text-brand-dark hover:border-brand-border'
        ]"
        @click="$emit('update:modelValue', tab.value)"
      >
        <span v-if="tab.icon" class="w-4 h-4">
          <component :is="tab.icon" />
        </span>
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.badge !== undefined"
          :class="[
            'text-[10px] px-2 py-0.5 rounded-full font-bold ml-1.5',
            modelValue === tab.value ? 'bg-brand-soft text-brand-dark' : 'bg-brand-lightest text-brand-muted'
          ]"
        >
          {{ tab.badge }}
        </span>
      </button>
    </div>
    
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TabItem {
  label: string;
  value: string;
  icon?: any;
  badge?: number | string;
}

interface Props {
  modelValue: string;
  tabs: TabItem[];
}

defineProps<Props>();

defineEmits<{
  (e: 'update:modelValue', val: string): void;
}>();
</script>
