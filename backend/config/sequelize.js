// backend/config/sequelize.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Initializes and exports a Sequelize instance.
 * Disables SSL in development environment to match server capabilities.
 */
const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: isProduction
      ? {
          require: true,
          rejectUnauthorized: false,
        }
      : false, // Disable SSL in development
  },
  logging: false, // Disable logging; set to console.log for debugging
});

module.exports = sequelize;
