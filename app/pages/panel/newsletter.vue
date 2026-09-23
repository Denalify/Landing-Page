<script setup lang="ts">
definePageMeta({ layout: 'panel', middleware: 'panel-auth' })

type RichText = Record<string, any>
type Template = { id: number; name: string; subject: string; preview_text: string | null; content: RichText; is_system: boolean }
type Campaign = { id: number; name: string; subject: string; preview_text: string | null; content: RichText; status: string; recipient_count: number; sent_count: number; failed_count: number; created_at: string; sent_at: string | null }
type NewsletterData = {
  testRecipient: string
  summary: { subscribed: number; unsubscribed: number; campaigns: number; delivered: number }
  subscribers: Array<{ id: number; email: string; source: string | null; status: string; created_at: string; unsubscribed_at: string | null }>
  pagination: { page: number; total: number; totalPages: number }
  campaigns: Campaign[]
  templates: Template[]
}

const emptyDocument: RichText = { type: 'doc', content: [{ type: 'paragraph', attrs: { textAlign: 'left' } }] }
const csrf = useState<string>('panel-csrf', () => '')
const section = ref<'compose' | 'campaigns' | 'subscribers'>('compose')
const subscriberPage = ref(1)
const subscriberSearch = ref('')
const appliedSearch = ref('')
const { data, pending, refresh } = await useFetch<NewsletterData>('/api/panel/newsletter', {
  query: computed(() => ({ page: subscriberPage.value, search: appliedSearch.value })),
  watch: [subscriberPage, appliedSearch],
})

const campaignId = ref<number | null>(null)
const campaignName = ref('')
const subject = ref('')
const previewText = ref('')
const content = ref<RichText>(structuredClone(emptyDocument))
const busy = ref<'save' | 'test' | 'send' | 'template' | null>(null)
const notice = ref('')
const error = ref('')
const sendProgress = ref<{ sent: number; failed: number; pending: number } | null>(null)

const headers = computed(() => ({ 'x-csrf-token': csrf.value }))
const canSend = computed(() => Boolean(campaignName.value.trim() && subject.value.trim()))

function clearMessages() {
  notice.value = ''
  error.value = ''
}

function messageFrom(reason: unknown) {
  const value = reason as { data?: { statusMessage?: string }; message?: string }
  return value?.data?.statusMessage || value?.message || 'Something went wrong.'
}

function applyTemplate(template: Template) {
  campaignId.value = null
  campaignName.value = `${template.name} — ${new Date().toLocaleDateString('en-GB')}`
  subject.value = template.subject
  previewText.value = template.preview_text || ''
  content.value = structuredClone(template.content)
  clearMessages()
}

