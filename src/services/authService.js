import api from './api'

/**
 * Authentication service for API calls
 */
const authService = {
    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise} API response with token
     */
    async login(email, password) {
        const response = await api.post('/login', { email, password })
        return response.data
    },

    /**
     * Register new user
     * @param {Object} userData - User registration data
     * @param {string} userData.name - User name
     * @param {string} userData.email - User email
     * @param {string} userData.password - User password
     * @param {string} userData.password_confirmation - Password confirmation
     * @returns {Promise} API response
     */
    async register(userData) {
        const response = await api.post('/register', userData)
        return response.data
    },

    /**
     * Logout user
     * @returns {Promise} API response
     */
    async logout() {
        const response = await api.post('/logout')
        return response.data
    },
}

export default authService
