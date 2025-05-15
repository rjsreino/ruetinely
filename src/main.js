import './assets/index.css'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'

import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useTaskStore } from '@/stores/taskStore'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBXC8mvPIFf-_69_n97t7O8zOiOohiaF5w',
  authDomain: 'ruetinely-vue.firebaseapp.com',
  projectId: 'ruetinely-vue',
  storageBucket: 'ruetinely-vue.firebasestorage.app',
  messagingSenderId: '148793826649',
  appId: '1:148793826649:web:a24f440e7ae88d90740048',
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(VCalendar, {})
app.use(router)
app.use(PrimeVue)
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  transition: 'Vue-Toastification__fade',
  maxToasts: 1,
  newestOnTop: true,
})

const taskStore = useTaskStore()
taskStore.initializeTaskStore()
taskStore.initializeUser()

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is authenticated:', user.uid)
  } else {
    console.log('No user is authenticated')
  }
  if (!app._container) {
    app.mount('#app') // Mount the app only once
  }
})
