<template>
  <section class="relative min-h-screen flex items-center overflow-hidden pt-16">
    <!-- Background glows -->
    <div class="glow-blob w-[600px] h-[600px] top-[-100px] left-[-150px] bg-[rgba(0,217,255,0.12)]" />
    <div class="glow-blob w-[500px] h-[500px] bottom-[-50px] right-[-100px] bg-[rgba(59,130,246,0.1)]" />

    <!-- Grid pattern -->
    <div class="absolute inset-0 grid-pattern opacity-40" />

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
      <!-- Left: text + form -->
      <div class="flex flex-col gap-6">
        <AnimateOnScroll>
          <SectionLabel dot>Closed Beta — Now Accepting Signups</SectionLabel>
        </AnimateOnScroll>

        <AnimateOnScroll :delay="100">
          <h1 class="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#f0f6ff]">
            The Project Management Platform Your Team
            <span class="text-gradient-cyan"> Actually Wants</span>
            to Use
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll :delay="200">
          <p class="text-[#8892a4] text-lg leading-relaxed max-w-lg">
            Kanban boards, real-time dashboards, advanced analytics, and seamless integrations — all in one beautiful, fast workspace built for modern teams.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll :delay="300">
          <div class="flex flex-col gap-3">
            <EmailSignupForm variant="hero" />
            <p class="text-[#8892a4] text-xs">
              No credit card required. Early adopters get <span class="text-[#00d9ff]">3 months free</span> on any paid plan.
            </p>
          </div>
        </AnimateOnScroll>

        <!-- Social proof -->
        <AnimateOnScroll :delay="400">
          <div class="flex items-center gap-4 pt-2">
            <div class="flex -space-x-2">
              <div v-for="i in 4" :key="i" class="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#3b82f6] border-2 border-[#0a0e1a] flex items-center justify-center text-[10px] font-bold text-[#0a0e1a]">
                {{ ['A','M','J','S'][i-1] }}
              </div>
            </div>
            <p class="text-[#8892a4] text-sm">
              Join <span class="text-[#f0f6ff] font-semibold">250+</span> teams on the waitlist
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      <!-- Right: screenshot -->
      <AnimateOnScroll :delay="200" class="relative">
        <div class="relative">
          <!-- Glow behind screenshot -->
          <div class="absolute inset-0 glow-blob w-full h-full bg-[rgba(0,217,255,0.08)] scale-110 blur-3xl" />
          <!-- Screenshot -->
          <img
            src="/ss/dashboard-modern.png"
            alt="Denalify Dashboard"
            class="screenshot-frame w-full relative z-10"
            style="transform: perspective(1200px) rotateY(-4deg) rotateX(2deg);"
            loading="eager"
            width="800"
            height="500"
          />
          <!-- Floating badge: Integrations -->
          <div class="absolute -bottom-4 -left-4 z-20 glass-card px-4 py-3 flex items-center gap-2.5 shadow-xl hidden sm:flex">
            <div class="w-8 h-8 rounded-lg bg-[rgba(0,217,255,0.15)] flex items-center justify-center">
              <svg class="w-4 h-4 text-[#00d9ff]" viewBox="0 0 20 20" fill="none">
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3v5l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <p class="text-[#f0f6ff] text-xs font-semibold">Real-time sync</p>
              <p class="text-[#8892a4] text-xs">Always up to date</p>
            </div>
          </div>
          <!-- Floating badge: Teams -->
          <div class="absolute -top-4 -right-4 z-20 glass-card px-4 py-3 flex items-center gap-2.5 shadow-xl hidden sm:flex">
            <div class="w-8 h-8 rounded-lg bg-[rgba(59,130,246,0.15)] flex items-center justify-center">
              <svg class="w-4 h-4 text-[#3b82f6]" viewBox="0 0 20 20" fill="none">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm8 0a3 3 0 11-6 0 3 3 0 016 0zM1 17a7 7 0 0114 0M8 17a7 7 0 0114 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <p class="text-[#f0f6ff] text-xs font-semibold">Unlimited Teams</p>
              <p class="text-[#8892a4] text-xs">On Team plan</p>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#8892a4] animate-bounce">
      <p class="text-xs tracking-wider uppercase">Scroll to explore</p>
      <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
