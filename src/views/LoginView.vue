<script setup>
import { ref } from 'vue'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const errMsg = ref()

const handleLogin = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Logged-in Successfully!')
      console.log(auth.currentUser)
      router.push('/')
    })
    .catch((error) => {
      console.error(error.code, error.message)
      switch (error.code) {
        case 'auth/user-not-found':
          errMsg.value = 'User not found. Please register.'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password. Please try again.'
          break
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email address. Please enter a valid email.'
          break
        default:
          errMsg.value = 'An error occurred. Please try again later.'
      }
    })
}
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log('Google Sign-In Successful!')
      router.push('/')
    })
    .catch((error) => {
      console.error('Error registering user:', error.code, error.message)
    })
}
</script>
<template>
  <div
    class="w-full mx-auto md:max-w-3xl lg:max-w-3xl flex items-center justify-center min-h-screen bg-gradient-to-t from-gray-200 to-slate-400"
  >
    <div class="w-full max-w-md p-8 bg-gradient-to-b from-white to-slate-200 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin" class="mt-6">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="w-full px-4 py-2 mt-1 border rounded-lg shadow-inner transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 mt-1 border rounded-lg shadow-inner transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          class="w-full px-4 py-2 text-white bg-blue-500 rounded-full transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <span class="font-medium">Login</span>
        </button>
        <button
          @click="signInWithGoogle"
          type="button"
          class="w-full px-4 py-2 mt-4 text-black bg-white border-2 border-black rounded-full transition-all duration-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <div class="flex items-center justify-center">
            <img src="@/assets/google-icon-logo.svg" alt="Google Logo" class="w-5 h-5" />
            <span class="ml-2 font-medium">Continue with Google</span>
          </div>
        </button>
      </form>
      <p v-if="errMsg" class="mt-4 text-red-500 text-center text-sm font-medium">
        {{ errMsg }}
      </p>
      <p class="mt-4 text-sm text-center text-gray-600">
        Don't have an account?
        <RouterLink to="/register" class="text-blue-500 transition-all duration-300 hover:underline"
          >Register</RouterLink
        >
      </p>
    </div>
  </div>
</template>
