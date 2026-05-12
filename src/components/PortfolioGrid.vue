<script setup>
import { ref, computed, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const projects = ref([])

const filter = ref('All')
const sortBy = ref('Latest') // 'Latest', 'Most Views', 'Recommended'
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
    if (sortBy.value === 'Most Views') {
      return (b.views || 0) - (a.views || 0)
    } else if (sortBy.value === 'Recommended') {
      if (a.recommended === b.recommended) {
        // Fallback to latest
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      }
      return a.recommended ? -1 : 1
    } else { // Latest
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    }
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredProjects.value.length / itemsPerPage)
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProjects.value.slice(start, end)
})
</script>

<template>
  <section id="portfolio" class="py-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-4">My Portfolio</h2>
        <div class="w-20 h-1 bg-brand-blue mx-auto rounded mb-8"></div>
        
        <div class="flex justify-center gap-4 flex-wrap mb-6">
          <button @click="setFilter('All')" :class="[filter === 'All' ? 'bg-brand-blue text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700']" class="px-6 py-2 rounded-full font-medium transition-colors">
            All
          </button>
          <button @click="setFilter('Graphic Design')" :class="[filter === 'Graphic Design' ? 'bg-brand-blue text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700']" class="px-6 py-2 rounded-full font-medium transition-colors">
            Graphic Design
          </button>
          <button @click="setFilter('Coding Projects')" :class="[filter === 'Coding Projects' ? 'bg-brand-blue text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700']" class="px-6 py-2 rounded-full font-medium transition-colors">
            Coding Projects
          </button>
        </div>
        
        <div class="flex justify-end items-center max-w-sm mx-auto sm:max-w-full">
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Sort by:</span>
            <select v-model="sortBy" @change="currentPage = 1" class="bg-white dark:bg-[#1a233a] border border-gray-200 dark:border-gray-700 text-brand-dark dark:text-brand-light rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-brand-blue outline-none shadow-sm">
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
      
      <!-- Using grid layout with fixed image container for neatness -->
      <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="project in paginatedProjects" 
          :key="project.id" 
          :class="[
            'group rounded-2xl overflow-hidden bg-white dark:bg-[#1a233a] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-800 flex flex-col relative',
            (project.format === 'wide' || project.format === 'ig-story') ? 'sm:col-span-2 lg:col-span-3' : ''
          ]"
        >
          
          <div v-if="project.recommended" class="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-lg z-10 flex items-center gap-1">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            Recommended
          </div>

          <div 
            :class="[
              'relative overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center',
              (!project.format || project.format === 'standard') ? 'aspect-[3/4]' : '',
              project.format === 'ig-story' ? 'aspect-[9/16] w-full max-w-sm mx-auto' : '',
              project.format === 'wide' ? 'aspect-[9/4] w-full' : ''
            ]"
          >
            <!-- Image with 3:4 ratio cropped cleanly to fit -->
            <img :src="project.imageURL || 'https://via.placeholder.com/500'" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
               <div class="flex items-center justify-between w-full">
                 <span v-if="project.views > 0" class="text-white text-sm font-medium flex items-center gap-1">
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                   {{ project.views }}
                 </span>
                 <a :href="project.link" target="_blank" class="bg-brand-blue text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors ml-auto">View Project</a>
               </div>
            </div>
          </div>
          <div class="p-6 flex-grow flex flex-col">
            <div class="text-xs font-bold text-brand-blue uppercase tracking-wider mb-2">{{ project.category }}</div>
            <h3 class="text-xl font-bold mb-2 text-brand-dark dark:text-brand-light">{{ project.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{{ project.desc }}</p>
            <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
              <span class="text-xs font-medium text-gray-500 dark:text-gray-400">Tech: {{ project.tech }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-4">
        <button 
          @click="currentPage > 1 && currentPage--" 
          :disabled="currentPage === 1"
          class="px-6 py-2 rounded-full bg-white dark:bg-[#1a233a] border border-gray-200 dark:border-gray-700 text-brand-dark dark:text-brand-light disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium shadow-sm"
        >
          Previous
        </button>
        <span class="text-gray-600 dark:text-gray-400 font-medium px-4">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button 
          @click="currentPage < totalPages && currentPage++" 
          :disabled="currentPage === totalPages"
          class="px-6 py-2 rounded-full bg-white dark:bg-[#1a233a] border border-gray-200 dark:border-gray-700 text-brand-dark dark:text-brand-light disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium shadow-sm"
        >
          Next
        </button>
      </div>
      
      <div v-if="!loading && filteredProjects.length === 0" class="text-center py-20 text-gray-500 dark:text-gray-400">
        No projects found in this category.
      </div>
    </div>
  </section>
</template>
