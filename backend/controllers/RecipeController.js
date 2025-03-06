// controllers/recipeController.js

const Recipe = require('../models/Recipe');
const MealPlan = require('../models/MealPlan');
const axios = require('axios');
require('dotenv').config();


/**
 * Adds a recipe to the user's meal plan.
 */
exports.addToPlan = async (req, res) => {
  const userId = req.user.id;
  const { recipeId, date } = req.body;

  try {
    // Create a new meal plan entry
    await MealPlan.create({
      userId,
      recipeId,
      date,
    });

    res.status(201).json({ message: 'Recipe added to meal plan' });
  } catch (error) {
    console.error('Add To Plan Error:', error);
    res.status(500).json({ message: 'Server error adding recipe to meal plan' });
  }
};

/**
 * Swaps a meal in the user's meal plan.
 */
exports.swapMeal = async (req, res) => {
  const userId = req.user.id;
  const { mealPlanId, newRecipeId } = req.body;

  try {
    // Find the meal plan entry
    const mealPlan = await MealPlan.findOne({ where: { id: mealPlanId, userId } });

    if (!mealPlan) {
      return res.status(404).json({ message: 'Meal plan entry not found' });
    }

    // Update the recipe
    mealPlan.recipeId = newRecipeId;
    await mealPlan.save();

    res.status(200).json({ message: 'Meal swapped successfully' });
  } catch (error) {
    console.error('Swap Meal Error:', error);
    res.status(500).json({ message: 'Server error swapping meal' });
  }
};

/**
 * Fetches the user's saved recipes.
 */
exports.getMyRecipes = async (req, res) => {
  const userId = req.user.id;

  try {
    const recipes = await Recipe.getByUserId(userId);

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Get My Recipes Error:', error);
    res.status(500).json({ message: 'Server error fetching recipes' });
  }
};

/**
 * Searches for recipes based on filters.
 */
exports.searchRecipes = async (req, res) => {
  const { query, diet, health, cuisineType } = req.query;

  try {
    const response = await axios.get('https://api.edamam.com/search', {
      params: {
        app_id: process.env.EDAMAM_APP_ID,
        app_key: process.env.EDAMAM_APP_KEY,
        q: query,
        diet,
        health,
        cuisineType,
        to: 20, // Number of results
      },
    });

    res.status(200).json(response.data.hits);
  } catch (error) {
    console.error('Search Recipes Error:', error);
    res.status(500).json({ message: 'Server error searching for recipes' });
  }
};

/**
 * Saves a recipe to the user's saved recipes.
 */
exports.saveRecipe = async (req, res) => {
  const userId = req.user.id;
  const { recipe } = req.body;

  try {
    const newRecipe = await Recipe.save(userId, recipe);

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Save Recipe Error:', error);
    res.status(500).json({ message: 'Server error saving recipe' });
  }
};

/**
 * Fetches a specific recipe by ID.
 */
exports.getRecipeById = async (req, res) => {
  const userId = req.user.id;
  const recipeId = req.params.id;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe || recipe.user_id !== userId) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error('Get Recipe By ID Error:', error);
    res.status(500).json({ message: 'Server error fetching recipe' });
  }
};
