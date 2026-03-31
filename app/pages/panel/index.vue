<template>
  <div class="min-h-screen bg-[#0a0e1a]">
    <!-- Topbar -->
    <header class="sticky top-0 z-40 bg-[rgba(10,14,26,0.92)] backdrop-blur-xl border-b border-[rgba(0,217,255,0.08)]">
      <div class="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <img src="/logo-white.webp" alt="Denalify" class="h-7 w-auto" />
          <span class="text-[#8892a4] text-xs">|</span>
          <span class="text-[#8892a4] text-sm">Waitlist Panel</span>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse" />
            <span class="text-[#8892a4] text-xs">Live</span>
          </div>
          <button
            class="text-sm text-[#8892a4] hover:text-[#f0f6ff] transition-colors flex items-center gap-1.5"
            @click="handleLogout"
          >
            <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Loading state -->
      <div v-if="pending" class="flex items-center justify-center py-32">
        <div class="w-8 h-8 border-2 border-[#00d9ff] border-t-transparent rounded-full animate-spin" />
      </div>

      <template v-else-if="stats">
        <!-- KPI cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            v-for="kpi in kpiCards"
            :key="kpi.label"
            class="glass-card p-5"
          >
            <p class="text-[#8892a4] text-xs font-medium uppercase tracking-wider mb-2">{{ kpi.label }}</p>
            <p class="text-3xl font-bold" :class="kpi.color">{{ kpi.value.toLocaleString() }}</p>
            <p class="text-[#8892a4] text-xs mt-1">{{ kpi.sub }}</p>
          </div>
        </div>

        <!-- Chart + Countries row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <!-- Signups chart -->
          <div class="lg:col-span-2 glass-card p-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h2 class="text-[#f0f6ff] font-semibold">Signups over time</h2>
                <p class="text-[#8892a4] text-xs mt-0.5">Last 30 days</p>
              </div>
              <span class="text-[#00d9ff] text-sm font-semibold">{{ stats.kpi.total.toLocaleString() }} total</span>
            </div>

            <!-- SVG Chart -->
            <div class="relative">
              <svg viewBox="0 0 400 100" class="w-full h-28" preserveAspectRatio="none">
                <!-- Grid lines -->
                <line v-for="y in [20, 40, 60, 80]" :key="y" :y1="y" :y2="y" x1="0" x2="400" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/>
                <!-- Area fill -->
                <path :d="areaPath" fill="url(#chartGrad)" opacity="0.6"/>
                <!-- Line -->
                <path :d="linePath" fill="none" stroke="#00d9ff" stroke-width="1.5" stroke-linejoin="round"/>
                <!-- Gradient -->
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#00d9ff" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#00d9ff" stop-opacity="0"/>
                  </linearGradient>
                </defs>
              </svg>
              <!-- X-axis labels -->
              <div class="flex justify-between mt-1">
                <span class="text-[#8892a4] text-[10px]">{{ stats.dailySignups[0]?.date.slice(5) }}</span>
                <span class="text-[#8892a4] text-[10px]">{{ stats.dailySignups[14]?.date.slice(5) }}</span>
                <span class="text-[#8892a4] text-[10px]">{{ stats.dailySignups[29]?.date.slice(5) }}</span>
              </div>
            </div>
          </div>

          <!-- Countries -->
          <div class="glass-card p-6">
            <h2 class="text-[#f0f6ff] font-semibold mb-1">Top Countries</h2>
            <p class="text-[#8892a4] text-xs mb-5">By signup count</p>
            <div class="flex flex-col gap-3 overflow-y-auto max-h-48">
              <div
                v-for="c in stats.byCountry.slice(0, 10)"
                :key="c.country"
                class="flex items-center gap-3"
              >
                <span class="text-xl leading-none shrink-0">{{ countryFlag(c.country) }}</span>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-[#c8d3e0] font-medium">{{ c.country }}</span>
                    <span class="text-[#8892a4]">{{ c.count }}</span>
                  </div>
                  <div class="h-1.5 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                    <div
                      class="h-full rounded-full bg-gradient-to-r from-[#00d9ff] to-[#3b82f6] transition-all duration-500"
                      :style="{ width: `${(c.count / stats.byCountry[0].count) * 100}%` }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subscribers table -->
        <div class="glass-card overflow-hidden">
          <div class="px-6 py-4 border-b border-[rgba(0,217,255,0.08)] flex items-center justify-between">
            <div>
              <h2 class="text-[#f0f6ff] font-semibold">All Subscribers</h2>
              <p class="text-[#8892a4] text-xs mt-0.5">{{ stats.pagination.total.toLocaleString() }} total — page {{ stats.pagination.page }} of {{ stats.pagination.totalPages }}</p>
            </div>
            <!-- Search/Export placeholder -->
            <div class="flex items-center gap-3">
              <input
                v-model="search"
                type="search"
                placeholder="Search email…"
                class="bg-[rgba(255,255,255,0.05)] border border-[rgba(0,217,255,0.15)] rounded-lg px-3 py-1.5 text-xs text-[#f0f6ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(0,217,255,0.4)] w-44 transition-all"
              />
              <button
                class="text-xs text-[#00d9ff] hover:underline whitespace-nowrap"
                @click="exportCsv"
              >
                Export CSV
              </button>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-[rgba(255,255,255,0.06)]">
                  <th class="text-left px-6 py-3 text-[#8892a4] text-xs font-medium uppercase tracking-wider">#</th>
                  <th class="text-left px-6 py-3 text-[#8892a4] text-xs font-medium uppercase tracking-wider">Email</th>
                  <th class="text-left px-6 py-3 text-[#8892a4] text-xs font-medium uppercase tracking-wider">Country</th>
                  <th class="text-left px-6 py-3 text-[#8892a4] text-xs font-medium uppercase tracking-wider">IP Address</th>
                  <th class="text-left px-6 py-3 text-[#8892a4] text-xs font-medium uppercase tracking-wider">Signed Up</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="sub in filteredSubscribers"
                  :key="sub.id"
                  class="border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <td class="px-6 py-3 text-[#8892a4] text-xs">{{ sub.id }}</td>
                  <td class="px-6 py-3 text-[#f0f6ff] font-medium">{{ sub.email }}</td>
                  <td class="px-6 py-3">
                    <span v-if="sub.country" class="flex items-center gap-2">
                      <span class="text-base leading-none">{{ countryFlag(sub.country) }}</span>
                      <span class="text-[#c8d3e0] text-xs">{{ sub.country }}</span>
                    </span>
                    <span v-else class="text-[#8892a4] text-xs">—</span>
                  </td>
                  <td class="px-6 py-3 text-[#8892a4] text-xs font-mono">{{ sub.ip ?? '—' }}</td>
                  <td class="px-6 py-3 text-[#8892a4] text-xs">{{ formatDate(sub.created_at) }}</td>
                </tr>
                <tr v-if="filteredSubscribers.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-[#8892a4] text-sm">No subscribers found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="stats.pagination.totalPages > 1" class="px-6 py-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
            <button
              :disabled="currentPage === 1"
              class="text-xs text-[#00d9ff] disabled:text-[#8892a4] disabled:cursor-not-allowed hover:underline"
              @click="currentPage--"
            >
              ← Previous
            </button>
            <span class="text-[#8892a4] text-xs">{{ currentPage }} / {{ stats.pagination.totalPages }}</span>
            <button
              :disabled="currentPage >= stats.pagination.totalPages"
              class="text-xs text-[#00d9ff] disabled:text-[#8892a4] disabled:cursor-not-allowed hover:underline"
              @click="currentPage++"
            >
              Next →
            </button>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'panel-auth',
})

const currentPage = ref(1)
const search = ref('')

const { data: stats, pending, refresh } = await useFetch('/api/panel/stats', {
  query: computed(() => ({ page: currentPage.value })),
  watch: [currentPage],
})

// Auto-refresh every 60s
onMounted(() => {
  const timer = setInterval(refresh, 60_000)
  onUnmounted(() => clearInterval(timer))
})

// KPI cards config
const kpiCards = computed(() => {
  if (!stats.value) return []
  const { kpi } = stats.value
  return [
    { label: 'Total signups', value: kpi.total, color: 'text-gradient-cyan', sub: 'all time' },
    { label: 'Today', value: kpi.today, color: 'text-[#f0f6ff]', sub: 'since midnight' },
    { label: 'This week', value: kpi.thisWeek, color: 'text-[#f0f6ff]', sub: 'since Monday' },
    { label: 'This month', value: kpi.thisMonth, color: 'text-[#f0f6ff]', sub: new Date().toLocaleString('en', { month: 'long' }) },
  ]
})

// SVG chart paths
const linePath = computed(() => {
  if (!stats.value?.dailySignups?.length) return ''
  const data = stats.value.dailySignups
  const max = Math.max(...data.map(d => d.count), 1)
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 400
    const y = 90 - (d.count / max) * 80
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return `M ${pts.join(' L ')}`
})

const areaPath = computed(() => {
  if (!stats.value?.dailySignups?.length) return ''
  const data = stats.value.dailySignups
  const max = Math.max(...data.map(d => d.count), 1)
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 400
    const y = 90 - (d.count / max) * 80
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  return `M 0,100 L ${pts.join(' L ')} L 400,100 Z`
})

// Country flag emoji
function countryFlag(code: string): string {
  if (!code || code === 'Unknown') return '🌍'
  return code.toUpperCase().replace(/./g, c =>
    String.fromCodePoint(c.charCodeAt(0) + 127397)
  )
}

// Format date
function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// Client-side search filter
const filteredSubscribers = computed(() => {
  if (!stats.value?.subscribers) return []
  const q = search.value.toLowerCase().trim()
  if (!q) return stats.value.subscribers
  return stats.value.subscribers.filter(s => s.email.toLowerCase().includes(q))
})

// Export CSV
function exportCsv() {
  if (!stats.value?.subscribers) return
  const rows = [
    ['ID', 'Email', 'Country', 'IP', 'Signed Up'],
    ...stats.value.subscribers.map(s => [
      String(s.id), s.email, s.country ?? '', s.ip ?? '', formatDate(s.created_at),
    ]),
  ]
  const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `waitlist-page${currentPage.value}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// Logout
async function handleLogout() {
  await $fetch('/api/panel/logout', { method: 'POST' })
  await navigateTo('/panel/login')
}
</script>
