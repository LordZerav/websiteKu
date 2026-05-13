<template>
  <section id="about" class="section-shell py-24 overflow-hidden">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-16">
        <span class="text-brand-blue text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Tentang Saya</span>
        <h2 class="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-primary">About Me</h2>
        <div class="w-16 h-1 bg-brand-blue mx-auto rounded-full shadow-[0_0_24px_rgba(110,168,255,0.5)]"></div>
      </div>

      <!-- Layout Utama -->
      <div class="grid md:grid-cols-[1fr_1.5fr_1fr] gap-8 items-start">

        <!-- Kolom Kiri: Foto Profil + badge info -->
        <div class="flex flex-col items-center gap-4">
          <div class="relative w-56 h-56 md:w-full md:h-72">
            <div class="w-full h-full rounded-3xl bg-gradient-to-br from-brand-blue/20 to-blue-900/40 border border-white/20 overflow-hidden glass-panel">
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
            <div class="flex items-center gap-3 glass-panel rounded-xl px-4 py-3">
              <span class="text-2xl">🎓</span>
              <div>
                <div class="text-xs text-secondary font-medium">Kampus</div>
                <div class="text-sm font-bold text-primary">Univ. Putra Bangsa</div>
              </div>
            </div>
            <div class="flex items-center gap-3 glass-panel rounded-xl px-4 py-3">
              <span class="text-2xl">📍</span>
              <div>
                <div class="text-xs text-secondary font-medium">Status</div>
                <div class="text-sm font-bold text-primary">6th Semester · Computer Science</div>
              </div>
            </div>
            <div class="flex items-center gap-3 glass-panel rounded-xl px-4 py-3">
              <span class="text-2xl">⚡</span>
              <div>
                <div class="text-xs text-secondary font-medium">Available</div>
                <div class="text-sm font-bold text-green-500">Open for Projects</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom Tengah: Bio & Interests -->
        <div class="space-y-8">
          <div class="glass-panel rounded-3xl p-7">
            <h3 class="text-lg font-extrabold text-brand-blue uppercase tracking-wider mb-4">Hi there! 👋</h3>
            <p class="text-secondary leading-relaxed mb-4">
              Saya mahasiswa <strong class="text-primary">semester 6 Ilmu Komputer</strong> di Universitas Putra Bangsa, dan saya suka bikin digital product yang rapi, nyaman dilihat, dan tetap fungsional.
            </p>
            <p class="text-secondary leading-relaxed">
              Saya menggabungkan design instinct dengan technical skill, mulai dari ngerapihin visual graphic sampai membangun web app modern. Di luar itu, saya juga aktif di <strong class="text-primary">BEM Universitas Putra Bangsa</strong> buat ngasah leadership dan teamwork.
            </p>
          </div>

          <div class="glass-panel rounded-3xl p-7">
            <h3 class="text-lg font-extrabold text-brand-blue uppercase tracking-wider mb-5">Minat</h3>
            <div class="space-y-3">
              <div v-for="(item, i) in interests" :key="i"
                class="flex items-center gap-3 p-3 rounded-2xl bg-white/40 hover:bg-brand-blue/10 transition-colors group dark:bg-white/5">
                <span class="text-xl w-8 text-center">{{ item.icon }}</span>
                <span class="font-medium text-secondary group-hover:text-brand-blue transition-colors">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: Tech Stack (Ikon Diganti Gambar Logo) -->
        <div class="glass-panel rounded-3xl p-7 h-full">
          <h3 class="text-lg font-extrabold text-brand-blue uppercase tracking-wider mb-5">Tech Stack & Tools</h3>
          <div class="space-y-3">
            <div v-for="(skill, i) in techStack" :key="i"
              class="group relative overflow-hidden rounded-xl bg-white/35 px-4 py-3 border border-white/20 hover:border-brand-blue/40 transition-all duration-300 dark:bg-white/5">
              
              <div
                class="absolute inset-0 bg-brand-blue/5 dark:bg-brand-blue/10 transition-all duration-700 rounded-xl"
                :style="{ width: skill.level + '%' }"
              ></div>
              <div class="relative flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <!-- Logo Image Stack -->
                  <img :src="skill.logo" :alt="skill.name" class="h-6 w-6 object-contain" />
                  <span class="text-sm font-semibold text-primary">{{ skill.name }}</span>
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