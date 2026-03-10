<template>
  <div class="space-y-6 animate-fade-in">
    <div v-if="!routine.exercises || routine.exercises.length === 0" class="bg-gray-800/20 backdrop-blur-sm rounded-[2.5rem] p-20 text-center border-2 border-dashed border-gray-800">
      <div class="w-20 h-20 bg-gray-900/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
        <svg class="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <p class="text-gray-500 font-bold uppercase tracking-widest text-xs">Esta rutina es un lienzo en blanco</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-6">
      <div 
        v-for="(exercise, index) in routine.exercises" 
        :key="exercise.id"
        class="group bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-gray-800/50 hover:border-blue-500/30 transition-all duration-500 shadow-xl overflow-hidden relative"
      >
        <div class="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-500"></div>
        
        <div class="flex-1 relative z-10">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">#{{ index + 1 }}</span>
            <h4 class="text-2xl font-black text-white tracking-tight">{{ exercise.name }}</h4> 
          </div>
          <p class="text-gray-400 text-sm leading-relaxed max-w-xl italic">
            {{ exercise.instruction || 'Configurado para máxima eficiencia y técnica perfecta.' }}
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4 relative z-10">
          <div class="flex flex-col items-center bg-gray-900/80 px-6 py-4 rounded-2xl border border-gray-800 min-w-[100px] shadow-lg">
            <span class="text-2xl font-black text-white">{{ exercise.target_sets || 0 }}</span>
            <span class="text-[9px] text-gray-500 uppercase font-black tracking-widest">Series</span>
          </div>
          <div class="flex flex-col items-center bg-gray-900/80 px-6 py-4 rounded-2xl border border-gray-800 min-w-[100px] shadow-lg">
            <span class="text-2xl font-black text-blue-400">{{ exercise.target_reps || 0 }}</span>
            <span class="text-[9px] text-gray-500 uppercase font-black tracking-widest">Reps</span>
          </div>
          <div class="flex flex-col items-center bg-gray-900/80 px-6 py-4 rounded-2xl border border-gray-800 min-w-[100px] shadow-lg">
            <span class="text-2xl font-black text-emerald-400">{{ exercise.rest_seconds || 0 }}s</span>
            <span class="text-[9px] text-gray-500 uppercase font-black tracking-widest">Pausa</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  routine: {
    type: Object,
    required: true
  }
})
console.log(JSON.stringify(props.routine.exercises, null, 2))
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}
</style>
