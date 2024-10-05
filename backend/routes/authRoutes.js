// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// User Registration
router.post('/register', authController.register);

// User Login
router.post('/login', authController.login);

// Change Password (Protected Route)
router.post('/change-password', authMiddleware, authController.changePassword);

module.exports = router;
