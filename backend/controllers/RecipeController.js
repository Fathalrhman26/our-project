// controllers/recipeController.js

const Recipe = require('../models/Recipe');
const axios = require('axios');
require('dotenv').config();

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
