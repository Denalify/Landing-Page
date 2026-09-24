<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
const { t } = useI18n()
useSeoMeta({ title: () => t('support.seoTitle'), description: () => t('support.seoDescription') })
defineOgImage('Denalify', { title: () => t('support.seoTitle'), description: () => t('support.seoDescription'), label: () => t('support.eyebrow') })
</script>

<template>
  <LegalArticle :eyebrow="t('support.eyebrow')" :title="t('support.title')" :introduction="t('support.intro')">
    <h2>{{ t('support.contactTitle') }}</h2><p>{{ t('support.operator') }} <a href="mailto:contact@denalify.com">contact@denalify.com</a> {{ t('support.orCall') }} <a href="tel:+48500408357">+48 500 408 357</a>. {{ t('support.account') }}</p>
    <h2>{{ t('support.beforeTitle') }}</h2><ul><li>{{ t('support.billing') }}</li><li>{{ t('support.data') }}</li><li>{{ t('support.ideas') }}</li></ul>
    <h2>{{ t('support.legalTitle') }}</h2><p>{{ t('support.legalIntro') }} <NuxtLink to="/privacy">{{ t('footer.privacy') }}</NuxtLink>, <NuxtLink to="/cookies">{{ t('footer.cookies') }}</NuxtLink> {{ t('support.and') }} <NuxtLink to="/terms">{{ t('footer.terms') }}</NuxtLink>. {{ t('support.english') }}</p>
  </LegalArticle>
</template>
