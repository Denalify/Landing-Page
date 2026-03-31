<template>
  <section class="relative py-28 overflow-hidden">
    <div class="glow-blob w-[500px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,217,255,0.04)]" />

    <div class="relative z-10 max-w-7xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-14 flex flex-col items-center gap-4">
        <AnimateOnScroll>
          <SectionLabel>Comparison</SectionLabel>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="100">
          <h2 class="text-3xl sm:text-4xl font-bold text-[#f0f6ff]">
            How Denalify
            <span class="text-gradient-cyan">compares</span>
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll :delay="200">
          <p class="text-[#8892a4] text-lg max-w-xl">
            More power, fairer pricing — flat per-workspace, not per-user.
          </p>
        </AnimateOnScroll>
      </div>

      <!-- Table wrapper — horizontal scroll on mobile -->
      <AnimateOnScroll :delay="100">
        <div class="overflow-x-auto rounded-2xl border border-[rgba(0,217,255,0.12)]">
          <table class="w-full min-w-[720px] text-sm border-collapse">
            <!-- Header row -->
            <thead>
              <tr>
                <!-- Feature column -->
                <th class="text-left px-5 py-4 bg-[#0a0e1a] text-[#8892a4] text-xs font-medium uppercase tracking-wider sticky left-0 z-10 w-44 border-b border-r border-[rgba(255,255,255,0.06)]">
                  Feature
                </th>
                <!-- Tool columns -->
                <th
                  v-for="tool in tools"
                  :key="tool.name"
                  class="px-4 py-4 text-center text-xs font-semibold border-b border-[rgba(255,255,255,0.06)]"
                  :class="tool.highlight
                    ? 'bg-[rgba(0,217,255,0.06)] border-t-2 border-t-[#00d9ff] text-[#00d9ff]'
                    : 'bg-[#0a0e1a] text-[#8892a4]'"
                >
                  <div class="flex flex-col items-center gap-1">
                    <span>{{ tool.name }}</span>
                    <span
                      v-if="tool.highlight"
                      class="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#00d9ff] text-[#0a0e1a] uppercase tracking-wider"
                    >You</span>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(row, ri) in features"
                :key="row.label"
                :class="ri % 2 === 0 ? 'bg-[rgba(255,255,255,0.01)]' : 'bg-transparent'"
              >
                <!-- Feature label -->
                <td class="px-5 py-3.5 text-[#c8d3e0] text-xs font-medium sticky left-0 z-10 border-r border-[rgba(255,255,255,0.06)]"
                  :class="ri % 2 === 0 ? 'bg-[rgba(10,14,26,0.98)]' : 'bg-[#0a0e1a]'"
                >
                  {{ row.label }}
                </td>
                <!-- Values -->
                <td
                  v-for="tool in tools"
                  :key="tool.name"
                  class="px-4 py-3.5 text-center"
                  :class="tool.highlight ? 'bg-[rgba(0,217,255,0.04)]' : ''"
                >
                  <CellValue :value="row.values[tool.key]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AnimateOnScroll>

      <!-- Footnote -->
      <AnimateOnScroll :delay="200">
        <p class="text-center text-[#8892a4] text-xs mt-6">
          * Comparison based on publicly available pricing and feature pages as of 2025. Features and pricing may change.
        </p>
      </AnimateOnScroll>
    </div>
  </section>
</template>

