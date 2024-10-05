// Home.js

import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Grid,
    Avatar,
    Button,
} from '@mui/material';
import { useStyles } from '../styles/globalStyles';
import { Link } from 'react-router-dom';

/**
 * Home component that serves as the central hub for user navigation.
 * Displays a personalized greeting and navigation buttons.
 */
const Home = () => {
    // Use custom styles from globalStyles.js
    const classes = useStyles();

    // Get user profile from Redux store
    const profile = useSelector((state) => state.profile);

    return (
        <Container maxWidth="lg" className={classes.container}>
            {/* Header with profile avatar and app logo */}
            <Grid container alignItems="center" justify="space-between" className={classes.header}>
                {/* Profile avatar */}
                <Avatar src={profile.avatarUrl} className={classes.avatar} />
                {/* App logo */}
                <Typography variant="h6" className={classes.logo}>
                    Meal Plan
                </Typography>
            </Grid>
            {/* Personalized greeting */}
            <Typography variant="h4" className={classes.greeting}>
                Welcome back, {profile.name}!
            </Typography>
            {/* Navigation buttons */}
            <Grid container spacing={4} className={classes.buttonGrid}>
                <Grid item xs={12} sm={6} md={3}>
                    <Button
                        component={Link}
                        to="/mealplan"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.navButton}
                    >
                        Meal Plan
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button
                        component={Link}
                        to="/myrecipes"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.navButton}
                    >
                        My Recipes
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button
                        component={Link}
                        to="/grocerylist"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.navButton}
                    >
                        Grocery List
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Button
                        component={Link}
                        to="/tutorials"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.navButton}
                    >
                        Tutorials
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
