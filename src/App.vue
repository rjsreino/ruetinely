<script setup>
import NavBar from './components/NavBar.vue'
import TaskList from './components/TaskList.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <main class="">
    <div class="w-full mx-auto md:max-w-3xl lg:max-w-3xl">
      <header class="flex flex-col items-center py-8">
        <!--div class="bg-green-200 w-2/4 text-center"-->
        <h1
          class="text-4xl bg-gradient-to-l from-gray-400 to-stone-900 bg-clip-text text-transparent font-extrabold"
        >
          Ruetinely
        </h1>
      </header>
      <section class="flex flex-col items-center">
        <img src="./assets/img/oscar.avif" class="h-96 w-96 object-contain" />
      </section>
      <TaskList />
    </div>
    <NavBar />
    <RouterView />
  </main>
</template>
