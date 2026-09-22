<script setup lang="ts">
const mode = ref<'dark' | 'light'>('dark')
const view = ref<'board' | 'list'>('board')
const moved = ref(false)
</script>

<template>
  <div class="classic-preview">
    <div class="classic-preview-head"><span>CLASSIC THEME · INTERACTIVE PREVIEW</span><div class="classic-mode-switch" aria-label="Preview color mode"><button type="button" :aria-pressed="mode === 'dark'" :class="{ active: mode === 'dark' }" @click="mode = 'dark'">Dark</button><button type="button" :aria-pressed="mode === 'light'" :class="{ active: mode === 'light' }" @click="mode = 'light'">Light</button></div></div>
    <div class="classic-scroll">
      <div class="classic-demo" :class="mode">
        <aside class="classic-side" aria-label="Preview navigation">
          <img :src="mode === 'dark' ? '/logo-white.webp' : '/logo-dark.webp'" alt="Denalify" width="115" height="32">
          <div class="classic-search">⌕ <span>Search...</span><kbd>⌘ K</kbd></div>
          <div class="classic-side-link selected"><span>▦</span> Dashboard</div>
          <div class="classic-side-link"><span>▣</span> My tasks</div>
          <div class="classic-side-link"><span>♟</span> Inbox</div>
          <div class="classic-side-link"><span>◕</span> Portfolio</div>
          <span class="classic-side-label">PROJECTS</span>
          <div class="classic-side-link"><span>▣</span> Website</div>
          <div class="classic-side-link"><span>＋</span> New project</div>
          <div class="classic-side-foot"><span>◐ Appearance</span><span>↪ Log out</span></div>
        </aside>
        <div class="classic-workspace">
          <div class="classic-app-top"><div class="classic-crumb">Denalify <span>›</span> Product <span>›</span> Website</div><div class="classic-account">⬡ Denalify <span>⌄</span></div></div>
          <div class="classic-board-shell">
            <div class="classic-toolbar"><div class="classic-tabs" role="tablist" aria-label="Preview project views"><button type="button" role="tab" :aria-selected="view === 'list'" :class="{ active: view === 'list' }" @click="view = 'list'">☷ <span>List</span></button><button type="button" role="tab" :aria-selected="view === 'board'" :class="{ active: view === 'board' }" @click="view = 'board'">▣ <span>Board</span></button><span>▢ Calendar</span><span>◌ Chat</span><span>✳ Whiteboard</span></div></div>
            <div class="classic-filters"><span>♟ &nbsp;All Assignees⌄</span><span>⚑ &nbsp;All Priorities⌄</span><span>◉ &nbsp;All Statuses⌄</span><span>▦ &nbsp;All Deadlines⌄</span><div class="classic-automation">ϟ Automations</div></div>
            <Transition name="classic-view" mode="out-in">
              <div v-if="view === 'board'" key="board" class="classic-columns">
                <div class="classic-column"><div class="classic-column-title"><i></i> TO DO <b>{{ moved ? 1 : 2 }}</b></div><div class="classic-column-body"><div class="classic-task"><div class="classic-task-title"><strong>Design the homepage</strong><small>WEB-12</small></div><div class="classic-progress"><i style="width:35%"></i></div><div class="classic-task-foot"><span class="classic-pill medium">⌃ Medium</span><span class="classic-pill deadline">▦ Fri</span><span class="classic-avatar">J</span></div></div><button v-if="!moved" type="button" class="classic-task classic-task-button" aria-label="Move Review onboarding to in progress" @click="moved = true"><div class="classic-task-title"><strong>Review onboarding</strong><small>WEB-18</small></div><div class="classic-task-foot"><span class="classic-pill high">⌃ High</span><span class="classic-pill deadline">▦ 3 days</span><span class="classic-avatar">M</span></div><span class="classic-task-hint">Move to in progress →</span></button><div class="classic-add">＋ &nbsp;Create task</div></div></div>
                <div class="classic-column"><div class="classic-column-title"><i></i> IN PROGRESS <b>{{ moved ? 2 : 1 }}</b></div><div class="classic-column-body"><div class="classic-task"><div class="classic-task-title"><strong>Build project dashboard</strong><small>WEB-15</small></div><div class="classic-progress"><i style="width:70%"></i></div><div class="classic-task-foot"><span class="classic-pill medium">⌃ Medium</span><span class="classic-avatar">A</span></div></div><button v-if="moved" type="button" class="classic-task classic-task-button moved" aria-label="Move Review onboarding back to to do" @click="moved = false"><div class="classic-task-title"><strong>Review onboarding</strong><small>WEB-18</small></div><div class="classic-task-foot"><span class="classic-pill high">⌃ High</span><span class="classic-avatar">M</span></div><span class="classic-task-hint">Move back ←</span></button><div class="classic-add">＋ &nbsp;Create task</div></div></div>
                <div class="classic-column"><div class="classic-column-title"><i></i> DONE <b>1</b></div><div class="classic-column-body"><div class="classic-task complete"><div class="classic-task-title"><strong>Map the user journey</strong><small>WEB-09</small></div><div class="classic-progress"><i style="width:100%"></i></div><div class="classic-task-foot"><span class="classic-pill low">⌄ Low</span><span class="classic-avatar">J</span></div></div><div class="classic-add">＋ &nbsp;Create task</div></div></div>
              </div>
              <div v-else key="list" class="classic-list"><div class="classic-list-title">Tasks <span>4</span></div><div class="classic-list-head"><span>TASK</span><span>STATUS</span><span>PRIORITY</span></div><div class="classic-list-row"><strong>Design the homepage</strong><span>To do</span><span>Medium</span></div><div class="classic-list-row"><strong>Review onboarding</strong><span>{{ moved ? 'In progress' : 'To do' }}</span><span>High</span></div><div class="classic-list-row"><strong>Build project dashboard</strong><span>In progress</span><span>Medium</span></div><div class="classic-list-row"><strong>Map the user journey</strong><span>Done</span><span>Low</span></div></div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
    <p class="classic-preview-caption">An illustrative board based on Denalify’s Classic interface. Switch the theme or move a card.</p>
  </div>
</template>
