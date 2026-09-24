<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const route = useRoute()
const open = ref(false)
const links = computed(() => [
  { label: t('nav.product'), href: `${localePath('/')}#product` },
  { label: t('nav.tasks'), href: localePath('/task-management') },
  { label: t('nav.boards'), href: localePath('/kanban-boards') },
  { label: t('nav.pricing'), href: `${localePath('/')}#pricing` },
])
function changeLanguage(event: Event) {
  const code = (event.target as HTMLSelectElement).value as 'en' | 'pl' | 'es' | 'fr' | 'de' | 'pt'
  router.push(switchLocalePath(code) || localePath('/', code))
}
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <header class="site-header"><div class="section-shell nav-inner">
    <NuxtLink :to="localePath('/')" :aria-label="t('nav.home')" class="brand"><img src="/logo-white.webp" alt="Denalify" width="158" height="44"></NuxtLink>
    <nav class="desktop-nav" :aria-label="t('nav.main')"><NuxtLink v-for="link in links" :key="link.href" :to="link.href">{{ link.label }}</NuxtLink></nav>
    <div class="nav-actions">
      <label class="language-picker"><span class="sr-only">{{ t('nav.language') }}</span><select :value="locale" :aria-label="t('nav.language')" @change="changeLanguage"><option v-for="item in locales" :key="item.code" :value="item.code">{{ item.name }}</option></select></label>
      <a class="login-link" href="https://app.denalify.com/auth/signin">{{ t('nav.login') }}</a>
      <a class="button button-dark nav-cta" href="https://app.denalify.com/auth/signup">{{ t('common.getStarted') }} <span aria-hidden="true">↗</span></a>
    </div>
    <button class="menu-toggle" type="button" :aria-expanded="open" aria-controls="mobile-nav" :aria-label="t(open ? 'nav.closeMenu' : 'nav.openMenu')" @click="open = !open"><span></span><span></span></button>
  </div><nav v-if="open" id="mobile-nav" class="mobile-nav" :aria-label="t('nav.mobile')">
    <NuxtLink v-for="link in links" :key="link.href" :to="link.href" @click="open = false">{{ link.label }}</NuxtLink>
    <label class="language-picker mobile-language-picker"><span>{{ t('nav.language') }}</span><select :value="locale" @change="changeLanguage"><option v-for="item in locales" :key="item.code" :value="item.code">{{ item.name }}</option></select></label>
    <a href="https://app.denalify.com/auth/signin">{{ t('nav.login') }}</a><a href="https://app.denalify.com/auth/signup">{{ t('common.getStarted') }} ↗</a>
  </nav></header>
</template>
