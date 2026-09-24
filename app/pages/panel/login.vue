<template>
  <div class="min-h-screen bg-[#0a0e1a] flex items-center justify-center px-4">
    <!-- Background glows -->
    <div class="fixed glow-blob w-[500px] h-[500px] top-[-100px] left-[-100px] bg-[rgba(0,217,255,0.08)]" />
    <div class="fixed glow-blob w-[400px] h-[400px] bottom-[-50px] right-[-50px] bg-[rgba(59,130,246,0.06)]" />

    <div class="relative z-10 w-full max-w-sm">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="/logo-white.webp" alt="Denalify" class="h-9 w-auto mx-auto mb-3" />
        <p class="text-[#8892a4] text-sm">Admin Panel</p>
      </div>

      <Transition name="menu" mode="out-in">
        <div class="glass-card border border-white/10 bg-white/[.035] p-8 rounded-2xl">
          <h1 class="text-[#f0f6ff] text-xl font-bold mb-6 text-center">Sign in</h1>

          <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-[#8892a4] text-xs font-medium uppercase tracking-wider">Username</label>
              <input
                v-model="username"
                type="text"
                autocomplete="username"
                required
                :disabled="status === 'loading'"
                class="bg-[rgba(255,255,255,0.05)] border border-[rgba(0,217,255,0.2)] rounded-xl px-4 py-3 text-sm text-[#f0f6ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(0,217,255,0.5)] transition-all duration-200 disabled:opacity-50"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[#8892a4] text-xs font-medium uppercase tracking-wider">2FA code <span class="normal-case tracking-normal">(if enabled)</span></label>
              <input
                v-model="otp"
                type="text"
                inputmode="numeric"
                autocomplete="one-time-code"
                maxlength="6"
                :disabled="status === 'loading'"
                class="bg-[rgba(255,255,255,0.05)] border border-[rgba(0,217,255,0.2)] rounded-xl px-4 py-3 text-sm text-[#f0f6ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(0,217,255,0.5)] transition-all duration-200 disabled:opacity-50"
              >
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-[#8892a4] text-xs font-medium uppercase tracking-wider">Password</label>
              <input
                v-model="password"
                type="password"
                autocomplete="current-password"
                required
                :disabled="status === 'loading'"
                class="bg-[rgba(255,255,255,0.05)] border border-[rgba(0,217,255,0.2)] rounded-xl px-4 py-3 text-sm text-[#f0f6ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(0,217,255,0.5)] transition-all duration-200 disabled:opacity-50"
              />
            </div>

            <Transition name="menu">
              <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
            </Transition>

            <button
              type="submit"
              :disabled="status === 'loading'"
              class="mt-2 w-full py-3 rounded-xl bg-[#00d9ff] text-[#0a0e1a] font-semibold text-sm hover:bg-[#33e3ff] transition-all duration-200 shadow-[0_0_20px_rgba(0,217,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span v-if="status === 'loading'" class="w-4 h-4 border-2 border-[#0a0e1a] border-t-transparent rounded-full animate-spin" />
              {{ status === 'loading' ? 'Signing in…' : 'Sign in' }}
            </button>
          </form>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false, i18n: false })

const username = ref('')
const password = ref('')
const otp = ref('')
const status = ref<'idle' | 'loading'>('idle')
const error = ref('')
const csrf = useState<string>('panel-csrf', () => '')

// Check lock state on mount (e.g. after page refresh post-lockout)
onMounted(async () => {
  try {
    const result = await $fetch<{ csrfToken: string }>('/api/panel/check')
    csrf.value = result.csrfToken
    await navigateTo('/panel')
  } catch {}
})

const handleLogin = async () => {
  error.value = ''
  status.value = 'loading'

  try {
    const result = await $fetch<{ csrfToken: string }>('/api/panel/login', {
      method: 'POST',
      body: { username: username.value, password: password.value, otp: otp.value },
    })
    csrf.value = result.csrfToken
    await navigateTo('/panel')
  } catch (err: any) {
    status.value = 'idle'
    error.value = err?.data?.statusMessage ?? 'Login failed. Try again.'
  }
}
</script>
