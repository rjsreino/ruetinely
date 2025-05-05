<script setup>
import TaskList from '@/components/TaskList.vue'
import CalendarHome from '@/components/CalendarHome.vue'
</script>
<template>
  <div class="w-full mx-auto md:max-w-3xl lg:max-w-3xl bg-gradient-to-t from-white to-slate-100">
    <header class="flex flex-col items-center py-8">
      <!--div class="bg-green-200 w-2/4 text-center"-->
      <h1
        class="text-4xl bg-gradient-to-l from-gray-400 to-stone-900 bg-clip-text text-transparent font-extrabold"
      >
        Ruetinely
      </h1>
    </header>
    <section class="flex flex-col items-center">
      <div class="w-96">
        <CalendarHome />
      </div>
    </section>
    <TaskList />
    <div class="h-32"></div>
  </div>
  <RouterView />
</template>
