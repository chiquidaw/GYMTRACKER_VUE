<template>
  <nav class="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-white hover:text-blue-500 transition">
            Gym Tracker
          </router-link>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Auth Links -->
          <template v-if="authStore.isLoggedIn">
            <router-link to="/" class="text-gray-300 hover:text-white transition">
              Catálogo
            </router-link>
            <span class="text-gray-500">|</span>
            <router-link to="/my-routines" class="text-gray-300 hover:text-white transition">
              Mis Rutinas
            </router-link>
            <span class="text-gray-500">|</span>
            <router-link to="/categories" class="text-gray-300 hover:text-white transition">
              Categorías
            </router-link>
            <span class="text-gray-500">|</span>
            <span class="text-gray-300">{{ user?.name || user?.email }}</span>
            <button
              @click="handleLogout"
              class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition text-sm"
            >
              Salir
            </button>
          </template>
          
          <!-- Guest Links -->
          <template v-else>
            <router-link 
              to="/login"
              class="text-gray-300 hover:text-white transition"
            >
              Iniciar Sesión
            </router-link>
            <router-link 
              to="/register"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm"
            >
              Registrarse
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.currentUser)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
