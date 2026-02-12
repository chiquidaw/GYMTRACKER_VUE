import api from './api'

/**
 * Service for handling exercise-related API calls
 */
const exerciseService = {
    /**
     * Get all exercise categories
     * @returns {Promise} List of categories
     */
    async getCategories() {
        try {
            const response = await api.get('/categories')

            // Handle different API response structures
            let data = response.data
            if (data && data.categories && Array.isArray(data.categories)) {
                return data.categories
            } else if (data && data.data && Array.isArray(data.data)) {
                return data.data
            } else if (Array.isArray(data)) {
                return data
            }

            return []
        } catch (error) {
            throw error
        }
    },

    /**
     * Get exercises by category ID
     * @param {number|string} categoryId - The ID of the category
     * @returns {Promise} List of exercises in the category
     */
    async getExercisesByCategory(categoryId) {
        if (!categoryId) throw new Error('ID de categoría no proporcionado')
        try {
            const response = await api.get(`/categories/${categoryId}/exercises`)

            // Handle different API response structures
            let data = response.data
            if (data && data.exercises && Array.isArray(data.exercises)) {
                return data.exercises
            } else if (data && data.data && Array.isArray(data.data)) {
                return data.data
            } else if (Array.isArray(data)) {
                return data
            }

            return []
        } catch (error) {
            throw error
        }
    },

    /**
     * Create a new category
     * @param {Object} categoryData - Category data (name)
     * @returns {Promise} The created category
     */
    async createCategory(categoryData) {
        const response = await api.post('/categories', categoryData)
        return response.data
    },

    /**
     * Update an existing category
     * @param {number|string} categoryId - The ID of the category
     * @param {Object} categoryData - Updated category data (name)
     * @returns {Promise} The updated category
     */
    async updateCategory(categoryId, categoryData) {
        if (!categoryId) throw new Error('ID de categoría no proporcionado')
        const response = await api.put(`/categories/${categoryId}`, categoryData)
        return response.data
    },

    /**
     * Delete a category
     * @param {number|string} categoryId - The ID of the category
     * @returns {Promise} API response
     */
    async deleteCategory(categoryId) {
        if (!categoryId) throw new Error('ID de categoría no proporcionado')
        const response = await api.delete(`/categories/${categoryId}`)
        return response.data
    },

    /**
     * Create a new exercise
     * @param {Object} exerciseData - Exercise data (name, instructions, category_id, etc.)
     * @returns {Promise} The created exercise
     */
    async createExercise(exerciseData) {
        const response = await api.post('/exercises', exerciseData)
        return response.data
    },

    /**
     * Update an existing exercise
     * @param {number|string} exerciseId - The ID of the exercise
     * @param {Object} exerciseData - Updated exercise data
     * @returns {Promise} The updated exercise
     */
    async updateExercise(exerciseId, exerciseData) {
        if (!exerciseId) throw new Error('ID de ejercicio no proporcionado')
        const response = await api.put(`/exercises/${exerciseId}`, exerciseData)
        return response.data
    },

    /**
     * Delete an exercise
     * @param {number|string} exerciseId - The ID of the exercise
     * @returns {Promise} API response
     */
    async deleteExercise(exerciseId) {
        if (!exerciseId) throw new Error('ID de ejercicio no proporcionado')
        const response = await api.delete(`/exercises/${exerciseId}`)
        return response.data
    }
}

export default exerciseService
