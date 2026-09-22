<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; introduction: string; updated?: string }>()
const links = [
  { label: 'Privacy notice', to: '/privacy' },
  { label: 'Cookie notice', to: '/cookies' },
  { label: 'Terms of service', to: '/terms' },
  { label: 'Acceptable use', to: '/acceptable-use' },
  { label: 'Support', to: '/support' },
]
</script>

<template>
  <main><header class="section-shell legal-hero"><div class="section-kicker">{{ eyebrow }}</div><h1>{{ title }}</h1><p>{{ introduction }}</p><div class="legal-meta">{{ updated || 'Last updated: 22 September 2026' }}</div></header><div class="section-shell legal-layout"><nav class="legal-nav" aria-label="Legal and support pages"><span>ON THIS SITE</span><NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink></nav><article class="legal-content"><slot /></article></div></main>
</template>
