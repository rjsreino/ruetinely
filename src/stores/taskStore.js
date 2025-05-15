import { defineStore } from 'pinia'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  getDoc,
} from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    selectedDay: 'mon',
    initialized: false,
    user: null,
    userName: '',
    userEmail: '',
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
    initializeUser() {
      if (this.initialized) return
      this.initialized = true
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user
          this.userEmail = user.email
          // Prefer displayName from auth, fallback to Firestore
          this.userName = user.displayName || ''
          if (!this.userName) {
            await this.fetchUserNameFromFirestore()
          }
        } else {
          this.user = null
          this.userName = ''
          this.userEmail = ''
        }
      })
    },

    async fetchUserNameFromFirestore() {
      const auth = getAuth()
      const db = getFirestore()
      if (!auth.currentUser) return
      try {
        const userDocRef = doc(db, 'users', auth.currentUser.uid)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          this.userName = userDoc.data().name || ''
        }
      } catch (error) {
        console.error('Error fetching user name from Firestore:', error.message)
      }
    },

    async updateUserName(newName) {
      const auth = getAuth()
      const db = getFirestore()
      if (!auth.currentUser) return false
      try {
        // Update Firebase Auth profile
        await updateProfile(auth.currentUser, { displayName: newName })
        // Update Firestore user doc
        const userDocRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userDocRef, { name: newName })
        // Update local state
        this.userName = newName
        return true
      } catch (error) {
        console.error('Error updating user name:', error.message)
        return false
      }
    },
    getCurrentUserId() {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) {
        console.error('User not authenticated')
        return null
      }
      return user.uid
    },

    // Convert task for Firestore (arrays need special handling)
    prepareTaskForFirestore(task) {
      return {
        ...task,
        days: task.repeat.join(','), // Convert repeat array to comma-separated string
      }
    },
    // Fetch tasks from Firestore
    async fetchTasks() {
      const userId = this.getCurrentUserId()
      if (!userId) return

      const db = getFirestore()
      const tasksRef = collection(db, 'users', userId, 'tasks')

      try {
        const tasksSnapshot = await getDocs(tasksRef)
        this.tasks = tasksSnapshot.docs.map((doc) => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            repeat: data.days ? data.days.split(',') : [], // Convert days string to array
          }
        })
        console.log('Fetched tasks from Firestore:', this.tasks)
      } catch (error) {
        console.error('Error fetching tasks from Firestore:', error.message)
      }
    },
    // automatically fetch tasks when a user logs in
    initializeTaskStore() {
      const auth = getAuth()
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('User logged in:', user.uid)
          this.fetchTasks() // fetch tasks when a user logs in
        } else {
          console.log('User logged out')
          this.tasks = [] // clear tasks when the user logs out
        }
      })
    },
    setSelectedDay(day) {
      this.selectedDay = day
    },
    async updateTaskOrder(reorderedTasks) {
      this.tasks = reorderedTasks
    },
    async toggleTaskCompleted(taskId) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        await this.updateTaskInFirestore(task)
      }
    },
    async updateTaskPriority(taskId, priority) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.priority = priority
        await this.updateTaskInFirestore(task)
      }
    },
    async updateTaskName(taskId, name) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.name = name
        await this.updateTaskInFirestore(task)
      }
    },
    async updateTaskRepeat(taskId, repeat) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.repeat = repeat
        await this.updateTaskInFirestore(task)
      }
    },
    async updateTaskTime(taskId, time) {
      const task = this.tasks.find((t) => t.id === taskId)
      if (task) {
        task.time = time
        await this.updateTaskInFirestore(task)
      }
    },
    async deleteTask(taskId) {
      await this.deleteTaskFromFirestore(taskId)
      this.tasks = this.tasks.filter((t) => t.id !== taskId)
    },
    async addTask(task) {
      const newTaskId = await this.addTaskToFirestore(task)
      if (newTaskId) {
        // Update the task ID if we got one from Firestore
        task.id = newTaskId
      }
      this.tasks.push(task)
    },
    // Helper method to update a task in Firestore
    async updateTaskInFirestore(task) {
      const userId = this.getCurrentUserId()
      if (!userId) return

      const db = getFirestore()
      const taskRef = doc(db, 'users', userId, 'tasks', task.id)

      try {
        const taskData = this.prepareTaskForFirestore(task)
        // Remove the id field as it's already in the document reference
        delete taskData.id
        await updateDoc(taskRef, taskData)
        console.log('Task updated in Firestore:', task.id)
      } catch (error) {
        console.error('Error updating task in Firestore:', error.message)
      }
    },
    // Helper method to add a task to Firestore
    async addTaskToFirestore(task) {
      const userId = this.getCurrentUserId()
      if (!userId) return null

      const db = getFirestore()
      const tasksRef = collection(db, 'users', userId, 'tasks')

      try {
        const taskData = this.prepareTaskForFirestore(task)
        // Check if task already has an ID (custom ID case)
        if (task.id && typeof task.id === 'string' && task.id.trim() !== '') {
          // Use setDoc with the provided ID
          const taskDocRef = doc(db, 'users', userId, 'tasks', task.id)
          delete taskData.id // Remove id from the data object
          await setDoc(taskDocRef, taskData)
          console.log('Task added to Firestore with provided ID:', task.id)
          return task.id
        } else {
          // Let Firestore generate an ID
          delete taskData.id // Remove any temporary id
          const docRef = await addDoc(tasksRef, taskData)
          console.log('Task added to Firestore with generated ID:', docRef.id)
          return docRef.id
        }
      } catch (error) {
        console.error('Error adding task to Firestore:', error.message)
        return null
      }
    },

    // Helper method to delete a task from Firestore
    async deleteTaskFromFirestore(taskId) {
      const userId = this.getCurrentUserId()
      if (!userId) return

      const db = getFirestore()
      const taskRef = doc(db, 'users', userId, 'tasks', taskId)

      try {
        await deleteDoc(taskRef)
        console.log('Task deleted from Firestore:', taskId)
      } catch (error) {
        console.error('Error deleting task from Firestore:', error.message)
      }
    },
  },
})
