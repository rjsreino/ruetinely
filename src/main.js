import './assets/index.css'
import 'primeicons/primeicons.css'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VCalendar, {})
app.use(router)
app.use(PrimeVue)

app.mount('#app')
