<template>
  <div
    ref="el"
    class="reveal-hidden"
    :class="[
      isVisible ? 'reveal-visible' : '',
      delay ? `delay-${delay}` : '',
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  delay?: 100 | 200 | 300 | 400 | 500
  threshold?: number
}>(), {
  threshold: 0.1,
})

const el = ref<HTMLElement | null>(null)
const isVisible = ref(false)

useIntersectionObserver(
  el,
  ([entry]) => {
    if (entry.isIntersecting) isVisible.value = true
  },
  { threshold: props.threshold },
)
</script>
