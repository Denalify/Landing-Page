# Denalify landing page

Nuxt 4 site for Denalify. The public pages are `/`, `/privacy`, `/cookies`, `/terms`, `/acceptable-use`, and `/support`. The existing waitlist administration panel remains at `/panel`.

## Run locally

```bash
npm ci
npm run dev
```

`npm run build` checks the production bundle. The waitlist needs `DATABASE_URL`; the panel also needs `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `SESSION_SECRET`. Do not commit credentials.

## Launch checklist

- Replace the visible legal-draft notices on `/privacy` and `/terms` with the verified operator's registered name, postal address and registration details. Have counsel review the policies, consumer withdrawal information and checkout journey before publication.
- Confirm `contact@denalify.com` is monitored, and document the actual hosting/email/storage/payment providers, international transfers and retention periods in the privacy notice.
- Review and remove legacy waitlist IP/country data if no longer needed. New signups store email, source (if supplied) and signup time only; the external geolocation request has been removed.
- The landing page currently has no optional analytics or marketing cookies. If those are introduced, add a consent mechanism before loading them and update `/cookies`.
- Confirm the free-plan details against the backend plan configuration before changing limits or pricing on the page.

The interactive hero is an illustrative product preview; the separate board image is an existing screenshot from this repository. Animations respect reduced-motion preferences.
