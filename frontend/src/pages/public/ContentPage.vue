<template>
  <div class="min-h-screen bg-brand-lightest">
    <section class="relative bg-gradient-to-br from-brand-primary via-brand-dark to-[#2E1065] pt-32 pb-20 text-white"><div class="max-w-6xl mx-auto px-4 sm:px-6"><h1 class="text-4xl sm:text-5xl font-extrabold">{{ selected?.title || title }}</h1><p v-if="selected?.summary" class="mt-5 max-w-3xl text-white/80 leading-relaxed">{{ selected.summary }}</p></div></section>
    <main class="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <p v-if="loading" class="text-brand-muted" role="status">Loading…</p>
      <Card v-else-if="error"><p role="alert">This page could not be loaded.</p><Button class="mt-4" @click="load">Try again</Button></Card>
      <Card v-else-if="!records.length || (route.params.slug && !selected)"><p class="text-brand-muted">{{ route.params.slug ? 'This article is not available.' : 'Content will be published here when available.' }}</p><router-link to="/contact" class="inline-block mt-4 text-brand-primary font-semibold">Contact GhanaTech Global</router-link></Card>
      <Card v-else-if="selected || kind === 'privacy' || kind === 'terms'"><article><p v-if="current.author" class="text-sm text-brand-muted mb-5">{{ current.author }}</p><p v-for="(paragraph, index) in current.body.split(/\n\s*\n/)" :key="index" class="whitespace-pre-line break-words leading-8 text-brand-text mb-5">{{ paragraph }}</p><router-link v-if="kind === 'insight'" to="/insights" class="text-brand-primary font-semibold">All insights</router-link></article></Card>
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"><Card v-for="record in records" :key="record._id"><img v-if="record.imageUrl" :src="record.imageUrl" :alt="record.title" class="w-full aspect-[4/3] object-cover rounded-xl mb-5" loading="lazy" /><h2 class="text-xl font-bold text-brand-dark">{{ record.title }}</h2><p v-if="record.author" class="text-sm text-brand-primary mt-2">{{ record.author }}</p><p class="text-sm text-brand-muted leading-7 mt-4 whitespace-pre-line">{{ kind === 'leadership' ? record.body : record.summary }}</p><router-link v-if="kind === 'insight'" :to="'/insights/' + record.slug" class="inline-block mt-5 text-brand-primary font-semibold">Read article →</router-link></Card></div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { publishingService, type SiteContent } from '@/services/publishing';
import Card from '@/components/common/Card.vue';
import Button from '@/components/common/Button.vue';
import { updatePageMetadata } from '@/utils/seo';
const route = useRoute();
const records = ref<SiteContent[]>([]), loading = ref(true), error = ref(false);
const kind = computed(() => ({ Leadership: 'leadership', Insights: 'insight', Insight: 'insight', Privacy: 'privacy', Terms: 'terms' }[String(route.name)] || 'insight'));
const title = computed(() => ({ leadership: "Our Team", insight: "News & Advice", privacy: 'Privacy Policy', terms: 'Terms of Use' }[kind.value]));
const selected = computed(() => route.params.slug ? records.value.find(record => record.slug === route.params.slug) : undefined);
const current = computed(() => selected.value || records.value[0]);
async function load() { loading.value = true; error.value = false; try { const result = await publishingService.content(kind.value); records.value = result.data || []; } catch { records.value = []; error.value = true; } finally { loading.value = false; } }
watch(kind, load, { immediate: true });
watch([selected, loading], ([record, busy]) => {
  if (busy) return;
  if (record) { document.title = record.title + ' | GhanaTech Global'; updatePageMetadata(document.title, record.summary || record.body.slice(0,160), route.path); }
  else if (!records.value.length || route.params.slug) updatePageMetadata(document.title, 'GhanaTech Global', route.path, true);
});
</script>
