<script setup>
import { defineProps } from 'vue'

// Props: dark mode flag and scroll flag
defineProps({
  isDarkMode: Boolean,
  scrolled: Boolean
})
</script>

<template>
  <nav :class="['fixed inset-x-0 top-0 z-50 transition-all duration-300', scrolled ? 'py-3' : 'py-5']">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div :class="['glass-panel flex h-16 items-center justify-between rounded-full px-4 sm:px-6 transition-all duration-300', scrolled ? 'shadow-2xl shadow-slate-900/10' : 'shadow-lg shadow-slate-900/5']">
        <div class="flex-shrink-0">
          <router-link to="/" class="font-display text-xl font-bold tracking-[0.08em] text-primary transition-colors hover:text-brand-blue sm:text-2xl">
            Amru Muiz
          </router-link>
        </div>

        <div class="hidden md:block">
          <div class="flex items-center gap-2 rounded-full bg-white/30 p-1.5 dark:bg-white/5">
            <router-link :to="{ path: '/', hash: '#about' }" class="rounded-full px-4 py-2 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-white/70 hover:text-primary dark:hover:bg-white/10">About</router-link>
            <router-link :to="{ path: '/', hash: '#portfolio' }" class="rounded-full px-4 py-2 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-white/70 hover:text-primary dark:hover:bg-white/10">Portfolio</router-link>
            <router-link :to="{ path: '/', hash: '#contact' }" class="rounded-full px-4 py-2 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-white/70 hover:text-primary dark:hover:bg-white/10">Contact</router-link>
            <router-link v-if="$route.query.admin === '1'" to="/admin" class="rounded-full px-4 py-2 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-white/70 hover:text-primary dark:hover:bg-white/10">Admin</router-link>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="$emit('toggle-dark-mode')"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/50 text-primary transition-all duration-300 hover:scale-105 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10"
            :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="!isDarkMode" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 5a7 7 0 100 14 7 7 0 000-14z"/></svg>
            <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
