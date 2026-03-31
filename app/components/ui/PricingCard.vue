<template>
  <div
    class="glass-card flex flex-col relative transition-all duration-300"
    :class="[
      popular
        ? 'pricing-popular scale-[1.02] z-10'
        : 'hover:border-[rgba(0,217,255,0.25)]',
    ]"
  >
    <!-- Popular badge -->
    <div
      v-if="popular"
      class="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#00d9ff] to-[#3b82f6] text-[#0a0e1a] whitespace-nowrap"
    >
      Most Popular
    </div>

    <div class="p-6 flex flex-col gap-5 flex-1">
      <!-- Header -->
      <div>
        <p class="text-[#8892a4] text-sm font-medium mb-1">{{ name }}</p>
        <div class="flex items-end gap-1.5">
          <span
            class="text-4xl font-bold"
            :class="price === 0 ? 'text-[#f0f6ff]' : 'text-gradient-cyan'"
          >
            {{ price === 0 ? 'Free' : `€${price}` }}
          </span>
          <span v-if="price > 0" class="text-[#8892a4] text-sm mb-1">/month</span>
        </div>
        <p class="text-[#8892a4] text-xs mt-1">{{ subtitle }}</p>
      </div>

      <!-- Feature list -->
      <ul class="flex flex-col gap-2.5 flex-1">
        <li
          v-for="feature in features"
          :key="feature"
          class="flex items-start gap-2.5 text-sm"
        >
          <svg class="w-4 h-4 text-[#00d9ff] mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="text-[#c8d3e0]">{{ feature }}</span>
        </li>
      </ul>

      <!-- CTA -->
      <CyanButton
        :variant="popular ? 'filled' : 'outline'"
        class="w-full mt-2"
        @click="emit('cta-click')"
      >
        {{ price === 0 ? 'Join Waitlist' : 'Get Started' }}
      </CyanButton>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  price: number
  subtitle: string
  features: string[]
  popular?: boolean
}>()

const emit = defineEmits<{
  'cta-click': []
}>()
</script>
