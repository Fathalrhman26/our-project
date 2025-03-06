import React from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Avatar,
    Button,
    Box,
    AppBar,  Toolbar, Stack,
    
    
} from '@mui/material';
import { Fastfood, ShoppingCart, EventNote } from '@mui/icons-material';

import { useStyles } from '../styles/globalStyles';
import { Link } from 'react-router-dom';
import useCurrentTime from '../hooks/useCurrentTime';

/**
 * Home component that serves as the central hub for user navigation.
 * Displays a personalized greeting and navigation buttons.
 */
const Home = ({ username }) => {
    // Use custom styles from globalStyles.js
    const classes = useStyles();
    const currentTime = useCurrentTime();

  const getCurrentGreeting = () => {
    const currentHour = currentTime.getHours();
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

    // Get user profile from Redux store
    const profile = useSelector((state) => state.profile);

    return (
        <Container maxWidth="sm" className={classes.container}>
             <AppBar position="static">
        <Toolbar sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Typography>AI Recipe & Meal Planning</Typography>
        </Toolbar>
      </AppBar>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={4}>
      <Avatar src={profile.avatarUrl} className={classes.avatar}  />
        </Stack>
      
        <Stack direction="column" spacing={2} justifyContent="center" ml={62} mt={8}>
        <Avatar component={Link} to="/userProfile">
            A
          </Avatar>
        </Stack>
        
            {/* Personalized greeting */}
            <Typography variant="h4" className={classes.greeting}>
            {getCurrentGreeting()}, {username}!
            </Typography>
            {/* Navigation buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, alignItems: 'center', boxShadow: 4, borderRadius: 8 }}>
        <p>
        <Button variant="contained" startIcon={<EventNote />} component={Link} to="/meal-plan" sx={{ borderRadius: 10, mr: 3, py: 2 }}>
          MealPlan Dashboard
        </Button>
        <Button variant="contained" startIcon={<Fastfood />} component={Link} to="/my-recipes" sx={{ borderRadius: 10, mr: 3, py: 2 }}>
          My Recipes
        </Button>
        </p>
        <p>
        <Button variant="contained" startIcon={<ShoppingCart />} component={Link} to="/grocery-list" sx={{ borderRadius: 10, mr: 1, py: 2 }}>
          Grocery List
        </Button>
        <Button variant="contained" startIcon={<EventNote />} component={Link} to="/tutorials" sx={{ borderRadius: 10, mr: 1, ml: 1, py: 2 }}>
          Tutorials
        </Button>
        </p>
      </Box>
        </Container>
    );
    
};

export default Home;