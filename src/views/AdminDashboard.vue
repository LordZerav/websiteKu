<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase'

const router = useRouter()
const projects = ref([])
const loading = ref(true)
const isSubmitting = ref(false)
const editingId = ref(null)

const form = ref({
  title: '',
  category: 'Coding Projects',
  desc: '',
  imageURL: '',
  tech: '',
  link: '',
  views: 0,
  recommended: false
})

const fetchProjects = async () => {
  loading.value = true
  try {
    const querySnapshot = await getDocs(collection(db, "projects"))
    const fetched = []
    querySnapshot.forEach((doc) => {
      fetched.push({ id: doc.id, ...doc.data() })
    })
    projects.value = fetched
  } catch (error) {
    console.error("Error fetching projects: ", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProjects()
})

const getImageFormat = (url) => {
  return new Promise((resolve) => {
    if (!url) return resolve('standard')
    const img = new Image()
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight
      // IG Story (1080x1920) -> Ratio 0.5625
      if (Math.abs(ratio - (1080/1920)) < 0.05) {
        resolve('ig-story')
      } 
      // Wide (3240x1440) -> Ratio 2.25
      else if (Math.abs(ratio - (3240/1440)) < 0.05) {
        resolve('wide')
      } 
      else {
        resolve('standard')
      }
    }
    img.onerror = () => {
      resolve('standard') // Default fallback
    }
    img.src = url
  })
}

const saveProject = async () => {
  isSubmitting.value = true
  try {
    const format = await getImageFormat(form.value.imageURL)
    
    const projectData = {
      ...form.value,
      format,
      views: Number(form.value.views),
      // Only set createdAt for new projects
      ...( !editingId.value ? { createdAt: new Date().toISOString() } : {} )
    }

    if (editingId.value) {
      await updateDoc(doc(db, "projects", editingId.value), projectData)
      editingId.value = null
    } else {
      await addDoc(collection(db, "projects"), projectData)
    }
    form.value = { title: '', category: 'Coding Projects', desc: '', imageURL: '', tech: '', link: '', views: 0, recommended: false }
    await fetchProjects()
  } catch (error) {
    console.error("Error saving project: ", error)
  } finally {
    isSubmitting.value = false
  }
}

const editProject = (project) => {
  editingId.value = project.id
  form.value = { 
    title: project.title || '', 
    category: project.category || 'Coding Projects', 
    desc: project.desc || '', 
    imageURL: project.imageURL || '', 
    tech: project.tech || '', 
    link: project.link || '',
    views: project.views || 0,
    recommended: project.recommended || false
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  editingId.value = null
  form.value = { title: '', category: 'Coding Projects', desc: '', imageURL: '', tech: '', link: '', views: 0, recommended: false }
}

const deleteProject = async (id) => {
  if (confirm("Are you sure you want to delete this project?")) {
    try {
      await deleteDoc(doc(db, "projects", id))
      await fetchProjects()
    } catch (error) {
      console.error("Error deleting project: ", error)
    }
  }
}

const handleSignOut = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error("Error signing out: ", error)
  }
}
</script>

