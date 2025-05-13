<script setup>
import TaskSingleEdit from './TaskSingleEdit.vue'
import AddTaskForm from './AddTaskForm.vue'
import { useTaskStore } from '@/stores/taskStore'
import DayPick from './DayPick.vue'

import { ref, computed } from 'vue'

const taskStore = useTaskStore()
const allTasks = computed(() => taskStore.tasks)

const selectedDay = ref('all')

// filter tasks based on selected day
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

//drag and drop
const draggedItem = ref(null)

const onDragStart = (task) => {
  draggedItem.value = task
}

const onDragOver = (event) => {
  event.preventDefault()
}

const onDrop = (targetTask) => {
  if (!draggedItem.value || draggedItem.value.id === targetTask.id) return

  // create a copy of the current tasks
  const tasksArray = [...taskStore.tasks]

  // find the indices
  const draggedIndex = tasksArray.findIndex((t) => t.id === draggedItem.value.id)
  const targetIndex = tasksArray.findIndex((t) => t.id === targetTask.id)

  // remove the dragged item
  const [removedItem] = tasksArray.splice(draggedIndex, 1)

  // insert at the new position
  tasksArray.splice(targetIndex, 0, removedItem)

  // update store
  taskStore.updateTaskOrder(tasksArray)

  // reset dragged item
  draggedItem.value = null
}
const isCreatingTask = ref(false)

const addNewTask = () => {
  isCreatingTask.value = true
}
const closeAddTaskForm = () => {
  isCreatingTask.value = false
}
</script>
<template>
  <section class="pb-8">
    <div class="flex justify-center container-xl">
      <div class="grid grid-cols-1 gap-6">
        <h2 class="font-bold text-2xl">Tasks:</h2>
        <button
          v-if="!isCreatingTask"
          @click="addNewTask"
          class="w-96 px-4 py-4 bg-gradient-to-l from-slate-500 to-gray-700 text-white rounded-lg hover:from-slate-600 hover:to-gray-800 shadow-md"
        >
          Add Task
        </button>
        <AddTaskForm v-if="isCreatingTask" @close="closeAddTaskForm" />
        <!-- Day of week filter bar -->
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
        <TaskSingleEdit
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          draggable="true"
          @dragstart="onDragStart(task)"
          @dragover.prevent
          @drop.prevent="onDrop(task)"
        />
      </div>
    </div>
  </section>
</template>
