<template>
  <div class="glass-card" :class="[padding, className]">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  padding?: string
  className?: string
}>(), {
  padding: 'p-6',
})
</script>
