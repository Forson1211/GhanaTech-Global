<template>
  <div class="space-y-3">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'rounded-2xl border transition-all duration-300 overflow-hidden bg-white',
        openIndex === index ? 'border-brand-primary shadow-violet-md' : 'border-brand-border/70 hover:border-brand-border'
      ]"
    >
      <button
        type="button"
        class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-hidden"
        @click="toggle(index)"
      >
        <span class="text-base font-bold text-brand-dark pr-4">{{ item.question || item.title }}</span>
        <div
          :class="[
            'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300',
            openIndex === index ? 'bg-brand-primary text-white rotate-180' : 'bg-brand-soft text-brand-primary'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div
        v-show="openIndex === index"
        class="px-6 pb-5 pt-1 text-sm text-brand-muted leading-relaxed border-t border-brand-border/40 mt-1"
      >
        <p v-if="item.answer">{{ item.answer }}</p>
        <slot :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface AccordionItem {
  id?: string | number;
  question?: string;
  title?: string;
  answer?: string;
  [key: string]: any;
}

interface Props {
  items: AccordionItem[];
  defaultOpenIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpenIndex: 0,
});

const openIndex = ref<number | null>(props.defaultOpenIndex);

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>
