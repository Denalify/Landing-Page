<script setup lang="ts">
const { t } = useI18n()

const plans = [
  { key: 'free', price: '€0', featured: false },
  { key: 'starter', price: '€12', featured: true },
  { key: 'pro', price: '€39', featured: false },
  { key: 'team', price: '€99', featured: false },
]
</script>

<template>
  <div class="plan-grid">
    <article v-for="plan in plans" :key="plan.key" class="plan-card" :class="{ 'plan-card-featured': plan.featured }">
      <div class="plan-card-head">
        <div><span v-if="plan.featured" class="plan-badge">{{ t('pricing.popular') }}</span><h3>{{ t(`pricing.plans.${plan.key}.name`) }}</h3></div>
        <span class="plan-audience">{{ t(`pricing.plans.${plan.key}.audience`) }}</span>
      </div>
      <div class="plan-price"><strong>{{ plan.price }}</strong><span>{{ t('pricing.perMonth') }}</span></div>
      <p>{{ t(`pricing.plans.${plan.key}.description`) }}</p>
      <ul><li v-for="index in 5" :key="index">{{ t(`pricing.plans.${plan.key}.features.${index - 1}`) }}</li></ul>
      <a class="button" :class="plan.featured ? 'button-primary' : 'button-outline'" href="https://app.denalify.com/auth/signup">{{ t(plan.key === 'free' ? 'pricing.startFree' : 'pricing.choose') }} <span aria-hidden="true">↗</span></a>
    </article>
  </div>
</template>
