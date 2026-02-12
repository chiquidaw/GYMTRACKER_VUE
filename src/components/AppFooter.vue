<template>
  <footer class="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <!-- Logo and Copyright -->
        <div class="text-center md:text-left">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} Gym Tracker. Todos los derechos reservados.
          </p>
        </div>

        <!-- Links -->
        <div class="flex space-x-6">
          <a href="#" class="text-gray-400 hover:text-white text-sm transition">
            Acerca de
          </a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition">
            Privacidad
          </a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition">
            Términos
          </a>
          <a href="#" class="text-gray-400 hover:text-white text-sm transition">
            Contacto
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>
