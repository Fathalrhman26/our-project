// src/MyRecipes.js
import React, { useState } from 'react';
import { Container, Typography, Box,Button } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchRecipes from './SearchRecipes'; 
// import Home from './Home/Home';

const MyRecipes = ({ addRecipeToPlan, swapMealInPlan }) => {
  const [recipes] = useState([
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      ingredients: ['spaghetti', 'ground beef', 'tomato sauce'],
      instructions: 'Cook spaghetti. Cook beef. Mix with sauce.',
      calories: 600,
      carbs: 75,
      fats: 20,
      proteins: 30,
      dietaryPreference: 'glutenFree',
      mealType: 'dinner',
      prepTime: 45,
    },
    {
      id: 2,
      name: 'Chicken Salad',
      ingredients: ['chicken', 'lettuce', 'dressing'],
      instructions: 'Cook chicken. Mix with lettuce and dressing.',
      calories: 350,
      carbs: 10,
      fats: 20,
      proteins: 30,
      dietaryPreference: 'lowCarb',
      mealType: 'lunch',
      prepTime: 20,
    },
    // Add more recipes as needed
  ]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = (values) => {
    let filtered = recipes;

    if (values.keywords) {
      filtered = filtered.filter(recipe => 
        recipe.name.toLowerCase().includes(values.keywords.toLowerCase()) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(values.keywords.toLowerCase()))
      );
    }
    if (values.dietaryPreference) {
      filtered = filtered.filter(recipe => recipe.dietaryPreference === values.dietaryPreference);
    }
    if (values.prepTime) {
      filtered = filtered.filter(recipe => recipe.prepTime <= parseInt(values.prepTime));
    }

    setFilteredRecipes(filtered);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>My Recipes</Typography>
        <SearchRecipes onSearch={handleSearch} />
      
      </Box>
      <Button  variant="contained"  component={Link} to="/home"
          
          sx={{ mt: 1}}>
         Back to Home
        </Button>
    </Container>
  );
};

export default MyRecipes;
