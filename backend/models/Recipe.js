// Recipe.js

const pool = require('../config/db');

/**
 * Recipe model that handles database operations related to recipes.
 */
class Recipe {
  /**
   * Gets recipes saved by a user.
   * @param {number} userId - User's ID
   * @returns {Promise<Array>} - Array of recipes
   */
  static async getByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM recipes WHERE user_id = $1',
      [userId]
    );
    return result.rows;
  }

  /**
   * Saves a recipe for a user.
   * @param {number} userId - User's ID
   * @param {Object} recipeData - Recipe data
   * @returns {Promise<Object>} - Saved recipe
   */
  static async save(userId, recipeData) {
    const result = await pool.query(
      'INSERT INTO recipes (user_id, recipe_data) VALUES ($1, $2) RETURNING *',
      [userId, recipeData]
    );
    return result.rows[0];
  }

  /**
   * Finds a recipe by ID.
   * @param {number} id - Recipe ID
   * @returns {Promise<Object>} - Recipe object
   */
  static async findById(id) {
    const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = Recipe;
