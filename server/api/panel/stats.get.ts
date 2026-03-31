import { requirePanelAuth } from '../../utils/auth'
import { useDb, ensureWaitlistTable } from '../../utils/db'

export default defineEventHandler(async (event) => {
  await requirePanelAuth(event)

  const sql = useDb()
  await ensureWaitlistTable()

  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const perPage = 50
  const offset = (page - 1) * perPage

  const [
    totals,
    dailySignups,
    byCountry,
    bySource,
    rows,
    countResult,
  ] = await Promise.all([
    // KPI counts
    sql<{ total: string; today: string; this_week: string; this_month: string }[]>`
      SELECT
        COUNT(*)                                                             AS total,
        COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE)                  AS today,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('week', NOW()))      AS this_week,
        COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW()))     AS this_month
      FROM waitlist
    `,

    // Daily signups — last 30 days
    sql<{ date: string; count: string }[]>`
      SELECT
        TO_CHAR(gs.day, 'YYYY-MM-DD') AS date,
        COALESCE(w.cnt, 0)::TEXT       AS count
      FROM generate_series(
        (CURRENT_DATE - INTERVAL '29 days'),
        CURRENT_DATE,
        '1 day'::INTERVAL
      ) AS gs(day)
      LEFT JOIN (
        SELECT DATE(created_at) AS d, COUNT(*) AS cnt
        FROM waitlist
        WHERE created_at >= CURRENT_DATE - INTERVAL '29 days'
        GROUP BY DATE(created_at)
      ) w ON w.d = gs.day
      ORDER BY gs.day
    `,

    // By country
    sql<{ country: string; count: string }[]>`
      SELECT
        COALESCE(country, 'Unknown') AS country,
        COUNT(*)::TEXT               AS count
      FROM waitlist
      GROUP BY country
      ORDER BY COUNT(*) DESC
      LIMIT 20
    `,

    // By source
    sql<{ source: string; count: string }[]>`
      SELECT
        COALESCE(source, 'Not specified') AS source,
        COUNT(*)::TEXT                    AS count
      FROM waitlist
      GROUP BY source
      ORDER BY COUNT(*) DESC
    `,

    // Paginated subscriber list
    sql<{ id: number; email: string; country: string | null; ip: string | null; source: string | null; created_at: string }[]>`
      SELECT id, email, country, ip, source, created_at
      FROM waitlist
      ORDER BY created_at DESC
      LIMIT ${perPage} OFFSET ${offset}
    `,

    // Total count for pagination
    sql<{ count: string }[]>`SELECT COUNT(*) AS count FROM waitlist`,
  ])

  const kpi = totals[0]

  return {
    kpi: {
      total: Number(kpi.total),
      today: Number(kpi.today),
      thisWeek: Number(kpi.this_week),
      thisMonth: Number(kpi.this_month),
    },
    dailySignups: dailySignups.map(r => ({ date: r.date, count: Number(r.count) })),
    byCountry: byCountry.map(r => ({ country: r.country, count: Number(r.count) })),
    bySource: bySource.map(r => ({ source: r.source, count: Number(r.count) })),
    subscribers: rows,
    pagination: {
      page,
      perPage,
      total: Number(countResult[0].count),
      totalPages: Math.ceil(Number(countResult[0].count) / perPage),
    },
  }
})
