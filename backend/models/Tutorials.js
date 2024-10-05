// Tutorials.js

const pool = require('../config/db');

/**
 * Tutorials model that handles database operations related to tutorials.
 */
class Tutorials {
  /**
   * Gets tutorials based on a topic.
   * @param {string} topic - Tutorial topic
   * @returns {Promise<Array>} - Array of tutorials
   */
  static async getByTopic(topic) {
    const result = await pool.query(
      'SELECT * FROM tutorials WHERE topic ILIKE $1',
      [`%${topic}%`]
    );
    return result.rows;
  }

  /**
   * Saves a tutorial.
   * @param {Object} tutorialData - Tutorial data
   * @returns {Promise<Object>} - Saved tutorial
   */
  static async save(tutorialData) {
    const { title, url, description, topic } = tutorialData;
    const result = await pool.query(
      'INSERT INTO tutorials (title, url, description, topic) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, url, description, topic]
    );
    return result.rows[0];
  }

  /**
   * Deletes a tutorial by ID.
   * @param {number} id - Tutorial ID
   * @returns {Promise<void>}
   */
  static async deleteById(id) {
    await pool.query('DELETE FROM tutorials WHERE id = $1', [id]);
  }
}

module.exports = Tutorials;
