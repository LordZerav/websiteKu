<script setup>
import { ref } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const status = ref({ type: '', text: '' })
const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  status.value = { type: '', text: '' }
  try {
    await addDoc(collection(db, "messages"), {
      ...form.value,
      timestamp: new Date()
    })
    status.value = { type: 'success', text: 'Message sent successfully! I will get back to you soon.' }
    form.value = { name: '', email: '', message: '' }
  } catch (error) {
    console.error("Error submitting form: ", error)
    status.value = { type: 'error', text: 'Failed to send message. Please ensure Firebase is configured or try again later.' }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="section-shell py-20">
    <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-primary">Get In Touch</h2>
        <div class="w-20 h-1 bg-brand-blue mx-auto rounded"></div>
        <p class="mt-6 text-lg text-secondary">Have a project in mind or just want to say hi? I'd love to hear from you.</p>
      </div>
      
      <div class="glass-panel-strong rounded-[2rem] overflow-hidden">
        <div class="grid md:grid-cols-5">
          <div class="p-8 md:col-span-3">
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-secondary mb-1">Name</label>
                <input v-model="form.name" type="text" id="name" required class="w-full rounded-2xl border border-white/20 bg-white/60 px-4 py-3 text-primary outline-none transition-shadow focus:ring-2 focus:ring-brand-blue dark:bg-white/5" placeholder="Your Name">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-secondary mb-1">Email</label>
                <input v-model="form.email" type="email" id="email" required class="w-full rounded-2xl border border-white/20 bg-white/60 px-4 py-3 text-primary outline-none transition-shadow focus:ring-2 focus:ring-brand-blue dark:bg-white/5" placeholder="your.email@example.com">
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-secondary mb-1">Message</label>
                <textarea v-model="form.message" id="message" rows="4" required class="w-full resize-none rounded-2xl border border-white/20 bg-white/60 px-4 py-3 text-primary outline-none transition-shadow focus:ring-2 focus:ring-brand-blue dark:bg-white/5" placeholder="How can I help you?"></textarea>
              </div>
              <button type="submit" :disabled="isSubmitting" class="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand-blue to-cyan-300 px-4 py-3 font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70">
                <span v-if="isSubmitting" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
                Send Message
              </button>
              
              <div v-if="status.text" :class="status.type === 'success' ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'" class="rounded-2xl border p-4 text-center text-sm">
                {{ status.text }}
              </div>
            </form>
          </div>
          <div class="bg-gradient-to-br from-brand-blue to-cyan-400 p-8 md:col-span-2 flex flex-col justify-center text-white">
            <h3 class="text-2xl font-bold mb-6">Contact Info</h3>
            <div class="space-y-6">
              <div class="flex items-start">
                <svg class="w-6 h-6 mr-4 mt-1 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <div>
                  <h4 class="font-semibold">Location</h4>
                  <p class="text-blue-100 text-sm">Universitas Putra Bangsa</p>
                </div>
              </div>
              
              <div class="pt-8 border-t border-blue-400/30">
                <h4 class="font-semibold mb-4">Connect on Socials</h4>
                <div class="flex gap-4">
                  <a href="https://github.com/LordZerav" target="_blank" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" title="GitHub">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                  </a>
                  <a href="https://linkedin.com/in/amru-muiz" target="_blank" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" title="LinkedIn">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                  </a>
                  <a href="https://instagram.com/amirufzan" target="_blank" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" title="Instagram">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                  </a>
                  <a href="https://pinterest.com/amirufzan" target="_blank" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" title="Pinterest">
                     <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.406.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.55.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"></path></svg>
                  </a>
                </div>
              </div>

              <div class="pt-8 border-t border-white/20">
                <p class="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">Made with Love</p>
                <p class="mt-2 text-sm text-white/90">Dibuat dengan Vue.js, Firebase, dan perhatian ke detail supaya tampilannya tetap clean dan nyaman dipakai.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
