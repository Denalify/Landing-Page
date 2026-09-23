import postgres from 'postgres'
import { randomUUID } from 'node:crypto'

type Sql = ReturnType<typeof postgres>

let database: Sql | null = null
let applicationDatabase: Sql | null = null
let schemaPromise: Promise<void> | null = null

export function useDb() {
  if (!database) {
    const url = useRuntimeConfig().databaseUrl
    if (!url) throw new Error('DATABASE_URL is not configured')
    database = postgres(url, { max: 10, idle_timeout: 20, connect_timeout: 10 })
  }
  return database
}

export function useAppDb() {
  if (!applicationDatabase) {
    const config = useRuntimeConfig()
    const url = config.appDatabaseUrl || config.databaseUrl
    if (!url) throw new Error('APP_DATABASE_URL is not configured')
    applicationDatabase = postgres(url, { max: 3, idle_timeout: 20, connect_timeout: 10 })
  }
  return applicationDatabase
}

const templates = [
  {
    name: 'Launch announcement',
    subject: 'Denalify is live — come build with us',
    preview: 'Your early-access invitation is here.',
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1, textAlign: 'left' }, content: [{ type: 'text', text: 'Denalify is live.' }] },
        { type: 'paragraph', attrs: { textAlign: 'left' }, content: [{ type: 'text', text: 'The wait is over. You can now bring projects, tasks, documents and conversations into one clear workspace.' }] },
        { type: 'paragraph', attrs: { textAlign: 'left' }, content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Create your workspace today and help shape what comes next.' }] },
        { type: 'paragraph', attrs: { textAlign: 'left' }, content: [{ type: 'text', marks: [{ type: 'link', attrs: { href: 'https://app.denalify.com/auth/signup' } }], text: 'Start using Denalify →' }] },
      ],
    },
  },
  {
    name: 'Product update',
    subject: 'What’s new in Denalify',
    preview: 'A quick look at the latest improvements.',
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1, textAlign: 'left' }, content: [{ type: 'text', text: 'A better way to move work forward.' }] },
        { type: 'paragraph', attrs: { textAlign: 'left' }, content: [{ type: 'text', text: 'We’ve been improving Denalify. Here are the highlights:' }] },
        { type: 'bulletList', content: [
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Add the first improvement here.' }] }] },
          { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Add the second improvement here.' }] }] },
        ] },
        { type: 'paragraph', attrs: { textAlign: 'left' }, content: [{ type: 'text', text: 'Thanks for building with us.' }] },
      ],
    },
  },
  {
    name: 'Monthly roundup',
    subject: 'This month at Denalify',
    preview: 'Product news, ideas and what we’re building next.',
    content: {
      type: 'doc',
      content: [
        { type: 'heading', attrs: { level: 1, textAlign: 'left' }, content: [{ type: 'text', text: 'This month at Denalify' }] },
        { type: 'heading', attrs: { level: 2, textAlign: 'left' }, content: [{ type: 'text', text: 'What shipped' }] },
        { type: 'paragraph', attrs: { textAlign: 'left' }, content: [{ type: 'text', text: 'Share the most useful product changes.' }] },
        { type: 'heading', attrs: { level: 2, textAlign: 'left' }, content: [{ type: 'text', text: 'What’s next' }] },
        { type: 'paragraph', attrs: { textAlign: 'left' }, content: [{ type: 'text', text: 'Tell readers what the team is working on next.' }] },
      ],
    },
  },
]

async function createNewsletterSchema() {
  const sql = useDb()

  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      ip TEXT,
      country TEXT,
      source TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`
    ALTER TABLE waitlist
      ADD COLUMN IF NOT EXISTS ip TEXT,
      ADD COLUMN IF NOT EXISTS country TEXT,
      ADD COLUMN IF NOT EXISTS source TEXT,
      ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'subscribed',
      ADD COLUMN IF NOT EXISTS consented_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMPTZ,
      ADD COLUMN IF NOT EXISTS unsubscribe_token TEXT,
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  `
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS waitlist_unsubscribe_token_idx ON waitlist (unsubscribe_token)`
  await sql`UPDATE waitlist SET consented_at = COALESCE(consented_at, created_at) WHERE consented_at IS NULL`

  const missingTokens = await sql<{ id: number }[]>`SELECT id FROM waitlist WHERE unsubscribe_token IS NULL`
  await Promise.all(missingTokens.map(({ id }) => sql`UPDATE waitlist SET unsubscribe_token = ${randomUUID()} WHERE id = ${id}`))

  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_templates (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      subject TEXT NOT NULL,
      preview_text TEXT,
      content JSONB NOT NULL,
      is_system BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_campaigns (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      subject TEXT NOT NULL,
      preview_text TEXT,
      content JSONB NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft',
      recipient_count INTEGER NOT NULL DEFAULT 0,
      sent_count INTEGER NOT NULL DEFAULT 0,
      failed_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      sent_at TIMESTAMPTZ
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_deliveries (
      id BIGSERIAL PRIMARY KEY,
      campaign_id INTEGER NOT NULL REFERENCES newsletter_campaigns(id) ON DELETE CASCADE,
      subscriber_id INTEGER NOT NULL REFERENCES waitlist(id) ON DELETE CASCADE,
      status TEXT NOT NULL DEFAULT 'pending',
      error TEXT,
      sent_at TIMESTAMPTZ,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (campaign_id, subscriber_id)
    )
  `
  await sql`CREATE INDEX IF NOT EXISTS newsletter_deliveries_campaign_status_idx ON newsletter_deliveries (campaign_id, status)`
  await sql`
    CREATE TABLE IF NOT EXISTS panel_login_attempts (
      key TEXT PRIMARY KEY,
      attempts INTEGER NOT NULL DEFAULT 0,
      window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      blocked_until TIMESTAMPTZ
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS newsletter_signup_attempts (
      key TEXT PRIMARY KEY,
      attempts INTEGER NOT NULL DEFAULT 0,
      window_started_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  for (const template of templates) {
    await sql`
      INSERT INTO newsletter_templates (name, subject, preview_text, content, is_system)
      VALUES (${template.name}, ${template.subject}, ${template.preview}, ${sql.json(template.content)}, TRUE)
      ON CONFLICT (name) DO NOTHING
    `
  }
}

export function ensureNewsletterTables() {
  schemaPromise ||= createNewsletterSchema().catch((error) => {
    schemaPromise = null
    throw error
  })
  return schemaPromise
}

export const ensureWaitlistTable = ensureNewsletterTables
