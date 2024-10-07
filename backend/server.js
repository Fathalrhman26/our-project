// backend/server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/sequelize');
require('dotenv').config();

// Import models to ensure they are registered with Sequelize
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const MealPlan = require('./models/MealPlan');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const groceryListRoutes = require('./routes/groceryListRoutes');
const tutorialsRoutes = require('./routes/tutorialsRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins; adjust as needed
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/mealplan', mealPlanRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/grocerylist', groceryListRoutes);
app.use('/api/tutorials', tutorialsRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server and connect to the database
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    // Test Database Connection
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Sync models with the database
    await sequelize.sync({ alter: true });
    console.log('Models synchronized');

    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Server Initialization Error:', err);
  }
});
