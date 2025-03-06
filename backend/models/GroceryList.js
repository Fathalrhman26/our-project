

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

/**
 * GroceryList model representing the grocery_list table in the database.
 */
class GroceryList extends Model {}

GroceryList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'item_name',
    },
    checked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'GroceryList',
    tableName: 'grocery_list',
    timestamps: false,
  }
);

// Define associations
GroceryList.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(GroceryList, { foreignKey: 'userId', as: 'groceryItems' });

module.exports = GroceryList
