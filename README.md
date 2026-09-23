# Denalify landing page

Nuxt 4 site for Denalify. The public pages are `/`, `/privacy`, `/cookies`, `/terms`, `/acceptable-use`, and `/support`. The former waitlist administration panel remains at `/panel` for historical records; the landing page now sends visitors directly to app signup.

## Run locally

```bash
npm ci
npm run dev
```

`npm run build` checks the production bundle. The former waitlist panel needs `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `SESSION_SECRET`. Do not commit credentials.

Technical SEO is provided by `@nuxtjs/seo`: canonical URLs use `https://denalify.com`, the product schema points to `https://app.denalify.com`, and the module generates `/robots.txt`, `/sitemap.xml`, Schema.org JSON-LD and page-specific Open Graph images. `/llms.txt` provides a concise machine-readable product summary. On rolling or multi-instance deployments, set one stable `NUXT_OG_IMAGE_SECRET` for every instance.

## Launch checklist

- Legal pages identify Patryk Dąbrowski as the individual operator at Młyńska 5/1, 88-100 Inowrocław, Poland, with `contact@denalify.com` and +48 500 408 357. Confirm that these channels are monitored. Have the paid checkout and withdrawal flow reviewed against consumer law.
- Privacy notice identifies Hetzner VPS hosting, a separate Hetzner VPS running Mailcow for email and Stripe for payments. Confirm the actual database and file-storage providers, transfer locations and concrete retention periods before representing those details more specifically.
- Complete the launch communication to former waitlist subscribers, then delete the records unless another legal duty requires retention. Review and remove legacy IP/country data.
- The landing page currently has no optional analytics or marketing cookies. If those are introduced, add a consent mechanism before loading them and update `/cookies`.
- Confirm the free-plan details against the backend plan configuration before changing limits or pricing on the page.
- After launch, submit `https://denalify.com/sitemap.xml` in Google Search Console and validate the public URL with Google Rich Results Test and social-sharing debuggers.

The interactive hero is an illustrative product preview; the separate board image is an existing screenshot from this repository. Animations respect reduced-motion preferences.
