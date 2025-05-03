import { defineStore } from 'pinia'
import taskData from '@/tasks.json'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: taskData,
  }),
  actions: {
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
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((t) => t.id !== taskId)
    },
    addTask(task) {
      this.tasks.push(task)
    },
  },
})