function editCampaign(campaign: Campaign) {
  campaignId.value = campaign.id
  campaignName.value = campaign.name
  subject.value = campaign.subject
  previewText.value = campaign.preview_text || ''
  content.value = structuredClone(campaign.content)
  section.value = 'compose'
  clearMessages()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function newCampaign() {
  campaignId.value = null
  campaignName.value = ''
  subject.value = ''
  previewText.value = ''
  content.value = structuredClone(emptyDocument)
  sendProgress.value = null
  clearMessages()
}

async function saveDraft() {
  clearMessages()
  busy.value = 'save'
  try {
    const result = await $fetch<{ id: number }>('/api/panel/newsletter/campaigns', {
      method: 'POST', headers: headers.value,
      body: { id: campaignId.value, name: campaignName.value, subject: subject.value, previewText: previewText.value, content: content.value },
    })
    campaignId.value = result.id
    notice.value = 'Draft saved.'
    await refresh()
    return result.id
  } catch (reason) {
    error.value = messageFrom(reason)
    return null
  } finally {
    busy.value = null
  }
}

async function sendTest() {
  clearMessages()
  busy.value = 'test'
  try {
    await $fetch('/api/panel/newsletter/test', {
      method: 'POST', headers: headers.value,
      body: { subject: subject.value, previewText: previewText.value, content: content.value },
    })
    notice.value = `Test sent to ${data.value?.testRecipient || 'patrydab4@gmail.com'}.`
  } catch (reason) {
    error.value = messageFrom(reason)
  } finally {
    busy.value = null
  }
}

async function saveTemplate() {
  const name = window.prompt('Template name', campaignName.value || subject.value)
  if (!name) return
  clearMessages()
  busy.value = 'template'
  try {
    await $fetch('/api/panel/newsletter/templates', {
      method: 'POST', headers: headers.value,
      body: { name, subject: subject.value, previewText: previewText.value, content: content.value },
    })
    notice.value = 'Reusable template saved.'
    await refresh()
  } catch (reason) {
    error.value = messageFrom(reason)
  } finally {
    busy.value = null
  }
}

async function sendCampaign() {
  if (!canSend.value) return
  const id = await saveDraft()
  if (!id || !window.confirm(`Send “${subject.value}” to ${data.value?.summary.subscribed || 0} subscribed people? This cannot be undone.`)) return

  clearMessages()
  busy.value = 'send'
  sendProgress.value = { sent: 0, failed: 0, pending: data.value?.summary.subscribed || 0 }
  await runDelivery(id)
}

async function runDelivery(id: number, retryFailed = false) {
  clearMessages()
  busy.value = 'send'
  try {
    let complete = false
    let latest = { pending: 0, sent: 0, failed: 0, complete: false }
    while (!complete) {
      const result = await $fetch<{ pending: number; sent: number; failed: number; complete: boolean }>(`/api/panel/newsletter/campaigns/${id}/send`, {
        method: 'POST', headers: headers.value, body: { retryFailed },
      })
      latest = result
      sendProgress.value = result
      complete = result.complete
      retryFailed = false
    }
    notice.value = latest.failed
      ? `Campaign finished: ${latest.sent} sent, ${latest.failed} failed.`
      : `Campaign sent to ${latest.sent} people.`
    await refresh()
  } catch (reason) {
    error.value = `${messageFrom(reason)} You can safely resume it from Campaigns.`
  } finally {
    busy.value = null
  }
}

async function resumeCampaign(campaign: Campaign, retryFailed = false) {
  if (!window.confirm(retryFailed ? `Retry ${campaign.failed_count} failed deliveries?` : `Resume “${campaign.name}”?`)) return
  campaignId.value = campaign.id
  await runDelivery(campaign.id, retryFailed)
}

function searchSubscribers() {
  subscriberPage.value = 1
  appliedSearch.value = subscriberSearch.value.trim()
}

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—'
}
</script>

