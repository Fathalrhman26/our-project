
// backend/controllers/mealPlanController.js

const MealPlan = require('../models/MealPlan');
const User = require('../models/User');
const axios = require('axios');
require('dotenv').config();

/**
 * Generates a personalized meal plan for the authenticated user using OpenAI's API.
 */
exports.generateMealPlan = async (req, res) => {
  const userId = req.user.id;

  try {
    // Fetch user preferences from the User model
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract relevant preferences
    const {
      dietaryPreferences,
      preferredCuisines,
      dislikedIngredients,
      allergies,
      healthGoal,
      currentWeight,
      height,
      age,
      country,
    } = user;

    // Construct the prompt for OpenAI
    const prompt = `
      Generate day meal plan tailored for the following user preferences:
      - Dietary Preferences: ${dietaryPreferences || 'None'}
      - Preferred Cuisines: ${preferredCuisines || 'None'}
      - Disliked Ingredients: ${dislikedIngredients || 'None'}
      - Allergies: ${allergies || 'None'}
      - Health Goal: ${healthGoal || 'None'}
      - Current Weight: ${currentWeight || 'N/A'}
      - Height: ${height || 'N/A'}
      - Age: ${age || 'N/A'}
      - Country: ${country || 'N/A'}

      Each day should include breakfast, lunch, and dinner with recipe links. Ensure the meal plan aligns with the user's health goals and dietary restrictions.
    `;

    // Call OpenAI API to generate the meal plan
    const openAIResponse = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003', // You can choose the appropriate model
        prompt: prompt,
        max_tokens: 1000, // Adjust as needed
        temperature: 0.7, // Adjust creativity
        n: 1,
        stop: null,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    // Extract the generated meal plan
    const mealPlanText = openAIResponse.data.choices[0].text.trim();

    // Optionally, parse the meal plan text into structured data
    // For simplicity, we'll store it as plain text in the database

    // Create a new MealPlan entry
    const newMealPlan = await MealPlan.create({
      date: new Date(), // Assuming the meal plan starts today
      userId,
      recipeId: null, // You can associate recipes if available
      // Additional fields can be added as needed
    });

    // You might want to store the mealPlanText somewhere, possibly in MealPlan model
    // For demonstration, let's assume you add a 'details' field
    newMealPlan.details = mealPlanText;
    await newMealPlan.save();

    res.status(201).json({
      message: 'Meal plan generated successfully',
      mealPlan: mealPlanText,
    });
  } catch (error) {
    console.error('Generate Meal Plan Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Server error generating meal plan' });
  }
};

/**
 * Retrieves the latest meal plan for the authenticated user.
 */
exports.getLatestMealPlan = async (req, res) => {
  const userId = req.user.id;

  try {
    const mealPlan = await MealPlan.findOne({
      where: { userId },
      order: [['date', 'DESC']],
    });

    if (!mealPlan) {
      return res.status(404).json({ message: 'No meal plan found for this user' });
    }

    res.status(200).json(mealPlan);
  } catch (error) {
    console.error('Get Latest Meal Plan Error:', error);
    res.status(500).json({ message: 'Server error retrieving meal plan' });
  }
};