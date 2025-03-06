// db.js

const { Pool } = require('pg');
require('dotenv').config();

/**
 * Configures and exports a PostgreSQL connection pool.
 * Uses environment variables for configuration.
 */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Disable SSL for local development
  /*ssl: {
    rejectUnauthorized: false, // Adjust based on your environment
  },*/
});

module.exports = pool;
