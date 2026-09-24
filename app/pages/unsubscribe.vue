<script setup lang="ts">
definePageMeta({ layout: 'marketing', i18n: false })
useSeoMeta({ title: 'Unsubscribe from the Denalify newsletter', robots: 'noindex, nofollow' })

const route = useRoute()
const token = computed(() => typeof route.query.token === 'string' ? route.query.token : '')
const status = ref<'idle' | 'loading' | 'done' | 'error'>(token.value ? 'idle' : 'error')

async function unsubscribe() {
  if (!token.value || status.value === 'loading') return
  status.value = 'loading'
  try {
    await $fetch(`/api/newsletter/unsubscribe?token=${encodeURIComponent(token.value)}`, { method: 'POST' })
    status.value = 'done'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <main class="section-shell unsubscribe-page">
    <div class="unsubscribe-card">
      <img src="/logo-white.webp" alt="Denalify" class="unsubscribe-logo">
      <template v-if="status === 'done'"><h1>You’re unsubscribed.</h1><p>You will no longer receive the Denalify newsletter. You can subscribe again from our homepage whenever you like.</p><NuxtLink class="button button-primary" to="/">Return home <span aria-hidden="true">↗</span></NuxtLink></template>
      <template v-else-if="status === 'error'"><h1>This link is not available.</h1><p>The unsubscribe link is missing or could not be processed. Contact <a href="mailto:contact@denalify.com">contact@denalify.com</a> and we’ll help.</p></template>
      <template v-else><h1>Leave the newsletter?</h1><p>You will stop receiving Denalify launch news and product updates.</p><button class="button button-primary" :disabled="status === 'loading'" @click="unsubscribe">{{ status === 'loading' ? 'Unsubscribing…' : 'Confirm unsubscribe' }} <span aria-hidden="true">↗</span></button></template>
    </div>
  </main>
</template>

<style scoped>
.unsubscribe-page{min-height:72vh;display:grid;place-items:center;padding-block:80px}.unsubscribe-card{width:min(100%,620px);padding:42px;border:1px solid var(--site-border);border-radius:20px;background:var(--site-panel);box-shadow:0 24px 60px #0005}.unsubscribe-logo{height:32px;width:auto;margin-bottom:42px}.unsubscribe-card h1{font-size:clamp(36px,7vw,58px);line-height:1.02;margin:0 0 18px}.unsubscribe-card p{color:var(--site-muted);font-size:16px;line-height:1.7;margin:0 0 28px}.unsubscribe-card a:not(.button){color:var(--site-blue);text-decoration:underline}
</style>
