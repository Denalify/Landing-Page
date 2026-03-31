<template>
  <footer class="border-t border-[rgba(0,217,255,0.08)] py-14 mt-0">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <!-- Brand -->
        <div class="flex flex-col items-start gap-4">
          <img src="/logo-white.webp" alt="Denalify" class="h-8 w-auto object-contain" />
          <p class="text-[#8892a4] text-sm leading-relaxed max-w-xs">
            Project management for modern teams. Built to help you move faster, together.
          </p>
          <a
            href="https://app.denalify.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#00d9ff] text-sm hover:underline inline-flex items-center gap-1.5"
          >
            Launch App
            <svg class="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>

        <!-- Navigation -->
        <div class="flex flex-col gap-3">
          <h4 class="text-[#f0f6ff] text-sm font-semibold mb-1">Navigation</h4>
          <a
            v-for="link in footerLinks"
            :key="link.label"
            :href="link.href"
            class="text-[#8892a4] text-sm hover:text-[#f0f6ff] transition-colors"
          >
            {{ link.label }}
          </a>
        </div>

        <!-- Legal -->
        <div class="flex flex-col gap-3">
          <h4 class="text-[#f0f6ff] text-sm font-semibold mb-1">Legal</h4>
          <a href="#" class="text-[#8892a4] text-sm hover:text-[#f0f6ff] transition-colors">Privacy Policy</a>
          <a href="#" class="text-[#8892a4] text-sm hover:text-[#f0f6ff] transition-colors">Terms of Service</a>
          <a href="mailto:contact@denalify.com" class="text-[#8892a4] text-sm hover:text-[#f0f6ff] transition-colors">Contact</a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-[#8892a4] text-xs">
          © {{ new Date().getFullYear() }} Denalify. All rights reserved.
        </p>
        <div class="flex items-center gap-1.5">
          <span class="w-2 h-2 rounded-full bg-[#00d9ff] animate-pulse" />
          <p class="text-[#8892a4] text-xs">Closed Beta — Accepting Signups</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Join Beta', href: '#newsletter' },
]
</script>
