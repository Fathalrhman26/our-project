import React, { useState } from 'react';
import { Container, Button, Typography, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
const MealPlan = ({ userPreferences }) => {
  const [loading, setLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState(null);

  const MealPlan = async () => {
    setLoading(true);
    // Simulate AI engine call
    setTimeout(() => {
      const sampleMealPlan = {
        day1: {
          breakfast: {
            name: "Oatmeal with fruits",
            calories: 250,
            carbs: 45,
            fats: 5,
            proteins: 7
          },
          lunch: {
            name: "Grilled chicken salad",
            calories: 350,
            carbs: 30,
            fats: 15,
            proteins: 25
          },
          dinner: {
            name: "Steamed vegetables with tofu",
            calories: 300,
            carbs: 35,
            fats: 10,
            proteins: 15
          }
        },
      /*  day2: {
          breakfast: {
            name: "Smoothie bowl",
            calories: 200,
            carbs: 40,
            fats: 5,
            proteins: 5
          },
          lunch: {
            name: "Quinoa salad",
            calories: 300,
            carbs: 50,
            fats: 10,
            proteins: 10
          },
          dinner: {
            name: "Lentil soup",
            calories: 250,
            carbs: 40,
            fats: 8,
            proteins: 15
          }
        },*/
        // Add more days here...
      };
      setMealPlan(sampleMealPlan);
      setLoading(false);
    }, 2000);
  };

  return (
    <Container maxWidth="sm"> 
     

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom> Today's Meal Plan</Typography>
       
        <Button variant="contained" color="primary" onClick={MealPlan} disabled={loading} >
          {loading ? <CircularProgress size={24} /> : ' Meal Plan'}
         
        </Button>
        {mealPlan && (
          <Box sx={{ mt: 4 }}>
            {Object.entries(mealPlan).map(([day, meals], index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="h4">Day {index + 1}</Typography>
                {Object.entries(meals).map(([mealType, mealDetails]) => (
                  <Box key={mealType} sx={{ mb: 2 ,boxShadow:4}}>
                    <Typography variant="subtitle1"><strong>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</strong> {mealDetails.name}</Typography>
                    <Typography variant="body2">Calories: {mealDetails.calories} kcal</Typography>
                    <Typography variant="body2">Carbs: {mealDetails.carbs} g</Typography>
                    <Typography variant="body2">Fats: {mealDetails.fats} g</Typography>
                    <Typography variant="body2">Proteins: {mealDetails.proteins} g</Typography>
                    <Button  variant="contained" >Edit</Button>
                  </Box>
                ))}
              </Box>
            
            ))}
              <Button  variant="contained"  component={Link} to="/home">
         Back to Home
        </Button>
          </Box>
        
        )}
       
      </Box>
      
    </Container>
  );
};

export default MealPlan;