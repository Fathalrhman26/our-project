// backend/models/User.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

/**
 * User model representing the users table in the database.
 */
class User extends Model {
  /**
   * Finds a user by email.
   * @param {string} email - User's email.
   * @returns {Promise<User|null>} - User instance or null if not found.
   */
  static async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}

User.init(
  {
    // Define model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Email validation
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Additional fields
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    currentWeight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'currentWeight',
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    dietaryPreferences: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredCuisines: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dislikedIngredients: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    healthGoal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

module.exports = User;
