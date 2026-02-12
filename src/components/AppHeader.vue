<template>
  <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" :class="{ 'py-4': !isScrolled, 'py-0': isScrolled }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        class="bg-gray-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] transition-all duration-500 shadow-2xl overflow-hidden"
        :class="{ 'rounded-none border-x-0 border-t-0 bg-gray-900/80': isScrolled }"
      >
        <div class="flex justify-between items-center h-20 px-6 sm:px-10">
          <div class="flex items-center">
            <router-link to="/" class="group flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300 shadow-blue-500/20">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-xl font-black text-white tracking-tighter uppercase group-hover:text-blue-400 transition-colors">
                Gym<span class="text-blue-500">Tracker</span>
              </span>
            </router-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            <template v-if="authStore.isLoggedIn">
              <router-link 
                v-for="link in navLinks" 
                :key="link.to" 
                :to="link.to"
                class="relative px-5 py-2 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all duration-300 group"
                active-class="text-blue-500"
              >
                {{ link.text }}
                <span 
                  class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-8"
                  :class="{ 'w-8': $route.path === link.to }"
                ></span>
              </router-link>
              
              <div class="h-6 w-[1px] bg-gray-700 mx-4"></div>

              <div class="flex items-center gap-4 pl-4">
                <div class="flex flex-col items-end">
                  <span class="text-[10px] font-black uppercase tracking-widest text-gray-500">Personal</span>
                  <span class="text-sm font-bold text-white">{{ user?.name || user?.email }}</span>
                </div>
                <button
                  @click="handleLogout"
                  class="p-3 bg-gray-800/50 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 shadow-lg"
                  title="Cerrar Sesión"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </template>
            
            <template v-else>
              <router-link 
                to="/login"
                class="px-6 py-2 text-sm font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                Login
              </router-link>
              <router-link 
                to="/register"
                class="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 shadow-xl shadow-blue-500/30 transform hover:-translate-y-1"
              >
                Empezar
              </router-link>
            </template>
          </div>

          <!-- Mobile Menu Button -->
          <div class="md:hidden flex items-center">
            <button 
              @click="isMenuOpen = !isMenuOpen"
              class="p-2 text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <div v-if="isMenuOpen" class="md:hidden border-t border-gray-700 px-6 py-8 bg-gray-900 shadow-inner">
            <template v-if="authStore.isLoggedIn">
              <div class="space-y-4 mb-8">
                <router-link 
                  v-for="link in navLinks" 
                  :key="link.to" 
                  :to="link.to"
                  @click="isMenuOpen = false"
                  class="block text-xl font-black text-gray-400 hover:text-blue-500 transition-colors uppercase tracking-widest"
                >
                  {{ link.text }}
                </router-link>
              </div>
              <div class="flex justify-between items-center bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                <div class="flex flex-col">
                  <span class="text-[10px] font-black uppercase tracking-widest text-gray-500">Perfil</span>
                  <span class="text-sm font-bold text-white">{{ user?.name || user?.email }}</span>
                </div>
                <button
                  @click="handleLogout"
                  class="px-6 py-3 bg-red-500/20 text-red-500 rounded-xl font-bold text-xs uppercase"
                >
                  Salir
                </button>
              </div>
            </template>
            <template v-else>
              <div class="flex flex-col gap-4">
                <router-link 
                  to="/login"
                  @click="isMenuOpen = false"
                  class="w-full py-4 text-center font-black uppercase text-gray-400 hover:text-white"
                >
                  Login
                </router-link>
                <router-link 
                  to="/register"
                  @click="isMenuOpen = false"
                  class="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-center shadow-xl shadow-blue-500/20"
                >
                  Registrarse
                </router-link>
              </div>
            </template>
          </div>
        </Transition>
      </div>
    </div>
  </nav>
  <!-- Spacer to prevent content overlap -->
  <div class="h-24 md:h-28"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.currentUser)

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { text: 'Catálogo', to: '/' },
  { text: 'Mis Rutinas', to: '/my-routines' },
  { text: 'Categorías', to: '/categories' }
]

const handleLogout = async () => {
  await authStore.logout()
  isMenuOpen.value = false
  router.push('/login')
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
