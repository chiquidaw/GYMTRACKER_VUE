<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
    <AppHeader />

    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div class="mb-8 text-center">
        <h2 class="text-4xl font-bold text-white mb-4">Catálogo de Ejercicios</h2>
        <p class="text-gray-400 max-w-2xl mx-auto">
          Explora nuestra biblioteca de ejercicios organizados por grupos musculares.
          Selecciona una categoría para ver los ejercicios disponibles.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loadingCategories" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- Categories Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category)"
          class="p-6 rounded-xl border transition-all duration-300 transform hover:scale-105"
          :class="selectedCategory?.id === category.id 
            ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
            : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-gray-600'"
        >
          <div class="text-lg font-semibold">{{ category.name }}</div>
        </button>
      </div>

      <!-- Exercises Section -->
      <div v-if="selectedCategory" class="animate-fade-in-up">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-white">
            Ejercicios de <span class="text-blue-500">{{ selectedCategory.name }}</span>
          </h3>
          <span class="text-gray-400 text-sm">{{ exercises.length }} ejercicios encontrados</span>
        </div>

        <div v-if="loadingExercises" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        <div v-else-if="exercises.length === 0" class="text-center py-12 bg-gray-800/30 rounded-xl border border-gray-700">
          <p class="text-gray-400">No hay ejercicios disponibles en esta categoría.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ExerciseItem 
            v-for="exercise in exercises" 
            :key="exercise.id" 
            :exercise="exercise" 
          />
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ExerciseItem from '@/components/ExerciseItem.vue'
import exerciseService from '@/services/exerciseService'

const categories = ref([])
const exercises = ref([])
const selectedCategory = ref(null)
const loadingCategories = ref(true)
const loadingExercises = ref(false)

// Fetch categories on mount
onMounted(async () => {
  try {
    categories.value = await exerciseService.getCategories()
  } catch (error) {
    // Error handled by UI loading states
  } finally {
    loadingCategories.value = false
  }
})

// Fetch exercises when category is selected
const selectCategory = async (category) => {
  if (selectedCategory.value?.id === category.id) return
  
  selectedCategory.value = category
  loadingExercises.value = true
  exercises.value = []

  try {
    exercises.value = await exerciseService.getExercisesByCategory(category.id)
  } catch (error) {
    // Error handled by UI loading states
  } finally {
    loadingExercises.value = false
  }
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
