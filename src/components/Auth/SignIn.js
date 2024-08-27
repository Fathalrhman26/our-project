import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = (event) => {
    event.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Placeholder for actual sign-in logic (e.g., API call)
    setError(null);
    console.log('Signing in with:', { email, password });

    // Simulate successful sign-in
    const isSuccess = true; // Replace with actual success check

    if (isSuccess) {
      navigate('/home'); // Navigate to the home page after successful sign-in
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSignIn} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Sign In
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Sign In
      </Button>
    </Box>
  );
};

export default SignIn;
