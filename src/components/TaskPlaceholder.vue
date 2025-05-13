<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
  <RouterLink to="/tasks">
    <div
      class="w-96 p-4 bg-transparent border-2 border-dotted border-gray-400 rounded-lg shadow-inner hover:bg-slate-100 transition duration-300 ease-in-out cursor-pointer"
    >
      <div class="flex items-center justify-between w-full">
        <!--left side-->
        <div>
          <label class="text-gray-400 italic">No tasks today! Click to add task~</label>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
