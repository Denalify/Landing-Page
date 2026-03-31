<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
    :class="scrolled ? 'bg-[rgba(10,14,26,0.92)] backdrop-blur-xl border-[rgba(0,217,255,0.08)]' : 'bg-transparent border-b-transparent'"
  >
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-2.5">
        <img src="/logo-white.webp" alt="Denalify" class="h-8 w-auto" />
      </a>

      <!-- Desktop nav -->
      <div class="hidden md:flex items-center gap-8">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm text-[#8892a4] hover:text-[#f0f6ff] transition-colors duration-200"
        >
          {{ link.label }}
        </a>
      </div>

      <!-- Desktop CTA -->
      <div class="hidden md:flex items-center gap-4">
        <CyanButton variant="outline" size="sm" @click="scrollTo('newsletter')">
          Join Beta
        </CyanButton>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="md:hidden p-2 text-[#8892a4] hover:text-[#f0f6ff] transition-colors"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        @click="mobileOpen = !mobileOpen"
      >
        <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="menu">
      <div
        v-if="mobileOpen"
        class="md:hidden bg-[rgba(10,14,26,0.98)] backdrop-blur-xl border-b border-[rgba(0,217,255,0.08)] px-6 pb-6 pt-2 flex flex-col gap-4"
      >
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm text-[#8892a4] hover:text-[#f0f6ff] transition-colors py-2"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </a>
        <CyanButton variant="outline" size="sm" @click="scrollTo('newsletter'); mobileOpen = false">
          Join Beta
        </CyanButton>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const { scrollTo } = useScrollTo()
const { y } = useWindowScroll()

const scrolled = computed(() => y.value > 20)
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Pricing', href: '#pricing' },
]
</script>
