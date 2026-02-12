<template>
  <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
    <div class="flex items-start justify-between">
      <div>
        <h3 class="text-lg font-semibold text-white mb-2">{{ exercise.name }}</h3>
        <p class="text-gray-400 text-sm line-clamp-3">{{ exercise.instruction || 'Sin instrucciones disponibles.' }}</p>
      </div>
      <div v-if="exercise.difficulty" class="ml-4">
        <span 
          class="px-2 py-1 text-xs font-medium rounded-full"
          :class="{
            'bg-green-500/10 text-green-500 border border-green-500/20': exercise.difficulty === 'beginner',
            'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20': exercise.difficulty === 'intermediate',
            'bg-red-500/10 text-red-500 border border-red-500/20': exercise.difficulty === 'expert'
          }"
        >
          {{ exercise.difficulty }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  exercise: {
    type: Object,
    required: true,
    validator: (obj) => {
      return 'name' in obj
    }
  }
})
</script>
