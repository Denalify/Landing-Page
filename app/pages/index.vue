<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
const { t } = useI18n()
const localePath = useLocalePath()
const featureIcons = ['▦', '✳', '↗', '⤴']
useSeoMeta({
  title: () => t('home.seo.title'),
  description: () => t('home.seo.description'),
  ogTitle: () => t('home.seo.ogTitle'),
  ogDescription: () => t('home.seo.ogDescription'),
})
defineOgImage('Denalify', { title: () => t('home.seo.imageTitle'), description: () => t('home.seo.imageDescription') })
useSchemaOrg([{
  '@type': 'SoftwareApplication', '@id': 'https://denalify.com/#software', name: 'Denalify',
  url: 'https://app.denalify.com', description: () => t('home.seo.schemaDescription'),
  applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
  featureList: [0, 1, 2, 3, 4].map(index => t(`home.seo.features.${index}`)),
  offers: { '@type': 'Offer', price: 0, priceCurrency: 'EUR', url: 'https://app.denalify.com/auth/signup' },
}])
</script>

<template>
  <main>
    <section class="hero section-shell" aria-labelledby="hero-title">
      <div class="hero-copy">
        <div class="eyebrow"><span class="eyebrow-line" /> {{ t('home.hero.eyebrow') }}</div>
        <h1 id="hero-title">{{ t('home.hero.title') }} <em>{{ t('home.hero.emphasis') }}</em></h1>
        <p class="hero-lede">{{ t('home.hero.lede') }}</p>
        <div class="hero-actions"><a class="button button-primary" href="https://app.denalify.com/auth/signup">{{ t('common.startFree') }} <span aria-hidden="true">↗</span></a><a class="text-link" href="#product">{{ t('home.hero.explore') }} <span aria-hidden="true">↓</span></a></div>
        <p class="small-note">{{ t('home.hero.note') }}</p>
      </div>
      <div class="hero-art" :aria-label="t('home.hero.previewLabel')"><div class="art-index"><span>FIG. 01</span><span>{{ t('home.hero.motion') }}</span></div><ProductPreview /><div class="art-foot"><span>{{ t('home.hero.caption') }}</span><span>↘</span></div></div>
    </section>

    <div class="marquee-bar" :aria-label="t('home.marquee.label')"><div class="section-shell marquee-inner"><span>{{ t('home.marquee.boards') }}</span><span aria-hidden="true">✳</span><span>{{ t('home.marquee.docs') }}</span><span aria-hidden="true">✳</span><span>{{ t('home.marquee.forms') }}</span><span aria-hidden="true">✳</span><span>{{ t('home.marquee.portfolio') }}</span></div></div>

    <section id="product" class="section-shell section-space intro-section">
      <div class="section-kicker"><span>01 / {{ t('home.product.kicker') }}</span><span class="tiny-rule" /></div>
      <div class="intro-grid"><h2>{{ t('home.product.title') }}<br><em>{{ t('home.product.emphasis') }}</em></h2><p>{{ t('home.product.text') }}</p></div>
      <div class="feature-grid"><article v-for="(icon, index) in featureIcons" :key="index" class="feature-tile"><div class="feature-top"><span>0{{ index + 1 }}</span><span class="feature-icon" aria-hidden="true">{{ icon }}</span></div><h3>{{ t(`home.product.features.${index}.title`) }}</h3><p>{{ t(`home.product.features.${index}.text`) }}</p></article></div>
    </section>

    <section class="section-shell section-space product-paths" aria-labelledby="product-paths-title">
      <div class="section-kicker"><span>02 / {{ t('home.paths.kicker') }}</span><span class="tiny-rule" /></div>
      <div class="intro-grid"><h2 id="product-paths-title">{{ t('home.paths.title') }}<br><em>{{ t('home.paths.emphasis') }}</em></h2><p>{{ t('home.paths.text') }}</p></div>
      <div class="product-path-grid">
        <article class="product-path-card"><span class="product-path-label">{{ t('home.paths.tasks.label') }} / 01</span><h3>{{ t('home.paths.tasks.title') }}</h3><p>{{ t('home.paths.tasks.text') }}</p><NuxtLink :to="localePath('/task-management')">{{ t('home.paths.tasks.link') }} <span aria-hidden="true">↗</span></NuxtLink></article>
        <article class="product-path-card"><span class="product-path-label">{{ t('home.paths.boards.label') }} / 02</span><h3>{{ t('home.paths.boards.title') }}</h3><p>{{ t('home.paths.boards.text') }}</p><NuxtLink :to="localePath('/kanban-boards')">{{ t('home.paths.boards.link') }} <span aria-hidden="true">↗</span></NuxtLink></article>
      </div>
    </section>

    <section id="workflow" class="workflow-section section-space"><div class="section-shell">
      <div class="section-kicker"><span>03 / {{ t('home.workflow.kicker') }}</span><span class="tiny-rule" /></div>
      <div class="workflow-heading"><h2>{{ t('home.workflow.title') }}<br><em>{{ t('home.workflow.emphasis') }}</em></h2><p>{{ t('home.workflow.text') }}</p></div>
      <div class="workflow-grid"><article v-for="index in 3" :key="index" class="workflow-card"><div class="workflow-card-top"><span>0{{ index }}</span><span aria-hidden="true">↗</span></div><div class="step-pill">{{ t(`home.workflow.steps.${index - 1}.step`) }}</div><h3>{{ t(`home.workflow.steps.${index - 1}.title`) }}</h3><p>{{ t(`home.workflow.steps.${index - 1}.text`) }}</p></article></div>
    </div></section>

    <section id="showcase" class="section-shell section-space screenshot-section"><div class="section-kicker"><span>04 / {{ t('home.showcase.kicker') }}</span><span class="tiny-rule" /></div><div class="screenshot-heading"><h2>{{ t('home.showcase.title') }}<br><em>{{ t('home.showcase.emphasis') }}</em></h2><p>{{ t('home.showcase.text') }}</p></div><div class="real-screenshot"><img src="/ss/boards.jpg" :alt="t('home.showcase.alt')" loading="lazy" width="1280" height="716"><div class="screenshot-caption"><span>{{ t('home.showcase.screen') }}</span><span>{{ t('home.showcase.view') }}</span></div></div></section>

    <section id="community" class="community-section section-space"><div class="section-shell community-grid"><div class="community-mark" aria-hidden="true"><span>↗</span><span>↗</span><span>↗</span></div><div><div class="section-kicker">05 / {{ t('home.community.kicker') }}</div><h2>{{ t('home.community.title') }}<br><em>{{ t('home.community.emphasis') }}</em></h2><p>{{ t('home.community.text') }}</p><a class="text-link text-link-light" href="mailto:contact@denalify.com?subject=Denalify%20product%20feedback">{{ t('home.community.link') }} <span aria-hidden="true">↗</span></a></div></div></section>

    <section id="pricing" class="section-shell section-space pricing-section"><div class="section-kicker"><span>06 / {{ t('common.getStarted') }}</span><span class="tiny-rule" /></div><div class="pricing-grid"><div><h2>{{ t('home.pricing.title') }}<br><em>{{ t('home.pricing.emphasis') }}</em></h2><p>{{ t('home.pricing.text') }}</p><a class="button button-primary" href="https://app.denalify.com/auth/signup">{{ t('common.createWorkspace') }} <span aria-hidden="true">↗</span></a></div><div class="pricing-note"><div class="pricing-note-head">{{ t('home.pricing.free') }} <span>↗</span></div><strong>€0</strong><span class="pricing-unit">{{ t('home.pricing.unit') }}</span><ul><li>{{ t('home.pricing.benefits.0') }}</li><li>{{ t('home.pricing.benefits.1') }}</li><li>{{ t('home.pricing.benefits.2') }}</li></ul><a href="https://app.denalify.com/auth/signup">{{ t('home.pricing.try') }} <span aria-hidden="true">↗</span></a></div></div></section>

    <section id="updates" class="updates-section"><div class="section-shell updates-grid"><div><div class="section-kicker">{{ t('home.newsletter.kicker') }}</div><h2>{{ t('home.newsletter.title') }}</h2><p>{{ t('home.newsletter.text') }}</p></div><EmailSignupForm /></div></section>
  </main>
</template>
