<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-4xl font-bold text-white mb-2">Crear Cuenta</h2>
        <p class="text-gray-400">Únete a Gym Tracker</p>
      </div>

      <!-- Register Form -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
            {{ errorMessage }}
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-sm">
            {{ successMessage }}
          </div>

          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
              Nombre
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Tu nombre"
            />
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
              minlength="8"
              class="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
            <p class="mt-1 text-xs text-gray-500">Mínimo 8 caracteres</p>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">
              Confirmar Contraseña
            </label>
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
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
              Registrando...
            </span>
            <span v-else>Crear Cuenta</span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-6 text-center">
          <p class="text-gray-400 text-sm">
            ¿Ya tienes una cuenta?
            <router-link to="/login" class="text-blue-500 hover:text-blue-400 font-medium transition">
              Inicia sesión aquí
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
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleRegister = async () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  // Validate password length
  if (form.value.password.length < 8) {
    errorMessage.value = 'La contraseña debe tener al menos 8 caracteres'
    loading.value = false
    return
  }

  // Validate passwords match
  if (form.value.password !== form.value.confirmPassword) {
    errorMessage.value = 'Las contraseñas no coinciden'
    loading.value = false
    return
  }

  try {
    const result = await authStore.register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.confirmPassword,
    })

    if (result.success) {
      successMessage.value = 'Cuenta creada exitosamente'
      
      // If auto-logged in, redirect to my-routines
      if (authStore.isLoggedIn) {
        setTimeout(() => {
          window.location.href = '/my-routines'
        }, 1500)
      } else {
        setTimeout(() => {
          window.location.href = '/login'
        }, 1500)
      }
    } else {
      errorMessage.value = result.error || 'Error al registrar usuario'
    }
  } catch (error) {
    errorMessage.value = 'Error al conectar con el servidor'
  } finally {
    loading.value = false
  }
}
</script>
