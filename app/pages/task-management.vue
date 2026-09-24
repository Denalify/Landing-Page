<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
const { t } = useI18n()
useSeoMeta({
  title: () => t('task.seo.title'),
  description: () => t('task.seo.description'),
  ogTitle: () => t('task.seo.ogTitle'),
  ogDescription: () => t('task.seo.ogDescription'),
})
defineOgImage('Denalify', { title: () => t('task.seo.imageTitle'), description: () => t('task.seo.imageDescription'), label: () => t('task.hero.eyebrow') })
</script>

<template><ProductFeaturePage topic="task" /></template>
