<script setup>
import { defineProps } from 'vue'
import CheckBox from './CheckBox.vue'

defineProps({
  task: Object,
})
</script>
<template>
  <div class="w-96 p-4 bg-gray-100 rounded-lg shadow-lg sm:max-w-2xl md:max-w-2xl lg:max-w-2xl">
    <div class="flex items-center justify-between w-full">
      <!--left side-->
      <div>
        <label class="font-bold" for="{{ task.title }}">{{ task.title }}</label>
        <i class="pi pi-flag"></i>
        {{ task.priority }}
      </div>
      <CheckBox />
    </div>
  </div>
</template>
