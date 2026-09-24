import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/seo'],

  site: {
    url: 'https://denalify.com',
    name: 'Denalify',
    description: 'Project management and team task management software with Kanban boards, shared documents and collaboration tools.',
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
      type: 'Person',
      name: 'Patryk Dąbrowski',
      url: 'https://denalify.com',
      email: 'contact@denalify.com',
    },
  },

  robots: {
    disallow: ['/panel', '/api/'],
    blockAiBots: false,
    credits: false,
  },

  sitemap: {
    exclude: ['/panel', '/panel/**', '/unsubscribe'],
    zeroRuntime: true,
  },

  ogImage: {
    defaults: {
      width: 1200,
      height: 630,
      extension: 'png',
      alt: 'Denalify project management and task management software for teams',
      cacheMaxAgeSeconds: 604800,
    },
    security: {
      maxQueryParamSize: 2048,
      restrictRuntimeImagesToOrigin: true,
    },
  },

  routeRules: {
    '/panel': { robots: false, headers: { 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer', 'Cache-Control': 'no-store' } },
    '/panel/**': { robots: false, headers: { 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer', 'Cache-Control': 'no-store' } },
    '/api/panel/**': { robots: false, headers: { 'X-Frame-Options': 'DENY', 'Cache-Control': 'no-store' } },
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
    appDatabaseUrl: process.env.APP_DATABASE_URL ?? '',
    adminUsername: process.env.ADMIN_USERNAME ?? '',
    adminPassword: process.env.ADMIN_PASSWORD ?? '',
    adminTotpSecret: process.env.ADMIN_TOTP_SECRET ?? '',
    sessionSecret: process.env.SESSION_SECRET ?? '',
    smtpHost: process.env.SMTP_HOST ?? '',
    smtpPort: Number(process.env.SMTP_PORT ?? 587),
    smtpSecure: process.env.SMTP_SECURE === 'true',
    smtpUsername: process.env.SMTP_USERNAME ?? '',
    smtpPassword: process.env.SMTP_PASSWORD ?? '',
    mailFromAddress: process.env.MAIL_FROM_ADDRESS ?? '',
    mailFromName: process.env.MAIL_FROM_NAME ?? 'Denalify',
    newsletterTestEmail: process.env.NEWSLETTER_TEST_EMAIL ?? 'patrydab4@gmail.com',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://denalify.com',
    },
  },
})
