import { defineStore } from 'pinia'
import authService from '@/services/authService'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    }),

    getters: {
        /**
         * Check if user is authenticated
         */
        isLoggedIn: (state) => state.isAuthenticated && !!state.token,

        /**
         * Get current user
         */
        currentUser: (state) => state.user,

        /**
         * Get authentication token
         */
        authToken: (state) => state.token,
    },

    actions: {
        /**
         * Initialize auth state from localStorage
         */
        initAuth() {
            const token = localStorage.getItem('auth_token')
            const userData = localStorage.getItem('user_data')

            if (token && userData) {
                this.token = token
                this.user = JSON.parse(userData)
                this.isAuthenticated = true
            }
        },

        /**
         * Login user
         * @param {string} email - User email
         * @param {string} password - User password
         */
        async login(email, password) {
            this.loading = true
            this.error = null

            try {
                const data = await authService.login(email, password)

                // Store token and user data - check both 'token' and 'access_token'
                const token = data.token || data.access_token

                if (!token) {
                    throw new Error('No se recibió un token de autenticación del servidor')
                }

                this.token = token
                this.user = data.user || { email }
                this.isAuthenticated = true

                // Persist to localStorage
                localStorage.setItem('auth_token', token)
                localStorage.setItem('user_data', JSON.stringify(this.user))

                return { success: true }
            } catch (error) {
                this.error = error.response?.data?.message || 'Error al iniciar sesión'
                return { success: false, error: this.error }
            } finally {
                this.loading = false
            }
        },

        /**
         * Register new user
         * @param {Object} userData - User registration data
         */
        async register(userData) {
            this.loading = true
            this.error = null

            try {
                const data = await authService.register(userData)

                // If registration returns token, auto-login
                const token = data.token || data.access_token
                if (token) {
                    this.token = token
                    this.user = data.user || { email: userData.email, name: userData.name }
                    this.isAuthenticated = true

                    localStorage.setItem('auth_token', token)
                    localStorage.setItem('user_data', JSON.stringify(this.user))
                }

                return { success: true, data }
            } catch (error) {
                this.error = error.response?.data?.message || 'Error al registrar usuario'
                return { success: false, error: this.error }
            } finally {
                this.loading = false
            }
        },

        /**
         * Logout user
         */
        async logout() {
            this.loading = true

            try {
                // Call logout endpoint if authenticated
                if (this.isAuthenticated) {
                    await authService.logout()
                }
            } catch (error) {
                // Silent fail for logout API
            } finally {
                // Clear state and localStorage regardless of API call result
                this.user = null
                this.token = null
                this.isAuthenticated = false
                this.error = null

                localStorage.removeItem('auth_token')
                localStorage.removeItem('user_data')

                this.loading = false
            }
        },

        /**
         * Clear error message
         */
        clearError() {
            this.error = null
        },
    },
})
