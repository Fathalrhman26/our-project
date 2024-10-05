// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const groceryListRoutes = require('./routes/groceryListRoutes');
const tutorialsRoutes = require('./routes/tutorialsRoutes');
const aiRoutes = require('./routes/aiRoutes'); // If applicable
// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (e.g., for profile pictures)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/mealplan', mealPlanRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/grocerylist', groceryListRoutes);
app.use('/api/tutorials', tutorialsRoutes);
app.use('/api/ai', aiRoutes); // If applicable

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
