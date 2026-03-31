<template>
  <section class="relative py-24 overflow-hidden">
    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-14 flex flex-col items-center gap-4">
        <AnimateOnScroll>
          <SectionLabel>Integrations</SectionLabel>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="100">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#f0f6ff]">
            Works with the tools you
            <span class="text-gradient-cyan">already love</span>
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="200">
          <p class="text-[#8892a4] text-lg max-w-lg">
            Denalify plugs into your existing workflow. No migration headaches, no context switching.
          </p>
        </AnimateOnScroll>
      </div>

      <!-- Integration cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <AnimateOnScroll
          v-for="(integration, i) in integrations"
          :key="integration.name"
          :delay="([100, 200, 300, 400] as const)[i]"
        >
          <div class="glass-card p-8 flex flex-col items-center text-center gap-4 hover:border-[rgba(0,217,255,0.25)] transition-all duration-300 group">
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              :style="{ background: `rgba(${integration.colorRgb}, 0.12)` }"
            >
              <div class="w-8 h-8" v-html="integration.logo" />
            </div>
            <div>
              <h3 class="text-[#f0f6ff] font-semibold mb-1">{{ integration.name }}</h3>
              <p class="text-[#8892a4] text-sm leading-relaxed">{{ integration.description }}</p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <!-- More integrations hint -->
      <AnimateOnScroll :delay="200">
        <p class="text-center text-[#8892a4] text-sm mt-8">
          Plus custom <span class="text-[#00d9ff]">webhooks</span> to connect any service via REST
        </p>
      </AnimateOnScroll>
    </div>
  </section>
</template>

<script setup lang="ts">
const integrations = [
  {
    name: 'Slack',
    colorRgb: '74, 21, 75',
    description: 'Get task updates and notifications directly in your Slack channels.',
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z" fill="#E01E5A"/>
      <path d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z" fill="#36C5F0"/>
      <path d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z" fill="#2EB67D"/>
      <path d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
      <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z" fill="#ECB22E"/>
      <path d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
    </svg>`,
  },
  {
    name: 'Discord',
    colorRgb: '88, 101, 242',
    description: 'Bot notifications and task updates delivered straight to your server.',
    logo: `<svg viewBox="0 0 24 24" fill="#5865F2" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>`,
  },
  {
    name: 'GitHub',
    colorRgb: '255, 255, 255',
    description: 'Link commits, PRs, and issues directly to tasks for full traceability.',
    logo: `<svg viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>`,
  },
  {
    name: 'Webhooks',
    colorRgb: '0, 217, 255',
    description: 'Build custom automations and connect any service with flexible REST webhooks.',
    logo: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="#00d9ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
]
</script>
