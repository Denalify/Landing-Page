<script setup lang="ts">
const { t } = useI18n()

const yearly = ref(false)
const plans = [
  { key: 'free', month: '€0', year: '€0', featured: false },
  { key: 'starter', month: '€12', year: '€120', featured: true },
  { key: 'pro', month: '€39', year: '€390', featured: false },
  { key: 'team', month: '€99', year: '€990', featured: false },
]
</script>

<template>
  <div class="classic-mode-switch billing-switch" role="group" :aria-label="t('pricing.billingPeriod')">
    <button type="button" :aria-pressed="!yearly" :class="{ active: !yearly }" @click="yearly = false">{{ t('pricing.monthly') }}</button>
    <button type="button" :aria-pressed="yearly" :class="{ active: yearly }" @click="yearly = true">{{ t('pricing.yearly') }} · {{ t('pricing.yearlyNote') }}</button>
  </div>
  <div class="plan-grid">
    <article v-for="plan in plans" :key="plan.key" class="plan-card" :class="{ 'plan-card-featured': plan.featured }">
      <div class="plan-card-head">
        <div><span v-if="plan.featured" class="plan-badge">{{ t('pricing.popular') }}</span><h3>{{ t(`pricing.plans.${plan.key}.name`) }}</h3></div>
        <span class="plan-audience">{{ t(`pricing.plans.${plan.key}.audience`) }}</span>
      </div>
      <div class="plan-price"><strong>{{ yearly ? plan.year : plan.month }}</strong><span>{{ t(yearly && plan.key !== 'free' ? 'pricing.perYear' : 'pricing.perMonth') }}</span></div>
      <p>{{ t(`pricing.plans.${plan.key}.description`) }}</p>
      <ul><li v-for="index in 5" :key="index">{{ t(`pricing.plans.${plan.key}.features.${index - 1}`) }}</li></ul>
      <a class="button" :class="plan.featured ? 'button-primary' : 'button-outline'" href="https://app.denalify.com/auth/signup">{{ t(plan.key === 'free' ? 'pricing.startFree' : 'pricing.choose') }} <span aria-hidden="true">↗</span></a>
    </article>
  </div>
</template>
