// controllers/mealPlanController.js

const MealPlan = require('../models/MealPlan');
const Recipe = require('../models/Recipe');

/**
 * Gets the user's meal plan.
 */
exports.getMealPlan = async (req, res) => {
  const userId = req.user.id;

  try {
    const mealPlan = await MealPlan.getByUserId(userId);

    res.status(200).json(mealPlan);
  } catch (error) {
    console.error('Get Meal Plan Error:', error);
    res.status(500).json({ message: 'Server error fetching meal plan' });
  }
};

/**
 * Updates the user's meal plan.
 */
exports.updateMealPlan = async (req, res) => {
  const userId = req.user.id;
  const { meals } = req.body; // Expecting an array of meal objects with date and recipe_id

  try {
    if (!Array.isArray(meals) || meals.length === 0) {
      return res.status(400).json({ message: 'Meals array is required and cannot be empty' });
    }

    // Delete existing meal plan
    await MealPlan.deleteByUserId(userId);

    // Insert new meals
    await MealPlan.insertMeals(userId, meals);

    res.status(200).json({ message: 'Meal plan updated successfully' });
  } catch (error) {
    console.error('Update Meal Plan Error:', error);
    res.status(500).json({ message: 'Server error updating meal plan' });
  }
};
