<script setup>
const highlights = [
  'Desain visual yang rapi',
  'Project coding berbasis Vue',
  'Firebase untuk data portfolio',
]
</script>

<template>
  <section id="home" class="section-shell relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(110,168,255,0.18),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(124,92,255,0.12),_transparent_24%)]"></div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div class="space-y-7">
          <div class="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-secondary">
            Portofolio kreatif
          </div>

          <div class="space-y-4">
            <h1 class="max-w-3xl font-display text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              Halo, saya Amru Muiz.
            </h1>
            <p class="max-w-2xl text-base leading-7 text-secondary sm:text-lg">
              Saya bikin project coding dan desain visual dengan gaya yang clean, modern, dan tetap nyaman dilihat. Fokusnya sederhana: hasil yang rapi, fungsional, dan enak dipresentasikan.
            </p>
            <p class="max-w-2xl text-base leading-7 text-secondary sm:text-lg">
              Di sini kamu bisa lihat karya yang saya bangun pakai Vue.js, Firebase, dan tools desain yang saya pakai sehari-hari.
            </p>
          </div>

          <div class="flex flex-wrap gap-3">
            <a href="#portfolio" class="rounded-full bg-gradient-to-r from-brand-blue to-cyan-300 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 hover:-translate-y-0.5">
              Lihat Portfolio
            </a>
            <a href="#about" class="rounded-full glass-panel px-5 py-3 text-sm font-semibold text-primary transition-transform duration-300 hover:-translate-y-0.5">
              Tentang Saya
            </a>
          </div>

          <div class="grid gap-3 sm:grid-cols-3">
            <div v-for="item in highlights" :key="item" class="glass-panel rounded-2xl px-4 py-4 text-sm font-medium text-primary">
              {{ item }}
            </div>
          </div>
        </div>

        <div class="glass-panel-strong rounded-[2rem] p-6 sm:p-8">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Highlight</span>
              <span class="rounded-full bg-white/50 px-3 py-1 text-xs font-semibold text-primary dark:bg-white/10">Simple</span>
            </div>

            <div class="space-y-4">
              <div class="rounded-3xl border border-white/20 bg-white/50 p-5 dark:bg-white/5">
                <p class="text-xs uppercase tracking-[0.25em] text-secondary">Coding</p>
                <p class="mt-2 text-xl font-bold text-primary">Vue + Firebase</p>
                <p class="mt-2 text-sm leading-6 text-secondary">UI modern, data tetap nyambung ke backend yang sudah ada.</p>
              </div>

              <div class="rounded-3xl border border-white/20 bg-white/50 p-5 dark:bg-white/5">
                <p class="text-xs uppercase tracking-[0.25em] text-secondary">Design</p>
                <p class="mt-2 text-xl font-bold text-primary">Graphic work</p>
                <p class="mt-2 text-sm leading-6 text-secondary">Layout visual yang clean, berkarakter, dan tetap enak dibaca.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto mt-10 flex max-w-7xl items-center justify-center px-4 text-secondary sm:px-6 lg:px-8">
      <a href="#about" class="inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.35em] transition-transform duration-300 hover:-translate-y-1">
        <span>Scroll</span>
        <svg class="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </div>
  </section>
</template>