<template>
  <section>
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[.18em] text-[#4b9bfa]">Newsletter</p>
        <h1 class="mt-2 text-3xl font-bold tracking-tight">Write, send and learn</h1>
        <p class="mt-2 text-sm text-[#8892a4]">Every delivered message includes a personal unsubscribe footer.</p>
      </div>
      <button v-if="section === 'compose'" class="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-[#b8c3d3] hover:bg-white/5" @click="newCampaign">New campaign</button>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
      <div v-for="item in [
        ['Active subscribers', data?.summary.subscribed || 0],
        ['Unsubscribed', data?.summary.unsubscribed || 0],
        ['Campaigns', data?.summary.campaigns || 0],
        ['Emails delivered', data?.summary.delivered || 0],
      ]" :key="String(item[0])" class="glass-card p-4">
        <p class="text-xs text-[#8892a4]">{{ item[0] }}</p><p class="mt-1 text-2xl font-bold">{{ Number(item[1]).toLocaleString() }}</p>
      </div>
    </div>

    <div class="mt-6 flex gap-2 border-b border-white/10">
      <button v-for="tab in [{ id: 'compose', label: 'Composer' }, { id: 'campaigns', label: 'Campaigns' }, { id: 'subscribers', label: 'Subscribers' }]" :key="tab.id" class="border-b-2 px-4 py-3 text-sm font-semibold transition" :class="section === tab.id ? 'border-[#4b9bfa] text-white' : 'border-transparent text-[#8892a4] hover:text-white'" @click="section = tab.id as typeof section">{{ tab.label }}</button>
    </div>

    <div v-if="notice" class="mt-5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{{ notice }}</div>
    <div v-if="error" class="mt-5 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">{{ error }}</div>

    <div v-if="pending" class="grid place-items-center py-24"><span class="h-8 w-8 animate-spin rounded-full border-2 border-[#4b9bfa] border-t-transparent" /></div>

    <div v-else-if="section === 'compose'" class="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div class="min-w-0 space-y-5">
        <div class="glass-card grid gap-4 p-5 md:grid-cols-2">
          <label class="text-xs font-semibold uppercase tracking-wider text-[#8892a4]">Internal campaign name
            <input v-model="campaignName" maxlength="100" class="mt-2 w-full rounded-xl border border-white/10 bg-[#111620] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#4b9bfa]" placeholder="September product update">
          </label>
          <label class="text-xs font-semibold uppercase tracking-wider text-[#8892a4]">Email subject
            <input v-model="subject" maxlength="150" class="mt-2 w-full rounded-xl border border-white/10 bg-[#111620] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#4b9bfa]" placeholder="What’s new in Denalify">
          </label>
          <label class="text-xs font-semibold uppercase tracking-wider text-[#8892a4] md:col-span-2">Preview text
            <input v-model="previewText" maxlength="220" class="mt-2 w-full rounded-xl border border-white/10 bg-[#111620] px-4 py-3 text-sm font-normal normal-case tracking-normal outline-none focus:border-[#4b9bfa]" placeholder="Shown next to the subject in the inbox">
          </label>
        </div>
        <NewsletterEditor v-model="content" />
        <div class="flex flex-wrap items-center gap-3">
          <button class="rounded-xl bg-[#246fda] px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" :disabled="busy !== null" @click="saveDraft">{{ busy === 'save' ? 'Saving…' : 'Save draft' }}</button>
          <button class="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-[#c7d1df] disabled:opacity-40" :disabled="busy !== null" @click="saveTemplate">Save as template</button>
          <button class="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-[#07130c] disabled:opacity-40" :disabled="busy !== null || !canSend" @click="sendCampaign">{{ busy === 'send' ? 'Sending…' : 'Send campaign' }}</button>
        </div>
        <div v-if="sendProgress" class="glass-card p-4 text-sm text-[#b7c2d2]">Sent {{ sendProgress.sent }} · Failed {{ sendProgress.failed }} · Remaining {{ sendProgress.pending }}</div>
      </div>

      <aside class="space-y-5">
        <div class="glass-card p-5">
          <h2 class="font-semibold">Start from a template</h2>
          <div class="mt-4 space-y-2">
            <button v-for="template in data?.templates" :key="template.id" class="w-full rounded-xl border border-white/10 p-3 text-left hover:border-[#4b9bfa]/60 hover:bg-white/[.03]" @click="applyTemplate(template)">
              <span class="block text-sm font-semibold">{{ template.name }}</span>
              <span class="mt-1 block text-xs text-[#8892a4]">{{ template.subject }}</span>
            </button>
          </div>
        </div>
        <div class="glass-card p-5">
          <h2 class="font-semibold">Send a test</h2>
          <p class="mt-1 text-xs leading-relaxed text-[#8892a4]">Check the final email in your real inbox before sending.</p>
          <div class="mt-4 rounded-xl border border-white/10 bg-[#111620] px-3 py-2.5 text-sm text-[#b9c5d5]">{{ data?.testRecipient || 'patrydab4@gmail.com' }}</div>
          <button class="mt-3 w-full rounded-xl border border-[#4b9bfa]/40 px-4 py-2.5 text-sm font-semibold text-[#8fc2ff] disabled:opacity-40" :disabled="busy !== null || !subject" @click="sendTest">{{ busy === 'test' ? 'Sending…' : 'Send test email' }}</button>
        </div>
        <div class="rounded-xl border border-[#4b9bfa]/20 bg-[#4b9bfa]/10 p-4 text-xs leading-relaxed text-[#a9cffa]">Email content is stored as structured Tiptap JSON, so the same editor and renderer can later be reused for blog posts.</div>
      </aside>
    </div>

    <div v-else-if="section === 'campaigns'" class="mt-6 glass-card overflow-hidden">
      <div class="border-b border-white/10 px-5 py-4"><h2 class="font-semibold">Campaign history</h2></div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-left text-sm">
          <thead class="text-xs uppercase tracking-wider text-[#77859a]"><tr><th class="px-5 py-3">Campaign</th><th class="px-5 py-3">Status</th><th class="px-5 py-3">Delivery</th><th class="px-5 py-3">Created</th><th class="px-5 py-3" /></tr></thead>
          <tbody>
            <tr v-for="campaign in data?.campaigns" :key="campaign.id" class="border-t border-white/[.06]">
              <td class="px-5 py-4"><strong class="block">{{ campaign.name }}</strong><span class="mt-1 block text-xs text-[#8892a4]">{{ campaign.subject }}</span></td>
              <td class="px-5 py-4"><span class="rounded-full border border-white/10 px-2.5 py-1 text-xs capitalize" :class="campaign.status === 'sent' ? 'text-emerald-300' : campaign.status === 'sending' ? 'text-amber-300' : 'text-[#aeb9c8]'">{{ campaign.status }}</span></td>
              <td class="px-5 py-4 text-[#aeb9c8]">{{ campaign.sent_count }} / {{ campaign.recipient_count }}<span v-if="campaign.failed_count" class="ml-2 text-red-300">{{ campaign.failed_count }} failed</span></td>
              <td class="px-5 py-4 text-xs text-[#8892a4]">{{ formatDate(campaign.created_at) }}</td>
              <td class="px-5 py-4 text-right"><button v-if="campaign.status === 'draft'" class="text-[#69adff] hover:underline" @click="editCampaign(campaign)">Edit</button><button v-else-if="campaign.status === 'sending'" class="text-amber-300 hover:underline" :disabled="busy !== null" @click="resumeCampaign(campaign)">Resume</button><button v-else-if="campaign.failed_count" class="text-red-300 hover:underline" :disabled="busy !== null" @click="resumeCampaign(campaign, true)">Retry failed</button><span v-else class="text-xs text-[#667489]">Complete</span></td>
            </tr>
            <tr v-if="!data?.campaigns.length"><td colspan="5" class="px-5 py-12 text-center text-[#8892a4]">No campaigns yet.</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="mt-6 glass-card overflow-hidden">
      <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div><h2 class="font-semibold">Newsletter subscribers</h2><p class="mt-1 text-xs text-[#8892a4]">{{ data?.pagination.total || 0 }} people</p></div>
        <form class="flex gap-2" @submit.prevent="searchSubscribers"><input v-model="subscriberSearch" type="search" class="rounded-lg border border-white/10 bg-[#111620] px-3 py-2 text-sm outline-none focus:border-[#4b9bfa]" placeholder="Search email"><button class="rounded-lg bg-white/10 px-3 py-2 text-sm">Search</button></form>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[700px] text-left text-sm">
          <thead class="text-xs uppercase tracking-wider text-[#77859a]"><tr><th class="px-5 py-3">Email</th><th class="px-5 py-3">Status</th><th class="px-5 py-3">Source</th><th class="px-5 py-3">Joined</th><th class="px-5 py-3">Unsubscribed</th></tr></thead>
          <tbody><tr v-for="subscriber in data?.subscribers" :key="subscriber.id" class="border-t border-white/[.06]"><td class="px-5 py-4 font-medium">{{ subscriber.email }}</td><td class="px-5 py-4"><span class="rounded-full px-2.5 py-1 text-xs" :class="subscriber.status === 'subscribed' ? 'bg-emerald-500/10 text-emerald-300' : 'bg-white/5 text-[#8892a4]'">{{ subscriber.status }}</span></td><td class="px-5 py-4 text-[#aeb9c8]">{{ subscriber.source || '—' }}</td><td class="px-5 py-4 text-xs text-[#8892a4]">{{ formatDate(subscriber.created_at) }}</td><td class="px-5 py-4 text-xs text-[#8892a4]">{{ formatDate(subscriber.unsubscribed_at) }}</td></tr></tbody>
        </table>
      </div>
      <div v-if="(data?.pagination.totalPages || 0) > 1" class="flex items-center justify-between border-t border-white/10 px-5 py-4 text-sm"><button :disabled="subscriberPage <= 1" class="disabled:opacity-30" @click="subscriberPage--">← Previous</button><span class="text-[#8892a4]">{{ subscriberPage }} / {{ data?.pagination.totalPages }}</span><button :disabled="subscriberPage >= (data?.pagination.totalPages || 1)" class="disabled:opacity-30" @click="subscriberPage++">Next →</button></div>
    </div>
  </section>
</template>
