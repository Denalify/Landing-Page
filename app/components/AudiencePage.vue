<script setup lang="ts">
const props = defineProps<{ pageKey: 'nonprofit' | 'securityPage' | 'nis2'; contactSubject: string }>()
const { t } = useI18n()
const key = (suffix: string) => t(`${props.pageKey}.${suffix}`)
const contactHref = computed(() => `mailto:contact@denalify.com?subject=${encodeURIComponent(props.contactSubject)}`)
</script>

<template>
  <main>
    <section class="content-hero section-shell">
      <div class="eyebrow"><span class="eyebrow-line" /> {{ key('eyebrow') }}</div>
      <h1>{{ key('title') }} <em>{{ key('emphasis') }}</em></h1>
      <p>{{ key('lede') }}</p>
      <div class="hero-actions"><a class="button button-primary" :href="contactHref">{{ key('primaryCta') }} <span aria-hidden="true">↗</span></a><a class="text-link" href="#details">{{ key('secondaryCta') }} <span aria-hidden="true">↓</span></a></div>
    </section>

    <section id="details" class="feature-section feature-section-tinted"><div class="section-shell">
      <div class="section-kicker"><span>{{ key('details.kicker') }}</span><span class="tiny-rule" /></div>
      <div class="feature-section-heading"><h2>{{ key('details.title') }} <em>{{ key('details.emphasis') }}</em></h2><p>{{ key('details.text') }}</p></div>
      <div class="feature-detail-grid"><article v-for="index in 3" :key="index" class="feature-detail-card"><span>0{{ index }}</span><h3>{{ key(`details.items.${index - 1}.title`) }}</h3><p>{{ key(`details.items.${index - 1}.text`) }}</p></article></div>
    </div></section>

    <section class="section-shell feature-section feature-copy-grid">
      <div><div class="section-kicker">{{ key('proof.kicker') }}</div><h2>{{ key('proof.title') }} <em>{{ key('proof.emphasis') }}</em></h2></div>
      <div class="content-checklist"><p>{{ key('proof.text') }}</p><ul><li v-for="index in 4" :key="index">{{ key(`proof.items.${index - 1}`) }}</li></ul></div>
    </section>

    <section class="feature-cta"><div class="section-shell feature-cta-inner"><div><div class="section-kicker">{{ key('cta.kicker') }}</div><h2>{{ key('cta.title') }} <em>{{ key('cta.emphasis') }}</em></h2><p>{{ key('cta.text') }}</p></div><a class="button button-primary" :href="contactHref">{{ key('primaryCta') }} <span aria-hidden="true">↗</span></a></div></section>
  </main>
</template>
