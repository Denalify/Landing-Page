<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
const { t } = useI18n()
useSeoMeta({ title: () => t('nonprofit.seoTitle'), description: () => t('nonprofit.seoDescription') })
defineOgImage('Denalify', { title: () => t('nonprofit.seoTitle'), description: () => t('nonprofit.seoDescription'), label: () => t('nonprofit.eyebrow') })
</script>

<template><AudiencePage page-key="nonprofit" contact-subject="Denalify for nonprofits — discount request" /></template>