<script setup lang="ts">
// Sub-component for rendering cell values inline
const CellValue = defineComponent({
  props: { value: { type: [String, Boolean], required: true } },
  setup(props) {
    return () => {
      const v = props.value
      if (v === true || v === '✓') {
        return h('span', { class: 'inline-flex items-center justify-center' }, [
          h('svg', { class: 'w-4 h-4 text-[#00d9ff]', viewBox: '0 0 16 16', fill: 'none' }, [
            h('path', { d: 'M3 8l3.5 3.5L13 4', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
          ]),
        ])
      }
      if (v === false || v === '✗') {
        return h('span', { class: 'inline-flex items-center justify-center' }, [
          h('svg', { class: 'w-4 h-4 text-[#8892a4]/50', viewBox: '0 0 16 16', fill: 'none' }, [
            h('path', { d: 'M4 4l8 8M12 4l-8 8', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' }),
          ]),
        ])
      }
      // String with optional note (e.g. "✓ Pro+")
      const str = String(v)
      if (str.startsWith('✓')) {
        const note = str.slice(1).trim()
        return h('span', { class: 'inline-flex flex-col items-center gap-0.5' }, [
          h('svg', { class: 'w-4 h-4 text-[#00d9ff]', viewBox: '0 0 16 16', fill: 'none' }, [
            h('path', { d: 'M3 8l3.5 3.5L13 4', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
          ]),
          note ? h('span', { class: 'text-[9px] text-[#8892a4] leading-none' }, note) : null,
        ])
      }
      if (str.startsWith('✗')) {
        const note = str.slice(1).trim()
        return h('span', { class: 'inline-flex flex-col items-center gap-0.5' }, [
          h('svg', { class: 'w-4 h-4 text-[#8892a4]/50', viewBox: '0 0 16 16', fill: 'none' }, [
            h('path', { d: 'M4 4l8 8M12 4l-8 8', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round' }),
          ]),
          note ? h('span', { class: 'text-[9px] text-[#8892a4] leading-none' }, note) : null,
        ])
      }
      // Plain text (e.g. pricing)
      return h('span', { class: 'text-xs text-[#c8d3e0]' }, str)
    }
  },
})

const tools = [
  { key: 'denalify', name: 'Denalify', highlight: true },
  { key: 'trello',   name: 'Trello',   highlight: false },
  { key: 'asana',    name: 'Asana',    highlight: false },
  { key: 'monday',   name: 'Monday',   highlight: false },
  { key: 'clickup',  name: 'ClickUp',  highlight: false },
  { key: 'linear',   name: 'Linear',   highlight: false },
]

const features = [
  {
    label: 'Free plan — members',
    values: {
      denalify: '35 users',
      trello:   'Unlimited*',
      asana:    '15 users',
      monday:   '2 users',
      clickup:  'Unlimited*',
      linear:   'Unlimited*',
    },
  },
  {
    label: 'Pricing model',
    values: {
      denalify: 'Per workspace',
      trello:   'Per user',
      asana:    'Per user',
      monday:   'Per user',
      clickup:  'Per user',
      linear:   'Per user',
    },
  },
  {
    label: 'Starting paid price',
    values: {
      denalify: '€8 / workspace',
      trello:   '$6 / user',
      asana:    '$13 / user',
      monday:   '$12 / user',
      clickup:  '$10 / user',
      linear:   '$8 / user',
    },
  },
  {
    label: 'Kanban boards',
    values: {
      denalify: '✓',
      trello:   '✓',
      asana:    '✓',
      monday:   '✓',
      clickup:  '✓',
      linear:   '✓',
    },
  },
  {
    label: 'Timeline / Gantt view',
    values: {
      denalify: '✓',
      trello:   '✗',
      asana:    '✓ Starter+',
      monday:   '✓ Standard+',
      clickup:  '✓ Business+',
      linear:   '✓',
    },
  },
  {
    label: 'Built-in chat',
    values: {
      denalify: '✓',
      trello:   '✗',
      asana:    '✗',
      monday:   '✓ Paid',
      clickup:  '✓',
      linear:   '✗',
    },
  },
  {
    label: 'Discord integration',
    values: {
      denalify: '✓ Free plan',
      trello:   '✗',
      asana:    '✗',
      monday:   '✗',
      clickup:  '✗',
      linear:   '✗',
    },
  },
  {
    label: 'GitHub integration',
    values: {
      denalify: '✓ Paid',
      trello:   '✗',
      asana:    '✗',
      monday:   '✗',
      clickup:  '✓ Paid',
      linear:   '✓ All plans',
    },
  },
  {
    label: 'Advanced analytics',
    values: {
      denalify: '✓ Pro+',
      trello:   '✗',
      asana:    '✓ Advanced+',
      monday:   '✓ Pro+',
      clickup:  '✓ Business+',
      linear:   '✓',
    },
  },
  {
    label: 'SSO (SAML)',
    values: {
      denalify: '✓ Team',
      trello:   '✗ Enterprise',
      asana:    '✗ Enterprise',
      monday:   '✗ Enterprise',
      clickup:  '✗ Enterprise',
      linear:   '✓ Plus+',
    },
  },
  {
    label: 'Enforce 2FA',
    values: {
      denalify: '✓ Team',
      trello:   '✗',
      asana:    '✗',
      monday:   '✗',
      clickup:  '✗',
      linear:   '✗',
    },
  },
  {
    label: 'API access',
    values: {
      denalify: '✓ Team',
      trello:   '✓',
      asana:    '✓',
      monday:   '✓ Limits',
      clickup:  '✓ Business+',
      linear:   '✓ Free',
    },
  },
  {
    label: 'Audit logs',
    values: {
      denalify: '✓ Pro+',
      trello:   '✗ Enterprise',
      asana:    '✗ Enterprise+',
      monday:   '✗ Enterprise',
      clickup:  '✗ Enterprise',
      linear:   '✗ Enterprise',
    },
  },
]
</script>
