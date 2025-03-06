backend/controllers/tutorialsController.js

const Tutorials = require('../models/Tutorials');
const { Op } = require('sequelize');
const axios = require('axios');
require('dotenv').config();

/**
 * Gets tutorials based on a topic.
 */
exports.getTutorials = async (req, res) => {
  const { topic } = req.query;

  try {
    if (topic) {
      // Fetch tutorials from YouTube API based on the topic
      const youtubeResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            part: 'snippet',
            q: topic,
            key: process.env.YOUTUBE_API_KEY,
            maxResults: 5,
            type: 'video',
          },
        }
      );

      // Transform YouTube API response into tutorial format
      const tutorials = youtubeResponse.data.items.map((item) => ({
        title: item.snippet.title,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        description: item.snippet.description,
        topic: topic,
      }));

      // Optionally, save these tutorials to the database
      await Tutorials.bulkCreate(tutorials, { ignoreDuplicates: true });

      res.status(200).json(tutorials);
    } else {
      const tutorials = await Tutorials.findAll();
      res.status(200).json(tutorials);
    }
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
    const newTutorial = await Tutorials.create({
      title,
      url,
      description,
      topic,
    });
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
    const tutorial = await Tutorials.findByPk(tutorialId);
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }

    await tutorial.destroy();
    res.status(200).json({ message: 'Tutorial deleted successfully' });
  } catch (error) {
    console.error('Delete Tutorial Error:', error);
    res.status(500).json({ message: 'Server error deleting tutorial' });
  }
};