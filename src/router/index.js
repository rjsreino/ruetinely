import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import TasksView from '@/views/TasksView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserView from '@/views/UserView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksView,
      meta: { requiresAuth: true },
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const user = auth.currentUser
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      next()
    } else {
      console.error('User not authenticated, redirecting to login...')
      next('/login')
    }
  } else {
    next()
  }
})
export default router
