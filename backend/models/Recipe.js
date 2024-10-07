// backend/models/Recipe.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

/**
 * Recipe model representing the recipes table in the database.
 */
class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipeData: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      allowNull: true, // Allows null if user is deleted
    },
  },
  {
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipes',
    timestamps: false,
  }
);

// Define associations
Recipe.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Recipe, { foreignKey: 'userId', as: 'recipes' });

module.exports = Recipe;
