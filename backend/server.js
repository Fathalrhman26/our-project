
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/dbConfig');
//const morgan =require('morgan');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const authRoutes =require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const mealPlanRoutes = require('./routes/mealPlanRoutes');
const recipeRoutes  = require('./routes/recipeRoutes');
const groceryListsRoutes = require('./routes/groceryListsRoutes');
const aiRoutes = require('./routes/aiRoutes');
const tutorialRoutes = require('./routes/tutorialRoutes');
app.use(express.json());
//connect to the database() postgresql

//sequelize.sync();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/mealplans', mealPlanRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/groceryLists',groceryListsRoutes);
app.use('/api/tutorials',tutorialRoutes);
//app.use('/api/ai',aiRoutes);

/*const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/
const PORT = process.env.PORT || 5000;

sequelize.sync() .then(()=>{
  app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
  });
  })
  .catch(err => console.error(err));

