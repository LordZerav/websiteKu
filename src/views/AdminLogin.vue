<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)
const router = useRouter()

const login = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/admin/dashboard')
  } catch (error) {
    console.error("Firebase Login Error:", error)
    switch(error.code) {
      case 'auth/invalid-email':
        errorMsg.value = 'Email tidak valid.'
        break
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        errorMsg.value = 'Email atau Password salah.'
        break
      case 'auth/network-request-failed':
        errorMsg.value = 'Gagal koneksi ke internet atau Firebase diblokir (cek adblock/VPN).'
        break
      default:
        errorMsg.value = `Error: ${error.message}`
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(110,168,255,0.2),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(124,92,255,0.15),_transparent_22%)]"></div>
    <div class="max-w-md w-full space-y-8 glass-panel-strong p-10 rounded-[2rem]">
      <div>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-primary">
          Admin Login
        </h2>
        <p class="mt-2 text-center text-sm text-secondary">
          Sign in to manage your portfolio
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required v-model="email" class="appearance-none relative block w-full rounded-2xl border border-white/20 bg-white/60 px-4 py-3 text-primary placeholder:text-secondary/70 focus:outline-none focus:ring-2 focus:ring-brand-blue sm:text-sm transition-shadow dark:bg-white/5" placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password" class="appearance-none relative block w-full rounded-2xl border border-white/20 bg-white/60 px-4 py-3 text-primary placeholder:text-secondary/70 focus:outline-none focus:ring-2 focus:ring-brand-blue sm:text-sm transition-shadow dark:bg-white/5" placeholder="Password">
          </div>
        </div>

        <div v-if="errorMsg" class="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {{ errorMsg }}
        </div>

        <div>
          <button type="submit" :disabled="isLoading" class="group relative w-full flex justify-center rounded-2xl border border-transparent bg-gradient-to-r from-brand-blue to-cyan-300 px-4 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70">
            <span v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
            Sign in
          </button>
        </div>
      </form>
      <div class="text-center mt-4">
         <router-link to="/" class="text-sm font-semibold text-brand-blue hover:underline">Back to Portfolio</router-link>
      </div>
    </div>
  </div>
</template>
