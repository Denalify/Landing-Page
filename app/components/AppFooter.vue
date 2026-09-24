<script setup lang="ts">
const { t, locale, locales, setLocaleCookie } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

async function changeLanguage(event: Event) {
  const code = (event.target as HTMLSelectElement).value as 'en' | 'pl' | 'es' | 'fr' | 'de' | 'pt'
  setLocaleCookie(code)
  await navigateTo(switchLocalePath(code) || localePath('/', code))
}
</script>

<template>
  <footer class="site-footer"><div class="section-shell">
    <div class="footer-top"><div class="footer-brand"><NuxtLink :to="localePath('/')" :aria-label="t('nav.home')"><img src="/logo-white.webp" alt="Denalify" width="158" height="44"></NuxtLink><p>{{ t('footer.tagline') }}</p></div><div class="footer-links">
      <div><h2>{{ t('footer.explore') }}</h2><NuxtLink :to="`${localePath('/')}#product`">{{ t('nav.product') }}</NuxtLink><NuxtLink :to="localePath('/task-management')">{{ t('footer.teamTasks') }}</NuxtLink><NuxtLink :to="localePath('/kanban-boards')">{{ t('nav.boards') }}</NuxtLink><NuxtLink :to="`${localePath('/')}#pricing`">{{ t('common.getStarted') }}</NuxtLink></div>
      <div><h2>{{ t('footer.help') }}</h2><NuxtLink :to="localePath('/support')">{{ t('footer.support') }}</NuxtLink><a href="mailto:contact@denalify.com">{{ t('footer.contact') }}</a><a href="https://app.denalify.com/auth/signin">{{ t('nav.login') }}</a></div>
      <div><h2>{{ t('footer.legal') }}</h2><NuxtLink to="/privacy">{{ t('footer.privacy') }}</NuxtLink><NuxtLink to="/cookies">{{ t('footer.cookies') }}</NuxtLink><NuxtLink to="/terms">{{ t('footer.terms') }}</NuxtLink><NuxtLink to="/acceptable-use">{{ t('footer.acceptableUse') }}</NuxtLink></div>
    </div></div>
    <div class="footer-bottom">
      <span>© {{ new Date().getFullYear() }} Denalify · Patryk Dąbrowski</span>
      <span>{{ t('footer.built') }}</span>
      <label class="language-picker footer-language-picker"><span>{{ t('nav.language') }}</span><select :value="locale" @change="changeLanguage"><option v-for="item in locales" :key="item.code" :value="item.code">{{ item.name }}</option></select></label>
    </div>
  </div></footer>
</template>
