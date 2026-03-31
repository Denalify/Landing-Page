<template>
  <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-[rgba(0,217,255,0.25)] bg-[rgba(0,217,255,0.08)] text-[#00d9ff]">
    <span v-if="dot" class="w-1.5 h-1.5 rounded-full bg-[#00d9ff] animate-pulse" />
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  dot?: boolean
}>(), {
  dot: true,
})
</script>
