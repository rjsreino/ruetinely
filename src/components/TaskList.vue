<script setup>
import TaskSingle from './TaskSingle.vue'
import TaskPlaceholder from './TaskPlaceholder.vue'
import { useTaskStore } from '@/stores/taskStore'

import { computed, onMounted } from 'vue'

const taskStore = useTaskStore()

const days = [
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
  { value: 'sun', label: 'Sunday' },
]
const dayMap = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
}
// Filter tasks based on the selected day
const tasks = computed(() => {
  return taskStore.dailyTasks
})

if (taskStore.selectedDay === 'mon') {
  taskStore.setSelectedDay(dayMap[new Date().getDay()])
}
onMounted(() => {
  const currentDay = new Date().getDay()
  const dayMap = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
  }
  taskStore.setSelectedDay(dayMap[currentDay])
})
</script>
<template>
  <section class="py-8">
    <div class="flex justify-center container-xl">
      <div class="grid grid-cols-1 gap-6">
        <h2 class="font-bold text-2xl">Tasks:</h2>
        <!-- Day of week tabs alternative UI -->
        <div class="flex justify-between bg-gray-100 rounded-lg p-1 shadow-md">
          <button
            v-for="day in days"
            :key="day.value"
            @click="taskStore.setSelectedDay(day.value)"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              taskStore.selectedDay === day.value
                ? 'bg-white shadow text-blue-600'
                : 'text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ day.label.slice(0, 3) }}
          </button>
        </div>
        <div v-if="!tasks.length"><TaskPlaceholder /></div>
        <TaskSingle v-for="task in tasks" :key="task.id" :taskId="task.id" />
      </div>
    </div>
  </section>
</template>
