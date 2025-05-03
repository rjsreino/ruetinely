<script setup>
import TaskSingleEdit from './TaskSingleEdit.vue'
import { useTaskStore } from '@/stores/taskStore'
import taskData from '@/tasks.json'

import { ref, computed } from 'vue'

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)

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

  // Create a copy of the current tasks
  const tasksArray = [...taskStore.tasks]

  // Find the indices
  const draggedIndex = tasksArray.findIndex((t) => t.id === draggedItem.value.id)
  const targetIndex = tasksArray.findIndex((t) => t.id === targetTask.id)

  // Remove the dragged item
  const [removedItem] = tasksArray.splice(draggedIndex, 1)

  // Insert at the new position
  tasksArray.splice(targetIndex, 0, removedItem)

  // Update store
  taskStore.updateTaskOrder(tasksArray)

  // Reset dragged item
  draggedItem.value = null
}

const addNewTask = () => {
  const newTask = {
    id: Date.now().toString(),
    title: 'New Task',
    priority: 'no priority',
    repeat: [],
    time: '00.00',
    completed: false,
  }
  console.log(newTask)
  taskStore.addTask(newTask)
}
</script>
<template>
  <section class="py-8">
    <div class="flex justify-center container-xl">
      <div class="grid grid-cols-1 gap-6">
        <h2 class="font-bold text-2xl">Tasks:</h2>
        <button
          @click="addNewTask"
          class="w-96 px-4 py-4 bg-gradient-to-l from-slate-500 to-gray-700 text-white rounded-lg hover:from-slate-600 hover:to-gray-800 shadow-md"
        >
          Add Task
        </button>
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
