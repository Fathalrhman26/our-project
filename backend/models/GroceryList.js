// GroceryList.js

const pool = require('../config/db');

/**
 * GroceryList model that handles database operations related to grocery lists.
 */
class GroceryList {
  /**
   * Gets a user's grocery list.
   * @param {number} userId - User's ID
   * @returns {Promise<Array>} - Array of grocery items
   */
  static async getByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM grocery_list WHERE user_id = $1',
      [userId]
    );
    return result.rows;
  }

  /**
   * Updates a grocery item.
   * @param {number} itemId - Grocery item ID
   * @param {number} userId - User's ID
   * @param {boolean} checked - Checked status
   * @returns {Promise<Object>} - Updated grocery item
   */
  static async updateItem(itemId, userId, checked) {
    const result = await pool.query(
      'UPDATE grocery_list SET checked = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [checked, itemId, userId]
    );
    return result.rows[0];
  }

  /**
   * Adds items to the grocery list.
   * @param {number} userId - User's ID
   * @param {Array} items - Array of item names
   * @returns {Promise<void>}
   */
  static async addItems(userId, items) {
    const insertQueries = items.map((itemName) => {
      return pool.query(
        'INSERT INTO grocery_list (user_id, item_name, checked) VALUES ($1, $2, $3)',
        [userId, itemName, false]
      );
    });
    await Promise.all(insertQueries);
  }

  /**
   * Clears a user's grocery list.
   * @param {number} userId - User's ID
   * @returns {Promise<void>}
   */
  static async clearByUserId(userId) {
    await pool.query('DELETE FROM grocery_list WHERE user_id = $1', [userId]);
  }
}

module.exports = GroceryList;
