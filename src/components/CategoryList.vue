<template>
  <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="bg-gray-900/50 border-b border-gray-700">
            <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">ID</th>
            <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider">Nombre</th>
            <th class="px-6 py-4 text-sm font-semibold text-gray-300 uppercase tracking-wider text-right">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr v-if="categories.length === 0">
            <td colspan="3" class="px-6 py-12 text-center text-gray-500">
              No hay categorías cargadas.
            </td>
          </tr>
          <tr 
            v-for="category in categories" 
            :key="category.id"
            class="hover:bg-gray-700/30 transition-colors"
          >
            <td class="px-6 py-4 text-sm text-gray-300">{{ category.id }}</td>
            <td class="px-6 py-4 text-sm font-medium text-white">
              <div>{{ category.name }}</div>
              <div class="text-xs text-gray-500">{{ category.icon_path }}</div>
            </td>
            <td class="px-6 py-4 text-right space-x-3">
              <button 
                @click="$emit('manage-exercises', category)"
                class="text-green-500 hover:text-green-400 font-medium transition"
              >
                Ejercicios
              </button>
              <button 
                @click="$emit('edit', category)"
                class="text-blue-500 hover:text-blue-400 font-medium transition"
              >
                Editar
              </button>
              <button 
                @click="confirmDelete(category)"
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
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete', 'manage-exercises'])

const confirmDelete = (category) => {
  if (confirm(`¿Estás seguro de que quieres eliminar la categoría "${category.name}"?`)) {
    emit('delete', category.id)
  }
}
</script>
