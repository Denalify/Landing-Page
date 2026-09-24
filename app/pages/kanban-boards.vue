<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
const { t } = useI18n()
useSeoMeta({
  title: () => t('kanban.seo.title'),
  description: () => t('kanban.seo.description'),
  ogTitle: () => t('kanban.seo.ogTitle'),
  ogDescription: () => t('kanban.seo.ogDescription'),
})
defineOgImage('Denalify', { title: () => t('kanban.seo.imageTitle'), description: () => t('kanban.seo.imageDescription'), label: () => t('kanban.hero.eyebrow') })
</script>

<template><ProductFeaturePage topic="kanban" /></template>
