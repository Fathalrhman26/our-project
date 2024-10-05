// controllers/groceryListController.js

const GroceryList = require('../models/GroceryList');

/**
 * Fetches the user's grocery list.
 */
exports.getGroceryList = async (req, res) => {
  const userId = req.user.id;

  try {
    const groceryList = await GroceryList.getByUserId(userId);

    res.status(200).json(groceryList);
  } catch (error) {
    console.error('Get Grocery List Error:', error);
    res.status(500).json({ message: 'Server error fetching grocery list' });
  }
};

/**
 * Updates an item in the grocery list.
 */
exports.updateGroceryItem = async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;
  const { checked } = req.body;

  try {
    const updatedItem = await GroceryList.updateItem(itemId, userId, checked);

    if (!updatedItem) {
      return res.status(404).json({ message: 'Grocery item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Update Grocery Item Error:', error);
    res.status(500).json({ message: 'Server error updating grocery item' });
  }
};

/**
 * Adds items to the user's grocery list.
 */
exports.addGroceryItems = async (req, res) => {
  const userId = req.user.id;
  const { items } = req.body; // Expecting an array of item names

  try {
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required and cannot be empty' });
    }

    await GroceryList.addItems(userId, items);

    res.status(201).json({ message: 'Items added to grocery list' });
  } catch (error) {
    console.error('Add Grocery Items Error:', error);
    res.status(500).json({ message: 'Server error adding items to grocery list' });
  }
};

/**
 * Clears the user's grocery list.
 */
exports.clearGroceryList = async (req, res) => {
  const userId = req.user.id;

  try {
    await GroceryList.clearByUserId(userId);

    res.status(200).json({ message: 'Grocery list cleared' });
  } catch (error) {
    console.error('Clear Grocery List Error:', error);
    res.status(500).json({ message: 'Server error clearing grocery list' });
  }
};
