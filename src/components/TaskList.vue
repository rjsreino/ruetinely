<script setup>
import TaskSingle from './TaskSingle.vue'
import TaskPlaceholder from './TaskPlaceholder.vue'
import { useTaskStore } from '@/stores/taskStore'

import { computed, ref, onMounted } from 'vue'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const taskStore = useTaskStore()
const db = getFirestore()
const auth = getAuth()

const tasks = ref([]) // Store tasks fetched from Firestore
const isLoading = ref(true)

const dayMap = {
  0: 'sun',
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
  6: 'sat',
}

const days = [
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
  { value: 'sat', label: 'Saturday' },
  { value: 'sun', label: 'Sunday' },
]

const fetchTasks = async () => {
  isLoading.value = true
  try {
    const user = auth.currentUser
    if (!user) {
      console.error('User not authenticated')
      return
    }

    console.log('Fetching tasks for user:', user.uid)

    const tasksRef = collection(db, 'users', user.uid, 'tasks')
    const tasksSnapshot = await getDocs(tasksRef)

    if (tasksSnapshot.empty) {
      console.log('No tasks found for this user.')
    } else {
      console.log('Tasks found:', tasksSnapshot.docs.length)
    }

    tasks.value = tasksSnapshot.docs.map((doc) => {
      const data = doc.data()
      console.log('Fetched task:', data)
      return {
        id: doc.id,
        ...data,
        days: data.days ? data.days.split(',') : [], // Convert days string to array
      }
    })
    console.log('All tasks:', tasks.value)
  } catch (error) {
    console.error('Error fetching tasks:', error.message)
  } finally {
    isLoading.value = false
  }
}

// Filter tasks based on the selected day
const dailyTasks = computed(() => {
  return tasks.value.filter((task) => task.days.includes(taskStore.selectedDay))
})

if (taskStore.selectedDay === 'mon') {
  taskStore.setSelectedDay(dayMap[new Date().getDay()])
}
onMounted(() => {
  console.log('TaskList component mounted')
  fetchTasks() // Call fetchTasks when the component is mounted
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
        <div v-if="isLoading" class="text-center text-gray-500">Loading tasks...</div>
        <div v-else-if="!tasks.length"><TaskPlaceholder /></div>
        <TaskSingle v-for="task in tasks" :key="task.id" :taskId="task.id" />
      </div>
    </div>
  </section>
</template>
