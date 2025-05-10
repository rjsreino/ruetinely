<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')

const handleRegister = () => {
  console.log('Registering with:', name.value, email.value, password.value)
  // Add Firebase registration logic here
}
</script>
<template>
  <div
    class="w-full mx-auto md:max-w-3xl lg:max-w-3xl flex items-center justify-center min-h-screen bg-gradient-to-t from-gray-300 to-slate-500"
  >
    <div class="w-full max-w-md p-8 bg-gradient-to-b from-white to-slate-200 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800">Register</h2>
      <form @submit.prevent="handleRegister" class="mt-6">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full px-4 py-2 mt-1 border rounded-lg shadow-inner transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
            required
          />
        </div>
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
          class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Register
        </button>
      </form>
      <p class="mt-4 text-sm text-center text-gray-600">
        Already have an account?
        <RouterLink to="/login" class="text-blue-500 hover:underline">Login</RouterLink>
      </p>
    </div>
  </div>
</template>
