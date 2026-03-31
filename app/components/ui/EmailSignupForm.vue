<template>
  <form @submit.prevent="handleSubmit">
    <Transition name="menu" mode="out-in">
      <div v-if="status === 'success'" class="flex items-center gap-3 p-4 rounded-xl bg-[rgba(0,217,255,0.1)] border border-[rgba(0,217,255,0.3)]">
        <svg class="w-5 h-5 text-[#00d9ff] shrink-0" viewBox="0 0 20 20" fill="none">
          <path d="M4 10l4.5 4.5L16 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p class="text-[#00d9ff] text-sm font-medium">You're on the list! We'll reach out soon.</p>
      </div>

      <div v-else class="flex flex-col gap-4" :class="variant === 'banner' ? 'items-center w-full' : ''">
        <!-- Email + button row -->
        <div :class="variant === 'banner' ? 'flex flex-col gap-3 items-center w-full' : 'flex flex-col sm:flex-row gap-3'">
          <input
            v-model="email"
            type="email"
            name="email"
            required
            placeholder="Enter your work email"
            :class="[
              'bg-[rgba(255,255,255,0.05)] border border-[rgba(0,217,255,0.2)] rounded-xl px-4 py-3 text-sm text-[#f0f6ff] placeholder-[#8892a4]',
              'focus:outline-none focus:border-[rgba(0,217,255,0.5)] focus:bg-[rgba(255,255,255,0.08)] transition-all duration-200',
              variant === 'banner' ? 'w-full max-w-sm' : 'flex-1 min-w-0',
            ]"
          />
          <CyanButton
            type="submit"
            :loading="status === 'submitting'"
            :size="variant === 'banner' ? 'lg' : 'md'"
            :class="variant === 'banner' ? 'w-full max-w-sm' : 'shrink-0'"
          >
            Join the Beta
          </CyanButton>
        </div>

        <!-- Source pills -->
        <div :class="variant === 'banner' ? 'flex flex-col items-center gap-2 w-full max-w-sm' : 'flex flex-col gap-2'">
          <p class="text-[#8892a4] text-xs">
            Where did you hear about us?
            <span class="text-[#8892a4]/60">(optional)</span>
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in sourceOptions"
              :key="option.value"
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 cursor-pointer"
              :class="source === option.value
                ? 'bg-[rgba(0,217,255,0.15)] border-[rgba(0,217,255,0.5)] text-[#00d9ff]'
                : 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-[#8892a4] hover:border-[rgba(0,217,255,0.25)] hover:text-[#c8d3e0]'"
              @click="source = source === option.value ? null : option.value"
            >
              <span>{{ option.emoji }}</span>
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <p v-if="status === 'error'" class="text-red-400 text-xs mt-2">
      {{ errorMessage }}
    </p>
  </form>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'hero' | 'banner'
}>(), {
  variant: 'hero',
})

const sourceOptions = [
  { value: 'Search engine',      emoji: '🔍', label: 'Search' },
  { value: 'Facebook',           emoji: '📘', label: 'Facebook' },
  { value: 'YouTube',            emoji: '▶️',  label: 'YouTube' },
  { value: 'Twitter/X',          emoji: '𝕏',  label: 'Twitter/X' },
  { value: 'LinkedIn',           emoji: '💼', label: 'LinkedIn' },
  { value: 'Reddit',             emoji: '🤖', label: 'Reddit' },
  { value: 'Friend / colleague', emoji: '🗣️', label: 'Friend' },
  { value: 'Other',              emoji: '✨', label: 'Other' },
]

const email = ref('')
const source = ref<string | null>(null)
const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const errorMessage = ref('Something went wrong. Please try again.')

const handleSubmit = async () => {
  if (!email.value) return
  status.value = 'submitting'
  errorMessage.value = 'Something went wrong. Please try again.'

  try {
    await $fetch('/api/waitlist', {
      method: 'POST',
      body: { email: email.value, source: source.value },
    })

    status.value = 'success'
    email.value = ''
    source.value = null
  } catch (err: any) {
    status.value = 'error'
    if (err?.data?.statusMessage) {
      errorMessage.value = err.data.statusMessage
    }
  }
}
</script>
