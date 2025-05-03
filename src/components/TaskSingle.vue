<script setup>
import { useTaskStore } from '@/stores/taskStore'
import CheckBox from './CheckBox.vue'

const props = defineProps({
  task: Object,
})

const taskStore = useTaskStore()

const toggleCompleted = () => {
  taskStore.toggleTaskCompleted(props.task.id)
}
</script>
<template>
  <div
    class="w-96 p-4 bg-gradient-to-l from-slate-300 to-gray-200 rounded-lg shadow-lg sm:max-w-2xl md:max-w-2xl lg:max-w-2xl"
    :class="{ 'opacity-60': task.completed }"
  >
    <div class="flex items-center justify-between w-full">
      <!--left side-->
      <label :class="['font-bold mr-3', { 'line-through': task.completed }]">
        {{ task.title }}
      </label>
      <div class="font-light italic mr-3">
        <i class="pi pi-clock"></i>
        {{ task.time }}
      </div>
      <!--priority status mini card-->
      <div class="px-3 py-2 bg-white rounded-full border-1 border-black text-sm">
        <i class="pi pi-flag"></i>
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
