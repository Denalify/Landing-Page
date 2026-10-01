<script setup lang="ts">
definePageMeta({ layout: 'marketing', i18n: false })
useSeoMeta({ title: 'Refund policy', description: 'When and how you can get a refund for a Denalify subscription.' })
defineOgImage('Denalify', { title: 'Refund policy', description: 'When and how you can get a refund for a Denalify subscription.', label: 'LEGAL' })
</script>

<template>
  <LegalArticle eyebrow="LEGAL / 05" title="Refund policy" introduction="When you can get your money back for a Denalify subscription and how to ask for it." updated="Last updated: 1 October 2026">
    <h2>1. Who handles payments and refunds</h2>
    <p>Denalify is provided by Patryk Dąbrowski, Młyńska 5/1, 88-100 Inowrocław, Poland. Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders: it takes the payment, sends your receipt and returns the money when a refund is granted.</p>

    <h2>2. 14-day refund for a new subscription</h2>
    <p>You can ask for a full refund within 14 days of the first payment for a paid Denalify subscription. You do not need to give a reason. This applies to every customer, whether you buy as a consumer or for a business or other organization.</p>

    <h2>3. Free trial</h2>
    <p>The 14-day Pro trial is free. If you cancel before it ends, nothing is charged. If the trial ends and the first payment is taken, the 14 days in section 2 start on the day of that payment.</p>

    <h2>4. Renewals and plan changes</h2>
    <p>Later payments, meaning renewals and charges for changing to a higher plan, are not refundable, except where the law requires a refund. You can cancel at any time in the Billing page of your workspace. Cancelling stops future renewals, and you keep the paid plan until the end of the period you have already paid for. Changing to a lower plan creates a credit that reduces your next renewal instead of a payout.</p>

    <h2>5. How to ask for a refund</h2>
    <p>Email <a href="mailto:contact@denalify.com">contact@denalify.com</a> from the email address of your account and name the workspace. You can also use “Withdraw from contract” in the Billing page of your workspace, or reply to the receipt you received from Paddle. We acknowledge your request by email.</p>
    <p>An approved refund is returned to the payment method used for the order within 14 days of receiving your request. Your bank or card issuer may need a few more days to show it. When a subscription is refunded it is cancelled and the workspace returns to the Free plan; your data is kept, subject to the limits of that plan.</p>

    <h2>6. Your legal rights</h2>
    <p>If you are a consumer, your statutory right to withdraw from a contract concluded online within 14 days, and any other rights that the law does not allow to be excluded, apply in addition to this policy. They are described in section 7 of the <NuxtLink to="/terms">terms of service</NuxtLink>. Where this policy is more favourable to you than the law, this policy applies.</p>

    <h2>7. Questions</h2>
    <p>Questions about a payment or a refund can be sent to <a href="mailto:contact@denalify.com">contact@denalify.com</a> or by phone to <a href="tel:+48500408357">+48 500 408 357</a>.</p>
  </LegalArticle>
</template>
