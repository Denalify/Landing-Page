<script setup lang="ts">
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
  <div class="signup-wrap"><p v-if="status === 'success'" class="form-success" role="status">You’re subscribed. Watch your inbox for Denalify news and launch updates.</p><form v-else class="signup-form" @submit.prevent="submit"><label for="waitlist-email">Your email address</label><div class="signup-row"><input id="waitlist-email" v-model.trim="email" type="email" name="email" autocomplete="email" placeholder="you@company.com" required maxlength="254"><button class="button button-dark" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? 'Subscribing…' : 'Join the newsletter' }} <span aria-hidden="true">↗</span></button></div><label class="newsletter-consent"><input v-model="consent" type="checkbox" required><span>I agree to receive Denalify launch news and product updates by email. I can unsubscribe at any time.</span></label><input v-model="honeypot" class="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><p v-if="status === 'error'" class="form-error" role="alert">We couldn’t save your subscription. Please try again later.</p><p class="form-disclaimer">We use your address only for the Denalify newsletter. Every email includes an unsubscribe link. Read our <NuxtLink to="/privacy">privacy notice</NuxtLink>.</p></form></div>
</template>
