<script setup lang="ts">
definePageMeta({ layout: 'marketing' })

useSeoMeta({
  title: 'Team Task Management Software',
  description: 'Organize team tasks with assignees, deadlines, checklists, dependencies and comments. See how Denalify keeps work and project context together.',
  ogTitle: 'Team task management software | Denalify',
  ogDescription: 'Track who owns each task, what comes next and the context behind the work.',
})

defineOgImage('Denalify', {
  title: 'A task manager for work your team shares.',
  description: 'Tasks, people, deadlines and conversations in one workspace.',
  label: 'TASK MANAGEMENT',
})

const taskSteps = [
  {
    number: '01',
    title: 'Capture the work',
    text: 'Create a task in the right project. Give it a clear title and description, then break a larger piece of work into checklist items that the team can finish one by one.',
  },
  {
    number: '02',
    title: 'Make ownership visible',
    text: 'Assign people, set a due date and priority, and add labels to distinguish work that needs a different kind of attention. A task no longer depends on somebody remembering a chat message.',
  },
  {
    number: '03',
    title: 'Follow through together',
    text: 'Move the task through the project, discuss the details in comments and attach the relevant files. Activity history makes it easier to understand what changed since the last check-in.',
  },
]

const questions = [
  {
    question: 'Can I see my tasks across different projects?',
    answer: 'Yes. My Tasks brings assigned work together so you can see your responsibilities without opening every project board in turn.',
  },
  {
    question: 'Can a task depend on another task?',
    answer: 'Yes. Add a dependency to show what needs to finish first. The board can show when a task is blocked by unfinished work.',
  },
  {
    question: 'Can I keep the discussion with the task?',
    answer: 'Yes. Task comments and file attachments stay with the work. A separate project chat is available for broader conversation.',
  },
]
</script>

<template>
  <main>
    <section class="feature-hero section-shell" aria-labelledby="task-title">
      <div>
        <div class="eyebrow"><span class="eyebrow-line" /> TEAM TASK MANAGEMENT</div>
        <h1 id="task-title">A task manager <em>for teams.</em></h1>
        <p class="feature-lede">Denalify helps a team turn plans into work that has an owner, a deadline and a next step. Tasks sit inside projects alongside the discussions and files that explain them. You can see your own assignments or step back to the full board.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="https://app.denalify.com/auth/signup">Start for free <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="#how-tasks-work">See how tasks work <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div class="feature-hero-visual">
        <img src="/ss/boards.webp" alt="Denalify project board showing assigned tasks, due dates, priorities and checklist progress" width="1280" height="716" fetchpriority="high">
        <span>ACTUAL DENALIFY BOARD / CLASSIC THEME</span>
      </div>
    </section>

    <section id="how-tasks-work" class="feature-section feature-section-tinted">
      <div class="section-shell">
        <div class="section-kicker"><span>FROM IDEA TO DONE</span><span class="tiny-rule" /></div>
        <div class="feature-section-heading">
          <h2>Tasks stay useful <em>after they are created.</em></h2>
          <p>A good task manager should answer more than “what is on the list?” It should show who is responsible, when the work matters and where to find the decisions made along the way.</p>
        </div>
        <div class="feature-detail-grid">
          <article v-for="step in taskSteps" :key="step.number" class="feature-detail-card">
            <span>{{ step.number }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-shell feature-section feature-copy-grid">
      <div>
        <div class="section-kicker">A HOME FOR THE DETAILS</div>
        <h2>Keep context close <em>to the task.</em></h2>
      </div>
      <div class="feature-prose">
        <p>A task title is rarely enough for a handoff. In Denalify you can write the brief in the description, add smaller steps as a checklist and use comments to work through questions with the team. Attach a file when the work needs a reference. People joining later can read the task instead of reconstructing the decision from several conversations.</p>
        <p>Dependencies help when one task cannot move until another is finished. Priorities, due dates and labels make the board easier to scan when a project grows. The activity history provides a record of changes, while a project chat gives the team room for conversations that do not belong on one task.</p>
        <p>For a personal starting point, open My Tasks to find work assigned to you across projects. For a project-wide view, open its <NuxtLink to="/kanban-boards">Kanban board</NuxtLink> and see how every task is moving through the workflow.</p>
      </div>
    </section>

    <section class="feature-section feature-section-tinted">
      <div class="section-shell feature-copy-grid">
        <div>
          <div class="section-kicker">WHERE IT HELPS</div>
          <h2>Useful for the <em>real handoffs.</em></h2>
        </div>
        <div class="feature-prose">
          <h3>Planning a release</h3>
          <p>Keep design, development and review tasks in one project. Assign each piece, mark the work that is blocked and use checklists to make completion criteria visible before the deadline.</p>
          <h3>Running ongoing team work</h3>
          <p>Give routine requests a place on the board. Comments and files preserve the detail of each request, while My Tasks helps each person find their next action.</p>
          <h3>Working with a small team</h3>
          <p>Start with one board and a few columns. Add structure only where it helps: an owner, a due date, a checklist or a dependency. The free workspace lets you try the workflow before choosing a paid plan.</p>
        </div>
      </div>
    </section>

    <section class="section-shell feature-section" aria-labelledby="task-questions">
      <div class="section-kicker">COMMON QUESTIONS</div>
      <h2 id="task-questions" class="feature-questions-title">Team task management, <em>in practice.</em></h2>
      <div class="feature-questions">
        <article v-for="item in questions" :key="item.question">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </article>
      </div>
    </section>

    <section class="feature-cta">
      <div class="section-shell feature-cta-inner">
        <div><div class="section-kicker">GET STARTED</div><h2>Give the next task <em>a clear home.</em></h2><p>Create a free Denalify workspace, invite your team and start with the work already on your plate.</p></div>
        <a class="button button-primary" href="https://app.denalify.com/auth/signup">Create your workspace <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </main>
</template>
