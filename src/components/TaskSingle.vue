<script setup>
import CheckBox from './CheckBox.vue'
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
})

const taskStore = useTaskStore()

const task = computed(() => {
  return taskStore.tasks.find((t) => t.id === props.taskId)
})

const toggleCompleted = () => {
  if (task.value) {
    taskStore.toggleTaskCompleted(task.value.id)
  }
}
</script>
<template>
  <div
    v-if="!task"
    class="w-96 p-4 bg-gradient-to-l from-slate-300 to-gray-200 rounded-lg shadow-lg sm:max-w-2xl md:max-w-2xl lg:max-w-2xl text-center text-gray-500"
  >
    Loading task...
  </div>
  <div
    v-else-if="task"
    class="w-96 p-4 bg-gradient-to-l from-slate-300 to-gray-200 rounded-lg shadow-lg sm:max-w-2xl md:max-w-2xl lg:max-w-2xl"
    :class="{ 'opacity-60': task.completed }"
  >
    <div class="flex items-center justify-between w-full">
      <!--left side-->
      <label
        :class="[
          'font-bold mr-3 truncate whitespace-nowrap overflow-hidden max-w-[12rem] sm:max-w-[16rem] md:max-w-[20rem]',
          { 'line-through': task.completed },
        ]"
      >
        {{ task.name }}
      </label>
      <div class="flex items-center text-sm font-light text-slate-800 mr-3 flex-shrink-0">
        <i class="pi pi-clock mr-1"></i>
        {{ task.time }}
      </div>
      <div
        class="mr-3 px-3 py-2 bg-white rounded-full border-2 text-sm flex-shrink-0"
        :class="{
          'border-gray-300 text-gray-500': task.priority === 'no priority',
          'border-green-400 text-green-500': task.priority === 'low',
          'border-yellow-400 text-yellow-500': task.priority === 'medium',
          'border-orange-400 text-orange-500 font-semibold': task.priority === 'high',
          'border-red-400 text-red-500 font-bold': task.priority === 'urgent',
        }"
      >
        <i class="pi pi-flag" :class="task.priority"></i>
        {{ task.priority }}
      </div>
      <CheckBox
        class="ml-auto pr-1"
        :modelValue="task.completed"
        @update:modelValue="toggleCompleted"
      />
    </div>
  </div>
</template>
