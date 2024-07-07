// src/Auth.js
import React, { useState } from 'react';
import { Container, Button, Box } from '@mui/material';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSignIn = (credentials) => {
    console.log('Sign In:', credentials);
    // Implement sign-in logic here (e.g., API call)
  };

  const handleSignUp = (details) => {
    console.log('Sign Up:', details);
    // Implement sign-up logic here (e.g., API call)
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        {isSignIn ? (
          <>
            <SignIn onSignIn={handleSignIn} />
            <Button onClick={() => setIsSignIn(false)} sx={{ mt: 2 }}>
              Don't have an account? Sign Up
            </Button>
          </>
        ) : (
          <>
            <SignUp onSignUp={handleSignUp} />
            <Button onClick={() => setIsSignIn(true)} sx={{ mt: 2 }}>
              Already have an account? Sign In
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Auth;
