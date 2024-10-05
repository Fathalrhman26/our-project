// routes/groceryListRoutes.js

const express = require('express');
const router = express.Router();
const groceryListController = require('../controllers/groceryListController');
const authMiddleware = require('../middleware/auth');

// Get Grocery List (Protected Route)
router.get('/', authMiddleware, groceryListController.getGroceryList);

// Update Grocery Item (Protected Route)
router.put('/:itemId', authMiddleware, groceryListController.updateGroceryItem);

// Add Items to Grocery List (Protected Route)
router.post('/add', authMiddleware, groceryListController.addGroceryItems);

// Clear Grocery List (Protected Route)
router.delete('/clear', authMiddleware, groceryListController.clearGroceryList);

module.exports = router;