<template>
  <div class="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(110,168,255,0.18),_transparent_28%),radial-gradient(circle_at_85%_0%,_rgba(124,92,255,0.12),_transparent_24%)]"></div>
    <div class="mx-auto max-w-6xl">
      <div class="mb-8 flex items-center justify-between rounded-[2rem] glass-panel-strong px-6 py-5">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">Admin</p>
          <h1 class="text-3xl font-bold text-primary">Dashboard</h1>
        </div>
        <button @click="handleSignOut" class="rounded-full bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600">
          Sign Out
        </button>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Add/Edit Project Form -->
        <div class="lg:col-span-1">
          <div class="glass-panel-strong p-6 rounded-[2rem]">
            <h2 class="text-xl font-bold mb-6 text-primary">
              {{ editingId ? 'Edit Project' : 'Add New Project' }}
            </h2>
            <form @submit.prevent="saveProject" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-secondary mb-1">Title</label>
                <input v-model="form.title" type="text" required class="w-full rounded-2xl border border-white/20 bg-white/60 px-3 py-2 text-primary outline-none focus:ring-2 focus:ring-brand-blue dark:bg-white/5">
              </div>
              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-secondary mb-1">Category</label>
                  <select v-model="form.category" class="w-full rounded-2xl border border-white/20 bg-white/60 px-3 py-2 text-primary outline-none focus:ring-2 focus:ring-brand-blue dark:bg-white/5">
                    <option>Coding Projects</option>
                    <option>Graphic Design</option>
                  </select>
                </div>
                <div class="w-24">
                  <label class="block text-sm font-medium text-secondary mb-1">Views</label>
                  <input v-model="form.views" type="number" min="0" required class="w-full rounded-2xl border border-white/20 bg-white/60 px-3 py-2 text-primary outline-none focus:ring-2 focus:ring-brand-blue dark:bg-white/5">
                </div>
              </div>
              
              <div class="flex items-center gap-2 mt-2 mb-2">
                <input v-model="form.recommended" type="checkbox" id="recommended" class="w-4 h-4 text-brand-blue rounded border-gray-300 focus:ring-brand-blue">
                <label for="recommended" class="text-sm font-medium text-secondary cursor-pointer">Mark as Recommended</label>
              </div>

              <div>
                <label class="block text-sm font-medium text-secondary mb-1">Description</label>
                <textarea v-model="form.desc" required rows="3" class="w-full rounded-2xl border border-white/20 bg-white/60 px-3 py-2 text-primary outline-none focus:ring-2 focus:ring-brand-blue dark:bg-white/5"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-secondary mb-1">Image URL</label>
                <input v-model="form.imageURL" type="url" required class="w-full rounded-2xl border border-white/20 bg-white/60 px-3 py-2 text-primary outline-none focus:ring-2 focus:ring-brand-blue dark:bg-white/5">
              </div>
              <div>
                <label class="block text-sm font-medium text-secondary mb-1">Tech Stack / Tools</label>
                <input v-model="form.tech" type="text" required class="w-full rounded-2xl border border-white/20 bg-white/60 px-3 py-2 text-primary outline-none focus:ring-2 focus:ring-brand-blue dark:bg-white/5" placeholder="e.g., Vue.js, Tailwind">
              </div>
              <div>
                <label class="block text-sm font-medium text-secondary mb-1">Live/Demo Link</label>
                <input v-model="form.link" type="url" required class="w-full rounded-2xl border border-white/20 bg-white/60 px-3 py-2 text-primary outline-none focus:ring-2 focus:ring-brand-blue dark:bg-white/5">
              </div>
              
              <div class="pt-2 flex gap-2">
                <button type="submit" :disabled="isSubmitting" class="flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-brand-blue to-cyan-300 px-4 py-2 font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-70">
                  <span v-if="isSubmitting" class="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                  {{ editingId ? 'Update' : 'Save' }}
                </button>
                <button v-if="editingId" type="button" @click="cancelEdit" class="rounded-2xl bg-white/50 px-4 py-2 font-bold text-primary transition-colors hover:bg-white/70 dark:bg-white/5 dark:hover:bg-white/10">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Projects List -->
        <div class="lg:col-span-2">
          <div class="glass-panel-strong p-6 rounded-[2rem]">
             <h2 class="text-xl font-bold mb-6 text-primary">Manage Projects</h2>
             
             <div v-if="loading" class="flex justify-center py-10">
               <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-blue"></div>
             </div>
             
             <div v-else-if="projects.length === 0" class="text-center py-10 text-secondary">
               No projects found. Add one to get started.
             </div>

             <div v-else class="space-y-4">
               <div v-for="project in projects" :key="project.id" class="relative flex items-center justify-between rounded-2xl border border-white/20 bg-white/40 p-4 dark:bg-white/5">
                 <div v-if="project.recommended" class="absolute -top-2 -left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full shadow">
                   ★ Recommended
                 </div>
                 <div class="flex items-center space-x-4">
                   <img :src="project.imageURL" class="w-16 h-16 object-cover rounded-lg" alt="thumbnail" />
                   <div>
                     <h3 class="font-bold text-primary">{{ project.title }}</h3>
                     <div class="flex items-center gap-3">
                       <p class="text-xs text-secondary">{{ project.category }}</p>
                       <p class="text-xs text-secondary flex items-center gap-1">
                         <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                         {{ project.views || 0 }}
                       </p>
                     </div>
                   </div>
                 </div>
                 <div class="flex items-center space-x-2">
                   <button @click="editProject(project)" class="p-2 text-brand-blue hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors" title="Edit">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                   </button>
                   <button @click="deleteProject(project.id)" class="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Delete">
                     <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                   </button>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
