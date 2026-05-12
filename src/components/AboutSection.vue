<template>
  <section id="about" class="py-20 bg-gray-50 dark:bg-[#151e32]">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-4">About Me</h2>
        <div class="w-20 h-1 bg-brand-blue mx-auto rounded"></div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-12 items-start">
        <div class="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>
            I am a 6th-semester Computer Science student at <strong class="text-brand-dark dark:text-brand-light">Universitas Putra Bangsa</strong>. 
            I am passionate about creating visually appealing and highly functional digital products.
          </p>
          <p>
            My interests span across graphic design, coding modern websites and apps, and photo/video documentation. 
            I am also an active member of BEM Universitas Putra Bangsa, where I continuously develop my leadership and teamwork skills.
          </p>
        </div>
        
        <div class="space-y-8">
          <div>
            <h3 class="text-xl font-semibold mb-4 text-brand-dark dark:text-brand-light">Tech Stack & Tools</h3>
            <div class="flex flex-wrap gap-3">
              <span class="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium shadow-sm hover:border-brand-blue transition-colors">Vue.js</span>
              <span class="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium shadow-sm hover:border-brand-blue transition-colors">Firebase</span>
              <span class="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium shadow-sm hover:border-brand-blue transition-colors">Tailwind CSS</span>
              <span class="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium shadow-sm hover:border-brand-blue transition-colors">Canva</span>
              <span class="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium shadow-sm hover:border-brand-blue transition-colors">Affinity Designer</span>
            </div>
          </div>
          
          <div>
            <h3 class="text-xl font-semibold mb-4 text-brand-dark dark:text-brand-light">Interests</h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-300">
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Graphic Design & UI/UX
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Web & App Development
              </li>
              <li class="flex items-center gap-2">
                <svg class="w-5 h-5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                Photo & Video Documentation
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
