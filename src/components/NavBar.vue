<script setup>
import { RouterLink, useRoute } from 'vue-router'
import NavBarItem from './NavBarItem.vue'
import { useTaskStore } from '@/stores/taskStore'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}
const route = useRoute()
const taskStore = useTaskStore()

const isAuthPage = computed(() => ['/login', '/register'].includes(route.path))
const isLoggedIn = computed(() => !!taskStore.user)

const navDisabled = computed(() => isAuthPage.value || !isLoggedIn.value)
const toast = useToast()

const toastCooldown = ref(false)

function showLoginToast() {
  if (navDisabled.value && !toastCooldown.value) {
    toast(`Login to view tasks`, {
      timeout: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      dangerouslyHTMLString: true,
      toastClassName:
        'bg-blue-400 rounded-lg shadow-lg font-medium text-black px-8 mx-auto mb-2 flex items-center',
    })
    toastCooldown.value = true
    setTimeout(() => {
      toastCooldown.value = false
    }, 2000)
  }
}
</script>
<template>
  <nav
    class="fixed bottom-8 left-0 right-0 z-50 bg-gradient-to-b from-gray-100 to-slate-300 shadow-lg rounded-3xl mx-auto max-w-max"
  >
    <div @click="showLoginToast" class="mx-auto px-6 py-1">
      <div class="flex h-20 items-center justify-between">
        <div class="flex items-center justify-center">
          <div class="sm:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/') && !navDisabled
                    ? 'text-blue-700 drop-shadow-4xl scale-110'
                    : 'hover:drop-shadow-2xl text-slate-700 drop-shadow-3xl',
                  'transition delay-50 duration-300 ease-in-out px-3 py-2',
                  navDisabled ? 'pointer-events-none opacity-50' : '',
                ]"
                tabindex="-1"
              >
                <NavBarItem primeIcon="home" text="Home" />
              </RouterLink>
              <RouterLink
                to="/tasks"
                :class="[
                  isActiveLink('/tasks') && !navDisabled
                    ? 'text-blue-700 drop-shadow-4xl scale-110'
                    : 'hover:drop-shadow-2xl text-slate-700 drop-shadow-3xl',
                  'transition delay-50 duration-300 ease-in-out px-3 py-2',
                  navDisabled ? 'pointer-events-none opacity-50' : '',
                ]"
                tabindex="-1"
              >
                <NavBarItem primeIcon="list-check" text="Tasks" />
              </RouterLink>
              <RouterLink
                to="/user"
                :class="[
                  isActiveLink('/user') && !navDisabled
                    ? 'text-blue-700 drop-shadow-4xl scale-110'
                    : 'hover:drop-shadow-2xl text-slate-700 drop-shadow-3xl',
                  'transition delay-50 duration-300 ease-in-out px-3 py-2',
                  navDisabled ? 'pointer-events-none opacity-50' : '',
                ]"
                tabindex="-1"
              >
                <NavBarItem primeIcon="user" text="User" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
