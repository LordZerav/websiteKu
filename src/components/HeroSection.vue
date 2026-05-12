<script setup>
import heroBg from '../assets/image_part_001.png'
</script>

<template>
  <section
    id="home"
    class="relative min-h-screen flex items-end justify-center overflow-hidden"
  >
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img
        :src="heroBg"
        alt="Hero Background"
        class="w-full h-full object-cover object-top"
      />
    </div>

    <!-- Scroll indicator -->
    <div class="relative z-10 mb-8 flex flex-col items-center gap-1 opacity-60 animate-bounce">
      <span class="text-gray-700 dark:text-white text-xs tracking-widest uppercase">Scroll</span>
      <svg class="w-4 h-4 text-gray-700 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </section>
</template>