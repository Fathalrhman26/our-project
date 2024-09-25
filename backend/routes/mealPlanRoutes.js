const express = require('express');
const router = express.Router();
const auth =require('../middleware/auth');
const {createMealPlan,getMealPlans,updateMealPlan } = require('../controllers/mealPlanController');


router.post('/mealPlan',auth,createMealPlan);
router.get('/mealPlan' ,auth,getMealPlans);
router.put('/mealPlan',auth,updateMealPlan)

module.exports = router;