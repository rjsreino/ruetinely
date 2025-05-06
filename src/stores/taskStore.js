import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import taskData from '@/tasks.json'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: taskData,
    selectedDay: 'mon',
  }),
  getters: {
    // Filter tasks based on selected day
    dailyTasks: (state) => {
      return state.tasks.filter((task) => task.repeat && task.repeat.includes(state.selectedDay))
    },

    // Priority calculations
    priorityMap: () => ({
      'no priority': 0,
      low: 1,
      medium: 2,
      high: 3,
      urgent: 4,
    }),

    // Calculate daily priority sums for all days
    dailyPrioritySums: (state) => {
      const sums = {
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
        sat: 0,
        sun: 0,
      }

      state.tasks.forEach((task) => {
        const priority = state.priorityMap[task.priority?.toLowerCase()] ?? 0
        if (task.repeat && Array.isArray(task.repeat)) {
          task.repeat.forEach((day) => {
            if (sums.hasOwnProperty(day)) {
              sums[day] += priority
            }
          })
        }
      })

      return sums
    },

    // Calculate the completed priority sum for the selected day
    completedPrioritySum: (state) => {
      return state.tasks
        .filter((task) => task.completed)
        .filter((task) => task.repeat && task.repeat.includes(state.selectedDay))
        .reduce((sum, task) => {
          const priority = state.priorityMap[task.priority?.toLowerCase()] ?? 0
          return sum + priority
        }, 0)
    },

    // Calculate the ratio for display
    calendarPriorityDisplayValue: (state) => {
      const total = state.dailyPrioritySums[state.selectedDay] || 0
      return total === 0 ? 0 : (state.completedPrioritySum / total).toFixed(2)
    },

    // Convert decimal to hex
    hexCalendarValue: (state) => {
      const total = state.dailyPrioritySums[state.selectedDay] || 0
      if (total === 0) return '0'

      const percentComplete = state.completedPrioritySum / total
      const intPercentage = Math.round(percentComplete * 255)
      return intPercentage.toString(16)
    },
  },
  actions: {
    setSelectedDay(day) {
      this.selectedDay = day
    },
    updateTaskOrder(reorderedTasks) {
      this.tasks = reorderedTasks
      // (implementation) persist changes to a backend here
    },
    toggleTaskCompleted(taskId) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    },
    updateTaskPriority(taskId, priority) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.priority = priority
      }
    },
    updateTaskTitle(taskId, title) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.title = title
      }
    },
    updateTaskRepeat(taskId, repeat) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.repeat = repeat
      }
    },
    updateTaskTime(taskId, time) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.time = time
      }
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((t) => t.id !== taskId)
    },
    addTask(task) {
      this.tasks.push(task)
    },
  },
})
