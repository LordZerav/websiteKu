<script setup>
import { defineProps } from 'vue'

defineProps({
  isDarkMode: Boolean
})
</script>

<template>
  <nav class="fixed w-full z-50 bg-brand-light/80 dark:bg-brand-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-shrink-0">
          <router-link to="/" class="font-bold text-xl text-brand-blue">
            Amru Muiz
          </router-link>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <router-link :to="{ path: '/', hash: '#about' }" class="hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">About</router-link>
            <router-link :to="{ path: '/', hash: '#portfolio' }" class="hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Portfolio</router-link>
            <router-link :to="{ path: '/', hash: '#contact' }" class="hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</router-link>
            <router-link to="/admin" class="hover:text-brand-blue px-3 py-2 rounded-md text-sm font-medium transition-colors">Admin</router-link>
          </div>
        </div>
        <div class="flex items-center">
          <button @click="$emit('toggle-dark-mode')" class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <svg v-if="!isDarkMode" class="w-5 h-5 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            <svg v-else class="w-5 h-5 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
