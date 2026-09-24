<script setup lang="ts">
definePageMeta({ layout: 'marketing' })

useSeoMeta({
  title: 'Project Management Software for Teams',
  description: 'Plan projects and manage team tasks with Kanban boards, shared documents and clear updates. Explore Denalify and start a free workspace.',
  ogTitle: 'Project management software for teams | Denalify',
  ogDescription: 'Bring tasks, Kanban boards, documents and team conversations into one workspace.',
})

defineOgImage('Denalify', {
  title: 'Project management, with the work in one place.',
  description: 'Tasks, Kanban boards, documents and team conversations.',
})

useSchemaOrg([
  {
    '@type': 'SoftwareApplication',
    '@id': 'https://denalify.com/#software',
    name: 'Denalify',
    url: 'https://app.denalify.com',
    description: 'Project management and team task management software with Kanban boards, shared documents and collaboration tools.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    featureList: [
      'Kanban boards and task lists',
      'Project documents and whiteboards',
      'Forms and workflow automations',
      'Portfolio views and activity history',
      'Team comments and file sharing',
    ],
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'EUR',
      url: 'https://app.denalify.com/auth/signup',
    },
  },
])

const features = [
  { number: '01', title: 'See the work clearly', text: 'Move from a Kanban board to a list or calendar without losing the story behind every task.', icon: '▦' },
  { number: '02', title: 'Keep context close', text: 'Documents, comments, files and a shared whiteboard live beside the project—not in another tab.', icon: '✳' },
  { number: '03', title: 'Make progress visible', text: 'Bring multiple projects together with a portfolio view, analytics and activity history.', icon: '↗' },
  { number: '04', title: 'Connect the tools you use', text: 'Link work to GitHub and receive updates through Slack or Discord. Automations and webhooks handle repeatable steps.', icon: '⤴' },
]

const workflow = [
  { step: 'Capture', title: 'Ideas have somewhere to land.', text: 'Turn requests into work with forms, tasks and a shared place to discuss the next move.' },
  { step: 'Shape', title: 'Give every project its context.', text: 'Plan visually, write the brief and connect the tasks that depend on one another.' },
  { step: 'Move', title: 'Keep momentum without the noise.', text: 'Use boards, views and updates to know what is moving and what needs attention.' },
]
</script>

