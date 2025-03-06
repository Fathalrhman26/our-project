// routes/mealPlanRoutes.js

const express = require('express');
const router = express.Router();
const mealPlanController = require('../controllers/mealPlanController');
const authMiddleware = require('../middleware/auth');

// Get Meal Plan (Protected Route)
router.get('/', authMiddleware, mealPlanController.getMealPlan);

// Update Meal Plan (Protected Route)
router.put('/', authMiddleware, mealPlanController.noupdateMealPlan);

module.exports = router;
