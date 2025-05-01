<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <main class="">
    <header class="bg-blue-200 flex flex-col items-center py-8">
      <!--div class="bg-green-200 w-2/4 text-center"-->
      <h1
        class="text-4xl bg-gradient-to-l from-gray-400 to-stone-900 bg-clip-text text-transparent font-extrabold"
      >
        Ruetinely
      </h1>
    </header>
    <section>calendar</section>
    <section>listview of tasks</section>
    <NavBar />
  </main>
</template>
