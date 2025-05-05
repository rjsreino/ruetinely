<script setup>
import TaskSingle from './TaskSingle.vue'
import TaskPlaceholder from './TaskPlaceholder.vue'
import { useTaskStore } from '@/stores/taskStore'

import { computed, ref } from 'vue'

const datetime = new Date()
console.log(datetime.getDay())

const taskStore = useTaskStore()
const allTasks = computed(() => taskStore.tasks)

const selectedDay = ref('all') // Default to show all tasks

const dayMap = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
}

const today = dayMap[new Date().getDay()]

// Initialize with today's day selected
selectedDay.value = today

// Filter tasks based on selected day
const tasks = computed(() => {
  if (selectedDay.value === 'all') {
    return allTasks.value
  } else {
    return allTasks.value.filter((task) => task.repeat && task.repeat.includes(selectedDay.value))
  }
})

const days = [
  { value: 'all', label: 'All' },
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
  { value: 'sun', label: 'Sunday' },
]
</script>
<template>
  <section class="py-8">
    <div class="flex justify-center container-xl">
      <div class="grid grid-cols-1 gap-6">
        <h2 class="font-bold text-2xl">Tasks:</h2>
        <!-- Day of week tabs alternative UI -->
        <div class="flex justify-between bg-gray-100 rounded-lg p-1">
          <button
            v-for="day in days"
            :key="day.value"
            @click="selectedDay = day.value"
            :class="[
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              selectedDay === day.value
                ? 'bg-white shadow text-blue-600'
                : 'text-gray-700 hover:bg-gray-200',
            ]"
          >
            {{ day.value === 'all' ? 'All' : day.label.slice(0, 3) }}
          </button>
        </div>
        <div v-if="!tasks.length"><TaskPlaceholder /></div>
        <TaskSingle v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </section>
</template>
