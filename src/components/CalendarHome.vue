<script setup>
import { ref, computed, watch } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

const view = ref('weekly')
const focusedDate = ref(new Date())
const calendarKey = ref(0)

watch(view, (newView) => {
  if (newView === 'weekly') {
    // Reset to today when switching to weekly
    focusedDate.value = new Date()
    calendarKey.value++
  }
})

const attributes = ref([
  {
    highlight: {
      color: '',
      fillMode: 'custom',
      class: 'my-custom-highlight',
    },
    dates: [
      {
        start: new Date(),
        repeat: {
          every: 'week',
          weekdays: 2,
        },
      },
    ],
  },
  {
    highlight: {
      color: '',
      fillMode: 'custom',
      class: 'my-current-day-highlight',
    },
    dates: new Date(),
  },
  {
    highlight: {
      color: 'purple',
      fillMode: 'custom',
      contentClass: 'text-purple-600',
    },
    dates: new Date(),
  },
])

// watch for changes in the selected day from the store
watch(
  () => taskStore.selectedDay,
  (newDay) => {
    console.log(`Selected day changed to ${newDay}, updating calendar view`)
  },
)
// computed color value using the hexCalendarValue from the store
const colorValue = computed(() => {
  const hexValue =
    taskStore.hexCalendarValue && taskStore.hexCalendarValue !== '0'
      ? taskStore.hexCalendarValue
      : '00'
  return `#0059ff${hexValue}`
})
const textColorClass = computed(() => {
  const hex = colorValue.value.slice(-2) // get last two hex digits (alpha)
  const alpha = parseInt(hex, 16)
  return alpha >= 102 ? 'text-white' : 'text-black' // 102 ≈ 40% of 255
})
watch(colorValue, (newColor) => {
  document.documentElement.style.setProperty('--number', newColor)
})
document.documentElement.style.setProperty('--number', colorValue.value)
</script>

<style>
:root {
  --number: #0059ffff;
}
/* custom highlight style with precise opacity control */
.my-custom-highlight {
  background-color: var(--number) !important;
  border-radius: 5px;
  color: purple;
}
.my-current-day-highlight {
  border: 2px solid #0059ffff !important;
  border-radius: 5px;
  color: purple;
}
</style>

<template>
  <select v-model="view" class="p-1.5 border-2 rounded-lg shadow-inner focus:outline-none">
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
  </select>
  <p :class="textColorClass">Current opacity: {{ colorValue }}</p>
  <p>Selected day: {{ taskStore.selectedDay }}</p>
  <p>Hex value from store: {{ taskStore.hexCalendarValue }}</p>
  <VCalendar
    expanded
    :key="calendarKey"
    :view="view"
    :focused-date="focusedDate"
    :attributes="attributes"
  />
</template>
