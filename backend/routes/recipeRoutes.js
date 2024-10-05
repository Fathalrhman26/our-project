// routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/auth');

// Get User's Saved Recipes (Protected Route)
router.get('/my', authMiddleware, recipeController.getMyRecipes);

// Search for Recipes (Protected Route)
router.get('/search', authMiddleware, recipeController.searchRecipes);

// Save a Recipe (Protected Route)
router.post('/', authMiddleware, recipeController.saveRecipe);

// Get a Specific Recipe (Protected Route)
router.get('/:id', authMiddleware, recipeController.getRecipeById);

module.exports = router;
