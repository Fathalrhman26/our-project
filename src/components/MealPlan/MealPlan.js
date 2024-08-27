import React, { useState } from 'react';
import { Typography, Button, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { StyledBox, StyledMealList, StyledMealListItem, StyledBackButton } from '../../styles/globalStyles'; 

const MealPlan = ({ meals, onBack, addToGroceryList }) => {
  const navigate = useNavigate();
  const [selectedMeals, setSelectedMeals] = useState([]);

  const handleAddToGroceryList = () => {
    addToGroceryList(selectedMeals);
  };

  const handleMealSelect = (meal) => {
    setSelectedMeals((prevMeals) =>
      prevMeals.includes(meal)
        ? prevMeals.filter((m) => m !== meal)
        : [...prevMeals, meal]
    );
  };

  return (
    <StyledBox>
      <StyledBackButton onClick={() => navigate('/home')}>
        <ArrowBackIcon />
      </StyledBackButton>
      <Typography variant="h4" gutterBottom>
        Your Meal Plan
      </Typography>
      <StyledMealList>
        {meals.map((meal, index) => (
          <StyledMealListItem key={index} onClick={() => handleMealSelect(meal)}>
            <ListItemText primary={meal.name} secondary={meal.description} />
          </StyledMealListItem>
        ))}
      </StyledMealList>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToGroceryList}
        disabled={selectedMeals.length === 0}
      >
        Add Selected Meals to Grocery List
      </Button>
    </StyledBox>
  );
};

export default MealPlan;
