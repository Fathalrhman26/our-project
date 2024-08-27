import React, { useState } from 'react';
import { Container, Typography, Box} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import SearchRecipes from './SearchRecipes';
import RecipeCard from './RecipeCard'; // Assuming you create a RecipeCard component for displaying individual recipes
import { StyledBox, StyledBackButton } from '../../styles/globalStyles'; // Assuming globalStyles.js is in the ../styles/ directory

const MyRecipes = ({ addRecipeToPlan, swapMealInPlan }) => {
  const navigate = useNavigate();
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
      <StyledBox>
        <StyledBackButton onClick={() => navigate('/home')}>
          <ArrowBackIcon />
        </StyledBackButton>
        <Typography variant="h4" gutterBottom>My Recipes</Typography>
        <SearchRecipes onSearch={handleSearch} />
      </StyledBox>
        <Box sx={{ mt: 4 }}>
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} addRecipeToPlan={addRecipeToPlan} swapMealInPlan={swapMealInPlan} />
          ))}
        </Box>
    </Container>
  );
};

export default MyRecipes;
