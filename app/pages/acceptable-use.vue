<script setup lang="ts">
definePageMeta({ layout: 'marketing', i18n: false })
useSeoMeta({ title: 'Acceptable use', description: 'Rules for keeping Denalify safe and useful for everyone.' })
defineOgImage('Denalify', { title: 'Acceptable use', description: 'Rules for keeping Denalify safe and useful for everyone.', label: 'LEGAL' })
</script>

<template>
  <LegalArticle eyebrow="LEGAL / 04" title="Acceptable use" introduction="Simple boundaries that protect your team, other users and the service.">
    <p>This policy applies to Denalify, provided by Patryk Dąbrowski, and forms part of the <NuxtLink to="/terms">terms of service</NuxtLink>.</p>
    <h2>Use Denalify responsibly</h2><p>Do not use the service to break the law, infringe another person’s rights, harass people, publish malware, send spam or store material you are not permitted to share. Do not attempt to access another user’s workspace or interfere with the service’s security or availability.</p>
    <h2>Integrations and automation</h2><p>Only connect accounts and webhooks you are authorized to use. Configure automations responsibly and respect the limits and policies of connected providers. Do not use Denalify to scrape, flood or attack external systems.</p>
    <h2>Public forms and shared links</h2><p>If you publish an intake form or share project material, explain to respondents what you collect and use appropriate permissions. Do not ask for sensitive data unless you have a lawful basis and the service is suitable for it.</p>
    <h2>Reporting and response</h2><p>Report suspected abuse or a security issue to <a href="mailto:contact@denalify.com">contact@denalify.com</a>. We may investigate and take proportionate action, including removing unlawful content or temporarily restricting access where necessary. We will consider context and applicable law.</p>
  </LegalArticle>
</template>
