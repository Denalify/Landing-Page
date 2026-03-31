<template>
  <div class="glass-card p-6 flex flex-col gap-4 group hover:border-[rgba(0,217,255,0.3)] transition-all duration-300 hover:bg-[rgba(255,255,255,0.06)]">
    <div
      class="w-11 h-11 rounded-xl flex items-center justify-center bg-[rgba(0,217,255,0.1)] border border-[rgba(0,217,255,0.15)] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-shadow duration-300"
    >
      <div class="w-5 h-5 text-[#00d9ff]" v-html="icon" />
    </div>
    <div>
      <h3 class="text-[#f0f6ff] font-semibold text-base mb-1.5">{{ title }}</h3>
      <p class="text-[#8892a4] text-sm leading-relaxed">{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>
