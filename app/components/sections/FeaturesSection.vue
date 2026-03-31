<template>
  <section id="features" class="relative py-28 overflow-hidden">
    <div class="glow-blob w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(59,130,246,0.06)]" />

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-16 flex flex-col items-center gap-4">
        <AnimateOnScroll>
          <SectionLabel>Everything You Need</SectionLabel>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="100">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#f0f6ff] max-w-2xl">
            Built for teams that ship
            <span class="text-gradient-cyan"> fast</span>
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="200">
          <p class="text-[#8892a4] text-lg max-w-xl">
            Every feature is designed to reduce friction, improve visibility, and help your team do their best work.
          </p>
        </AnimateOnScroll>
      </div>

      <!-- Feature grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimateOnScroll
          v-for="(feature, i) in features"
          :key="feature.title"
          :delay="([100, 200, 300, 100, 200, 300] as const)[i]"
        >
          <FeatureCard
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
          />
        </AnimateOnScroll>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: 'Smart Boards',
    description: 'Drag-and-drop Kanban with customizable workflows, swimlanes, and WIP limits. Visualize work the way your team thinks.',
    icon: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect x="2" y="3" width="4" height="14" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="8" y="3" width="4" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/><rect x="14" y="3" width="4" height="11" rx="1" stroke="currentColor" stroke-width="1.5"/></svg>`,
  },
  {
    title: 'Real-time Dashboard',
    description: 'Live analytics, project health scores, and team metrics update instantly. Always know where your projects stand.',
    icon: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M2 14l5-5 4 4 3-3 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 4h16M2 18h16" stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity=".4"/></svg>`,
  },
  {
    title: 'Team Collaboration',
    description: 'Role-based permissions, inline comments, @mentions, and activity feeds keep everyone in sync — no more status update meetings.',
    icon: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="7" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/><circle cx="14" cy="6" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M1 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13 11c2.209 0 4 1.791 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    title: 'Advanced Analytics',
    description: 'Velocity charts, burndown reports, cycle time tracking, and custom dashboards give you deep insight into team performance.',
    icon: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M3 3v14h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M7 12l3-4 3 2 3-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    title: 'Powerful Integrations',
    description: 'Connect Slack, Discord, GitHub, and custom webhooks. Bring your existing tools into your workflow without extra overhead.',
    icon: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M10 2L2 7l8 5 8-5-8-5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M2 13l8 5 8-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 10l8 5 8-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    title: 'File Management',
    description: 'Attach files directly to tasks. Storage from 1GB to unlimited depending on your plan, with support for large files up to 200MB.',
    icon: `<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M4 4a2 2 0 012-2h5l5 5v9a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M11 2v5h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
]
</script>
