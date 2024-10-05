// controllers/tutorialsController.js

const Tutorials = require('../models/Tutorials');
const axios = require('axios');
require('dotenv').config();

/**
 * Fetches tutorials based on the user's meal plan or selected recipes.
 */
exports.getTutorials = async (req, res) => {
  const { topic } = req.query; // e.g., 'meal prep', 'cooking basics'

  try {
    // Use YouTube Data API to fetch tutorials
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: topic,
        part: 'snippet',
        maxResults: 10,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    res.status(200).json(response.data.items);
  } catch (error) {
    console.error('Get Tutorials Error:', error);
    res.status(500).json({ message: 'Server error fetching tutorials' });
  }
};

/**
 * Saves a tutorial.
 */
exports.saveTutorial = async (req, res) => {
  const { title, url, description, topic } = req.body;

  try {
    const newTutorial = await Tutorials.save({ title, url, description, topic });
    res.status(201).json(newTutorial);
  } catch (error) {
    console.error('Save Tutorial Error:', error);
    res.status(500).json({ message: 'Server error saving tutorial' });
  }
};

/**
 * Deletes a tutorial by ID.
 */
exports.deleteTutorial = async (req, res) => {
  const tutorialId = req.params.id;

  try {
    await Tutorials.deleteById(tutorialId);
    res.status(200).json({ message: 'Tutorial deleted successfully' });
  } catch (error) {
    console.error('Delete Tutorial Error:', error);
    res.status(500).json({ message: 'Server error deleting tutorial' });
  }
};
