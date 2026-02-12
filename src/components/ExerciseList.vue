<template>
  <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-gray-900/50 border-b border-gray-700">
            <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Nombre</th>
            <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Instrucción</th>
            <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-if="exercises.length === 0">
            <td colspan="3" class="px-6 py-12 text-center text-gray-500">
              No hay ejercicios en esta categoría.
            </td>
          </tr>
          <tr v-for="(exercise, index) in exercises" :key="exercise.id || `temp-${index}`" class="hover:bg-gray-700/30 transition-colors">
            <td class="px-6 py-4 text-sm font-medium text-white">{{ exercise.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-400">
              <p class="truncate max-w-xs">{{ exercise.instruction || '---' }}</p>
            </td>
            <td class="px-6 py-4 text-right space-x-3">
              <button 
                @click="$emit('edit', exercise)"
                class="text-blue-500 hover:text-blue-400 font-medium transition"
              >
                Editar
              </button>
              <button 
                @click="confirmDelete(exercise)"
                class="text-red-500 hover:text-red-400 font-medium transition"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  exercises: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const confirmDelete = (exercise) => {
  if (confirm(`¿Estás seguro de que quieres eliminar el ejercicio "${exercise.name}"?`)) {
    emit('delete', exercise.id)
  }
}
</script>
