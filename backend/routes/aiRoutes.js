const express = require('express');
const router = express.Router();
const aiController =require('../controllers/aiController');

//const recipeController =require('../controllers/RecipeController');



router.post('/suggestions' , aiController.getRecipeSuggestions);

//router.post('/recipe' , recipeController.getRcipes);
module.exports = router;
