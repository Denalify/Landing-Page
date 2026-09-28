<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
const { t } = useI18n()
useSeoMeta({ title: () => t('securityPage.seoTitle'), description: () => t('securityPage.seoDescription') })
defineOgImage('Denalify', { title: () => t('securityPage.seoTitle'), description: () => t('securityPage.seoDescription'), label: () => t('securityPage.eyebrow') })
</script>

<template><AudiencePage page-key="securityPage" contact-subject="Denalify security and DPA request" /></template>
