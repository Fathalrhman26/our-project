// User.js

const pool = require('../config/db');

/**
 * User model that handles database operations related to users.
 */
class User {
  /**
   * Finds a user by email.
   * @param {string} email - User's email
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  /**
   * Finds a user by ID.
   * @param {number} id - User's ID
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  /**
   * Creates a new user.
   * @param {Object} userData - User data
   * @param {string} userData.name - User's name
   * @param {string} userData.email - User's email
   * @param {string} userData.password - Hashed password
   * @returns {Promise<Object>} - Created user object
   */
  static async create(userData) {
    const { name, email, password } = userData;

    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [name, email, password]
    );

    return result.rows[0];
  }

  /**
   * Updates a user's profile.
   * @param {number} id - User's ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} - Updated user object
   */
  static async updateProfile(id, updateData) {
    const fields = [];
    const values = [];
    let index = 1;

    for (const key in updateData) {
      fields.push(`${key} = $${index}`);
      values.push(updateData[key]);
      index++;
    }

    values.push(id); // Add user ID as the last parameter

    const result = await pool.query(
      `UPDATE users SET ${fields.join(', ')}
       WHERE id = $${index}
       RETURNING id, name, email, age, country, current_weight AS "currentWeight",
                 height, dietary_preferences AS "dietaryPreferences",
                 preferred_cuisines AS "preferredCuisines",
                 disliked_ingredients AS "dislikedIngredients",
                 allergies, health_goal AS "healthGoal",
                 avatar_url AS "avatarUrl"`,
      values
    );

    return result.rows[0];
  }

  /**
   * Updates a user's password.
   * @param {number} id - User's ID
   * @param {string} hashedPassword - New hashed password
   * @returns {Promise<void>}
   */
  static async updatePassword(id, hashedPassword) {
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, id]);
  }

  /**
   * Deletes a user by ID.
   * @param {number} id - User's ID
   * @returns {Promise<void>}
   */
  static async deleteById(id) {
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

module.exports = User;
