<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="site-footer"><div class="section-shell">
    <div class="footer-top"><div class="footer-brand"><NuxtLink :to="localePath('/')" :aria-label="t('nav.home')"><img src="/logo-white.webp" alt="Denalify" width="158" height="44"></NuxtLink><p>{{ t('footer.tagline') }}</p></div><div class="footer-links">
      <div><h2>{{ t('footer.explore') }}</h2><NuxtLink :to="`${localePath('/')}#product`">{{ t('nav.product') }}</NuxtLink><NuxtLink :to="localePath('/task-management')">{{ t('footer.teamTasks') }}</NuxtLink><NuxtLink :to="localePath('/kanban-boards')">{{ t('nav.boards') }}</NuxtLink><NuxtLink :to="`${localePath('/')}#pricing`">{{ t('common.getStarted') }}</NuxtLink></div>
      <div><h2>{{ t('footer.help') }}</h2><NuxtLink to="/support">{{ t('footer.support') }}</NuxtLink><a href="mailto:contact@denalify.com">{{ t('footer.contact') }}</a><a href="https://app.denalify.com/auth/signin">{{ t('nav.login') }}</a></div>
      <div><h2>{{ t('footer.legal') }}</h2><NuxtLink to="/privacy">{{ t('footer.privacy') }}</NuxtLink><NuxtLink to="/cookies">{{ t('footer.cookies') }}</NuxtLink><NuxtLink to="/terms">{{ t('footer.terms') }}</NuxtLink><NuxtLink to="/acceptable-use">{{ t('footer.acceptableUse') }}</NuxtLink></div>
    </div></div>
    <div class="footer-bottom"><span>© {{ new Date().getFullYear() }} Denalify · Patryk Dąbrowski</span><span>{{ t('footer.built') }}</span></div>
  </div></footer>
</template>
