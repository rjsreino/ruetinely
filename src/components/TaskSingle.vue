<script setup>
import CheckBox from './CheckBox.vue'
import { ref, onMounted } from 'vue'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const props = defineProps({
  taskId: {
    type: String,
    required: true,
  },
})

const db = getFirestore()
const auth = getAuth()

const task = ref(null)
const isLoading = ref(true)
const errMsg = ref('')

const fetchTask = async () => {
  isLoading.value = true
  try {
    const user = auth.currentUser
    if (!user) {
      console.error('User not authenticated')
      errMsg.value = 'User not authenticated'
      return
    }
    console.log('Fetching task for user:', user.uid, 'and task ID:', props.taskId)
    const taskDocRef = doc(db, 'users', user.uid, 'tasks', props.taskId)
    const taskDoc = await getDoc(taskDocRef)

    if (taskDoc.exists()) {
      console.log('Fetched task data:', taskDoc.data())
      task.value = { id: taskDoc.id, ...taskDoc.data() }
    } else {
      console.error('Task document does not exist.')
      errMsg.value = 'Task not found.'
    }
  } catch (error) {
    console.error('Error fetching task:', error.message)
    errMsg.value = 'Failed to fetch task. Please try again later.'
  } finally {
    isLoading.value = false
  }
}

const toggleCompleted = async () => {
  try {
    const user = auth.currentUser
    if (!user || !task.value) {
      console.error('User not authenticated or task is null')
      return
    }

    const taskDocRef = doc(db, 'users', user.uid, 'tasks', task.value.id)
    await updateDoc(taskDocRef, { completed: !task.value.completed })
    task.value.completed = !task.value.completed // Update locally
  } catch (error) {
    console.error('Error updating task completion:', error.message)
  }
}

onMounted(() => {
  console.log('TaskSingle mounted with taskId:', props.taskId)
  fetchTask()
})
</script>
<template>
  <div
    v-if="isLoading"
    class="w-96 p-4 bg-gradient-to-l from-slate-300 to-gray-200 rounded-lg shadow-lg sm:max-w-2xl md:max-w-2xl lg:max-w-2xl text-center text-gray-500"
  >
    Loading task...
  </div>
  <div
    v-else-if="errMsg"
    class="w-96 p-4 bg-gradient-to-l from-slate-300 to-gray-200 rounded-lg shadow-lg sm:max-w-2xl md:max-w-2xl lg:max-w-2xl text-center text-red-500"
  >
    {{ errMsg }}
  </div>
  <div
    v-else-if="task"
    class="w-96 p-4 bg-gradient-to-l from-slate-300 to-gray-200 rounded-lg shadow-lg sm:max-w-2xl md:max-w-2xl lg:max-w-2xl"
    :class="{ 'opacity-60': task.completed }"
  >
    <div class="flex items-center justify-between w-full">
      <!--left side-->
      <label
        :class="[
          'font-bold mr-3 truncate whitespace-nowrap overflow-hidden max-w-[12rem] sm:max-w-[16rem] md:max-w-[20rem]',
          { 'line-through': task.completed },
        ]"
      >
        {{ task.name }}
      </label>
      <div class="flex items-center text-sm font-light text-slate-800 mr-3 flex-shrink-0">
        <i class="pi pi-clock mr-1"></i>
        {{ task.time }}
      </div>
      <div
        class="mr-3 px-3 py-2 bg-white rounded-full border-2 text-sm flex-shrink-0"
        :class="{
          'border-gray-300 text-gray-500': task.priority === 'no priority',
          'border-green-400 text-green-500': task.priority === 'low',
          'border-yellow-400 text-yellow-500': task.priority === 'medium',
          'border-orange-400 text-orange-500 font-semibold': task.priority === 'high',
          'border-red-400 text-red-500 font-bold': task.priority === 'urgent',
        }"
      >
        {{ task.priority }}
      </div>
      <CheckBox
        class="ml-auto pr-1"
        :modelValue="task.completed"
        @update:modelValue="toggleCompleted"
      />
    </div>
  </div>
</template>
