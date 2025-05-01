<script setup>
import TaskSingle from './TaskSingle.vue'
import taskData from '@/tasks.json'
import { ref } from 'vue'

const tasks = ref(taskData)
</script>
<template>
  <section class="bg-blue-50 py-10">
    <div class="flex justify-center container-xl">
      <div class="grid grid-cols-1 gap-6">
        <TaskSingle v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </section>
</template>
