const express = require('express');
const router = express.Router();
const {SearchRecipes,getRcipes} = require('../controllers/RecipeController');

//router.post('/recipe',recipeController.createRecipe);
router.get('/recipe',getRcipes);
router.get('/searchRecipes',SearchRecipes);

module.exports = router;