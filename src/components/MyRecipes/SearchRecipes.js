// SearchRecipes.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes } from '../redux/slices/recipesSlice';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import RecipeCard from './RecipeCard';
import { useStyles } from '../styles/globalStyles';

/**
 * SearchRecipes component that allows users to search for recipes.
 * Users can apply filters like meal type, prep time, and dietary preferences.
 */
const SearchRecipes = () => {
    // Use custom styles from globalStyles.js
    const classes = useStyles();

    // Local state for search and filters
    const [searchTerm, setSearchTerm] = useState('');
    const [mealType, setMealType] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [dietaryPreference, setDietaryPreference] = useState('');

    // Redux dispatch function
    const dispatch = useDispatch();

    // Get search results from Redux store
    const searchResults = useSelector((state) => state.recipes.searchResults);

    /**
     * Handle form submission to search for recipes.
     * Dispatches an action to fetch recipes based on search criteria.
     * @param {Object} e - Event object
     */
    const handleSearch = (e) => {
        e.preventDefault();
        const filters = {
            searchTerm,
            mealType,
            prepTime,
            dietaryPreference,
        };
        dispatch(searchRecipes(filters));
    };

    return (
        <Container maxWidth="lg" className={classes.container}>
            {/* Page title */}
            <Typography variant="h4" className={classes.title}>
                Search Recipes
            </Typography>
            {/* Search form */}
            <form onSubmit={handleSearch} className={classes.form}>
                <Grid container spacing={2}>
                    {/* Search term input */}
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={classes.textField}
                        />
                    </Grid>
                    {/* Meal type select */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="meal-type-label">Meal Type</InputLabel>
                            <Select
                                labelId="meal-type-label"
                                value={mealType}
                                onChange={(e) => setMealType(e.target.value)}
                                label="Meal Type"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Breakfast">Breakfast</MenuItem>
                                <MenuItem value="Lunch">Lunch</MenuItem>
                                <MenuItem value="Dinner">Dinner</MenuItem>
                                <MenuItem value="Snack">Snack</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Preparation time select */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="prep-time-label">Prep Time</InputLabel>
                            <Select
                                labelId="prep-time-label"
                                value={prepTime}
                                onChange={(e) => setPrepTime(e.target.value)}
                                label="Prep Time"
                            >
                                <MenuItem value="">
                                    <em>Any</em>
                                </MenuItem>
                                <MenuItem value="15">Under 15 mins</MenuItem>
                                <MenuItem value="30">Under 30 mins</MenuItem>
                                <MenuItem value="60">Under 1 hour</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Dietary preference select */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="dietary-preference-label">Dietary Preference</InputLabel>
                            <Select
                                labelId="dietary-preference-label"
                                value={dietaryPreference}
                                onChange={(e) => setDietaryPreference(e.target.value)}
                                label="Dietary Preference"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                                <MenuItem value="Vegan">Vegan</MenuItem>
                                <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
                                <MenuItem value="Keto">Keto</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Search button */}
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={classes.searchButton}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {/* Search results */}
            <Grid container spacing={4} className={classes.grid}>
                {searchResults.map((recipe) => (
                    <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                        {/* Display each recipe using RecipeCard */}
                        <RecipeCard recipe={recipe} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SearchRecipes;
