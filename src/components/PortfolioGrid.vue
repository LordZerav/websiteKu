<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const projects = ref([])
const filter = ref('All')
const sortBy = ref('Latest')
const loading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 6

onMounted(async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"))
    if (!querySnapshot.empty) {
      const fetchedProjects = []
      querySnapshot.forEach((doc) => {
        fetchedProjects.push({ id: doc.id, ...doc.data() })
      })
      projects.value = fetchedProjects
    }
  } catch (error) {
    console.log("Firebase not configured or no connection.", error)
  } finally {
    loading.value = false
  }
})

const setFilter = (newFilter) => {
  filter.value = newFilter
  currentPage.value = 1
}

const filteredProjects = computed(() => {
  let result = projects.value
  if (filter.value !== 'All') {
    result = result.filter(p => p.category === filter.value)
  }
  return result.slice().sort((a, b) => {
    if (sortBy.value === 'Most Views') return (b.views || 0) - (a.views || 0)
    if (sortBy.value === 'Recommended') {
      if (a.recommended === b.recommended)
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      return a.recommended ? -1 : 1
    }
    return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  })
})

const techIcons = {
  vue: `<svg viewBox="0 0 256 221" fill="none"><path d="M204.8 0H256L128 221 0 0h79.7L128 83.4 175.2 0h29.6z" fill="#42B883"/><path d="M0 0h49.8l78.2 137.8L206.2 0H256L128 221 0 0z" fill="#35495E"/></svg>`,
  figma: `<svg viewBox="0 0 256 384" fill="none"><path d="M64 0h64c35.3 0 64 28.7 64 64s-28.7 64-64 64H64V0zm0 128h64c35.3 0 64 28.7 64 64s-28.7 64-64 64H64V128z" fill="#F24E1E"/><path d="M64 256h64c35.3 0 64 28.7 64 64s-28.7 64-64 64s-64-28.7-64-64v-64z" fill="#A259FF"/><path d="M64 256h64c35.3 0 64 28.7 64 64s-28.7 64-64 64H64v-64z" fill="#1ABCFE"/><path d="M64 128h64c35.3 0 64 28.7 64 64s-28.7 64-64 64H64c-35.3 0-64-28.7-64-64s28.7-64 64-64z" fill="#0ACF83"/></svg>`,
  vscode: `<svg viewBox="0 0 256 256" fill="none"><path d="M194.5 22 86.4 102.1 35.7 60.7 0 78.1v99.8l35.7 17.4 50.7-41.4 108.1 80.1 61.5-30.9V52.9L194.5 22zm0 172.7-85.9-66.8 85.9-66.8v133.6z" fill="#007ACC"/></svg>`,
  firebase: `<svg viewBox="0 0 256 256" fill="none"><path d="M98.4 22 44.7 141.1 87.1 112.7 98.4 22zm59.3 0-17.4 104.4 30.1 24 48.5-63.1L157.7 22zm-12.4 133.7-29.5 26.8 36.5 21.8 39.1-23.6-46.1-25z" fill="#FFCA28"/><path d="m98.4 22 47.8 71.6-47.8 61.1-53.7-13.6L98.4 22z" fill="#FFA000"/><path d="m145.3 93.6-46.9 61.1 18.5 41.8 29.5-26.8 34-77.2-35.1 1.1z" fill="#F57C00"/></svg>`,
  tailwind: `<svg viewBox="0 0 256 256" fill="none"><path d="M128 51.2c-35.2 0-57.6 17.6-67.2 52.8 14.4-17.6 31.2-24 50.4-19.2 11.2 2.8 19.2 11.1 28 20.3C153.6 118.4 168 128 198.4 128c35.2 0 57.6-17.6 67.2-52.8-14.4 17.6-31.2 24-50.4 19.2-11.2-2.8-19.2-11.1-28-20.3C102.4 61.6 88 51.2 128 51.2zM60.8 128C25.6 128 3.2 145.6-6.4 180.8c14.4-17.6 31.2-24 50.4-19.2 11.2 2.8 19.2 11.1 28 20.3C102.4 194.4 116.8 204.8 147.2 204.8c35.2 0 57.6-17.6 67.2-52.8-14.4 17.6-31.2 24-50.4 19.2-11.2-2.8-19.2-11.1-28-20.3C86.4 138.4 72 128 60.8 128z" fill="#38BDF8"/></svg>`,
  adobe: `<svg viewBox="0 0 256 256" fill="none"><path d="M50 208 123 48l73 160h-37l-12-28H98l-11 28H50zm57-57h38l-19-44-19 44z" fill="#FF0000"/></svg>`,
  canva: `<svg viewBox="0 0 256 256" fill="none"><circle cx="128" cy="128" r="96" fill="#00C4CC"/><path d="M144 85c-19 0-37 16-37 43 0 25 17 42 39 42 13 0 25-5 34-14l-14-14c-5 5-11 8-19 8-13 0-22-10-22-23 0-14 8-24 20-24 7 0 13 2 18 7l13-15c-10-8-21-10-32-10z" fill="#fff"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2 4 6v12l8 4 8-4V6l-8-4z" stroke="currentColor" stroke-width="1.8"/><path d="M12 6v12" stroke="currentColor" stroke-width="1.8"/></svg>`
}

const normalizeTechLabel = (label = '') => label.toLowerCase().replace(/[^a-z0-9]+/g, '')

const splitTechList = (tech = '') => {
  return tech
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
}

