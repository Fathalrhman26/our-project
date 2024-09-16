require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mealplans', mealPlanRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
