// MyRecipes.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyRecipes } from '../redux/slices/recipesSlice';
import { Container, Grid, Typography } from '@mui/material';
import RecipeCard from './RecipeCard';
import { useStyles } from '../styles/globalStyles';

/**
 * MyRecipes component that displays the user's saved recipes.
 * Fetches the recipes from the backend and displays them using RecipeCard.
 */
const MyRecipes = () => {
    // Use custom styles from globalStyles.js
    const classes = useStyles();

    // Redux dispatch function
    const dispatch = useDispatch();

    // Get user's recipes from Redux store
    const myRecipes = useSelector((state) => state.recipes.myRecipes);

    // Fetch user's saved recipes when component mounts
    useEffect(() => {
        dispatch(fetchMyRecipes());
    }, [dispatch]);

    return (
        <Container maxWidth="lg" className={classes.container}>
            {/* Page title */}
            <Typography variant="h4" className={classes.title}>
                My Recipes
            </Typography>
            {/* Recipes grid */}
            <Grid container spacing={4} className={classes.grid}>
                {myRecipes.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                        {/* Display each recipe using RecipeCard */}
                        <RecipeCard recipe={recipe} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default MyRecipes;
