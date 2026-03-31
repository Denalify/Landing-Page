<template>
  <section id="newsletter" class="relative py-32 overflow-hidden">
    <!-- Big centered glow -->
    <div class="glow-blob w-[700px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,217,255,0.08)]" />
    <div class="glow-blob w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(59,130,246,0.06)]" />

    <div class="relative z-10 max-w-3xl mx-auto px-6 text-center">
      <AnimateOnScroll>
        <SectionLabel dot>Early Access</SectionLabel>
      </AnimateOnScroll>

      <AnimateOnScroll :delay="100">
        <h2 class="text-3xl sm:text-5xl font-extrabold text-[#f0f6ff] mt-6 mb-4 leading-tight">
          Be First to Experience
          <span class="text-gradient-cyan"> Denalify</span>
        </h2>
      </AnimateOnScroll>

      <AnimateOnScroll :delay="200">
        <p class="text-[#8892a4] text-lg mb-8 max-w-xl mx-auto">
          Join the waitlist today and get early access to the closed beta, plus <strong class="text-[#f0f6ff]">3 months free</strong> on any paid plan when we launch.
        </p>
      </AnimateOnScroll>

      <AnimateOnScroll :delay="300">
        <div class="glass-card p-8">
          <EmailSignupForm variant="banner" />
          <p class="text-[#8892a4] text-xs mt-4">
            No spam, ever. Unsubscribe at any time. Early adopters lock in launch pricing.
          </p>
        </div>
      </AnimateOnScroll>

      <!-- Trust badges -->
      <AnimateOnScroll :delay="400">
        <div class="flex flex-wrap justify-center gap-6 mt-10 text-[#8892a4] text-sm">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#00d9ff]" viewBox="0 0 16 16" fill="none">
              <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.12L8 10.5l-3.71 1.95.71-4.12L2 5.5l4.15-.75L8 1z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
            </svg>
            <span>Free plan forever</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#00d9ff]" viewBox="0 0 16 16" fill="none">
              <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm0 4v4M8 11v.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
            <span>No credit card required</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-[#00d9ff]" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5l1.55 3.14L13 5.27l-2.5 2.44.59 3.44L8 9.5l-3.09 1.65.59-3.44L3 5.27l3.45-.63L8 1.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
            </svg>
            <span>Launch pricing locked</span>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
