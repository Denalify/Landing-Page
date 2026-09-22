<script setup lang="ts">
const email = ref('')
const honeypot = ref('')
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

async function submit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  try {
    await $fetch('/api/waitlist', { method: 'POST', body: { email: email.value, website: honeypot.value } })
    email.value = ''
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <div class="signup-wrap"><p v-if="status === 'success'" class="form-success" role="status">You’re on the list. We’ll be in touch when a place opens up.</p><form v-else class="signup-form" @submit.prevent="submit"><label for="waitlist-email">Your email address</label><div class="signup-row"><input id="waitlist-email" v-model.trim="email" type="email" name="email" autocomplete="email" placeholder="you@company.com" required maxlength="254"><button class="button button-dark" type="submit" :disabled="status === 'sending'">{{ status === 'sending' ? 'Joining…' : 'Join early access' }} <span aria-hidden="true">↗</span></button></div><input v-model="honeypot" class="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><p v-if="status === 'error'" class="form-error" role="alert">We couldn’t save your request. Please try again later.</p><p class="form-disclaimer">Join to receive early-access and product updates. Withdraw any time by emailing us. Read our <NuxtLink to="/privacy">privacy notice</NuxtLink>.</p></form></div>
</template>
