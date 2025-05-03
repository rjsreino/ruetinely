<script setup>
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import CheckBox from './CheckBox.vue'

import { ref } from 'vue'

const props = defineProps({
  task: Object,
})

const taskStore = useTaskStore()

// State for editing
const isEditing = ref(false)
const editedTitle = ref(props.task.title)
const editedPriority = ref(props.task.priority)

const priorityOptions = ['no priority', 'low', 'medium', 'high', 'urgent']

// For drag visualization
const isDraggedOver = ref(false)

const startEditing = () => {
  isEditing.value = true
  editedTitle.value = props.task.title
  editedPriority.value = props.task.priority
}

const saveChanges = () => {
  if (editedTitle.value.trim()) {
    taskStore.updateTaskTitle(props.task.id, editedTitle.value)
    taskStore.updateTaskPriority(props.task.id, editedPriority.value)
  }
  isEditing.value = false
}

const deleteTask = () => {
  taskStore.deleteTask(props.task.id)
}

const toggleCompleted = () => {
  taskStore.toggleTaskCompleted(props.task.id)
}

const handleDragOver = () => {
  isDraggedOver.value = true
}

const handleDragLeave = () => {
  isDraggedOver.value = false
}
</script>
<template>
  <div
    :class="[
      'w-96 p-4 rounded-lg shadow-lg transition-all duration-200 sm:max-w-2xl md:max-w-2xl lg:max-w-2xl',
      isDraggedOver
        ? 'bg-slate-400 border-2 border-slate-600'
        : 'bg-gradient-to-l from-slate-300 to-gray-200',
      { 'opacity-60': task.completed },
    ]"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @dragend="isDraggedOver = false"
    @drop="isDraggedOver = false"
  >
    <!-- Normal View -->
    <div v-if="!isEditing" class="flex items-center justify-between w-full">
      <div class="flex items-center">
        <div class="cursor-move mr-2 text-gray-500">
          <i class="pi pi-bars"></i>
        </div>
        <div>
          <label :class="['font-bold', { 'line-through': task.completed }]">
            {{ task.title }}
          </label>
        </div>
      </div>

      <div class="flex items-center">
        <div class="ml-4 px-3 py-2 bg-white rounded-full border-1 border-black text-sm">
          <i class="pi pi-flag"></i>
          {{ task.priority }}
        </div>

        <div class="flex ml-4">
          <button @click="startEditing" class="p-2 text-slate-700 hover:text-slate-900">
            <i class="pi pi-pencil"></i>
          </button>

          <button @click="deleteTask" class="p-2 text-red-600 hover:text-red-700">
            <i class="pi pi-trash"></i>
          </button>

          <CheckBox
            class="ml-2"
            :modelValue="task.completed"
            @update:modelValue="toggleCompleted"
          />
        </div>
      </div>
    </div>

    <!-- Edit View -->
    <div v-else class="flex flex-col space-y-4">
      <input
        v-model="editedTitle"
        type="text"
        class="w-full p-2 border border-slate-400 rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-500"
        @keyup.enter="saveChanges"
      />

      <div class="flex justify-between">
        <select
          v-model="editedPriority"
          class="p-2 border border-slate-400 rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <option v-for="option in priorityOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <div>
          <button
            @click="isEditing = false"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2 hover:bg-gray-400 shadow"
          >
            Cancel
          </button>
          <button
            @click="saveChanges"
            class="px-4 py-2 bg-gradient-to-l from-slate-500 to-gray-700 text-white rounded hover:from-slate-600 hover:to-gray-800 shadow"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
