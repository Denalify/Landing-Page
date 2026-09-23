<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
useSeoMeta({ title: 'Privacy notice', description: 'How Denalify handles personal data on its website and in the app.' })
defineOgImage('Denalify', { title: 'Privacy notice', description: 'How Denalify handles personal data on its website and in the app.', label: 'LEGAL' })
</script>

<template>
  <LegalArticle eyebrow="LEGAL / 01" title="Privacy notice" introduction="How your personal data is used when you visit Denalify, join the newsletter or use the app.">
    <h2>1. Controller and contact</h2>
    <p>Denalify is operated by Patryk Dąbrowski, an individual based at Młyńska 5/1, 88-100 Inowrocław, Poland. He is the controller of personal data collected through this website and of app data for which he determines the purposes and means of processing. For privacy questions or requests, email <a href="mailto:contact@denalify.com">contact@denalify.com</a> or write to that address.</p>
    <p>When a workspace owner uploads information about other people, that owner may be the controller of that content and Patryk Dąbrowski may process it on the owner's behalf. Business customers can contact us about a data processing agreement.</p>

    <h2>2. Data, purposes and legal bases</h2>
    <ul>
      <li><strong>Newsletter:</strong> your email address, consent and subscription timestamps, referral source if supplied, delivery status and unsubscribe state, so we can send Denalify launch news and product updates and honour your choices. This includes people who joined the former early-access list for those updates. The legal basis is consent (GDPR Article 6(1)(a)); every message includes a way to withdraw it.</li>
      <li><strong>Accounts and workspaces:</strong> account and profile details, memberships, projects, tasks, comments, documents, files and other content you provide, to create and operate your account and deliver the service (Article 6(1)(b)). Creating an account does not automatically subscribe you to marketing.</li>
      <li><strong>Subscriptions and billing:</strong> plan, subscription, payment status, billing details and any withdrawal statement with its submission and acknowledgment times, to manage the paid service, handle consumer rights and comply with applicable tax and accounting duties (Articles 6(1)(b) and (c)). Payment card details are handled by Stripe in its payment flow.</li>
      <li><strong>Support and security:</strong> messages you send us, login events and technical logs, to answer requests, protect the service and investigate misuse (Articles 6(1)(b) and (f)). Our legitimate interests are providing support and keeping the service secure.</li>
    </ul>
    <p>Creating an account and purchasing a plan require the information needed for those actions. If you do not provide it, we cannot complete the relevant request. New newsletter signups do not store a raw IP address or perform a geolocation lookup; a short-lived one-way network identifier may be used to prevent automated abuse. Former early-access records may contain an IP address and country from an earlier version of the form.</p>

    <h2>3. Recipients and connected services</h2>
    <p>The app is hosted on a Hetzner VPS. Email is handled by a self-hosted Mailcow server on a separate Hetzner VPS. Providers of the database and file storage may access data to the extent needed to operate those services. Stripe processes payment and billing information. If you choose an integration, relevant information may be exchanged with that provider, including Google, GitHub, Discord or Slack, depending on the feature you enable. We do not sell personal data.</p>

    <h2>4. Transfers outside the EEA</h2>
    <p>Some providers may process data outside the European Economic Area. If a transfer occurs, it is subject to an applicable adequacy decision or appropriate safeguards, such as the European Commission's standard contractual clauses, where required by GDPR. Email <a href="mailto:contact@denalify.com">contact@denalify.com</a> to ask about the safeguards relevant to your data.</p>

    <h2>5. Retention</h2>
    <p>Newsletter data is kept while you remain subscribed. After unsubscribe, a minimal suppression record may be retained so we do not send further messages. Account and workspace data is kept while the account is active, then for the time needed to complete deletion, resolve disputes or meet legal duties. Billing and withdrawal records are kept for the period required by applicable tax and accounting law or to establish, exercise or defend related claims. Support messages and security logs are kept only while needed to handle the request or protect the service, subject to applicable limitation periods. You can request deletion of older waitlist IP and country data.</p>

    <h2>6. Your rights</h2>
    <p>Subject to applicable law, you can request access, correction, deletion, restriction, portability or objection. You can withdraw newsletter consent at any time through the link in every message without affecting processing already carried out. The app provides account export and deletion controls. Send other requests to <a href="mailto:contact@denalify.com">contact@denalify.com</a>. You may also complain to a data protection authority, including Poland's <a href="https://uodo.gov.pl/">UODO</a>.</p>

    <h2>7. Cookies and changes</h2>
    <p>Read the <NuxtLink to="/cookies">cookie notice</NuxtLink> for information about storage on your device. We will update this notice if our practices change and show the new date above. We will communicate material changes where required by law.</p>
  </LegalArticle>
</template>
