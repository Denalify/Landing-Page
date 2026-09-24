<script setup lang="ts">
const { t } = useI18n()
const email = ref('')
const honeypot = ref('')
const consent = ref(false)
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
async function submit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  try {
    await $fetch('/api/waitlist', { method: 'POST', body: { email: email.value, website: honeypot.value, consent: consent.value } })
    email.value = ''
    consent.value = false
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="signup-wrap"><p v-if="status === 'success'" class="form-success" role="status">{{ t('form.success') }}</p><form v-else class="signup-form" @submit.prevent="submit"><label for="waitlist-email">{{ t('form.email') }}</label><div class="signup-row"><input id="waitlist-email" v-model.trim="email" type="email" name="email" autocomplete="email" placeholder="you@company.com" required maxlength="254"><button class="button button-dark" type="submit" :disabled="status === 'sending'">{{ t(status === 'sending' ? 'form.sending' : 'form.submit') }} <span aria-hidden="true">↗</span></button></div><label class="newsletter-consent"><input v-model="consent" type="checkbox" required><span>{{ t('form.consent') }}</span></label><input v-model="honeypot" class="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><p v-if="status === 'error'" class="form-error" role="alert">{{ t('form.error') }}</p><p class="form-disclaimer">{{ t('form.disclaimer') }} <NuxtLink to="/privacy">{{ t('form.privacy') }}</NuxtLink>.</p></form></div>
</template>
