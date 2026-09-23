<script setup lang="ts">
definePageMeta({ layout: 'marketing' })
useSeoMeta({ title: 'Terms of service', description: 'Terms for using the Denalify application and website.' })
defineOgImage('Denalify', { title: 'Terms of service', description: 'Terms for using the Denalify application and website.', label: 'LEGAL' })
</script>

<template>
  <LegalArticle eyebrow="LEGAL / 03" title="Terms of service" introduction="The terms for creating a Denalify workspace and using the service.">
    <h2>1. Provider and service</h2>
    <p>Denalify is provided by Patryk Dąbrowski, an individual who does not operate a registered business, at Młyńska 5/1, 88-100 Inowrocław, Poland. Contact: <a href="mailto:contact@denalify.com">contact@denalify.com</a>, phone <a href="tel:+48500408357">+48 500 408 357</a>. Denalify is an online workspace for organizing projects, tasks and collaboration. The public website describes the product; accounts and paid subscriptions are managed in the app.</p>
    <p>Current features, plan limits, prices, billing intervals and any trial terms are shown in the app. You need an internet connection and a current browser to use the service.</p>

    <h2>2. Accounts and workspaces</h2>
    <p>Provide accurate information, keep your credentials secure and ensure that people you invite are permitted to access your workspace. Workspace administrators manage membership and permissions. You are responsible for activity under your account except where the law or our own failure provides otherwise. Tell us promptly about unauthorized access.</p>

    <h2>3. Your content</h2>
    <p>You retain ownership of content you upload or create. You grant Patryk Dąbrowski the limited rights needed to store, process, display, back up and transmit it to provide Denalify and integrations you enable. You must have the rights and lawful basis needed to submit the content. Do not submit material prohibited by the <NuxtLink to="/acceptable-use">acceptable-use policy</NuxtLink>.</p>

    <h2>4. Plans, payment and cancellation</h2>
    <p>A free plan is available subject to its published limits. For a new paid subscription, Stripe Checkout presents the payable amount, billing interval and payment method before you place the order. Changing an existing paid plan may result in an immediate prorated charge. Payments are processed by Stripe. You can manage or cancel a subscription in the organization's Billing area. Cancellation stops future renewals at the end of the current paid period. It does not remove any statutory right to a refund or withdrawal. For billing questions, email <a href="mailto:contact@denalify.com">contact@denalify.com</a>.</p>

    <h2>5. Availability and changes</h2>
    <p>We work to keep the service available and secure, but do not promise uninterrupted access or a specific uptime level unless a separate agreement says so. We may update features to improve the service or meet security and legal requirements. We will give appropriate notice of material adverse changes and respect rights required by law.</p>

    <h2>6. Suspension and account closure</h2>
    <p>We may restrict access where reasonably necessary to address abuse, a security incident or a legal obligation, taking proportionate steps and giving notice when appropriate. You can stop using the service and request account deletion. Use the available export controls to retrieve your data before leaving. Retention and deletion are described in the <NuxtLink to="/privacy">privacy notice</NuxtLink>.</p>

    <h2>7. Consumer rights, withdrawal and complaints</h2>
    <p>If you are a consumer and buy a subscription online, you generally have 14 days from concluding the contract to withdraw without giving a reason. To exercise this right, use “Withdraw from contract” in your workspace's Billing page, send a clear statement to <a href="mailto:contact@denalify.com">contact@denalify.com</a>, or post it to the address in section 1 before the period expires. You may use the model form below, but you do not have to. We will acknowledge your withdrawal by email and return any payment due under applicable law within 14 days of receiving your statement. If you expressly request that the paid service start during the withdrawal period, the law may require you to pay a proportionate amount for what was provided before withdrawal. We will apply any statutory exceptions only when their conditions are met.</p>
    <p>Send complaints about the service, billing or digital content to the same email or postal address. Include your account email, a description of the issue and the outcome you seek. We will respond in accordance with applicable law. Nothing in these terms limits non-excludable consumer rights or liability that cannot lawfully be excluded.</p>

    <h2>8. Governing law and contact</h2>
    <p>Polish law applies to these terms, without depriving consumers of mandatory protections available under the law of their habitual residence. Disputes may be brought before courts with jurisdiction under applicable law. Questions about these terms can be sent to <a href="mailto:contact@denalify.com">contact@denalify.com</a>.</p>

    <h2 id="withdrawal-form">9. Model withdrawal form</h2>
    <p>Send this form only if you wish to withdraw from a contract. You can copy it into an email to <a href="mailto:contact@denalify.com">contact@denalify.com</a> or post it to Patryk Dąbrowski, Młyńska 5/1, 88-100 Inowrocław, Poland.</p>
    <p>“I hereby give notice that I withdraw from my contract for a Denalify subscription, concluded on [date]. My name is [name], my account email is [email], and my postal address is [address]. Date: [date]. Signature: [only if sent on paper].”</p>
  </LegalArticle>
</template>