const iconForTech = (label) => {
  const key = normalizeTechLabel(label)
  if (key.includes('vue')) return techIcons.vue
  if (key.includes('figma')) return techIcons.figma
  if (key.includes('vscode') || key.includes('visualstudiocode')) return techIcons.vscode
  if (key.includes('firebase')) return techIcons.firebase
  if (key.includes('tailwind')) return techIcons.tailwind
  if (key.includes('adobe') || key.includes('photoshop') || key.includes('illustrator') || key.includes('premiere') || key.includes('aftereffects')) return techIcons.adobe
  if (key.includes('canva') || key.includes('affinity')) return techIcons.canva
  return techIcons.default
}

const getImageContainerClass = () => {
  return 'relative w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 aspect-[4/3]'
}

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProjects.value.length / itemsPerPage)))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProjects.value.slice(start, start + itemsPerPage)
})

const canGoNext = computed(() => currentPage.value < totalPages.value)
const canGoPrev = computed(() => currentPage.value > 1)

const goToPage = (page) => {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}
</script>

<template>
  <section id="portfolio" class="section-shell py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-10 flex flex-col gap-6 text-center">
        <div>
          <span class="text-sm font-bold uppercase tracking-[0.3em] text-brand-blue">Selected Work</span>
          <h2 class="mt-3 font-display text-3xl font-black tracking-tight text-primary sm:text-5xl">My Portfolio</h2>
          <p class="mx-auto mt-4 max-w-2xl text-secondary">Kumpulan project coding dan graphic design yang saya tampilkan dalam layout masonry responsif. Tiap kartu tetap mengikuti rasio media yang sudah dipakai di data project.</p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <button @click="setFilter('All')" :class="filter === 'All' ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/20' : 'glass-panel text-secondary hover:text-primary'" class="rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300">All</button>
          <button @click="setFilter('Graphic Design')" :class="filter === 'Graphic Design' ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/20' : 'glass-panel text-secondary hover:text-primary'" class="rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300">Graphic Design</button>
          <button @click="setFilter('Coding Projects')" :class="filter === 'Coding Projects' ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/20' : 'glass-panel text-secondary hover:text-primary'" class="rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300">Coding Projects</button>
          <div class="glass-panel flex items-center gap-3 rounded-full px-4 py-2.5">
            <span class="text-xs font-semibold uppercase tracking-[0.25em] text-secondary">Sort</span>
            <select v-model="sortBy" class="bg-transparent text-sm font-semibold text-primary outline-none">
              <option>Latest</option>
              <option>Recommended</option>
              <option>Most Views</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center items-center h-40">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>

      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="project in paginatedProjects"
          :key="project.id"
          class="group overflow-hidden rounded-[2rem] glass-panel-strong transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.16)]"
        >
          <div class="relative flex h-full flex-col">
            <div class="absolute inset-0 bg-gradient-to-br from-brand-blue/8 via-transparent to-cyan-300/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            <div class="absolute left-4 top-4 z-10 flex gap-2">
              <div v-if="project.recommended" class="rounded-full bg-amber-400 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-amber-950 shadow-lg shadow-amber-500/20">Recommended</div>
              <div class="rounded-full bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">{{ project.category }}</div>
            </div>

            <div :class="getImageContainerClass()">
              <img
                :src="project.imageURL || 'https://via.placeholder.com/500'"
                :alt="project.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black/72 via-black/12 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

              <div class="absolute inset-x-0 bottom-0 z-10 p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <div class="flex items-end justify-between gap-3">
                  <div class="max-w-[70%]">
                    <p class="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">{{ project.views || 0 }} views</p>
                    <h3 class="mt-1 text-lg font-black text-white">{{ project.title }}</h3>
                  </div>
                  <a :href="project.link" target="_blank" class="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5">
                    View
                  </a>
                </div>
              </div>
            </div>

            <div class="flex flex-1 flex-col space-y-3 p-4 sm:p-5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h3 class="text-lg font-black text-primary">{{ project.title }}</h3>
                  <p class="text-xs font-semibold uppercase tracking-[0.25em] text-brand-blue">{{ project.category }}</p>
                </div>
                <div v-if="project.views" class="rounded-full bg-white/50 px-3 py-2 text-xs font-semibold text-secondary dark:bg-white/5">
                  {{ project.views }} views
                </div>
              </div>

              <p class="text-sm leading-6 text-secondary" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                {{ project.desc }}
              </p>

              <div class="mt-auto flex flex-wrap gap-2">
                <span v-for="tech in splitTechList(project.tech).slice(0, 4)" :key="tech" class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/45 px-3 py-1.5 text-xs font-semibold text-primary dark:bg-white/5">
                  <span class="tech-icon flex h-4 w-4 items-center justify-center" v-html="iconForTech(tech)"></span>
                  <span>{{ tech }}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="mt-10 flex items-center justify-center gap-3">
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="!canGoPrev"
          class="rounded-full glass-panel px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <div class="flex items-center gap-2 rounded-full glass-panel px-3 py-2">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="page === currentPage ? 'bg-brand-blue text-white shadow-lg shadow-blue-500/20' : 'text-secondary hover:text-primary'"
            class="flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-sm font-semibold transition-all duration-300"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="!canGoNext"
          class="rounded-full glass-panel px-4 py-2 text-sm font-semibold text-primary transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>

      <div v-if="!loading && filteredProjects.length === 0"
        class="text-center py-20 text-secondary">
        No projects found in this category.
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech-icon :deep(svg) {
  width: 1rem;
  height: 1rem;
  display: block;
}
</style>