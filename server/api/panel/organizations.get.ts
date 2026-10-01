import { requirePanelAuth } from '../../utils/auth'
import { useAppDb } from '../../utils/db'

const PLAN_ORDER = ['free', 'startup', 'pro', 'team']

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event)
  const sql = useAppDb()
  const [ready] = await sql<{ ready: boolean }[]>`
    SELECT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = 'organizations' AND column_name = 'granted_plan'
    ) AS ready
  `
  if (!ready?.ready) return { configured: false, organizations: [], pagination: { page: 1, total: 0, totalPages: 0 } }

  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const perPage = 50
  const offset = (page - 1) * perPage
  const search = typeof query.search === 'string' ? query.search.trim().slice(0, 100) : ''
  const pattern = `%${search}%`

  const [rows, count] = await Promise.all([
    sql<{
      id: string
      name: string
      slug: string
      subscription_status: string | null
      trial_ends_at: Date | null
      granted_plan: string | null
      granted_plan_until: Date | null
      created_at: Date
      member_count: string
      owner_email: string | null
      paddle_status: string | null
    }[]>`
      SELECT o.id, o.name, o.slug, o.subscription_status, o.trial_ends_at, o.granted_plan, o.granted_plan_until, o.created_at,
        (SELECT COUNT(*)::TEXT FROM organization_members m WHERE m.organization_id = o.id) AS member_count,
        (SELECT u.email FROM organization_members m
          JOIN roles r ON r.id = m.role_id
          JOIN users u ON u.id = m.user_id
          WHERE m.organization_id = o.id AND r.name = 'owner'
          ORDER BY m.joined_at LIMIT 1) AS owner_email,
        (SELECT s.paddle_status FROM subscriptions s WHERE s.organization_id = o.id ORDER BY s.id DESC LIMIT 1) AS paddle_status
      FROM organizations o
      WHERE o.deleted_at IS NULL
        AND (${search} = '' OR o.name ILIKE ${pattern} OR o.slug ILIKE ${pattern})
      ORDER BY o.created_at DESC
      LIMIT ${perPage} OFFSET ${offset}
    `,
    sql<{ count: string }[]>`
      SELECT COUNT(*)::TEXT AS count FROM organizations o
      WHERE o.deleted_at IS NULL
        AND (${search} = '' OR o.name ILIKE ${pattern} OR o.slug ILIKE ${pattern})
    `,
  ])

  const now = Date.now()
  const organizations = rows.map((row) => {
    const onTrial = row.subscription_status === 'trialing' && !!row.trial_ends_at && row.trial_ends_at.getTime() > now
    const ownPlan = onTrial ? 'pro' : PLAN_ORDER.includes(row.subscription_status ?? '') ? row.subscription_status! : 'free'
    const grantActive = PLAN_ORDER.indexOf(row.granted_plan ?? '') > 0 && (!row.granted_plan_until || row.granted_plan_until.getTime() > now)
    const granted = grantActive && PLAN_ORDER.indexOf(row.granted_plan!) > PLAN_ORDER.indexOf(ownPlan)
    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      owner_email: row.owner_email,
      member_count: row.member_count,
      created_at: row.created_at,
      plan: granted ? row.granted_plan! : ownPlan,
      plan_source: granted ? 'granted' : onTrial ? 'trial' : ownPlan === 'free' ? 'free' : 'paid',
      paddle_status: row.paddle_status,
      granted_plan: row.granted_plan,
      granted_plan_until: row.granted_plan_until,
      grant_active: grantActive,
    }
  })
  const total = Number(count[0]?.count || 0)
  return { configured: true, organizations, pagination: { page, perPage, total, totalPages: Math.ceil(total / perPage) } }
})
