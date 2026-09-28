<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
const { t } = useI18n()
const competitors = ['Denalify', 'Asana', 'ClickUp', 'Trello', 'monday.com', 'Linear']
const rows = [
  ['billing', 'flat', 'perUser', 'perUser', 'perUser', 'perSeat', 'perUser'],
  ['team25', '€12 / €39 / €99', '$275 / $625', '$300', '$250', '€300 / €475', '$400'],
  ['free', '10', '2', 'unlimited', '10', '2', 'limited'],
  ['timeGoals', 'included', 'advanced', 'included', 'missing', 'pro', 'partial'],
  ['audit', 'proTeam', 'enterprise', 'enterprise', 'enterprise', 'enterprise', 'enterprise'],
  ['whiteLabel', 'team', 'missing', 'enterprise', 'missing', 'missing', 'missing'],
  ['mcp', 'allPlans', 'paid', 'included', 'missing', 'included', 'allPlans'],
]
useSeoMeta({ title: () => t('comparison.seoTitle'), description: () => t('comparison.seoDescription') })
defineOgImage('Denalify', { title: () => t('comparison.seoTitle'), description: () => t('comparison.seoDescription'), label: () => t('comparison.eyebrow') })
useSchemaOrg([{ '@type': 'FAQPage', mainEntity: [0, 1, 2].map(index => ({ '@type': 'Question', name: () => t(`comparison.faq.items.${index}.question`), acceptedAnswer: { '@type': 'Answer', text: () => t(`comparison.faq.items.${index}.answer`) } })) }])
</script>

<template>
  <main>
    <section class="content-hero section-shell">
      <div class="eyebrow"><span class="eyebrow-line" /> {{ t('comparison.eyebrow') }}</div>
      <h1>{{ t('comparison.title') }} <em>{{ t('comparison.emphasis') }}</em></h1>
      <p>{{ t('comparison.lede') }}</p>
      <div class="hero-actions"><a class="button button-primary" href="https://app.denalify.com/auth/signup">{{ t('common.startFree') }} <span aria-hidden="true">↗</span></a><a class="text-link" href="#comparison-table">{{ t('comparison.seeTable') }} <span aria-hidden="true">↓</span></a></div>
    </section>

    <section id="comparison-table" class="comparison-section feature-section-tinted"><div class="section-shell">
      <div class="section-kicker"><span>{{ t('comparison.tableKicker') }}</span><span class="tiny-rule" /></div>
      <div class="feature-section-heading"><h2>{{ t('comparison.tableTitle') }} <em>{{ t('comparison.tableEmphasis') }}</em></h2><p>{{ t('comparison.tableIntro') }}</p></div>
      <div class="comparison-scroll" tabindex="0"><table><thead><tr><th scope="col">{{ t('comparison.feature') }}</th><th v-for="competitor in competitors" :key="competitor" scope="col" :class="{ 'denalify-column': competitor === 'Denalify' }">{{ competitor }}</th></tr></thead><tbody><tr v-for="row in rows" :key="row[0]"><th scope="row">{{ t(`comparison.rows.${row[0]}`) }}</th><td v-for="(value, index) in row.slice(1)" :key="`${row[0]}-${index}`" :class="{ 'denalify-column': index === 0 }">{{ value.includes('€') || value.includes('$') || /^\d+$/.test(value) ? value : t(`comparison.values.${value}`) }}</td></tr></tbody></table></div>
      <p class="comparison-note">{{ t('comparison.note') }}</p>
    </div></section>

    <section class="section-shell feature-section feature-copy-grid"><div><div class="section-kicker">{{ t('comparison.whyKicker') }}</div><h2>{{ t('comparison.whyTitle') }} <em>{{ t('comparison.whyEmphasis') }}</em></h2></div><div class="content-checklist"><p>{{ t('comparison.whyText') }}</p><ul><li v-for="index in 4" :key="index">{{ t(`comparison.whyItems.${index - 1}`) }}</li></ul></div></section>

    <section class="feature-section feature-section-tinted"><div class="section-shell"><div class="section-kicker">{{ t('common.questions') }}</div><h2 class="feature-questions-title">{{ t('comparison.faq.title') }} <em>{{ t('comparison.faq.emphasis') }}</em></h2><div class="feature-questions"><article v-for="index in 3" :key="index"><h3>{{ t(`comparison.faq.items.${index - 1}.question`) }}</h3><p>{{ t(`comparison.faq.items.${index - 1}.answer`) }}</p></article></div></div></section>
  </main>
</template>
