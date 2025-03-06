// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  [
    // Input validation
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login an existing user
 * @access  Public
 */
router.post(
  '/login',
  [
    // Input validation
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

module.exports = router;
