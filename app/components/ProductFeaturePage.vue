<script setup lang="ts">
const props = defineProps<{ topic: 'task' | 'kanban' }>()
const { t } = useI18n()
const localePath = useLocalePath()
const key = (suffix: string) => t(`${props.topic}.${suffix}`)
const anchor = props.topic === 'task' ? 'how-tasks-work' : 'board-workflow'
const related = props.topic === 'task' ? '/kanban-boards' : '/task-management'
</script>

<template>
  <main>
    <section class="feature-hero section-shell" :aria-labelledby="`${topic}-title`">
      <div>
        <div class="eyebrow"><span class="eyebrow-line" /> {{ key('hero.eyebrow') }}</div>
        <h1 :id="`${topic}-title`">{{ key('hero.title') }} <em>{{ key('hero.emphasis') }}</em></h1>
        <p class="feature-lede">{{ key('hero.lede') }}</p>
        <div class="hero-actions"><a class="button button-primary" href="https://app.denalify.com/auth/signup">{{ t('common.startFree') }} <span aria-hidden="true">↗</span></a><a class="text-link" :href="`#${anchor}`">{{ key('hero.explore') }} <span aria-hidden="true">↓</span></a></div>
      </div>
      <div class="feature-hero-visual"><img src="/ss/boards.jpg" :alt="key('hero.alt')" width="1280" height="716" fetchpriority="high"><span>{{ key('hero.caption') }}</span></div>
    </section>

    <section :id="anchor" class="feature-section feature-section-tinted"><div class="section-shell">
      <div class="section-kicker"><span>{{ key('intro.kicker') }}</span><span class="tiny-rule" /></div>
      <div class="feature-section-heading"><h2>{{ key('intro.title') }} <em>{{ key('intro.emphasis') }}</em></h2><p>{{ key('intro.text') }}</p></div>
      <div class="feature-detail-grid"><article v-for="index in 3" :key="index" class="feature-detail-card"><span>0{{ index }}</span><h3>{{ key(`intro.steps.${index - 1}.title`) }}</h3><p>{{ key(`intro.steps.${index - 1}.text`) }}</p></article></div>
    </div></section>

    <section class="section-shell feature-section feature-copy-grid">
      <div><div class="section-kicker">{{ key('details.kicker') }}</div><h2>{{ key('details.title') }} <em>{{ key('details.emphasis') }}</em></h2></div>
      <div class="feature-prose"><p>{{ key('details.paragraphs.0') }}</p><p>{{ key('details.paragraphs.1') }}</p><p>{{ key('details.paragraphs.2') }} <NuxtLink :to="localePath(related)">{{ key('details.related') }}</NuxtLink>.</p></div>
    </section>

    <section class="feature-section feature-section-tinted"><div class="section-shell feature-copy-grid">
      <div><div class="section-kicker">{{ key('examples.kicker') }}</div><h2>{{ key('examples.title') }} <em>{{ key('examples.emphasis') }}</em></h2></div>
      <div class="feature-prose"><template v-for="index in 3" :key="index"><h3>{{ key(`examples.items.${index - 1}.title`) }}</h3><p>{{ key(`examples.items.${index - 1}.text`) }}</p></template></div>
    </div></section>

    <section class="section-shell feature-section" :aria-labelledby="`${topic}-questions`">
      <div class="section-kicker">{{ t('common.questions') }}</div>
      <h2 :id="`${topic}-questions`" class="feature-questions-title">{{ key('faq.title') }} <em>{{ key('faq.emphasis') }}</em></h2>
      <div class="feature-questions"><article v-for="index in 3" :key="index"><h3>{{ key(`faq.items.${index - 1}.question`) }}</h3><p>{{ key(`faq.items.${index - 1}.answer`) }}</p></article></div>
    </section>

    <section class="feature-cta"><div class="section-shell feature-cta-inner"><div><div class="section-kicker">{{ t('common.getStarted') }}</div><h2>{{ key('cta.title') }} <em>{{ key('cta.emphasis') }}</em></h2><p>{{ key('cta.text') }}</p></div><a class="button button-primary" href="https://app.denalify.com/auth/signup">{{ t('common.createWorkspace') }} <span aria-hidden="true">↗</span></a></div></section>
  </main>
</template>
