<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; introduction: string; updated?: string }>()
const { t } = useI18n()
const localePath = useLocalePath()
const links = computed(() => [
  { label: t('footer.privacy'), to: '/privacy' },
  { label: t('footer.cookies'), to: '/cookies' },
  { label: t('footer.terms'), to: '/terms' },
  { label: t('footer.acceptableUse'), to: '/acceptable-use' },
  { label: t('footer.support'), to: localePath('/support') },
])
</script>

<template>
  <main><header class="section-shell legal-hero"><div class="section-kicker">{{ eyebrow }}</div><h1>{{ title }}</h1><p>{{ introduction }}</p><div class="legal-meta">{{ updated || t('support.updated') }}</div></header><div class="section-shell legal-layout"><nav class="legal-nav" :aria-label="t('support.nav')"><span>{{ t('support.onSite') }}</span><NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink></nav><article class="legal-content"><slot /></article></div></main>
</template>
