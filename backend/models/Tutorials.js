
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

/**
 * Tutorials model representing the tutorials table in the database.
 */
class Tutorials extends Model {}

Tutorials.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true, // URL validation
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Tutorials',
    tableName: 'tutorials',
    timestamps: false,
  }
);

module.exports = Tutorials
