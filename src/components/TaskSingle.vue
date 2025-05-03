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
      <label
        :class="[
          'font-bold mr-3 truncate whitespace-nowrap overflow-hidden max-w-[12rem] sm:max-w-[16rem] md:max-w-[20rem]',
          { 'line-through': task.completed },
        ]"
      >
        {{ task.title }}
      </label>
      <div class="flex items-center text-sm font-light text-slate-800 mr-3 flex-shrink-0">
        <i class="pi pi-clock mr-1"></i>
        {{ task.time }}
      </div>
      <!--priority status mini card-->
      <div class="mr-2 px-3 py-2 bg-white rounded-full border-1 border-black text-sm flex-shrink-0">
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
