<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const days = [
  { label: 'M', value: 'mon' },
  { label: 'T', value: 'tue' },
  { label: 'W', value: 'wed' },
  { label: 'T', value: 'thu' },
  { label: 'F', value: 'fri' },
  { label: 'S', value: 'sat' },
  { label: 'S', value: 'sun' },
]

function toggleDay(dayValue) {
  const newValue = [...props.modelValue]
  const index = newValue.indexOf(dayValue)

  if (index > -1) {
    newValue.splice(index, 1)
  } else {
    newValue.push(dayValue)
  }

  newValue.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b))

  emit('update:modelValue', newValue)
}
</script>

<template>
  <div class="flex space-x-2">
    <div v-for="(day, index) in days" :key="day.value" class="inline-flex items-center">
      <label class="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          class="peer h-7 w-7 cursor-pointer transition-all appearance-none rounded-md shadow hover:shadow-md border border-slate-500 checked:bg-slate-800 checked:border-slate-800"
          :checked="modelValue.includes(day.value)"
          @change="toggleDay(day.value)"
        />
        <span
          class="absolute text-xs font-semibold left-2 top-1.5 pointer-events-none select-none text-slate-700 peer-checked:text-white"
        >
          {{ day.label }}
        </span>
      </label>
    </div>
  </div>
</template>
