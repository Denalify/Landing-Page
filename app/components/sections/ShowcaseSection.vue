<template>
  <section id="showcase" class="relative py-28 overflow-hidden">
    <div class="glow-blob w-[500px] h-[500px] bottom-0 right-0 bg-[rgba(0,217,255,0.05)]" />

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-12 flex flex-col items-center gap-4">
        <AnimateOnScroll>
          <SectionLabel>Product Showcase</SectionLabel>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="100">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#f0f6ff]">
            See it in
            <span class="text-gradient-cyan">action</span>
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="200">
          <p class="text-[#8892a4] text-lg max-w-xl">
            A sleek, dark-first UI with modern and classic themes. Works beautifully for any team.
          </p>
        </AnimateOnScroll>
      </div>

      <!-- Tab switcher -->
      <AnimateOnScroll :delay="100">
        <div class="flex justify-center mb-8">
          <div class="glass-card p-1 flex gap-1 rounded-2xl">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              class="px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              :class="activeTab === tab.id
                ? 'bg-[rgba(0,217,255,0.15)] border border-[rgba(0,217,255,0.4)] text-[#00d9ff]'
                : 'text-[#8892a4] hover:text-[#f0f6ff]'"
              @click="activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>
      </AnimateOnScroll>

      <!-- Screenshot -->
      <AnimateOnScroll :delay="200">
        <div class="relative max-w-5xl mx-auto">
          <div class="absolute inset-0 glow-blob bg-[rgba(0,217,255,0.06)] scale-105 blur-3xl" />
          <Transition name="tab-switch" mode="out-in">
            <div :key="activeTab" class="relative z-10">
              <img
                :src="currentTab.src"
                :alt="`Denalify ${currentTab.label}`"
                class="screenshot-frame w-full"
                loading="lazy"
                width="1200"
                height="750"
              />
              <p class="text-center text-[#8892a4] text-sm mt-4">{{ currentTab.description }}</p>
            </div>
          </Transition>
        </div>
      </AnimateOnScroll>
    </div>
  </section>
</template>

<script setup lang="ts">
const tabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    src: '/ss/dashboard-modern.png',
    description: 'Get a bird\'s-eye view of all your projects, team activity, and key metrics at a glance.',
  },
  {
    id: 'boards',
    label: 'Boards',
    src: '/ss/boards-modern.png',
    description: 'Organize work with flexible Kanban boards. Drag, drop, and ship.',
  },
  {
    id: 'billing',
    label: 'Billing',
    src: '/ss/billing-modern.png',
    description: 'Transparent billing, easy subscription management, and full invoice history.',
  },
]

const activeTab = ref('dashboard')
const currentTab = computed(() => tabs.find(t => t.id === activeTab.value)!)
</script>
