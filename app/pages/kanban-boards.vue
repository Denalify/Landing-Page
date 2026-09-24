<script setup lang="ts">
definePageMeta({ layout: 'marketing' })

useSeoMeta({
  title: 'Kanban Boards for Team Projects',
  description: 'See project work move with customizable Kanban columns, task cards and focused filters. Explore Denalify boards and start a free team workspace.',
  ogTitle: 'Kanban boards for team projects | Denalify',
  ogDescription: 'See what is to do, in progress and done without losing the details behind each task.',
})

defineOgImage('Denalify', {
  title: 'See the work move on a Kanban board.',
  description: 'A clear project view, with the task details close by.',
  label: 'KANBAN BOARDS',
})

const boardSteps = [
  {
    number: '01',
    title: 'Shape the workflow',
    text: 'Create columns that match how your team works. A simple To Do, In Progress and Done board is enough to start; add stages when the project needs more detail.',
  },
  {
    number: '02',
    title: 'Move work forward',
    text: 'Add a task to the right column and move its card as progress changes. The board shows priorities, deadlines and checklist progress without opening every task.',
  },
  {
    number: '03',
    title: 'Focus the view',
    text: 'Filter by assignee, status, priority, deadline or label when the board gets busy. The underlying tasks still carry their descriptions, files and conversations.',
  },
]
</script>

<template>
  <main>
    <section class="feature-hero section-shell" aria-labelledby="kanban-title">
      <div>
        <div class="eyebrow"><span class="eyebrow-line" /> KANBAN BOARDS FOR TEAMS</div>
        <h1 id="kanban-title">See project work <em>move forward.</em></h1>
        <p class="feature-lede">A Kanban board makes the status of each task visible to the whole team. Denalify brings those boards into the same workspace as task details, project documents and conversations, so a card is more than a title in a column.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="https://app.denalify.com/auth/signup">Start for free <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="#board-workflow">Explore the board <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div class="feature-hero-visual">
        <img src="/ss/boards.webp" alt="Denalify Kanban board with To Do, In Progress and Done columns and detailed task cards" width="1280" height="716" fetchpriority="high">
        <span>ACTUAL DENALIFY BOARD / CLASSIC THEME</span>
      </div>
    </section>

    <section id="board-workflow" class="feature-section feature-section-tinted">
      <div class="section-shell">
        <div class="section-kicker"><span>HOW THE BOARD WORKS</span><span class="tiny-rule" /></div>
        <div class="feature-section-heading">
          <h2>A project view that <em>tells the story.</em></h2>
          <p>Use columns to show where work stands today. Move a card when the status changes, then open the task for the context a column cannot show.</p>
        </div>
        <div class="feature-detail-grid">
          <article v-for="step in boardSteps" :key="step.number" class="feature-detail-card">
            <span>{{ step.number }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section-shell feature-section feature-copy-grid">
      <div>
        <div class="section-kicker">MORE THAN A CARD</div>
        <h2>The task behind <em>every move.</em></h2>
      </div>
      <div class="feature-prose">
        <p>A useful Kanban board helps people act, not just look at colored cards. Open a Denalify task to see its description, assignees, priority, due date and checklist. Add comments and files where the team needs to discuss or share material. When one task depends on another, that relationship can be visible too.</p>
        <p>The board is a shared view of the same project work, not a separate copy of it. If you prefer rows for a review session, switch to the list. If dates are the question, use the calendar. Your tasks and their history remain in the project as the view changes.</p>
        <p>People can also use <NuxtLink to="/task-management">My Tasks and team task management</NuxtLink> to focus on their own responsibilities across projects. The board answers what is moving in this project; My Tasks answers what is waiting for me.</p>
      </div>
    </section>

    <section class="feature-section feature-section-tinted">
      <div class="section-shell feature-copy-grid">
        <div>
          <div class="section-kicker">A PRACTICAL EXAMPLE</div>
          <h2>From backlog <em>to delivery.</em></h2>
        </div>
        <div class="feature-prose">
          <p>Imagine a website launch. New requests start in To Do. Design and content tasks move into In Progress as people begin working. A review column can make approvals explicit before tasks reach Done. The columns communicate the overall flow at a glance.</p>
          <p>Inside each card, the team can keep the brief, a checklist of acceptance steps and any files that reviewers need. A due date makes time-sensitive work easier to spot. Filtering the board by assignee helps a designer or developer focus without changing anyone else’s view of the project.</p>
          <p>When the project grows beyond one board, Denalify’s portfolio and dashboard views help you see activity across projects. That wider view still leads back to the actual tasks where decisions and progress are recorded.</p>
        </div>
      </div>
    </section>

    <section class="section-shell feature-section" aria-labelledby="kanban-questions">
      <div class="section-kicker">COMMON QUESTIONS</div>
      <h2 id="kanban-questions" class="feature-questions-title">Kanban boards, <em>in practice.</em></h2>
      <div class="feature-questions">
        <article><h3>Can I use more than three columns?</h3><p>Yes. The To Do, In Progress and Done flow is a starting point. Create columns for the stages that make sense for your project.</p></article>
        <article><h3>Can I filter a busy board?</h3><p>Yes. Use board filters such as assignee, priority, status, deadline and label to narrow down the visible work.</p></article>
        <article><h3>Do I have to use a board for every review?</h3><p>No. The same project also has other views, including a list and calendar. Choose the view that answers the question in front of your team.</p></article>
      </div>
    </section>

    <section class="feature-cta">
      <div class="section-shell feature-cta-inner">
        <div><div class="section-kicker">GET STARTED</div><h2>Make the work <em>visible.</em></h2><p>Create a free workspace, set up your first project board and give every task a clear next step.</p></div>
        <a class="button button-primary" href="https://app.denalify.com/auth/signup">Create your workspace <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </main>
</template>
