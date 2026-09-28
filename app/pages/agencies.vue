<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
const { t } = useI18n()
useSeoMeta({ title: () => t('agency.seoTitle'), description: () => t('agency.seoDescription') })
defineOgImage('Denalify', { title: () => t('agency.seoTitle'), description: () => t('agency.seoDescription'), label: () => t('agency.eyebrow') })
</script>

<template><AudiencePage page-key="agency" contact-subject="Denalify for agencies — workflow consultation" /></template>
