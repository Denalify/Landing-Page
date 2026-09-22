<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
useSeoMeta({ title: 'Cookie notice — Denalify', description: 'Cookies and similar storage used by the Denalify website and app.' })
</script>

<template>
  <LegalArticle eyebrow="LEGAL / 02" title="Cookie notice" introduction="What is stored on your device, why it is needed and how you can control it.">
    <h2>1. This landing page</h2><p>The public Denalify landing page does not currently load advertising or analytics cookies. It does not set non-essential cookies to show marketing content. That is why there is no “accept all” banner here: there is nothing optional to consent to. The early-access form sends the address you enter to our server, but it does not require a marketing cookie.</p>
    <h2>2. Necessary storage</h2><p>The restricted administration panel uses a first-party session cookie to keep an authorized administrator signed in. The Denalify app also uses authentication session storage and may save functional preferences, such as appearance settings, to make the service work as requested. These are not used for cross-site advertising.</p>
    <h2>3. Connected services</h2><p>If you choose to sign in through an identity provider, connect an integration, or enter a payment flow, that provider may use its own cookies on its own pages. Their notices apply there. We do not load those flows merely because you view this landing page.</p>
    <h2>4. Your controls</h2><p>You can clear or block cookies and local storage in your browser. Blocking necessary session storage can prevent sign-in or administration. If we add optional analytics or marketing technologies later, they should remain off until you choose them, with a clear way to reject and withdraw consent. This notice must then be updated.</p>
    <h2>5. Questions</h2><p>Contact <a href="mailto:contact@denalify.com">contact@denalify.com</a> or read the <NuxtLink to="/privacy">privacy notice</NuxtLink>.</p>
  </LegalArticle>
</template>
