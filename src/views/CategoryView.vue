<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
    <AppHeader />

    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-white mb-2">Gestión de Categorías</h2>
        <p class="text-gray-400">Administra las categorías de ejercicios del sistema</p>
      </div>

      <!-- Messages Area -->
      <div v-if="successMessage || errorMessage" class="mb-6 h-[50px]">
        <div v-if="successMessage" class="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-sm">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
          {{ errorMessage }}
        </div>
      </div>

      <!-- Main Category Management -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-1">
          <CategoryForm 
            :category="editingCategory"
            :isEditing="!!editingCategory"
            @save="handleSave"
            @cancel="cancelEdit"
          />
        </div>

        <div class="lg:col-span-2">
          <div v-if="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          <CategoryList 
            v-else
            :categories="categories"
            @edit="startEdit"
            @delete="handleDelete"
            @manage-exercises="selectCategoryForExercises"
          />
        </div>
      </div>

      <!-- Exercises Management Section - simplified structure -->
      <div v-if="selectedCategoryForEx" class="mt-12 pt-12 border-t border-gray-700 fade-in-section">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h3 class="text-2xl font-bold text-white">
              Ejercicios de <span class="text-blue-500">{{ selectedCategoryForEx.name }}</span>
            </h3>
            <p class="text-gray-400">Gestiona los ejercicios asignados a esta categoría</p>
          </div>
          <button 
            @click="closeExerciseManagement"
            class="text-gray-400 hover:text-white transition"
          >
            Cerrar Gestión
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-1">
            <ExerciseForm 
              :exercise="editingExercise"
              :isEditing="!!editingExercise"
              :categoryId="selectedCategoryForEx?.id"
              @save="handleExerciseSave"
              @cancel="editingExercise = null"
            />
          </div>
          <div class="lg:col-span-2">
            <div v-if="loadingExercises" class="flex justify-center py-12">
              <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
            <ExerciseList 
              v-else
              :exercises="exercises"
              @edit="editingExercise = $event"
              @delete="handleExerciseDelete"
            />
          </div>
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
import CategoryForm from '@/components/CategoryForm.vue'
import CategoryList from '@/components/CategoryList.vue'
import ExerciseForm from '@/components/ExerciseForm.vue'
import ExerciseList from '@/components/ExerciseList.vue'
import exerciseService from '@/services/exerciseService'

const categories = ref([])
const loading = ref(true)
const editingCategory = ref(null)
const successMessage = ref('')
const errorMessage = ref('')

// Exercises state
const exercises = ref([])
const loadingExercises = ref(false)
const selectedCategoryForEx = ref(null)
const editingExercise = ref(null)

const fetchCategories = async () => {
  loading.value = true
  try {
    categories.value = await exerciseService.getCategories()
  } catch (error) {
    errorMessage.value = 'No se pudieron cargar las categorías'
  } finally {
    loading.value = false
  }
}

onMounted(fetchCategories)

const handleSave = async (categoryData) => {
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    if (editingCategory.value) {
      await exerciseService.updateCategory(editingCategory.value.id, categoryData)
      successMessage.value = 'Categoría actualizada correctamente'
    } else {
      await exerciseService.createCategory(categoryData)
      successMessage.value = 'Categoría creada correctamente'
    }
    
    editingCategory.value = null
    await fetchCategories()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message || 'Error al guardar la categoría'
  }
}

const startEdit = (category) => {
  editingCategory.value = category
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  editingCategory.value = null
}

const handleDelete = async (categoryId) => {
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    await exerciseService.deleteCategory(categoryId)
    successMessage.value = 'Categoría eliminada correctamente'
    
    if (selectedCategoryForEx.value?.id === categoryId) {
      selectedCategoryForEx.value = null
    }
    
    await fetchCategories()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message || 'Error al eliminar la categoría'
  }
}

// Exercise management
const selectCategoryForExercises = (category) => {
  // Clear previous exercise state to avoid mixing data
  editingExercise.value = null
  exercises.value = []
  
  // Set the category (this might trigger a v-if remount due to :key)
  selectedCategoryForEx.value = category
  
  // Fetch data
  fetchExercises(category.id)
  
  // Scroll with longer delay to ensure DOM is settled
  setTimeout(() => {
    const el = document.querySelector('.fade-in-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 200)
}

const closeExerciseManagement = () => {
  selectedCategoryForEx.value = null
  exercises.value = []
  editingExercise.value = null
}

const fetchExercises = async (catId) => {
  const currentId = catId || selectedCategoryForEx.value?.id
  if (!currentId) return

  loadingExercises.value = true
  try {
    const data = await exerciseService.getExercisesByCategory(currentId)
    // Confirm we are still looking at the same category
    if (selectedCategoryForEx.value?.id === currentId) {
      exercises.value = Array.isArray(data) ? data : []
    }
  } catch (error) {
    if (selectedCategoryForEx.value?.id === currentId) {
      errorMessage.value = 'No se pudieron cargar los ejercicios'
    }
  } finally {
    if (selectedCategoryForEx.value?.id === currentId) {
      loadingExercises.value = false
    }
  }
}

const handleExerciseSave = async (exerciseData) => {
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    if (editingExercise.value) {
      await exerciseService.updateExercise(editingExercise.value.id, exerciseData)
      successMessage.value = 'Ejercicio actualizado correctamente'
    } else {
      await exerciseService.createExercise(exerciseData)
      successMessage.value = 'Ejercicio creado correctamente'
    }
    
    editingExercise.value = null
    await fetchExercises()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message || 'Error al guardar el ejercicio'
  }
}

const handleExerciseDelete = async (exerciseId) => {
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    await exerciseService.deleteExercise(exerciseId)
    successMessage.value = 'Ejercicio eliminado correctamente'
    await fetchExercises()
    
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message || 'Error al eliminar el ejercicio'
  }
}
</script>

<style scoped>
.fade-in-section {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

