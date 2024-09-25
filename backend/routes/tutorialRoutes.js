const express = require('express');
const router = express.Router();
const {SearchTutorials} = require('../controllers/tutorialsController');


router.get('/searchTutorials',SearchTutorials);

module.exports = router;
