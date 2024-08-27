import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const RecipeCard = ({ recipe, addRecipeToPlan, swapMealInPlan }) => {
  return (
    <Box sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h6">{recipe.name}</Typography>
      <Typography variant="body2" color="textSecondary">{recipe.instructions}</Typography>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={() => addRecipeToPlan(recipe.id)}>Add to Plan</Button>
        <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={() => swapMealInPlan(recipe.id)}>Swap Meal</Button>
      </Box>
    </Box>
  );
};

export default RecipeCard;
