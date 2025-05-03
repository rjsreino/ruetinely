<script setup>
import TaskSingleEdit from './TaskSingleEdit.vue'
import taskData from '@/tasks.json'

import { ref } from 'vue'

const tasks = ref(taskData)
</script>
<template>
  <section class="py-8">
    <div class="flex justify-center container-xl">
      <div class="grid grid-cols-1 gap-6">
        <h2 class="font-bold text-2xl">Tasks:</h2>
        <TaskSingleEdit v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </section>
</template>
