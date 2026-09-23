<script setup lang="ts">
const route = useRoute()
const csrf = useState<string>('panel-csrf', () => '')

const links = [
  { to: '/panel', label: 'Overview', icon: '⌂' },
  { to: '/panel/newsletter', label: 'Newsletter', icon: '✉' },
  { to: '/panel/users', label: 'App users', icon: '◎' },
]

function isActive(path: string) {
  return path === '/panel' ? route.path === path : route.path.startsWith(path)
}

async function logout() {
  await $fetch('/api/panel/logout', { method: 'POST', headers: { 'x-csrf-token': csrf.value } })
  csrf.value = ''
  await navigateTo('/panel/login')
}
</script>

<template>
  <div class="panel-shell min-h-screen bg-[#0a0e1a] text-[#f0f6ff]">
    <header class="sticky top-0 z-40 border-b border-white/10 bg-[rgba(10,14,26,.92)] backdrop-blur-xl">
      <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div class="flex items-center gap-3">
          <img src="/logo-white.webp" alt="Denalify" class="h-7 w-auto">
          <span class="text-white/20">/</span>
          <span class="text-sm text-[#8892a4]">Admin</span>
        </div>
        <button class="rounded-lg px-3 py-2 text-sm text-[#8892a4] transition hover:bg-white/5 hover:text-white" @click="logout">Sign out</button>
      </div>
    </header>

    <div class="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[210px_1fr] lg:py-8">
      <nav class="flex gap-2 overflow-x-auto lg:flex-col" aria-label="Admin panel">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition"
          :class="isActive(link.to) ? 'bg-[#246fda] text-white' : 'text-[#9aa7ba] hover:bg-white/5 hover:text-white'"
        >
          <span aria-hidden="true">{{ link.icon }}</span>{{ link.label }}
        </NuxtLink>
      </nav>
      <main class="min-w-0"><slot /></main>
    </div>
  </div>
</template>

<style>
.panel-shell .glass-card { border: 1px solid rgba(255,255,255,.09); border-radius: 16px; background: rgba(255,255,255,.035); }
.panel-shell input, .panel-shell textarea, .panel-shell select { color-scheme: dark; }
</style>
