<script setup lang="ts">
const { t } = useI18n()
const mode = ref<'dark' | 'light'>('dark')
const view = ref<'board' | 'list'>('board')
const moved = ref(false)
</script>

<template>
  <div class="classic-preview">
    <div class="classic-preview-head"><span>{{ t('preview.heading') }}</span><div class="classic-mode-switch" :aria-label="t('preview.colorMode')"><button type="button" :aria-pressed="mode === 'dark'" :class="{ active: mode === 'dark' }" @click="mode = 'dark'">{{ t('preview.dark') }}</button><button type="button" :aria-pressed="mode === 'light'" :class="{ active: mode === 'light' }" @click="mode = 'light'">{{ t('preview.light') }}</button></div></div>
    <div class="classic-scroll"><div class="classic-demo" :class="mode">
      <aside class="classic-side" :aria-label="t('preview.navigation')">
        <img :src="mode === 'dark' ? '/logo-white.webp' : '/logo-dark.webp'" alt="Denalify" width="115" height="32">
        <div class="classic-search">⌕ <span>{{ t('preview.search') }}</span><kbd>⌘ K</kbd></div>
        <div class="classic-side-link selected"><span>▦</span> {{ t('preview.dashboard') }}</div>
        <div class="classic-side-link"><span>▣</span> {{ t('preview.myTasks') }}</div>
        <div class="classic-side-link"><span>♟</span> {{ t('preview.inbox') }}</div>
        <div class="classic-side-link"><span>◕</span> {{ t('preview.portfolio') }}</div>
        <span class="classic-side-label">{{ t('preview.projects') }}</span>
        <div class="classic-side-link"><span>▣</span> {{ t('preview.website') }}</div>
        <div class="classic-side-link"><span>＋</span> {{ t('preview.newProject') }}</div>
        <div class="classic-side-foot"><span>◐ {{ t('preview.appearance') }}</span><span>↪ {{ t('preview.logout') }}</span></div>
      </aside>
      <div class="classic-workspace">
        <div class="classic-app-top"><div class="classic-crumb">Denalify <span>›</span> {{ t('preview.product') }} <span>›</span> {{ t('preview.website') }}</div><div class="classic-account">⬡ Denalify <span>⌄</span></div></div>
        <div class="classic-board-shell">
          <div class="classic-toolbar"><div class="classic-tabs" role="tablist" :aria-label="t('preview.views')"><button type="button" role="tab" :aria-selected="view === 'list'" :class="{ active: view === 'list' }" @click="view = 'list'">☷ <span>{{ t('preview.list') }}</span></button><button type="button" role="tab" :aria-selected="view === 'board'" :class="{ active: view === 'board' }" @click="view = 'board'">▣ <span>{{ t('preview.board') }}</span></button><span>▢ {{ t('preview.calendar') }}</span><span>◌ {{ t('preview.chat') }}</span><span>✳ {{ t('preview.whiteboard') }}</span></div></div>
          <div class="classic-filters"><span>♟ &nbsp;{{ t('preview.assignees') }}⌄</span><span>⚑ &nbsp;{{ t('preview.priorities') }}⌄</span><span>◉ &nbsp;{{ t('preview.statuses') }}⌄</span><span>▦ &nbsp;{{ t('preview.deadlines') }}⌄</span><div class="classic-automation">ϟ {{ t('preview.automations') }}</div></div>
          <Transition name="classic-view" mode="out-in">
            <div v-if="view === 'board'" key="board" class="classic-columns">
              <div class="classic-column"><div class="classic-column-title"><i></i> {{ t('preview.todo') }} <b>{{ moved ? 1 : 2 }}</b></div><div class="classic-column-body">
                <div class="classic-task"><div class="classic-task-title"><strong>{{ t('preview.design') }}</strong><small>WEB-12</small></div><div class="classic-progress"><i style="width:35%"></i></div><div class="classic-task-foot"><span class="classic-pill medium">⌃ {{ t('preview.medium') }}</span><span class="classic-pill deadline">▦ {{ t('preview.friday') }}</span><span class="classic-avatar">J</span></div></div>
                <button v-if="!moved" type="button" class="classic-task classic-task-button" :aria-label="t('preview.move')" @click="moved = true"><div class="classic-task-title"><strong>{{ t('preview.review') }}</strong><small>WEB-18</small></div><div class="classic-task-foot"><span class="classic-pill high">⌃ {{ t('preview.high') }}</span><span class="classic-pill deadline">▦ {{ t('preview.threeDays') }}</span><span class="classic-avatar">M</span></div><span class="classic-task-hint">{{ t('preview.move') }} →</span></button>
                <div class="classic-add">＋ &nbsp;{{ t('preview.createTask') }}</div>
              </div></div>
              <div class="classic-column"><div class="classic-column-title"><i></i> {{ t('preview.inProgress') }} <b>{{ moved ? 2 : 1 }}</b></div><div class="classic-column-body">
                <div class="classic-task"><div class="classic-task-title"><strong>{{ t('preview.build') }}</strong><small>WEB-15</small></div><div class="classic-progress"><i style="width:70%"></i></div><div class="classic-task-foot"><span class="classic-pill medium">⌃ {{ t('preview.medium') }}</span><span class="classic-avatar">A</span></div></div>
                <button v-if="moved" type="button" class="classic-task classic-task-button moved" :aria-label="t('preview.moveBack')" @click="moved = false"><div class="classic-task-title"><strong>{{ t('preview.review') }}</strong><small>WEB-18</small></div><div class="classic-task-foot"><span class="classic-pill high">⌃ {{ t('preview.high') }}</span><span class="classic-avatar">M</span></div><span class="classic-task-hint">{{ t('preview.moveBack') }} ←</span></button>
                <div class="classic-add">＋ &nbsp;{{ t('preview.createTask') }}</div>
              </div></div>
              <div class="classic-column"><div class="classic-column-title"><i></i> {{ t('preview.done') }} <b>1</b></div><div class="classic-column-body"><div class="classic-task complete"><div class="classic-task-title"><strong>{{ t('preview.map') }}</strong><small>WEB-09</small></div><div class="classic-progress"><i style="width:100%"></i></div><div class="classic-task-foot"><span class="classic-pill low">⌄ {{ t('preview.low') }}</span><span class="classic-avatar">J</span></div></div><div class="classic-add">＋ &nbsp;{{ t('preview.createTask') }}</div></div></div>
            </div>
            <div v-else key="list" class="classic-list"><div class="classic-list-title">{{ t('preview.tasks') }} <span>4</span></div><div class="classic-list-head"><span>{{ t('preview.task') }}</span><span>{{ t('preview.status') }}</span><span>{{ t('preview.priority') }}</span></div><div class="classic-list-row"><strong>{{ t('preview.design') }}</strong><span>{{ t('preview.todo') }}</span><span>{{ t('preview.medium') }}</span></div><div class="classic-list-row"><strong>{{ t('preview.review') }}</strong><span>{{ t(moved ? 'preview.inProgress' : 'preview.todo') }}</span><span>{{ t('preview.high') }}</span></div><div class="classic-list-row"><strong>{{ t('preview.build') }}</strong><span>{{ t('preview.inProgress') }}</span><span>{{ t('preview.medium') }}</span></div><div class="classic-list-row"><strong>{{ t('preview.map') }}</strong><span>{{ t('preview.done') }}</span><span>{{ t('preview.low') }}</span></div></div>
          </Transition>
        </div>
      </div>
    </div></div>
    <p class="classic-preview-caption">{{ t('preview.caption') }}</p>
  </div>
</template>
