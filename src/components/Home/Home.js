// src/components/Home/Home.js
import React from 'react';
import { Button, Container, Typography, AppBar, Box, Toolbar, Stack } from '@mui/material';
import { Fastfood, ShoppingCart, EventNote } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { StyledAvatar, StyledProfileAvatar, StyledHomeBox, StyledLogo } from '../../styles/globalStyles'; // Adjusted import
import useCurrentTime from '../../hooks/useCurrentTime';

const Home = ({ username }) => {
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

  return (
    <Container maxWidth="sm">
      <AppBar position="static">
        <Toolbar sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <StyledLogo src="path/to/logo.png" alt="App Logo" language={navigator.language} />
          <Typography>AI Recipe & Meal Planning</Typography>
        </Toolbar>
      </AppBar>
      <StyledHomeBox>
        <Stack direction="column" spacing={2} justifyContent="center" ml={62} mt={4}>
          <StyledProfileAvatar component={Link} to="/profile-setting">
            A
          </StyledProfileAvatar>
        </Stack>
        <Stack direction="row" spacing={4} justifyContent="center" alignItems="center" mt={5}>
          <StyledAvatar src="/broken-image.jpg" />
        </Stack>
        <Typography variant="h4" component="h1" gutterBottom>
          {getCurrentGreeting()}, {username}!
        </Typography>
      </StyledHomeBox>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2, alignItems: 'center', boxShadow: 4, borderRadius: 8 }}>
        <p>
        <Button variant="contained" startIcon={<EventNote />} component={Link} to="/meal-plan" sx={{ borderRadius: 10, mr: 3, py: 2 }}>
          Today's MealPlan
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
