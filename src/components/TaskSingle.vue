<script setup>
import { defineProps } from 'vue'
import CheckBox from './CheckBox.vue'

defineProps({
  task: Object,
})
</script>
<template>
  <div
    class="w-96 p-4 bg-gradient-to-l from-slate-300 to-gray-200 rounded-lg shadow-lg sm:max-w-2xl md:max-w-2xl lg:max-w-2xl"
  >
    <div class="flex items-center justify-between w-full">
      <!--left side-->
      <div>
        <label class="font-bold" for="{{ task.title }}">{{ task.title }}</label>
      </div>
      <!--priority status mini card-->
      <div class="ml-4 px-3 py-2 bg-white rounded-full border-1 border-black text-sm">
        <i class="pi pi-flag"></i>
        {{ task.priority }}
      </div>
      <CheckBox class="ml-auto" />
    </div>
  </div>
</template>
