<script setup>
import TaskSingle from './TaskSingle.vue'
import taskData from '@/tasks.json'
import { ref } from 'vue'

const tasks = ref(taskData)
</script>
<template>
  <section class="bg-blue-50 px-4 py-10">
    <div class="container-xl m-auto">
      <div class="grid grid-cols-1 gap-6">
        <TaskSingle v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </section>
</template>
