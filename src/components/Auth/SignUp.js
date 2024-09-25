import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  

  /*const handleSignUp = (event) => {
    event.preventDefault();

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }*/

    // Placeholder for actual sign-up logic (e.g., API call)
    //setError(null);
    //console.log('Signing up with:', { username, email, password });
   const handleSignUp= async (e)=>{
      e.preventDefault();

     // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
     // const response = await axios.post('http://localhost:3000/api/auth/register',{username,email,password});
       // setError(response.data.error);
      try{
        const response = await axios.post('http://localhost:5000/api/auth/register',{username,email,password},
      {
        headers:{
          'Content-Type':'application/json'
        }
      }
      );
        setError(response.data.error);
       
        
      }catch(error){
        setError('Registeration faild.Please try again');
      }
    
       // Simulate successful sign-in
    const isSuccess = true; // Replace with actual success check

    if (isSuccess) {
      navigate('/home'); // Navigate to the home page after successful sign-in
    } else {
      setError('Invalid email or password.');

    }
      
  };

  return (
    <Box component="form" onSubmit={handleSignUp} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Sign Up
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        required
      />
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
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;
