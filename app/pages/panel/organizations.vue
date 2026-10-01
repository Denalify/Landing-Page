<script setup lang="ts">
definePageMeta({ layout: 'panel', middleware: 'panel-auth', i18n: false })

type Organization = {
  id: string
  name: string
  slug: string
  owner_email: string | null
  member_count: string
  created_at: string
  plan: string
  plan_source: 'free' | 'paid' | 'trial' | 'granted'
  paddle_status: string | null
  granted_plan: string | null
  granted_plan_until: string | null
  grant_active: boolean
}
type OrganizationData = {
  configured: boolean
  organizations: Organization[]
  pagination: { page: number; total: number; totalPages: number }
}

const PLAN_NAMES: Record<string, string> = { free: 'Free', startup: 'Starter', pro: 'Pro', team: 'Team' }
const SOURCE_NAMES = { free: '', paid: 'Paid', trial: 'Trial', granted: 'Granted' }

const csrf = useState<string>('panel-csrf', () => '')
const page = ref(1)
const search = ref('')
const appliedSearch = ref('')
const drafts = reactive<Record<string, { planId: string; until: string }>>({})
const saving = ref('')
const message = ref('')
const failure = ref('')

const { data, pending, error, refresh } = await useFetch<OrganizationData>('/api/panel/organizations', {
  query: computed(() => ({ page: page.value, search: appliedSearch.value })),
  watch: [page, appliedSearch],
})

watch(data, (value) => {
  for (const organization of value?.organizations ?? []) {
    drafts[organization.id] = { planId: organization.granted_plan ?? '', until: organization.granted_plan_until?.slice(0, 10) ?? '' }
  }
}, { immediate: true })

function findOrganizations() {
  page.value = 1
  appliedSearch.value = search.value.trim()
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString('en-GB', { dateStyle: 'medium' }) : ''
}

function changed(organization: Organization) {
  const draft = drafts[organization.id]
  return !!draft && (draft.planId !== (organization.granted_plan ?? '') || (draft.planId ? draft.until : '') !== (organization.granted_plan_until?.slice(0, 10) ?? ''))
}

async function save(organization: Organization) {
  const draft = drafts[organization.id]
  if (!draft) return
  saving.value = organization.id
  message.value = ''
  failure.value = ''
  try {
    await $fetch(`/api/panel/organizations/${organization.id}/plan`, {
      method: 'POST',
      headers: { 'x-csrf-token': csrf.value },
      body: { planId: draft.planId || null, until: draft.until || null },
    })
    message.value = draft.planId
      ? `${organization.name} now has ${PLAN_NAMES[draft.planId]} ${draft.until ? `until ${formatDate(draft.until)}` : 'with no expiry'}.`
      : `The granted plan was removed from ${organization.name}.`
    await refresh()
  } catch (cause: any) {
    failure.value = cause?.data?.statusMessage || cause?.statusMessage || 'The plan could not be changed.'
  } finally {
    saving.value = ''
  }
}
</script>

