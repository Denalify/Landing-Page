<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
const { t } = useI18n()
useSeoMeta({ title: () => t('nis2.seoTitle'), description: () => t('nis2.seoDescription') })
defineOgImage('Denalify', { title: () => t('nis2.seoTitle'), description: () => t('nis2.seoDescription'), label: () => t('nis2.eyebrow') })
</script>

<template><AudiencePage page-key="nis2" contact-subject="Denalify and NIS2 — consultation" /></template>
