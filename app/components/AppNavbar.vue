<script setup lang="ts">
const open = ref(false)
const links = [
  { label: 'Product', href: '/#product' },
  { label: 'How it works', href: '/#workflow' },
  { label: 'Community', href: '/#community' },
  { label: 'Pricing', href: '/#pricing' },
]
const route = useRoute()
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="site-header"><div class="section-shell nav-inner">
    <NuxtLink to="/" aria-label="Denalify home" class="brand"><img src="/logo-dark.webp" alt="Denalify" width="158" height="44"></NuxtLink>
    <nav class="desktop-nav" aria-label="Main navigation"><a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a></nav>
    <div class="nav-actions"><a class="login-link" href="https://app.denalify.com/auth/signin">Log in</a><a class="button button-dark nav-cta" href="https://app.denalify.com/auth/signup">Get started <span aria-hidden="true">↗</span></a></div>
    <button class="menu-toggle" type="button" :aria-expanded="open" aria-controls="mobile-nav" :aria-label="open ? 'Close menu' : 'Open menu'" @click="open = !open"><span></span><span></span></button>
  </div><nav v-if="open" id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation"><a v-for="link in links" :key="link.href" :href="link.href" @click="open = false">{{ link.label }}</a><a href="https://app.denalify.com/auth/signin">Log in</a><a href="https://app.denalify.com/auth/signup">Get started ↗</a></nav></header>
</template>
