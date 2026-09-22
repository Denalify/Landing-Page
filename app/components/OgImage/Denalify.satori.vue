<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  description?: string
  label?: string
}>(), {
  title: 'Great work happens together.',
  description: 'Projects, tasks, documents and conversations in one clear workspace.',
  label: 'PROJECT MANAGEMENT, TOGETHER',
})

const isHome = computed(() => props.title === 'Great work happens together.')
</script>

<template>
  <div style="width:1200px;height:630px;display:flex;flex-direction:column;justify-content:space-between;background:#0f1115;color:#f3f5f8;padding:48px;font-family:Inter,Arial,sans-serif;">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:14px;">
        <img src="/favicon.png" width="48" height="48" style="border-radius:14px;">
        <div style="display:flex;font-size:30px;font-weight:800;letter-spacing:-1px;">Denalify</div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;color:#aeb7c5;font-size:15px;font-weight:700;letter-spacing:2px;">
        <div style="width:7px;height:7px;display:flex;border-radius:50%;background:#4b9bfa;"></div>
        {{ label }}
      </div>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;gap:30px;">
      <div style="width:520px;display:flex;flex-direction:column;">
        <div v-if="isHome" style="display:flex;flex-direction:column;font-size:67px;line-height:1.03;font-weight:800;letter-spacing:-3px;">
          <span>Great work</span>
          <span>happens</span>
          <span style="color:#4b9bfa;font-style:italic;font-family:Georgia,serif;">together.</span>
        </div>
        <div v-else style="display:flex;font-size:66px;line-height:1.05;font-weight:800;letter-spacing:-3px;">{{ title }}</div>
        <div style="display:flex;margin-top:23px;max-width:480px;color:#aeb7c5;font-size:22px;line-height:1.35;">{{ description }}</div>
      </div>

      <div style="width:530px;display:flex;flex-direction:column;padding:10px;border:1px solid #343942;border-radius:24px;background:#181b20;">
        <img src="/ss/boards-og.png" width="508" height="286" style="border-radius:16px;">
        <div style="display:flex;align-items:center;justify-content:space-between;padding:13px 8px 3px;color:#aeb7c5;font-size:12px;font-weight:700;letter-spacing:1.5px;">
          <span>THE WORKSPACE, IN MOTION</span>
          <span style="color:#4b9bfa;">01 / 03</span>
        </div>
      </div>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid #343942;padding-top:20px;">
      <div style="display:flex;color:#aeb7c5;font-size:17px;">denalify.com</div>
      <div style="display:flex;color:#f3f5f8;font-size:18px;font-weight:700;">Make room for better work.</div>
    </div>
  </div>
</template>
