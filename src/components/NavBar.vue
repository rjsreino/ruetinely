<script setup>
import logo from '@/assets/img/logo-oscar.png'
import { RouterLink, useRoute } from 'vue-router'
const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}
</script>
<template>
  <nav
    class="fixed bottom-8 left-0 right-0 z-50 bg-gradient-to-r from-cyan-500 to-blue-500 drop-shadow-lg rounded-2xl mx-auto max-w-max"
  >
    <div class="mx-auto px-8">
      <div class="flex h-20 items-center justify-between">
        <!--sm:items-stretch sm:justify-start-->
        <div class="flex items-center justify-center">
          <!-- Logo 
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img class="h-10 w-auto" :src="logo" alt="Vue Jobs" />
          </RouterLink>
        -->
          <div class="sm:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/') ? 'bg-stone-900/50' : 'hover:bg-stone-900/75 hover:text-white',
                  'transition delay-50 duration-300 ease-in-out text-white px-3 py-2 rounded-md',
                ]"
                >Home</RouterLink
              >
              <RouterLink
                to="/jobs"
                :class="[
                  isActiveLink('/jobs')
                    ? 'bg-stone-900/50'
                    : 'hover:bg-stone-900/75 hover:text-white',
                  'transition delay-50 duration-300 ease-in-out text-white px-3 py-2 rounded-md',
                ]"
                >Tasks</RouterLink
              >
              <RouterLink
                to="/jobs/add"
                :class="[
                  isActiveLink('/jobs/add')
                    ? 'bg-stone-900/50'
                    : 'hover:bg-stone-900/75 hover:text-white',
                  'transition delay-50 duration-300 ease-in-out text-white px-3 py-2 rounded-md',
                ]"
                >Account</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