<template>
  <main>
    <section class="hero section-shell" aria-labelledby="hero-title">
      <div class="hero-copy">
        <div class="eyebrow"><span class="eyebrow-line" /> PROJECTS, TASKS AND PEOPLE IN SYNC.</div>
        <h1 id="hero-title">Project management <em>made clear.</em></h1>
        <p class="hero-lede">Denalify is project management software for teams that want a clear view of their work. Plan projects, track tasks on a Kanban board and keep the conversation beside the work.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="https://app.denalify.com/auth/signup">Start for free <span aria-hidden="true">↗</span></a>
          <a class="text-link" href="#product">Explore the product <span aria-hidden="true">↓</span></a>
        </div>
        <p class="small-note">No credit card required · Free plan available</p>
      </div>
      <div class="hero-art" aria-label="Illustrative preview of a Denalify project board">
        <div class="art-index"><span>FIG. 01</span><span>THE WORKSPACE, IN MOTION</span></div>
        <ProductPreview />
        <div class="art-foot"><span>From idea to done, without losing the thread.</span><span>↘</span></div>
      </div>
    </section>

    <div class="marquee-bar" aria-label="Product capabilities">
      <div class="section-shell marquee-inner"><span>BOARD & LIST</span><span aria-hidden="true">✳</span><span>DOCS & WHITEBOARD</span><span aria-hidden="true">✳</span><span>FORMS & AUTOMATIONS</span><span aria-hidden="true">✳</span><span>PORTFOLIO & ANALYTICS</span></div>
    </div>

    <section id="product" class="section-shell section-space intro-section">
      <div class="section-kicker"><span>01 / THE PRODUCT</span><span class="tiny-rule" /></div>
      <div class="intro-grid">
        <h2>Less managing work.<br><em>More making it happen.</em></h2>
        <p>Work is rarely just a list of tasks. It is ownership, decisions, files and conversations. Denalify connects them in one workspace so the team can see what is due, what is blocked and what comes next.</p>
      </div>
      <div class="feature-grid">
        <article v-for="feature in features" :key="feature.number" class="feature-tile">
          <div class="feature-top"><span>{{ feature.number }}</span><span class="feature-icon" aria-hidden="true">{{ feature.icon }}</span></div>
          <h3>{{ feature.title }}</h3><p>{{ feature.text }}</p>
        </article>
      </div>
    </section>

    <section class="section-shell section-space product-paths" aria-labelledby="product-paths-title">
      <div class="section-kicker"><span>02 / WORK YOUR WAY</span><span class="tiny-rule" /></div>
      <div class="intro-grid">
        <h2 id="product-paths-title">The right view for<br><em>the work at hand.</em></h2>
        <p>Start with the tasks your team owns, then zoom out to the flow of a whole project. These are connected parts of the same workspace, with the same people, files and updates.</p>
      </div>
      <div class="product-path-grid">
        <article class="product-path-card">
          <span class="product-path-label">TEAM TASKS / 01</span>
          <h3>Know who is doing what.</h3>
          <p>Create tasks with assignees, deadlines, priorities, checklists and dependencies. Keep comments and attachments on the task so a handoff has its context.</p>
          <NuxtLink to="/task-management">Explore team task management <span aria-hidden="true">↗</span></NuxtLink>
        </article>
        <article class="product-path-card">
          <span class="product-path-label">KANBAN BOARDS / 02</span>
          <h3>See the work move.</h3>
          <p>Arrange tasks in project columns, move them as work progresses and filter the board when you need to focus. Switch to a list or calendar without rebuilding the project.</p>
          <NuxtLink to="/kanban-boards">Explore Kanban boards <span aria-hidden="true">↗</span></NuxtLink>
        </article>
      </div>
    </section>

    <section id="workflow" class="workflow-section section-space">
      <div class="section-shell">
        <div class="section-kicker"><span>03 / HOW IT FLOWS</span><span class="tiny-rule" /></div>
        <div class="workflow-heading"><h2>One flow, from<br><em>“what if” to “done.”</em></h2><p>Give ideas a path forward, make responsibilities visible and keep the whole team aligned along the way.</p></div>
        <div class="workflow-grid">
          <article v-for="(item, index) in workflow" :key="item.step" class="workflow-card">
            <div class="workflow-card-top"><span>0{{ index + 1 }}</span><span aria-hidden="true">↗</span></div>
            <div class="step-pill">{{ item.step }}</div>
            <h3>{{ item.title }}</h3><p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="showcase" class="section-shell section-space screenshot-section">
      <div class="section-kicker"><span>04 / A CLOSER LOOK</span><span class="tiny-rule" /></div>
      <div class="screenshot-heading"><h2>See your project<br><em>at a glance.</em></h2><p>This is an actual Denalify board. Columns show what is to do, in progress and done; each card keeps a task’s priority, due date and checklist progress close.</p></div>
      <div class="real-screenshot"><img src="/ss/boards.jpg" alt="Denalify Kanban board with To Do, In Progress and Done task columns, priorities and due dates" loading="lazy" width="1280" height="716"><div class="screenshot-caption"><span>ACTUAL PRODUCT SCREEN</span><span>CLASSIC BOARD VIEW / DENALIFY</span></div></div>
    </section>

    <section id="community" class="community-section section-space">
      <div class="section-shell community-grid">
        <div class="community-mark" aria-hidden="true"><span>↗</span><span>↗</span><span>↗</span></div>
        <div><div class="section-kicker">05 / BUILT WITH YOU</div><h2>A product that<br><em>listens back.</em></h2><p>Denalify is being built around the teams who use it. Tell us what slows you down, what helps you move, and what we should build next. Your feedback shapes the roadmap.</p><a class="text-link text-link-light" href="mailto:contact@denalify.com?subject=Denalify%20product%20feedback">Share an idea <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section id="pricing" class="section-shell section-space pricing-section">
      <div class="section-kicker"><span>06 / GET STARTED</span><span class="tiny-rule" /></div>
      <div class="pricing-grid"><div><h2>Start small.<br><em>Build something big.</em></h2><p>Try Denalify with a free workspace. Bring your team in and choose a paid plan when you need more room.</p><a class="button button-primary" href="https://app.denalify.com/auth/signup">Create your workspace <span aria-hidden="true">↗</span></a></div><div class="pricing-note"><div class="pricing-note-head">FREE WORKSPACE <span>↗</span></div><strong>€0</strong><span class="pricing-unit">to get started</span><ul><li>Up to 35 members</li><li>3 projects and 1 GB storage</li><li>Boards, tasks and Discord integration</li></ul><a href="https://app.denalify.com/auth/signup">See it for yourself <span aria-hidden="true">↗</span></a></div></div>
    </section>

    <section id="updates" class="updates-section"><div class="section-shell updates-grid"><div><div class="section-kicker">THE DENALIFY NEWSLETTER</div><h2>See what’s next for Denalify.</h2><p>Get launch news, practical product updates and a short look at what we’re building next. No noise, and you can leave with one click.</p></div><EmailSignupForm /></div></section>
  </main>
</template>
