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
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#151e32] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white dark:bg-[#1a233a] p-10 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
      <div>
        <h2 class="mt-2 text-center text-3xl font-extrabold text-brand-dark dark:text-brand-light">
          Admin Login
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Sign in to manage your portfolio
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required v-model="email" class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 placeholder-gray-500 text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent sm:text-sm transition-shadow" placeholder="Email address">
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required v-model="password" class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 placeholder-gray-500 text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent sm:text-sm transition-shadow" placeholder="Password">
          </div>
        </div>

        <div v-if="errorMsg" class="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {{ errorMsg }}
        </div>

        <div>
          <button type="submit" :disabled="isLoading" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-brand-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
            <span v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></span>
            Sign in
          </button>
        </div>
      </form>
      <div class="text-center mt-4">
         <router-link to="/" class="text-sm text-brand-blue hover:underline">Back to Portfolio</router-link>
      </div>
    </div>
  </div>
</template>
