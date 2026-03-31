import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@vueuse/nuxt'],

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark'
  },

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'Denalify — Project Management for Modern Teams',
      meta: [
        { name: 'description', content: 'Kanban boards, team dashboards, real-time analytics, and powerful integrations. Join the Denalify closed beta.' },
        { name: 'theme-color', content: '#0a0e1a' },
        { property: 'og:title', content: 'Denalify — Project Management for Modern Teams' },
        { property: 'og:description', content: 'The project management platform your team actually wants to use.' },
        { property: 'og:image', content: '/ss/dashboard-modern.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL ?? '',
    adminUsername: process.env.ADMIN_USERNAME ?? 'admin',
    adminPassword: process.env.ADMIN_PASSWORD ?? '',
    sessionSecret: process.env.SESSION_SECRET ?? '',
  },
})
