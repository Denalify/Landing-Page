<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const open = ref(false)
const links = computed(() => [
  { label: t('nav.product'), href: `${localePath('/')}#product` },
  { label: t('nav.tasks'), href: localePath('/task-management') },
  { label: t('nav.boards'), href: localePath('/kanban-boards') },
  { label: t('nav.pricing'), href: `${localePath('/')}#pricing` },
])
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="site-header"><div class="section-shell nav-inner">
    <NuxtLink :to="localePath('/')" :aria-label="t('nav.home')" class="brand"><img src="/logo-white.webp" alt="Denalify" width="158" height="44"></NuxtLink>
    <nav class="desktop-nav" :aria-label="t('nav.main')"><NuxtLink v-for="link in links" :key="link.href" :to="link.href">{{ link.label }}</NuxtLink></nav>
    <div class="nav-actions">
      <a class="login-link" href="https://app.denalify.com/auth/signin">{{ t('nav.login') }}</a>
      <a class="button button-dark nav-cta" href="https://app.denalify.com/auth/signup">{{ t('common.getStarted') }} <span aria-hidden="true">↗</span></a>
    </div>
    <button class="menu-toggle" type="button" :aria-expanded="open" aria-controls="mobile-nav" :aria-label="t(open ? 'nav.closeMenu' : 'nav.openMenu')" @click="open = !open"><span></span><span></span></button>
  </div><nav v-if="open" id="mobile-nav" class="mobile-nav" :aria-label="t('nav.mobile')">
    <NuxtLink v-for="link in links" :key="link.href" :to="link.href" @click="open = false">{{ link.label }}</NuxtLink>
    <a href="https://app.denalify.com/auth/signin">{{ t('nav.login') }}</a><a href="https://app.denalify.com/auth/signup">{{ t('common.getStarted') }} ↗</a>
  </nav></header>
</template>
