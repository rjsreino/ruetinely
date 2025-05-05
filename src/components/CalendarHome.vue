<script setup>
import { ref, computed, watch } from 'vue'

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
      color: 'purple',
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
      color: 'red',
      fillMode: 'custom',
      class: 'my-current-day-highlight',
    },
    dates: new Date(),
  },
])
const likertValue = ref(4)
const getHexOpacity = (value) => {
  const opacityMap = {
    0: '00',
    1: '0a', // ~4% opacity
    2: '1a', // ~10% opacity
    3: '33', // ~20% opacity
    4: '4d', // ~30% opacity
    5: '66', // ~40% opacity
    6: '80', // ~50% opacity
    7: '99', // ~60% opacity
    8: 'b3', // ~70% opacity
    9: 'cc', // ~80% opacity
    10: 'ee', // ~93% opacity
  }
  return opacityMap[value] || '80' // Default to 50% if invalid value
}
const colorValue = computed(() => {
  return `#0059ff${getHexOpacity(likertValue.value)}`
})
watch(colorValue, (newColor) => {
  document.documentElement.style.setProperty('--number', newColor)
})

// Initialize the CSS variable
document.documentElement.style.setProperty('--number', colorValue.value)
</script>
<style>
:root {
  --number: #0059ff33;
}
/* Custom highlight style with precise opacity control */
.my-custom-highlight {
  background-color: var(--number) !important;
  border-radius: 5px;
}
.my-current-day-highlight {
  border: 2px solid #0059ff !important;

  border-radius: 5px;
}
</style>
<template>
  <select v-model="view" class="p-1.5 border-2 rounded-lg shadow-inner focus:outline-none">
    <option value="weekly">Weekly</option>
    <option value="monthly">Monthly</option>
  </select>
  <div class="likert-scale">
    <button
      v-for="n in 10"
      :key="n"
      class="likert-button"
      :class="{ active: likertValue === n }"
      @click="likertValue = n"
    >
      {{ n }}
    </button>
  </div>
  <p>Current opacity: {{ getHexOpacity(likertValue) }} (hex)</p>
  <VCalendar
    expanded
    :key="calendarKey"
    :view="view"
    :focused-date="focusedDate"
    :attributes="attributes"
  />
</template>
