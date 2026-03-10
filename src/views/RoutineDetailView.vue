<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
    <AppHeader />

    <main class="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative z-10">
      <!-- Loading State -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-32 space-y-6">
        <div class="relative w-20 h-20">
          <div class="absolute inset-0 rounded-[2rem] border-4 border-blue-500/10 rotate-45"></div>
          <div class="absolute inset-0 rounded-[2rem] border-4 border-t-blue-500 animate-spin rotate-45"></div>
        </div>
        <p class="text-blue-400 font-black uppercase tracking-[0.3em] text-xs animate-pulse">Sincronizando Arsenal...</p>
      </div>

      <template v-else-if="routine">
        <!-- Breadcrumbs & Navigation -->
        <nav class="flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8">
          <router-link to="/my-routines" class="hover:text-white transition-colors flex items-center">
            <svg class="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            Mis Rutinas
          </router-link>
          <span class="text-gray-800">/</span>
          <span class="text-blue-500 truncate">{{ routine.name }}</span>
        </nav>

        <!-- Header Card: High End -->
        <div class="bg-gray-800/40 backdrop-blur-2xl rounded-[3rem] border border-gray-700/50 p-10 md:p-14 mb-10 shadow-3xl relative overflow-hidden group">
          <!-- Background accent -->
          <div class="absolute -right-32 -top-32 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-all duration-700"></div>
          
          <div class="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 bg-blue-500 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-lg shadow-lg shadow-blue-500/20">
                  {{ routine.creator_id ? 'PERSONALIZADA' : 'SISTEMA' }}
                </span>
                <span v-if="routine.exercises?.length > 0" class="px-3 py-1 bg-gray-900/80 text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg border border-gray-700">
                  {{ routine.exercises.length }} MOVIMIENTOS
                </span>
              </div>
              
              <h1 class="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                {{ routine.name }}
              </h1>
              
              <p class="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed italic border-l-4 border-blue-500/30 pl-6">
                {{ routine.description || 'Este entrenamiento ha sido forjado para superar tus límites.' }}
              </p>
            </div>
            
            <div class="grid grid-cols-2 gap-4 md:flex md:items-center">
              <div class="bg-gray-900/60 backdrop-blur-md rounded-3xl p-6 border border-gray-800 text-center min-w-[120px] shadow-xl">
                <span class="block text-4xl font-black text-white mb-1 tracking-tighter">{{ routine.exercises?.length || 0 }}</span>
                <span class="text-[9px] text-gray-500 uppercase font-black tracking-widest">Ejercicios</span>
              </div>
              <div class="bg-gray-900/60 backdrop-blur-md rounded-3xl p-6 border border-gray-800 text-center min-w-[120px] shadow-xl">
                <span class="block text-4xl font-black text-blue-400 mb-1 tracking-tighter">{{ totalTime }}</span>
                <span class="text-[9px] text-gray-500 uppercase font-black tracking-widest">Minutos</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs: Premium UX -->
        <div class="flex p-2 bg-gray-900/50 backdrop-blur-md rounded-[2rem] border border-gray-800 mb-10 overflow-x-auto no-scrollbar">
          <router-link 
            :to="`/routines/${routine.id}/exercises`"
            class="flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all duration-300"
            :class="[
              $route.name === 'routine-exercises' 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
                : 'text-gray-500 hover:text-white hover:bg-gray-800/50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            Movimientos
          </router-link>
          <router-link 
            :to="`/routines/${routine.id}/player`"
            class="flex-1 flex items-center justify-center gap-3 py-4 px-8 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all duration-300"
            :class="[
              $route.name === 'routine-player' 
                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-500/30' 
                : 'text-gray-500 hover:text-white hover:bg-gray-800/50'
            ]"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Entrenamiento
          </router-link>
        </div>

        <!-- Transitions for nested content -->
        <div class="pb-16">
          <router-view v-slot="{ Component }">
            <Transition name="page" mode="out-in">
              <component :is="Component" :routine="routine" />
            </Transition>
          </router-view>
        </div>
      </template>

      <!-- Error State -->
      <div v-else class="text-center py-32 space-y-8 animate-fade-in">
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-red-500/20 blur-[60px] rounded-full"></div>
          <svg class="relative mx-auto h-24 w-24 text-red-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div class="space-y-2">
          <h3 class="text-4xl font-black text-white tracking-tighter">Acceso Denegado</h3>
          <p class="text-gray-500 text-lg max-w-md mx-auto">La rutina que buscas se ha desvanecido o no posees los privilegios para verla.</p>
        </div>
        <router-link to="/my-routines" class="inline-flex items-center gap-3 bg-gray-800 hover:bg-white text-gray-400 hover:text-gray-900 font-black py-4 px-10 rounded-2xl transition-all duration-300 uppercase tracking-widest text-sm shadow-2xl">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a Mis Rutinas
        </router-link>
      </div>
    </main>

    <AppFooter class="relative z-10" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import routineService from '@/services/routineService'

const route = useRoute()
const routineId = route.params.id
const routine = ref(null)
const loading = ref(true)

const fetchRoutineDetails = async () => {
  loading.value = true
  try {
    routine.value = await routineService.getRoutine(routineId)
  } catch (error) {
    console.error('Error fetching routine details:', error)
  } finally {
    loading.value = false
  }
}

const totalTime = computed(() => {
  if (!routine.value?.exercises) return 0
  const totalSeconds = routine.value.exercises.reduce((acc, ex) => {
    return acc + (ex.pivot?.rest_seconds || 0) + (ex.pivot?.target_sets || 3) * 45 // 45s per set estimation
  }, 0)
  return Math.ceil(totalSeconds / 60)
})
onMounted(fetchRoutineDetails)
</script>

<style scoped>
.page-enter-active, .page-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.animate-fade-in {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>