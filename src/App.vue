<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'

const STORAGE_KEY = 'portfolio-theme'
const isDarkMode = ref(false)
const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 0
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  localStorage.setItem(STORAGE_KEY, isDarkMode.value ? 'dark' : 'light')
}

const applyTheme = (value) => {
  isDarkMode.value = value
  document.documentElement.classList.toggle('dark', value)
  document.documentElement.style.colorScheme = value ? 'dark' : 'light'
  document.body.style.colorScheme = value ? 'dark' : 'light'
}

onMounted(() => {
  const storedTheme = localStorage.getItem(STORAGE_KEY)

  if (storedTheme === 'dark') {
    applyTheme(true)
  } else if (storedTheme === 'light') {
    applyTheme(false)
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme(true)
  } else {
    applyTheme(false)
  }

  window.addEventListener('scroll', onScroll)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="min-h-screen transition-colors duration-300">
    <Navbar :isDarkMode="isDarkMode" :scrolled="scrolled" @toggle-dark-mode="toggleDarkMode" />
    <main>
      <router-view />
    </main>
  </div>
</template>
