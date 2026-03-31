<template>
  <section id="pricing" class="relative py-28 overflow-hidden">
    <div class="glow-blob w-[600px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,217,255,0.04)]" />

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 flex flex-col items-center gap-4">
        <AnimateOnScroll>
          <SectionLabel>Pricing</SectionLabel>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="100">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#f0f6ff]">
            Simple, transparent
            <span class="text-gradient-cyan">pricing</span>
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="200">
          <p class="text-[#8892a4] text-lg max-w-xl">
            Start free, scale when you're ready. No hidden fees, no surprises.
          </p>
        </AnimateOnScroll>
      </div>

      <!-- Pricing grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-end">
        <AnimateOnScroll
          v-for="(tier, i) in tiers"
          :key="tier.name"
          :delay="([100, 200, 300, 400] as const)[i]"
        >
          <PricingCard
            :name="tier.name"
            :price="tier.price"
            :subtitle="tier.subtitle"
            :features="tier.features"
            :popular="tier.popular"
            @cta-click="scrollTo('newsletter')"
          />
        </AnimateOnScroll>
      </div>

      <!-- Footer note -->
      <AnimateOnScroll :delay="200">
        <p class="text-center text-[#8892a4] text-sm mt-10">
          All plans include SSL, 99.9% uptime SLA, and data export. Need something custom?
          <a href="mailto:hello@denalify.com" class="text-[#00d9ff] hover:underline">Contact us</a>.
        </p>
      </AnimateOnScroll>
    </div>
  </section>
</template>

<script setup lang="ts">
const { scrollTo } = useScrollTo()

const tiers = [
  {
    name: 'Free',
    price: 0,
    subtitle: 'Perfect for individuals and small teams',
    popular: false,
    features: [
      'Up to 35 Members',
      '3 Projects',
      '2 Boards per project',
      '3 Templates',
      '1GB Storage',
      'Max file size: 10MB',
      'Task History (7d)',
      'Calendar & Discord',
      'Community Support',
    ],
  },
  {
    name: 'Startup',
    price: 8,
    subtitle: 'Great for growing teams',
    popular: false,
    features: [
      'Up to 50 Members',
      '8 Projects',
      'Unlimited Boards',
      '2 Teams',
      '10 Templates',
      '5GB Storage',
      'Max file size: 25MB',
      'Task History (30d)',
      'All Integrations',
      'Basic Analytics',
      'Priority Support',
    ],
  },
  {
    name: 'Pro',
    price: 20,
    subtitle: 'For scaling teams that need more',
    popular: true,
    features: [
      'Up to 99 Members',
      '25 Projects',
      'Unlimited Boards',
      '10 Teams',
      'Unlimited Templates',
      '25GB Storage',
      'Max file size: 50MB',
      'Task History (90d)',
      'All Integrations',
      'Advanced Analytics',
      'Priority Support',
      'Audit Logs (30d)',
    ],
  },
  {
    name: 'Team',
    price: 50,
    subtitle: 'Unlimited power for large organizations',
    popular: false,
    features: [
      'Unlimited Members',
      'Unlimited Projects',
      'Unlimited Boards',
      'Unlimited Teams',
      'Unlimited Templates',
      '100GB Storage',
      'Max file size: 200MB',
      'Unlimited Task History',
      'All Integrations',
      'Advanced Analytics',
      'Priority Support',
      'Audit Logs (1 year)',
      'SSO (Single Sign-On)',
      'Enforce 2FA',
      'API Access',
    ],
  },
]
</script>
