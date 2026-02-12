<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-4xl font-bold text-white mb-2">Gym Tracker</h2>
        <p class="text-gray-400">Inicia sesión en tu cuenta</p>
      </div>

      <!-- Login Form -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
            {{ errorMessage }}
          </div>

          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="tu@email.com"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
              Contraseña
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </span>
            <span v-else>Iniciar Sesión</span>
          </button>
        </form>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-400 text-sm">
            ¿No tienes una cuenta?
            <router-link to="/register" class="text-blue-500 hover:text-blue-400 font-medium transition">
              Regístrate aquí
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
})

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const result = await authStore.login(form.value.email, form.value.password)

    if (result.success) {
      const redirectTo = router.currentRoute.value.query.redirect || '/my-routines'
      window.location.href = redirectTo
    } else {
      errorMessage.value = result.error || 'Error al iniciar sesión'
      loading.value = false
    }
  } catch (error) {
    errorMessage.value = 'Error al conectar con el servidor'
    loading.value = false
  }
}
</script>
