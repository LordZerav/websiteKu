<template>
  <section id="about" class="py-24 bg-gray-50 dark:bg-[#0d1525] overflow-hidden">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-16">
        <span class="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Who I Am</span>
        <h2 class="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">About Me</h2>
        <div class="w-16 h-1 bg-brand-blue mx-auto rounded-full"></div>
      </div>

      <!-- Layout Utama -->
      <div class="grid md:grid-cols-[1fr_1.5fr_1fr] gap-8 items-start">

        <!-- Kolom Kiri: Foto Profil + badge info -->
        <div class="flex flex-col items-center gap-4">
          <div class="relative w-56 h-56 md:w-full md:h-72">
            <div class="w-full h-full rounded-3xl bg-gradient-to-br from-brand-blue/20 to-blue-900/40 border-2 border-brand-blue/30 overflow-hidden shadow-xl shadow-blue-500/10">
              <!-- FOTO PROFIL MENGGUNAKAN VARIABEL IMPORT -->
              <img 
                :src="fotoProfil" 
                alt="Foto Amru" 
                class="w-full h-full object-cover"
              />
            </div>
            <!-- Badge "2026" -->
            <div class="absolute -top-3 -right-3 bg-brand-blue text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg shadow-blue-500/30 rotate-6">
              2026 ✦
            </div>
          </div>

          <!-- Info chips -->
          <div class="flex flex-col gap-2 w-full">
            <div class="flex items-center gap-3 bg-white dark:bg-[#1a233a] rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-800">
              <span class="text-2xl">🎓</span>
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">University</div>
                <div class="text-sm font-bold text-brand-dark dark:text-white">Univ. Putra Bangsa</div>
              </div>
            </div>
            <div class="flex items-center gap-3 bg-white dark:bg-[#1a233a] rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-800">
              <span class="text-2xl">📍</span>
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Semester</div>
                <div class="text-sm font-bold text-brand-dark dark:text-white">6th Semester · CS</div>
              </div>
            </div>
            <div class="flex items-center gap-3 bg-white dark:bg-[#1a233a] rounded-xl px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-800">
              <span class="text-2xl">⚡</span>
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400 font-medium">Status</div>
                <div class="text-sm font-bold text-green-500">Open for Projects</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom Tengah: Bio & Interests -->
        <div class="space-y-8">
          <div class="bg-white dark:bg-[#1a233a] rounded-3xl p-7 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 class="text-lg font-extrabold text-brand-blue uppercase tracking-wider mb-4">Hi there! 👋</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              I'm a <strong class="text-brand-dark dark:text-white">6th-semester Computer Science student</strong> at Universitas Putra Bangsa who is passionate about creating visually appealing and highly functional digital products.
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              I blend design instinct with technical skills — from crafting polished graphics to building modern web apps. I'm also an active member of <strong class="text-brand-dark dark:text-white">BEM Universitas Putra Bangsa</strong>, where I sharpen my leadership and teamwork.
            </p>
          </div>

          <div class="bg-white dark:bg-[#1a233a] rounded-3xl p-7 shadow-sm border border-gray-100 dark:border-gray-800">
            <h3 class="text-lg font-extrabold text-brand-blue uppercase tracking-wider mb-5">Interests</h3>
            <div class="space-y-3">
              <div v-for="(item, i) in interests" :key="i"
                class="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-brand-blue/5 dark:hover:bg-brand-blue/10 transition-colors group">
                <span class="text-xl w-8 text-center">{{ item.icon }}</span>
                <span class="font-medium text-gray-700 dark:text-gray-200 group-hover:text-brand-blue transition-colors">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: Tech Stack (Ikon Diganti Gambar Logo) -->
        <div class="bg-white dark:bg-[#1a233a] rounded-3xl p-7 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
          <h3 class="text-lg font-extrabold text-brand-blue uppercase tracking-wider mb-5">Tech Stack & Tools</h3>
          <div class="space-y-3">
            <div v-for="(skill, i) in techStack" :key="i"
              class="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800/50 px-4 py-3 border border-transparent hover:border-brand-blue/40 transition-all duration-300">
              
              <div
                class="absolute inset-0 bg-brand-blue/5 dark:bg-brand-blue/10 transition-all duration-700 rounded-xl"
                :style="{ width: skill.level + '%' }"
              ></div>
              <div class="relative flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <!-- Logo Image Stack -->
                  <img :src="skill.logo" :alt="skill.name" class="h-6 w-6 object-contain" />
                  <span class="text-sm font-semibold text-gray-700 dark:text-gray-200">{{ skill.name }}</span>
                </div>
                <span class="text-xs font-bold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity">{{ skill.level }}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
  import fotoProfil from '../assets/fotoku.png'

const interests = [
  { icon: '🎨', label: 'Graphic Design & UI/UX' },
  { icon: '💻', label: 'Web & App Development' },
  { icon: '📷', label: 'Photo & Video Documentation' },
  { icon: '🤝', label: 'Leadership & Organizing' },
]

const techStack = [
  { 
    name: 'Vue.js', 
    level: 80, 
    logo: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg' 
  },
  { 
    name: 'Firebase', 
    level: 70, 
    logo: 'https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg' 
  },
  { 
    name: 'Tailwind CSS', 
    level: 85, 
    logo: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' 
  },
  { 
    name: 'Canva', 
    level: 90, 
    logo: 'https://www.vectorlogo.zone/logos/canva/canva-icon.svg' 
  },
  { 
    name: 'Affinity by Canva',
    level: 75, 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Affinity_%28App%29_Logo.svg/960px-Affinity_%28App%29_Logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20251103223217'
  },
]
</script>