<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section
    class="w-full mx-auto md:max-w-3xl lg:max-w-3xl bg-gradient-to-t from-white to-slate-100 flex flex-col items-center justify-center min-h-[32rem] py-10 text-center rounded-lg"
  >
    <span class="text-7xl text-yellow-500 mb-8">
      <i class="pi pi-exclamation-triangle"></i>
    </span>
    <h1
      class="text-5xl bg-gradient-to-l from-gray-400 to-stone-900 bg-clip-text text-transparent font-extrabold mb-5"
    >
      404 Not Found
    </h1>
    <p class="text-lg text-slate-700 font-light mb-8">This page does not exist</p>
    <RouterLink
      to="/"
      class="w-48 px-4 py-4 text-xl bg-gradient-to-l from-slate-500 to-gray-700 text-white rounded-lg hover:from-slate-600 hover:to-gray-800 shadow-md"
      >Go Back</RouterLink
    >
  </section>
</template>
