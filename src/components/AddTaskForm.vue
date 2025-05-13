<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import DayPick from './DayPick.vue'

const taskStore = useTaskStore()

// Emits
const emit = defineEmits(['close'])

// New task form
const newTaskName = ref('')
const newTaskPriority = ref('no priority')
const newTaskRepeat = ref([])
const newTaskTime = ref('09:00')
const priorityOptions = ['no priority', 'low', 'medium', 'high', 'urgent']

// Validation
const isFormValid = computed(() => {
  return newTaskName.value.trim() !== '' && newTaskRepeat.value.length > 0
})

const validationMessage = computed(() => {
  if (!newTaskName.value.trim()) {
    return 'Task name is required'
  }
  if (newTaskRepeat.value.length === 0) {
    return 'At least one day must be selected'
  }
  return ''
})

const saveNewTask = () => {
  if (!isFormValid.value) return

  const newTask = {
    id: Date.now().toString(),
    name: newTaskName.value,
    priority: newTaskPriority.value,
    repeat: newTaskRepeat.value,
    time: newTaskTime.value,
    completed: false,
  }

  taskStore.addTask(newTask)
  emit('close')
}

const cancelNewTask = () => {
  emit('close')
}

// Styling functions
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
</script>

<template>
  <div
    class="w-96 p-4 rounded-lg shadow-lg transition-all duration-200 sm:max-w-2xl md:max-w-2xl lg:max-w-2xl bg-gradient-to-l from-slate-300 to-gray-200"
  >
    <div class="flex flex-col space-y-4">
      <input
        v-model="newTaskName"
        type="text"
        placeholder="Task name (required)"
        minlength="1"
        maxlength="32"
        class="w-full p-2 border border-slate-400 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-500"
        @keyup.enter="isFormValid ? saveNewTask() : null"
        required
      />

      <!-- Day picker component -->
      <div>
        <p class="text-sm text-gray-600 mb-1">Select days (required):</p>
        <DayPick v-model="newTaskRepeat" />
      </div>

      <input
        v-model="newTaskTime"
        type="time"
        class="w-full p-2 border border-slate-400 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-500"
      />

      <div class="flex justify-between">
        <select
          v-model="newTaskPriority"
          class="p-2 border-2 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-slate-500"
          :class="getPriorityClasses(newTaskPriority)"
        >
          <option v-for="option in priorityOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>

        <div>
          <button
            @click="cancelNewTask"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg mr-2 hover:bg-gray-400 shadow"
          >
            Cancel
          </button>

          <button
            @click="saveNewTask"
            :disabled="!isFormValid"
            :title="!isFormValid ? validationMessage : ''"
            class="px-4 py-2 rounded text-white shadow"
            :class="[
              isFormValid
                ? 'bg-gradient-to-l from-slate-500 to-gray-700 hover:from-slate-600 hover:to-gray-800 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed',
            ]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
