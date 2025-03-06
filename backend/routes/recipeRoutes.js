// backend/routes/recipeRoutes.js

const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const authMiddleware = require('../middleware/auth');

// Get User's Saved Recipes
router.get('/my', authMiddleware, recipeController.getMyRecipes);

// Search for Recipes
router.get('/search', authMiddleware, recipeController.searchRecipes);

// Save a Recipe
router.post('/', authMiddleware, recipeController.saveRecipe);

// Get a Specific Recipe
router.get('/:id', authMiddleware, recipeController.getRecipeById);

// Add Recipe to Meal Plan
router.post('/add-to-plan', authMiddleware, recipeController.addToPlan);

// Swap Meal in Meal Plan
router.put('/swap-meal', authMiddleware, recipeController.swapMeal);

module.exports = router;
