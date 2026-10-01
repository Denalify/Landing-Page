<script setup lang="ts">
import { CheckoutEventNames, initializePaddle } from '@paddle/paddle-js'

definePageMeta({ layout: 'marketing', i18n: false })
useSeoMeta({ title: 'Payment', description: 'Secure checkout for Denalify subscriptions.', robots: 'noindex, nofollow' })

const route = useRoute()
const config = useRuntimeConfig().public
const hasOrder = typeof route.query._ptxn === 'string'
const returnPath = typeof route.query.return === 'string' && /^\/dashboard\/[\w-]+\/billing$/.test(route.query.return) ? route.query.return : '/dashboard'
const returnUrl = `${config.appUrl}${returnPath}`
const failed = ref(false)

onMounted(async () => {
  if (!config.paddleClientToken) {
    failed.value = hasOrder
    return
  }
  const paddle = await initializePaddle({
    token: config.paddleClientToken,
    environment: config.paddleClientToken.startsWith('test_') ? 'sandbox' : 'production',
    checkout: { settings: { variant: 'one-page', theme: 'dark', successUrl: `${returnUrl}?checkout=success` } },
    eventCallback: (event) => {
      if (event.name === CheckoutEventNames.CHECKOUT_ERROR) failed.value = true
      if (event.name === CheckoutEventNames.CHECKOUT_CLOSED) window.location.href = returnUrl
    },
  }).catch(() => undefined)
  if (!paddle) failed.value = hasOrder
})
</script>

<template>
  <LegalArticle eyebrow="PAYMENT" title="Denalify checkout" introduction="Paid Denalify plans are ordered from the Billing page of your workspace and paid for here." updated="Secure checkout by Paddle">
    <p v-if="failed" role="alert">The checkout could not be loaded. Go back and try again, or email <a href="mailto:contact@denalify.com">contact@denalify.com</a>.</p>
    <p v-else-if="hasOrder" role="status">Your secure checkout opens in a moment.</p>
    <p v-else>There is no order to pay for on this page yet. Start from Billing in your workspace, or see the <NuxtLink to="/#pricing">plans and prices</NuxtLink>.</p>
    <p><a :href="returnUrl">Return to Denalify</a></p>

    <h2>Who you pay</h2>
    <p>Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle shows the final amount, any applicable tax and the available payment methods before you place the order, and sends your receipt.</p>

    <h2>Before you order</h2>
    <p>Subscriptions renew automatically until cancelled. You can cancel at any time in Billing. The <NuxtLink to="/terms">terms of service</NuxtLink>, the <NuxtLink to="/refund-policy">refund policy</NuxtLink> and the <NuxtLink to="/privacy">privacy notice</NuxtLink> apply to every order.</p>
  </LegalArticle>
</template>
