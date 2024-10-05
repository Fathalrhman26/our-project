// Auth.js

import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Container, Paper, Tabs, Tab, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Auth component that manages the display of SignIn and SignUp components.
 * Uses tabs to allow users to switch between signing in and signing up.
 */
const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine the active tab based on the current URL
  const currentTab = location.pathname === '/signup' ? 1 : 0;

  /**
   * Handles tab changes by updating the URL.
   * @param {Object} event - Event object
   * @param {number} newValue - Index of the new tab
   */
  const handleTabChange = (event, newValue) => {
    if (newValue === 0) {
      navigate('/signin');
    } else {
      navigate('/signup');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 5 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {currentTab === 0 && <SignIn />}
          {currentTab === 1 && <SignUp />}
        </Box>
      </Paper>
    </Container>
  );
};

export default Auth;
