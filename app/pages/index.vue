<script setup lang="ts">
definePageMeta({ layout: 'marketing' })

useSeoMeta({
  title: 'Project management for teams that build together',
  description: 'Plan projects, manage Kanban tasks, share documents and automate workflows in one collaborative workspace built around your team.',
  ogTitle: 'Denalify — Make room for better work',
  ogDescription: 'From first idea to finished work, keep your team in sync with Denalify.',
})

defineOgImage('Denalify', {
  title: 'Great work happens together.',
  description: 'Projects, tasks, documents and conversations in one clear workspace.',
})

useSchemaOrg([
  {
    '@type': 'SoftwareApplication',
    '@id': 'https://denalify.com/#software',
    name: 'Denalify',
    url: 'https://app.denalify.com',
    description: 'Advanced project and task management for collaborative teams.',
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
  { number: '01', title: 'See the work clearly', text: 'Move from a Kanban board to a list or timeline without losing the story behind every task.', icon: '▦' },
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
        <div class="eyebrow"><span class="eyebrow-line" /> ONE WORKSPACE. MORE MOMENTUM.</div>
        <h1 id="hero-title">Great work happens <em>together.</em></h1>
        <p class="hero-lede">The place for plans, people and progress. Denalify brings everything your team needs to move an idea forward into one clear workspace.</p>
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
        <p>Work is rarely just a list of tasks. It is decisions, conversations and moving parts. Denalify keeps them connected so your team can focus on what comes next.</p>
      </div>
      <div class="feature-grid">
        <article v-for="feature in features" :key="feature.number" class="feature-tile">
          <div class="feature-top"><span>{{ feature.number }}</span><span class="feature-icon" aria-hidden="true">{{ feature.icon }}</span></div>
          <h3>{{ feature.title }}</h3><p>{{ feature.text }}</p>
        </article>
      </div>
    </section>

    <section id="workflow" class="workflow-section section-space">
      <div class="section-shell">
        <div class="section-kicker"><span>02 / HOW IT FLOWS</span><span class="tiny-rule" /></div>
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
      <div class="section-kicker"><span>03 / A CLOSER LOOK</span><span class="tiny-rule" /></div>
      <div class="screenshot-heading"><h2>Made to feel<br><em>good to use.</em></h2><p>Real product, real work. A focused interface that makes the next step obvious.</p></div>
      <div class="real-screenshot"><img src="/ss/boards.png" alt="Actual Denalify Kanban board in Classic dark mode" loading="lazy" width="1920" height="1000"><div class="screenshot-caption"><span>ACTUAL PRODUCT SCREEN</span><span>CLASSIC BOARD VIEW / DENALIFY</span></div></div>
    </section>

    <section id="community" class="community-section section-space">
      <div class="section-shell community-grid">
        <div class="community-mark" aria-hidden="true"><span>↗</span><span>↗</span><span>↗</span></div>
        <div><div class="section-kicker">04 / BUILT WITH YOU</div><h2>A product that<br><em>listens back.</em></h2><p>Denalify is being built around the teams who use it. Tell us what slows you down, what helps you move, and what we should build next. Your feedback shapes the roadmap.</p><a class="text-link text-link-light" href="mailto:contact@denalify.com?subject=Denalify%20product%20feedback">Share an idea <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>

    <section id="pricing" class="section-shell section-space pricing-section">
      <div class="section-kicker"><span>05 / GET STARTED</span><span class="tiny-rule" /></div>
      <div class="pricing-grid"><div><h2>Start small.<br><em>Build something big.</em></h2><p>Try Denalify with a free workspace. Bring your team in and choose a paid plan when you need more room.</p><a class="button button-primary" href="https://app.denalify.com/auth/signup">Create your workspace <span aria-hidden="true">↗</span></a></div><div class="pricing-note"><div class="pricing-note-head">FREE WORKSPACE <span>↗</span></div><strong>€0</strong><span class="pricing-unit">to get started</span><ul><li>Up to 35 members</li><li>3 projects and 1 GB storage</li><li>Boards, tasks and Discord integration</li></ul><a href="https://app.denalify.com/auth/signup">See it for yourself <span aria-hidden="true">↗</span></a></div></div>
    </section>

    <section id="updates" class="updates-section"><div class="section-shell updates-grid"><div><div class="section-kicker">STAY IN THE LOOP</div><h2>See what’s next for Denalify.</h2><p>Join the early-access list for product updates and an invitation when a place is available.</p></div><EmailSignupForm /></div></section>
  </main>
</template>
