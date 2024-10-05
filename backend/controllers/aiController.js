// controllers/aiController.js

const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

/**
 * Generates meal plan recommendations using OpenAI.
 */
exports.generateMealPlan = async (req, res) => {
  const userId = req.user.id;
  const { dietaryPreferences, healthGoal, allergies, dislikedIngredients } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    // Construct the prompt for the AI model
    const prompt = `Create a 7-day meal plan for a user with the following preferences:
    Dietary Preferences: ${dietaryPreferences}
    Health Goal: ${healthGoal}
    Allergies: ${allergies}
    Disliked Ingredients: ${dislikedIngredients}
    Provide recipes with ingredients and preparation steps.`;

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 2000,
      temperature: 0.7,
    });

    const mealPlanText = response.data.choices[0].text.trim();

    // Optionally, parse the meal plan text into a structured format

    res.status(200).json({ mealPlan: mealPlanText });
  } catch (error) {
    console.error('Generate Meal Plan Error:', error);
    res.status(500).json({ message: 'Server error generating meal plan' });
  }
};
