import postgres from 'postgres'

let _sql: ReturnType<typeof postgres> | null = null

export function useDb() {
  if (!_sql) {
    const config = useRuntimeConfig()
    const url = config.databaseUrl

    if (!url) {
      throw new Error('DATABASE_URL is not set in environment variables')
    }

    _sql = postgres(url, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    })
  }

  return _sql
}

export async function ensureWaitlistTable() {
  const sql = useDb()
  await sql`
    CREATE TABLE IF NOT EXISTS waitlist (
      id         SERIAL PRIMARY KEY,
      email      TEXT NOT NULL UNIQUE,
      ip         TEXT,
      country    TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  // Add columns if upgrading from old schema
  await sql`
    ALTER TABLE waitlist
      ADD COLUMN IF NOT EXISTS ip TEXT,
      ADD COLUMN IF NOT EXISTS country TEXT,
      ADD COLUMN IF NOT EXISTS source TEXT
  `
}