<template>
  <section>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[.18em] text-[#4b9bfa]">Application</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight">Organizations</h1>
        <p class="mt-2 max-w-2xl text-sm text-[#8892a4]">Every workspace with its current plan. A granted plan is free for the organization, is not touched by Paddle and applies whenever it is higher than the plan the organization pays for.</p>
      </div>
      <form class="flex gap-2" @submit.prevent="findOrganizations">
        <input v-model="search" type="search" class="rounded-xl border border-white/10 bg-[#111620] px-4 py-2.5 text-sm outline-none focus:border-[#4b9bfa]" placeholder="Name or slug">
        <button class="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/15">Search</button>
      </form>
    </div>

    <p v-if="message" class="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200" role="status">{{ message }}</p>
    <p v-if="failure" class="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300" role="alert">{{ failure }}</p>

    <div v-if="pending && !data" class="grid place-items-center py-28"><span class="h-8 w-8 animate-spin rounded-full border-2 border-[#4b9bfa] border-t-transparent" /></div>
    <div v-else-if="error" class="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-300">Could not load organizations. Check the read-only app database connection.</div>
    <div v-else-if="data && !data.configured" class="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 text-sm leading-relaxed text-amber-200">The application database does not have granted plans yet. Deploy the current backend so its migrations run, and set <code>APP_DATABASE_URL</code> to the application database.</div>
    <div v-else class="mt-6 glass-card overflow-hidden">
      <div class="flex items-center justify-between border-b border-white/10 px-5 py-4"><h2 class="font-semibold">All organizations</h2><span class="text-sm text-[#8892a4]">{{ data?.pagination.total.toLocaleString() }} total</span></div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[1040px] text-left text-sm">
          <thead class="text-xs uppercase tracking-wider text-[#77859a]"><tr><th class="px-5 py-3">Organization</th><th class="px-5 py-3">Members</th><th class="px-5 py-3">Current plan</th><th class="px-5 py-3">Created</th><th class="px-5 py-3">Granted plan</th></tr></thead>
          <tbody>
            <tr v-for="organization in data?.organizations" :key="organization.id" class="border-t border-white/[.06] align-top">
              <td class="px-5 py-4"><strong class="block">{{ organization.name }}</strong><span class="mt-1 block text-xs text-[#8892a4]">{{ organization.slug }}<template v-if="organization.owner_email"> · {{ organization.owner_email }}</template></span></td>
              <td class="px-5 py-4 text-[#aeb9c8]">{{ organization.member_count }}</td>
              <td class="px-5 py-4">
                <span class="rounded-full px-2.5 py-1 text-xs" :class="organization.plan === 'free' ? 'bg-white/5 text-[#aeb9c8]' : 'bg-[#246fda]/15 text-[#9dcbff]'">{{ PLAN_NAMES[organization.plan] }}<template v-if="SOURCE_NAMES[organization.plan_source]"> · {{ SOURCE_NAMES[organization.plan_source] }}</template></span>
                <span v-if="organization.paddle_status" class="mt-2 block text-xs text-[#8892a4]">Paddle: {{ organization.paddle_status }}</span>
                <span v-if="organization.granted_plan && !organization.grant_active" class="mt-2 block text-xs text-amber-200">Grant expired {{ formatDate(organization.granted_plan_until) }}</span>
              </td>
              <td class="px-5 py-4 text-xs text-[#8892a4]">{{ formatDate(organization.created_at) }}</td>
              <td class="px-5 py-4">
                <form v-if="drafts[organization.id]" class="flex flex-wrap items-center gap-2" @submit.prevent="save(organization)">
                  <select v-model="drafts[organization.id]!.planId" class="rounded-lg border border-white/10 bg-[#111620] px-3 py-2 text-sm" :aria-label="`Granted plan for ${organization.name}`">
                    <option value="">None</option>
                    <option value="startup">Starter</option>
                    <option value="pro">Pro</option>
                    <option value="team">Team</option>
                  </select>
                  <input v-model="drafts[organization.id]!.until" type="date" class="rounded-lg border border-white/10 bg-[#111620] px-3 py-2 text-sm disabled:opacity-30" :disabled="!drafts[organization.id]!.planId" :aria-label="`Expiry date for ${organization.name}, empty for no expiry`">
                  <button class="rounded-lg bg-[#246fda] px-3 py-2 text-sm font-semibold disabled:opacity-30" :disabled="!changed(organization) || saving === organization.id">{{ saving === organization.id ? 'Saving…' : 'Save' }}</button>
                </form>
                <span class="mt-2 block text-xs text-[#8892a4]">Leave the date empty for no expiry.</span>
              </td>
            </tr>
            <tr v-if="!data?.organizations.length"><td colspan="5" class="px-5 py-12 text-center text-[#8892a4]">No organizations found.</td></tr>
          </tbody>
        </table>
      </div>
      <div v-if="(data?.pagination.totalPages || 0) > 1" class="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm"><button :disabled="page <= 1" class="disabled:opacity-30" @click="page--">← Previous</button><span class="text-[#8892a4]">{{ page }} / {{ data?.pagination.totalPages }}</span><button :disabled="page >= (data?.pagination.totalPages || 1)" class="disabled:opacity-30" @click="page++">Next →</button></div>
    </div>
  </section>
</template>
