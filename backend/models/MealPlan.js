// backend/models/MealPlan.js

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Recipe = require('./Recipe');

/**
 * MealPlan model representing the meal_plans table in the database.
 */
class MealPlan extends Model {}

MealPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
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
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: Recipe,
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
      allowNull: true, // Allows null if recipe is deleted
    },
  },
  {
    sequelize,
    modelName: 'MealPlan',
    tableName: 'meal_plans',
    timestamps: false,
  }
);

// Define associations
MealPlan.belongsTo(User, { foreignKey: 'userId', as: 'user' });
MealPlan.belongsTo(Recipe, { foreignKey: 'recipeId', as: 'recipe' });
User.hasMany(MealPlan, { foreignKey: 'userId', as: 'mealPlans' });
Recipe.hasMany(MealPlan, { foreignKey: 'recipeId', as: 'mealPlans' });

module.exports = MealPlan;
