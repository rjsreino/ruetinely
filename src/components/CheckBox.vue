<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const isChecked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
<template>
  <div class="inline-flex items-center">
    <label for="checkbox" class="flex items-center cursor-pointer relative">
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        v-model="isChecked"
        class="peer h-7 w-7 cursor-pointer transition-all appearance-none rounded-md shadow hover:shadow-md border border-slate-500 checked:bg-slate-800 checked:border-slate-800"
      />
      <span
        class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </span>
    </label>
  </div>
</template>
