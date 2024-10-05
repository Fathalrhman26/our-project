// MealPlan.js

const pool = require('../config/db');

/**
 * MealPlan model that handles database operations related to meal plans.
 */
class MealPlan {
  /**
   * Gets a user's meal plan.
   * @param {number} userId - User's ID
   * @returns {Promise<Array>} - Array of meal plan entries
   */
  static async getByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM meal_plans WHERE user_id = $1 ORDER BY date',
      [userId]
    );
    return result.rows;
  }

  /**
   * Deletes a user's existing meal plan.
   * @param {number} userId - User's ID
   * @returns {Promise<void>}
   */
  static async deleteByUserId(userId) {
    await pool.query('DELETE FROM meal_plans WHERE user_id = $1', [userId]);
  }

  /**
   * Inserts multiple meal plan entries for a user.
   * @param {number} userId - User's ID
   * @param {Array} meals - Array of meal objects
   * @returns {Promise<void>}
   */
  static async insertMeals(userId, meals) {
    const insertQueries = meals.map((meal) => {
      const { date, recipe_id } = meal;
      return pool.query(
        'INSERT INTO meal_plans (user_id, date, recipe_id) VALUES ($1, $2, $3)',
        [userId, date, recipe_id]
      );
    });
    await Promise.all(insertQueries);
  }
}

module.exports = MealPlan;
