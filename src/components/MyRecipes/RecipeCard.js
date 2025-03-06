// frontend/src/components/RecipeCard.js

import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux'
import { addToMealPlan,swapMeal } from '../../redux/slices/recipesSlice';
import { useStyles } from '../styles/globalStyles';

/**
 * RecipeCard component that displays individual recipe details.n
 * Includes actions to add to meal plan and swap meals.
 * @param {Object} props - Contains recipe data.
 */
const RecipeCard = ({ recipe, mealPlanId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  /**
   * Handles adding the recipe to the meal plan.
   */
  const handleAddToPlan = () => {
    const date = prompt('Enter the date for the meal (YYYY-MM-DD):');
    if (date) {
      dispatch(addToMealPlan({ recipeId: recipe.id, date }));
    }
  };

  /**
   * Handles swapping the meal in the meal plan.
   */
  const handleSwapMeal = () => {
    if (mealPlanId) {
      dispatch(swapMeal({ mealPlanId, newRecipeId: recipe.id }));
    } else {
      alert('Meal Plan ID is missing');
    }
  };

  return (
    <Card className={classes.recipeCard}>
      <CardMedia
        className={classes.recipeMedia}
        image={recipe.imageUrl}
        title={recipe.title}
      />
      <CardContent>
        <Typography variant="h6">{recipe.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={handleAddToPlan}>
          Add to Plan
        </Button>
        {mealPlanId && (
          <Button color="secondary" onClick={handleSwapMeal}>
            Swap Meal
          </Button>
        )}
      </CardActions>
    </Card>
  );
};


export default RecipeCard;
