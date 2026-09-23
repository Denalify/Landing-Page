<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
useSeoMeta({ title: 'Support', description: 'Get help with your Denalify account, workspace or billing.' })
defineOgImage('Denalify', { title: 'Denalify support', description: 'Get help with your account, workspace or billing.', label: 'SUPPORT' })
</script>

<template>
  <LegalArticle eyebrow="HELP / CONTACT" title="How can we help?" introduction="Questions about your workspace, billing, privacy or an idea for the product? Contact Denalify.">
    <h2>Contact us</h2><p>Denalify is operated by Patryk Dąbrowski, Młyńska 5/1, 88-100 Inowrocław, Poland. Email <a href="mailto:contact@denalify.com">contact@denalify.com</a> or call <a href="tel:+48500408357">+48 500 408 357</a> with a short description of what you need. For an account problem, include the email address on your account and the name of your workspace, but never send your password or a two-factor code.</p>
    <h2>Before you write</h2><ul><li>For billing or cancellation, open your organization’s Billing page in the app.</li><li>For account data, use the export and deletion controls in account settings.</li><li>For feature ideas, tell us what you are trying to achieve and where the current workflow gets in the way.</li></ul>
    <h2>Privacy and legal</h2><p>Read our <NuxtLink to="/privacy">privacy notice</NuxtLink>, <NuxtLink to="/cookies">cookie notice</NuxtLink> and <NuxtLink to="/terms">terms of service</NuxtLink>.</p>
  </LegalArticle>
</template>
