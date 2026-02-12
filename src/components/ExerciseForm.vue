<template>
  <div class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
    <h3 class="text-xl font-bold text-white mb-6">
      {{ isEditing ? 'Editar Ejercicio' : 'Nuevo Ejercicio' }}
    </h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300 mb-2">
          Nombre del Ejercicio
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Ej: Flexiones, Sentadillas..."
        />
      </div>

      <div>
        <label for="instruction" class="block text-sm font-medium text-gray-300 mb-2">
          Instrucciones
        </label>
        <textarea
          id="instruction"
          v-model="form.instruction"
          rows="3"
          class="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="Describe cómo realizar el ejercicio..."
        ></textarea>
      </div>

      <div class="flex space-x-3 pt-2">
        <button
          type="submit"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          {{ isEditing ? 'Actualizar' : 'Crear' }}
        </button>
        <button
          v-if="isEditing"
          type="button"
          @click="$emit('cancel')"
          class="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  exercise: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  categoryId: {
    type: [Number, String],
    required: true
  }
})

const emit = defineEmits(['save', 'cancel'])

const form = ref({
  name: '',
  instruction: '',
  category_id: props.categoryId
})

const resetForm = () => {
  form.value = {
    name: '',
    instruction: '',
    category_id: props.categoryId
  }
}

// Watch for exercise prop changes to populate form when editing
watch(() => props.exercise, (newVal) => {
  if (newVal) {
    form.value = {
      name: newVal.name || '',
      instruction: newVal.instruction || '',
      category_id: props.categoryId
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Keep category_id updated if prop changes
watch(() => props.categoryId, (newId) => {
  form.value.category_id = newId
})

const handleSubmit = () => {
  emit('save', { ...form.value })
  if (!props.isEditing) {
    resetForm()
  }
}
</script>
