import { requirePanelAuth } from '../../utils/auth'
import { useAppDb } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event)
  const sql = useAppDb()
  const [exists] = await sql<{ exists: boolean }[]>`SELECT to_regclass('public.users') IS NOT NULL AS exists`
  if (!exists?.exists) return { configured: false, users: [], pagination: { page: 1, total: 0, totalPages: 0 } }

  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const perPage = 50
  const offset = (page - 1) * perPage
  const search = typeof query.search === 'string' ? query.search.trim().slice(0, 100) : ''
  const pattern = `%${search}%`

  const [users, count] = await Promise.all([
    sql<{
      id: string
      full_name: string | null
      email: string
      username: string | null
      is_verified: boolean
      two_factor_enabled: boolean
      is_blocked: boolean
      created_at: string
      last_login_at: string | null
      organization_count: string
    }[]>`
      SELECT u.id, u.full_name, u.email, u.username, u.is_verified, u.two_factor_enabled,
        u.is_blocked, u.created_at, u.last_login_at, COUNT(uo.organization_id)::TEXT AS organization_count
      FROM users u
      LEFT JOIN user_organizations uo ON uo.user_id = u.id
      WHERE u.deleted_at IS NULL
        AND (${search} = '' OR u.email ILIKE ${pattern} OR COALESCE(u.full_name, '') ILIKE ${pattern} OR COALESCE(u.username, '') ILIKE ${pattern})
      GROUP BY u.id
      ORDER BY u.created_at DESC
      LIMIT ${perPage} OFFSET ${offset}
    `,
    sql<{ count: string }[]>`
      SELECT COUNT(*)::TEXT AS count FROM users u
      WHERE u.deleted_at IS NULL
        AND (${search} = '' OR u.email ILIKE ${pattern} OR COALESCE(u.full_name, '') ILIKE ${pattern} OR COALESCE(u.username, '') ILIKE ${pattern})
    `,
  ])
  const total = Number(count[0]?.count || 0)
  return { configured: true, users, pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) } }
})
