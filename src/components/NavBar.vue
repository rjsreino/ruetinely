<script setup>
import logo from '@/assets/img/logo-oscar.png'
import { RouterLink, useRoute } from 'vue-router'
import NavBarItem from './NavBarItem.vue'
const isActiveLink = (routePath) => {
  const route = useRoute()
  return route.path === routePath
}
</script>
<template>
  <nav
    class="fixed bottom-8 left-0 right-0 z-50 bg-gradient-to-r from-gray-300 to-slate-500 drop-shadow-lg rounded-3xl mx-auto max-w-max"
  >
    <div class="mx-auto px-8 py-2">
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
                  isActiveLink('/')
                    ? 'text-black drop-shadow-4xl scale-125'
                    : 'hover:drop-shadow-2xl text-white drop-shadow-3xl',
                  'transition delay-50 duration-300 ease-in-out px-3 py-2',
                ]"
              >
                <NavBarItem primeIcon="home" text="Home" />
              </RouterLink>
              <RouterLink
                to="/jobs"
                :class="[
                  isActiveLink('/jobs')
                    ? 'text-black drop-shadow-4xl scale-125'
                    : 'hover:drop-shadow-2xl text-white drop-shadow-3xl',
                  'transition delay-50 duration-300 ease-in-out px-3 py-2',
                ]"
              >
                <NavBarItem primeIcon="list-check" text="Tasks" />
              </RouterLink>
              <RouterLink
                to="/jobs/add"
                :class="[
                  isActiveLink('/jobs/add')
                    ? 'text-black drop-shadow-4xl scale-125'
                    : 'hover:drop-shadow-2xl text-white drop-shadow-3xl',
                  'transition delay-50 duration-300 ease-in-out px-3 py-2',
                ]"
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
