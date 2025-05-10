<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, updateProfile, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = getAuth()

const user = ref(auth.currentUser)
const name = ref(user.value?.displayName || '')
const email = ref(user.value?.email || '')
const isEditingName = ref(false)
const errMsg = ref('')

onMounted(() => {
  if (!auth.currentUser) {
    router.push('/login')
  }
})

// Handle name update
const handleNameUpdate = () => {
  if (!name.value.trim()) {
    errMsg.value = 'Name cannot be empty.'
    return
  }

  updateProfile(auth.currentUser, { displayName: name.value })
    .then(() => {
      user.value = auth.currentUser
      isEditingName.value = false
      errMsg.value = ''
      console.log('Name updated successfully!')
    })
    .catch((error) => {
      console.error('Error updating name:', error.message)
      errMsg.value = 'Failed to update name. Please try again later.'
    })
}

const handleLogout = () => {
  signOut(auth)
    .then(() => {
      console.log('Logged out successfully!')
      router.push('/login')
    })
    .catch((error) => {
      console.error('Error logging out:', error.message)
    })
}
</script>

<template>
  <div
    class="w-full mx-auto md:max-w-3xl lg:max-w-3xl flex items-center justify-center min-h-screen bg-gradient-to-t from-gray-200 to-slate-400"
  >
    <div class="w-full max-w-md p-8 bg-gradient-to-b from-white to-slate-200 rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800">User Profile</h2>

      <!-- User Info -->
      <div class="mt-6">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <div v-if="!isEditingName" class="flex items-center justify-between">
            <p class="text-gray-800">{{ name }}</p>
            <button @click="isEditingName = true" class="text-blue-500 hover:underline text-sm">
              Edit
            </button>
          </div>
          <div v-else>
            <input
              type="text"
              id="name"
              v-model="name"
              class="w-full px-4 py-2 mt-1 border rounded-lg shadow-inner transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
            <div class="flex justify-end mt-2 space-x-2">
              <button
                @click="handleNameUpdate"
                class="px-4 py-2 text-white bg-blue-500 rounded-full transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Save
              </button>
              <button
                @click="isEditingName = false"
                class="px-4 py-2 text-gray-600 bg-gray-200 rounded-full transition-all duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <p class="text-gray-800">{{ email }}</p>
        </div>
      </div>

      <!-- Error Message -->
      <p v-if="errMsg" class="mt-4 text-red-500 text-center text-sm font-medium">
        {{ errMsg }}
      </p>

      <!-- Logout Button -->
      <button
        @click="handleLogout"
        class="w-full px-4 py-2 mt-6 text-white bg-red-500 rounded-full transition-all duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Log Out
      </button>
    </div>
  </div>
</template>
