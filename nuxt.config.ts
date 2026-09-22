import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/seo'],

  site: {
    url: 'https://denalify.com',
    name: 'Denalify',
    description: 'Advanced project and task management for teams that build with their community.',
    defaultLocale: 'en',
    trailingSlash: false,
  },

  seo: {
    meta: {
      twitterCard: 'summary_large_image',
    },
    canonicalQueryWhitelist: [],
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Denalify',
      url: 'https://denalify.com',
      logo: 'https://denalify.com/favicon.png',
      email: 'contact@denalify.com',
    },
  },

  robots: {
    disallow: ['/panel', '/api/'],
    blockAiBots: false,
    credits: false,
  },

  sitemap: {
    exclude: ['/panel', '/panel/**'],
    zeroRuntime: true,
  },

  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
      extension: 'png',
      alt: 'Denalify — project management for collaborative teams',
      cacheMaxAgeSeconds: 604800,
    },
    security: {
      maxQueryParamSize: 2048,
      restrictRuntimeImagesToOrigin: true,
    },
  },

  routeRules: {
    '/panel': { robots: false },
    '/panel/**': { robots: false },
    '/api/**': { robots: false },
  },

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'Denalify — Make room for better work',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'theme-color', content: '#0f1115' },
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
