<script setup>
import TaskSingle from './TaskSingle.vue'
import { useTaskStore } from '@/stores/taskStore'

import { computed } from 'vue'

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)
</script>
<template>
  <section class="py-8">
    <div class="flex justify-center container-xl">
      <div class="grid grid-cols-1 gap-6">
        <h2 class="font-bold text-2xl">Tasks:</h2>
        <TaskSingle v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </section>
</template>
