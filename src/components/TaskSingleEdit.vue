<script setup>
import { defineProps } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import DayPick from './DayPick.vue'

import { ref } from 'vue'

const props = defineProps({
  task: Object,
})

const taskStore = useTaskStore()

const getPriorityClasses = (priority) => {
  const map = {
    'no priority': 'border-gray-300 text-gray-500',
    low: 'border-green-400 text-green-500',
    medium: 'border-yellow-400 text-yellow-500',
    high: 'border-orange-400 text-orange-500 font-semibold',
    urgent: 'border-red-400 text-red-500 font-bold',
  }
  return map[priority?.toLowerCase()] || 'border-gray-400 text-gray-600'
}

// state for editing
const isEditing = ref(false)
const editedName = ref(props.task.name)
const editedPriority = ref(props.task.priority)
const editedRepeat = ref(
  Array.isArray(props.task.repeat) ? [...props.task.repeat] : [props.task.repeat],
)
const editedTime = ref(props.task.time)

const priorityOptions = ['no priority', 'low', 'medium', 'high', 'urgent']

// drag visualization
const isDraggedOver = ref(false)

const startEditing = () => {
  isEditing.value = true
  editedName.value = props.task.name
  editedPriority.value = props.task.priority
  editedRepeat.value = props.task.repeat
  editedTime.value = props.task.time
}

const saveChanges = () => {
  if (editedName.value.trim()) {
    taskStore.updateTaskName(props.task.id, editedName.value)
    taskStore.updateTaskPriority(props.task.id, editedPriority.value)
    taskStore.updateTaskRepeat(props.task.id, editedRepeat.value)
    taskStore.updateTaskTime(props.task.id, editedTime.value)
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
    ]"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @dragend="isDraggedOver = false"
    @drop="isDraggedOver = false"
  >
    <!-- two flex boxes on top of each other -->
    <div v-if="!isEditing">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center min-w-0">
          <i class="pi pi-bars cursor-move mr-3 text-gray-500"></i>
          <label
            class="font-bold mr-3 truncate whitespace-nowrap overflow-hidden max-w-[12rem] sm:max-w-[16rem] md:max-w-[20rem]"
          >
            {{ task.name }}
          </label>
          <div
            class="px-3 py-2 bg-white rounded-full border-2 text-sm flex-shrink-0"
            :class="getPriorityClasses(task.priority)"
          >
            <i class="pi pi-flag" :class="getPriorityClasses(task.priority)"></i>
            {{ task.priority }}
          </div>
        </div>

        <div class="flex items-center">
          <div class="flex ml-4">
            <button @click="startEditing" class="p-2 text-slate-700 hover:text-slate-900">
              <i class="pi pi-pencil"></i>
            </button>

            <button @click="deleteTask" class="p-2 text-red-600 hover:text-red-700">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <!--repeat details-->
      <div class="mt-2 font-light italic">
        Repeats every {{ task.repeat.join(', ') }} @ {{ task.time }}
      </div>
    </div>

    <!-- Edit View -->
    <div v-else class="flex flex-col space-y-4">
      <input
        v-model="editedName"
        type="text"
        minlength="1"
        maxlength="32"
        class="w-full p-2 border border-slate-400 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-500"
        @keyup.enter="saveChanges"
        required
      />
      <input
        v-model="editedRepeat"
        type="text"
        class="w-full p-2 border border-slate-400 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-500"
        @keyup.enter="saveChanges"
      />
      <DayPick v-model="editedRepeat" />
      <input
        v-model="editedTime"
        type="time"
        value="{{task.time}}"
        class="w-full p-2 border border-slate-400 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-500"
        @keyup.enter="saveChanges"
      />

      <div class="flex justify-between">
        <select
          v-model="editedPriority"
          class="p-2 border-2 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-500"
          :class="getPriorityClasses(task.priority)"
        >
          <option v-for="option in priorityOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <div>
          <button
            @click="isEditing = false"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-400 shadow"
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
