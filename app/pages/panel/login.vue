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

      <!-- LOCKED state -->
      <Transition name="menu" mode="out-in">
        <div v-if="locked" class="glass-card p-8 text-center border-red-500/30">
          <div class="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-red-400" viewBox="0 0 24 24" fill="none">
              <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
            </svg>
          </div>
          <h2 class="text-[#f0f6ff] text-lg font-bold mb-2">Panel Locked</h2>
          <p class="text-[#8892a4] text-sm leading-relaxed mb-4">
            Too many failed login attempts. Access to the panel has been permanently disabled for this session.
          </p>
          <div class="bg-[rgba(239,68,68,0.08)] border border-red-500/20 rounded-xl p-4 text-left">
            <p class="text-red-300 text-xs font-medium mb-1">To regain access:</p>
            <ol class="text-[#8892a4] text-xs space-y-1 list-decimal list-inside">
              <li>Update <code class="text-[#00d9ff]">ADMIN_PASSWORD</code> in <code class="text-[#00d9ff]">.env</code></li>
              <li>Restart the server / redeploy</li>
            </ol>
          </div>
        </div>

        <!-- LOGIN form -->
        <div v-else class="glass-card p-8">
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
definePageMeta({ layout: false })

const username = ref('')
const password = ref('')
const status = ref<'idle' | 'loading'>('idle')
const error = ref('')
const locked = ref(false)

// Check lock state on mount (e.g. after page refresh post-lockout)
onMounted(async () => {
  try {
    await $fetch('/api/panel/check')
    // Already authenticated — go to panel
    await navigateTo('/panel')
  } catch (err: any) {
    if (err?.status === 423) locked.value = true
  }
})

const handleLogin = async () => {
  error.value = ''
  status.value = 'loading'

  try {
    await $fetch('/api/panel/login', {
      method: 'POST',
      body: { username: username.value, password: password.value },
    })
    await navigateTo('/panel')
  } catch (err: any) {
    status.value = 'idle'
    if (err?.status === 423) {
      locked.value = true
    } else {
      error.value = err?.data?.statusMessage ?? 'Login failed. Try again.'
    }
  }
}
</script>
