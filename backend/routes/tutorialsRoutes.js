// routes/tutorialsRoutes.js

const express = require('express');
const router = express.Router();
const tutorialsController = require('../controllers/tutorialsController');
const authMiddleware = require('../middleware/auth');

// Get Tutorials (Protected Route)
router.get('/', authMiddleware, tutorialsController.getTutorials);

// Save a Tutorial (Optional, Protected Route)
router.post('/', authMiddleware, tutorialsController.saveTutorial);

// Delete a Tutorial (Optional, Protected Route)
router.delete('/:id', authMiddleware, tutorialsController.deleteTutorial);

module.exports = router;
