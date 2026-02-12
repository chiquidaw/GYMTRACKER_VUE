<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
    <!-- Header Component -->
    <AppHeader />

    <!-- Main Content -->
    <div class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Mis Rutinas</h2>
        <p class="text-gray-400">Gestiona tus rutinas de entrenamiento personalizadas</p>
      </div>

      <!-- Placeholder Content -->
      <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div class="text-center py-12">
          <svg class="mx-auto h-24 w-24 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <h3 class="mt-4 text-xl font-semibold text-white">No tienes rutinas aún</h3>
          <p class="mt-2 text-gray-400">Comienza creando tu primera rutina de entrenamiento</p>
          <button class="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02]">
            Crear Rutina
          </button>
        </div>
      </div>
    </div>

    <!-- Footer Component -->
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>
