<script setup>
import TaskSingle from './TaskSingle.vue'
import TaskPlaceholder from './TaskPlaceholder.vue'
import { useTaskStore } from '@/stores/taskStore'

import { computed, ref } from 'vue'

const datetime = new Date()
console.log(datetime.getDay())

const taskStore = useTaskStore()
const allTasks = computed(() => taskStore.tasks)

const selectedDay = ref('mon')

const priorityMap = {
  'no priority': 0,
  low: 1,
  medium: 2,
  high: 3,
  urgent: 4,
}

const completedPrioritySum = computed(() => {
  return allTasks.value
    .filter((task) => task.completed)
    .filter((task) => task.repeat && task.repeat.includes(selectedDay.value))
    .reduce((sum, task) => {
      const priority = priorityMap[task.priority?.toLowerCase()] ?? 0
      return sum + priority
    }, 0)
})

const dailyPrioritySums = computed(() => {
  const sums = {
    mon: 0,
    tue: 0,
    wed: 0,
    thu: 0,
    fri: 0,
    sat: 0,
    sun: 0,
  }

  allTasks.value.forEach((task) => {
    const priority = priorityMap[task.priority?.toLowerCase()] ?? 0
    if (task.repeat && Array.isArray(task.repeat)) {
      task.repeat.forEach((day) => {
        if (sums.hasOwnProperty(day)) {
          sums[day] += priority
        }
      })
    }
  })

  return sums
})

const calendarPriorityDisplayValue = computed(() => {
  const total = dailyPrioritySums.value[selectedDay.value] || 0
  return total === 0 ? 0 : (completedPrioritySum.value / total).toFixed(2)
})

const dayMap = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
}

selectedDay.value = dayMap[new Date().getDay()]

// filter tasks based on selected day
const tasks = computed(() => {
  return allTasks.value.filter((task) => task.repeat && task.repeat.includes(selectedDay.value))
})

const days = [
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
        <p class="text-lg font-semibold">
          Total priority value of completed tasks: {{ completedPrioritySum }}
        </p>
        <p class="text-lg font-semibold">
          Available priority on {{ selectedDay }}: {{ dailyPrioritySums[selectedDay] ?? 0 }}
        </p>
        <p class="text-lg font-semibold">Ratio: {{ calendarPriorityDisplayValue }}</p>
        <h2 class="font-bold text-2xl">Tasks:</h2>
        <!-- Day of week tabs alternative UI -->
        <div class="flex justify-between bg-gray-100 rounded-lg p-1 shadow-md">
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
            {{ day.label.slice(0, 3) }}
          </button>
        </div>
        <div v-if="!tasks.length"><TaskPlaceholder /></div>
        <TaskSingle v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </section>
</template>
