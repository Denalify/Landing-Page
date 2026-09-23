# Denalify landing page

Nuxt 4 site for Denalify. The public pages are `/`, `/privacy`, `/cookies`, `/terms`, `/acceptable-use`, `/support`, and `/unsubscribe`. The protected panel at `/panel` includes newsletter campaigns, subscribers, reusable Tiptap templates and a read-only app-user list.

## Run locally

```bash
npm ci
npm run dev
```

`npm run build` checks the production bundle; `npm run typecheck` and `npm run check:newsletter` cover types and the safe email renderer.

## Environment

- `DATABASE_URL` — PostgreSQL database for newsletter tables (created lazily).
- `APP_DATABASE_URL` — optional read-only PostgreSQL connection to the application database. If omitted, `DATABASE_URL` is checked for the `users` table.
- `ADMIN_USERNAME`, `ADMIN_PASSWORD` — panel credentials. The password must contain at least 12 characters.
- `SESSION_SECRET` — random secret of at least 32 characters.
- `ADMIN_TOTP_SECRET` — optional Base32 secret enabling authenticator-app 2FA for the panel.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USERNAME`, `SMTP_PASSWORD` — newsletter SMTP connection.
- `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME` — verified newsletter sender.
- `NEWSLETTER_TEST_EMAIL` — fixed test recipient; defaults to `patrydab4@gmail.com`.
- `NUXT_PUBLIC_SITE_URL` — public origin used in unsubscribe links; defaults to `https://denalify.com`.

Do not commit credentials. Use a read-only database role for `APP_DATABASE_URL`.

Technical SEO is provided by `@nuxtjs/seo`: canonical URLs use `https://denalify.com`, the product schema points to `https://app.denalify.com`, and the module generates `/robots.txt`, `/sitemap.xml`, Schema.org JSON-LD and page-specific Open Graph images. `/llms.txt` provides a concise machine-readable product summary. On rolling or multi-instance deployments, set one stable `NUXT_OG_IMAGE_SECRET` for every instance.

## Launch checklist

- Legal pages identify Patryk Dąbrowski as the individual operator at Młyńska 5/1, 88-100 Inowrocław, Poland, with `contact@denalify.com` and +48 500 408 357. Confirm that these channels are monitored. Have the paid checkout and withdrawal flow reviewed against consumer law.
- Privacy notice identifies Hetzner VPS hosting, a separate Hetzner VPS running Mailcow for email and Stripe for payments. Confirm the actual database and file-storage providers, transfer locations and concrete retention periods before representing those details more specifically.
- Review and remove legacy waitlist IP/country data if no longer needed. New signups store email, consent, source (if supplied), subscription state and timestamps; rate limiting stores only a one-way network fingerprint.
- Verify the SMTP sender domain (SPF, DKIM and DMARC) and send a test campaign to `patrydab4@gmail.com` before the first production campaign.
- The landing page currently has no optional analytics or marketing cookies. If those are introduced, add a consent mechanism before loading them and update `/cookies`.
- Confirm the free-plan details against the backend plan configuration before changing limits or pricing on the page.
- After launch, submit `https://denalify.com/sitemap.xml` in Google Search Console and validate the public URL with Google Rich Results Test and social-sharing debuggers.

The interactive hero is an illustrative product preview; the separate board image is an existing screenshot from this repository. Animations respect reduced-motion preferences.
