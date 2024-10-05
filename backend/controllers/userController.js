// controllers/userController.js

const pool = require('../config/db'); // PostgreSQL connection pool
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads/avatars';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const userId = req.user.id;
    cb(null, `avatar_${userId}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

/**
 * Gets the user's profile.
 */
exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const userResult = await pool.query(
      `SELECT id, name, email, age, country, current_weight AS "currentWeight",
              height, dietary_preferences AS "dietaryPreferences",
              preferred_cuisines AS "preferredCuisines",
              disliked_ingredients AS "dislikedIngredients",
              allergies, health_goal AS "healthGoal",
              avatar_url AS "avatarUrl"
       FROM users WHERE id = $1`,
      [userId]
    );
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

/**
 * Updates the user's profile.
 */
exports.updateProfile = [
  upload.single('avatar'),
  async (req, res) => {
    const userId = req.user.id;
    const {
      name,
      age,
      country,
      currentWeight,
      height,
      dietaryPreferences,
      preferredCuisines,
      dislikedIngredients,
      allergies,
      healthGoal,
    } = req.body;

    let avatarUrl = null;
    if (req.file) {
      avatarUrl = `/uploads/avatars/${req.file.filename}`;
    }

    try {
      // Update user in the database
      const updatedUser = await pool.query(
        `UPDATE users SET
          name = $1,
          age = $2,
          country = $3,
          current_weight = $4,
          height = $5,
          dietary_preferences = $6,
          preferred_cuisines = $7,
          disliked_ingredients = $8,
          allergies = $9,
          health_goal = $10,
          avatar_url = COALESCE($11, avatar_url)
        WHERE id = $12
        RETURNING id, name, email, age, country, current_weight AS "currentWeight",
                  height, dietary_preferences AS "dietaryPreferences",
                  preferred_cuisines AS "preferredCuisines",
                  disliked_ingredients AS "dislikedIngredients",
                  allergies, health_goal AS "healthGoal",
                  avatar_url AS "avatarUrl"`,
        [
          name,
          age,
          country,
          currentWeight,
          height,
          dietaryPreferences,
          preferredCuisines,
          dislikedIngredients,
          allergies,
          healthGoal,
          avatarUrl,
          userId,
        ]
      );

      res.status(200).json(updatedUser.rows[0]);
    } catch (error) {
      console.error('Update Profile Error:', error);
      res.status(500).json({ message: 'Server error updating profile' });
    }
  },
];
