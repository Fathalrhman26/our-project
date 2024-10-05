// routes/aiRoutes.js

const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/auth');

// Generate Meal Plan (Protected Route)
router.post('/mealplan', authMiddleware, aiController.generateMealPlan);

module.exports = router;
