// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

// Get User Profile (Protected Route)
router.get('/profile', authMiddleware, userController.getProfile);

// Update User Profile (Protected Route)
router.put('/profile', authMiddleware, userController.updateProfile);

module.exports = router;
