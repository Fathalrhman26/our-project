// MealPlan.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMealPlan } from '../redux/slices/mealPlanSlice';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
} from '@mui/material';
import { useStyles } from '../styles/globalStyles';

/**
 * MealPlan component that displays the user's meal plans.
 * Shows AI-generated or customized meal plans with dynamic updates.
 */
const MealPlan = () => {
    // Use custom styles from globalStyles.js
    const classes = useStyles();

    // Redux dispatch function
    const dispatch = useDispatch();

    // Get meal plan data from Redux store
    const mealPlan = useSelector((state) => state.mealPlan);

    // Fetch the meal plan when the component mounts
    useEffect(() => {
        dispatch(fetchMealPlan());
    }, [dispatch]);

    return (
        <Container maxWidth="lg" className={classes.container}>
            {/* Page title */}
            <Typography variant="h4" className={classes.title}>
                Your Meal Plan
            </Typography>
            {/* Meal plan grid */}
            <Grid container spacing={4} className={classes.grid}>
                {mealPlan.meals.map((meal) => (
                    <Grid item xs={12} sm={6} md={4} key={meal.id}>
                        <Card className={classes.card}>
                            {/* Meal image */}
                            <CardMedia
                                className={classes.media}
                                image={meal.imageUrl}
                                title={meal.title}
                            />
                            {/* Meal details */}
                            <CardContent>
                                <Typography variant="h6">{meal.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {meal.description}
                                </Typography>
                            </CardContent>
                            {/* View recipe button */}
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                View Recipe
                            </Button>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MealPlan;
