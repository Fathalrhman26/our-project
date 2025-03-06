
// frontend/src/components/MealPlan/MealPlan.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  generateMealPlan,
  fetchLatestMealPlan,
} from '../redux/slices/mealPlanSlice';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';

/**
 * MealPlan for generating and viewing meal plans.
 */
const MealPlan = () => {
  const dispatch = useDispatch();

  // Get meal plan state from Redux store
  const { mealPlan, loading, error } = useSelector((state) => state.mealPlan);

  // Fetch the latest meal plan on  mount
  useEffect(() => {
    dispatch(fetchLatestMealPlan());
  }, [dispatch]);

  /**
   * Handles the generation of a new meal plan.
   */
  const handleGenerateMealPlan = () => {
    dispatch(generateMealPlan());
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" gutterBottom>
          Your Meal Plan
        </Typography>

        {/* Generate Meal Plan Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateMealPlan}
          disabled={loading}
          sx={{ mb: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Meal Plan'}
        </Button>

        {/* Display error if any */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Display the meal plan */}
        {mealPlan && (
          <Box sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', p: 2, borderRadius: 2 }}>
            <Typography variant="body1">{mealPlan}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default MealPlan;
