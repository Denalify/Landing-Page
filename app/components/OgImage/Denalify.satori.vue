<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  label?: string
}>(), {
  title: 'Make room for better work',
  description: 'Plans, people and progress in one clear workspace.',
  label: 'PROJECT MANAGEMENT, TOGETHER',
})
</script>

<template>
  <div style="width:100%;height:100%;display:flex;background:#f6f5f0;color:#132039;padding:64px;font-family:Inter,Arial,sans-serif;">
    <div style="width:100%;height:100%;display:flex;flex-direction:column;justify-content:space-between;border:2px solid #cbd3dc;padding:54px;background:#f6f5f0;">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:18px;">
          <img src="/favicon.png" width="58" height="58" style="border-radius:15px;">
          <div style="display:flex;font-size:38px;font-weight:800;letter-spacing:-1px;">Denalify</div>
        </div>
        <div style="display:flex;color:#315aa7;font-size:16px;font-weight:800;letter-spacing:3px;">{{ label }}</div>
      </div>
      <div style="display:flex;flex-direction:column;max-width:930px;">
        <div style="display:flex;font-size:76px;line-height:1.04;font-weight:800;letter-spacing:-4px;">{{ title }}</div>
        <div style="display:flex;margin-top:28px;color:#586778;font-size:28px;line-height:1.35;">{{ description }}</div>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;border-top:2px solid #cbd3dc;padding-top:24px;">
        <div style="display:flex;color:#637185;font-size:19px;">denalify.com</div>
        <div style="display:flex;color:#2768d8;font-size:27px;font-weight:800;">From idea to done.</div>
      </div>
    </div>
  </div>
</template>
