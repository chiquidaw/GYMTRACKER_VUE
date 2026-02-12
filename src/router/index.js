import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: () => import('@/views/CatalogView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { requiresAuth: false },
    },
    {
      path: '/my-routines',
      name: 'my-routines',
      component: () => import('@/views/MyRoutinesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoryView.vue'),
      meta: { requiresAuth: true },
    },
    // Add more protected routes here as needed
    // {
    //   path: '/routines',
    //   name: 'routines',
    //   component: () => import('@/views/RoutinesView.vue'),
    //   meta: { requiresAuth: false }, // Public route
    // },
    // {
    //   path: '/exercises',
    //   name: 'exercises',
    //   component: () => import('@/views/ExercisesView.vue'),
    //   meta: { requiresAuth: false }, // Public route
    // },
  ],
})

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Only initialize auth state from localStorage on first load
  // Don't re-initialize if already authenticated (this was causing the bug)
  if (!authStore.isAuthenticated && !authStore.token) {
    authStore.initAuth()
  }

  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !authStore.isLoggedIn) {
    // Route requires authentication but user is not logged in
    // Redirect to login with the intended destination
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    })
  } else if (!requiresAuth && authStore.isLoggedIn && (to.name === 'login' || to.name === 'register')) {
    // User is already logged in and trying to access login/register
    // Redirect to my-routines
    next({ name: 'my-routines' })
  } else {
    // Allow navigation
    next()
  }
})

export default router
