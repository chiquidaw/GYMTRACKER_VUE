<template>
  <div class="animate-fade-in">
    <div v-if="!currentExercise" class="bg-gray-800/30 rounded-3xl p-16 text-center border-2 border-dashed border-gray-700">
      <h3 class="text-2xl font-bold text-gray-400 mb-4">¡Rutina Completada!</h3>
      <button 
        @click="resetPlayer"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-2xl transition shadow-xl shadow-blue-500/20"
      >
        Reiniciar Entrenamiento
      </button>
    </div>

    <div v-else class="space-y-8">
      <!-- Player Header -->
      <div class="flex justify-between items-center bg-gray-900/40 p-4 rounded-2xl border border-gray-700">
        <span class="text-xs font-bold text-gray-500 uppercase tracking-widest">
          Ejercicio {{ currentIndex + 1 }} de {{ routine.exercises.length }}
        </span>
        <div class="flex h-2 w-32 bg-gray-800 rounded-full overflow-hidden">
          <div 
            class="bg-blue-500 transition-all duration-500"
            :style="{ width: `${((currentIndex + 1) / routine.exercises.length) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Main Exercise Display -->
      <div class="bg-gray-800/60 backdrop-blur-md rounded-[2.5rem] border-2 border-blue-500/30 p-10 md:p-16 shadow-2xl relative overflow-hidden group">
        <div class="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px]"></div>
        
        <div class="relative z-10 text-center space-y-10">
          <div class="space-y-4">
            <h2 class="text-5xl md:text-7xl font-black text-white tracking-tighter transition-all group-hover:scale-105">
              {{ currentExercise.name }}
            </h2>
            <p class="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto italic font-medium">
              "{{ currentExercise.instruction || 'Enfoque total en el movimiento.' }}"
            </p>
          </div>

          <!-- Big Stats -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="p-8 bg-gray-900/80 rounded-3xl border border-gray-700 shadow-inner">
              <span class="block text-6xl font-black text-blue-400 mb-2">{{ currentExercise.target_sets || 0 }}</span>
              <span class="text-sm text-gray-500 uppercase font-black tracking-widest">Sets</span>
            </div>
            <div class="p-8 bg-gray-900/80 rounded-3xl border border-gray-700 shadow-inner">
              <span class="block text-6xl font-black text-green-400 mb-2">{{ currentExercise.target_reps || 0 }}</span>
              <span class="text-sm text-gray-500 uppercase font-black tracking-widest">Reps</span>
            </div>
            <div class="p-8 bg-gray-900/80 rounded-3xl border border-gray-700 shadow-inner col-span-2 md:col-span-1">
              <span v-if="!timerActive" class="block text-6xl font-black text-yellow-400 mb-2">
                {{ currentExercise.rest_seconds || 0 }}s
              </span>
              <span v-else class="block text-6xl font-black text-red-500 mb-2 animate-pulse">
                {{ timeLeft }}s
              </span>
              <span class="text-sm text-gray-500 uppercase font-black tracking-widest">
                {{ timerActive ? 'Descansando' : 'Descanso' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Player Controls -->
      <div class="flex flex-col md:flex-row gap-6">
        <button 
          @click="startRest"
          :disabled="timerActive"
          class="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-700 text-gray-900 disabled:text-gray-500 font-black text-xl py-6 rounded-[2rem] transition duration-300 shadow-2xl shadow-yellow-500/20 flex items-center justify-center gap-3 uppercase tracking-tighter"
        >
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM11 9H9V6a1 1 0 00-2 0v4a1 1 0 001 1h3a1 1 0 100-2z" clip-rule="evenodd" />
          </svg>
          {{ timerActive ? 'Descansando...' : 'Empezar Descanso' }}
        </button>

        <button 
          @click="nextExercise"
          class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl py-6 rounded-[2rem] transition duration-300 shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 uppercase tracking-tighter"
        >
          <span>Siguiente</span>
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  routine: {
    type: Object,
    required: true
  }
})

const currentIndex = ref(0)
const currentExercise = computed(() => props.routine.exercises?.[currentIndex.value])

const timeLeft = ref(0)
const timerActive = ref(false)
let timerInterval = null

const startRest = () => {
  if (timerActive.value) return
  
  timeLeft.value = currentExercise.value?.pivot?.rest_seconds || 60
  timerActive.value = true
  
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      stopTimer()
    }
  }, 1000)
}

const stopTimer = () => {
  clearInterval(timerInterval)
  timerActive.value = false
}

const nextExercise = () => {
  stopTimer()
  currentIndex.value++
}

const resetPlayer = () => {
  currentIndex.value = 0
  stopTimer()
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
