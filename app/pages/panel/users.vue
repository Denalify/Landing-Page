<script setup lang="ts">
definePageMeta({ layout: 'panel', middleware: 'panel-auth' })

type UserData = {
  configured: boolean
  users: Array<{
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
  }>
  pagination: { page: number; total: number; totalPages: number }
}

const page = ref(1)
const search = ref('')
const appliedSearch = ref('')
const { data, pending, error } = await useFetch<UserData>('/api/panel/users', {
  query: computed(() => ({ page: page.value, search: appliedSearch.value })),
  watch: [page, appliedSearch],
})

function findUsers() {
  page.value = 1
  appliedSearch.value = search.value.trim()
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : 'Never'
}
</script>

<template>
  <section>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[.18em] text-[#4b9bfa]">Application</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight">Registered users</h1>
        <p class="mt-2 text-sm text-[#8892a4]">A read-only view of active Denalify accounts. App users are not automatically subscribed to marketing.</p>
      </div>
      <form class="flex gap-2" @submit.prevent="findUsers">
        <input v-model="search" type="search" class="rounded-xl border border-white/10 bg-[#111620] px-4 py-2.5 text-sm outline-none focus:border-[#4b9bfa]" placeholder="Name, email or username">
        <button class="rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold hover:bg-white/15">Search</button>
      </form>
    </div>

    <div v-if="pending" class="grid place-items-center py-28"><span class="h-8 w-8 animate-spin rounded-full border-2 border-[#4b9bfa] border-t-transparent" /></div>
    <div v-else-if="error" class="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-300">Could not load application users. Check the read-only app database connection.</div>
    <div v-else-if="data && !data.configured" class="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-5 text-sm leading-relaxed text-amber-200">The users table is not available through this database connection. Set <code>APP_DATABASE_URL</code> to a read-only PostgreSQL connection for the application database.</div>
    <div v-else class="mt-6 glass-card overflow-hidden">
      <div class="flex items-center justify-between border-b border-white/10 px-5 py-4"><h2 class="font-semibold">All users</h2><span class="text-sm text-[#8892a4]">{{ data?.pagination.total.toLocaleString() }} total</span></div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[900px] text-left text-sm">
          <thead class="text-xs uppercase tracking-wider text-[#77859a]"><tr><th class="px-5 py-3">User</th><th class="px-5 py-3">Status</th><th class="px-5 py-3">Security</th><th class="px-5 py-3">Organizations</th><th class="px-5 py-3">Registered</th><th class="px-5 py-3">Last login</th></tr></thead>
          <tbody>
            <tr v-for="user in data?.users" :key="user.id" class="border-t border-white/[.06]">
              <td class="px-5 py-4"><strong class="block">{{ user.full_name || user.username || 'Unnamed user' }}</strong><span class="mt-1 block text-xs text-[#8892a4]">{{ user.email }}</span></td>
              <td class="px-5 py-4"><span v-if="user.is_blocked" class="rounded-full bg-red-500/10 px-2.5 py-1 text-xs text-red-300">Blocked</span><span v-else-if="user.is_verified" class="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">Verified</span><span v-else class="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-200">Unverified</span></td>
              <td class="px-5 py-4 text-[#aeb9c8]">{{ user.two_factor_enabled ? '2FA enabled' : 'Password' }}</td>
              <td class="px-5 py-4 text-[#aeb9c8]">{{ user.organization_count }}</td>
              <td class="px-5 py-4 text-xs text-[#8892a4]">{{ formatDate(user.created_at) }}</td>
              <td class="px-5 py-4 text-xs text-[#8892a4]">{{ formatDate(user.last_login_at) }}</td>
            </tr>
            <tr v-if="!data?.users.length"><td colspan="6" class="px-5 py-12 text-center text-[#8892a4]">No users found.</td></tr>
          </tbody>
        </table>
      </div>
      <div v-if="(data?.pagination.totalPages || 0) > 1" class="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm"><button :disabled="page <= 1" class="disabled:opacity-30" @click="page--">← Previous</button><span class="text-[#8892a4]">{{ page }} / {{ data?.pagination.totalPages }}</span><button :disabled="page >= (data?.pagination.totalPages || 1)" class="disabled:opacity-30" @click="page++">Next →</button></div>
    </div>
  </section>
</template>
