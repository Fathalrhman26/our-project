import React, { useState } from 'react';
import {  Container,TextField, Button,  Typography,  } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  

  // Formik setup for form handling and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage('');
      setSuccessMessage('');
      

      try {
        // API call to login
        const response = await axios.post('http://localhost:5000/login', values);

        // Store JWT token in local storage or cookies
        localStorage.setItem('token', response.data.token);
        //localStorage.getItem('token', response.data.token);

        setSuccessMessage(response.data.message);
        
      } catch (error) {
        // Handle API errors
        if (error.response) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Login error occurred.');
        }
        
    // Simulate successful sign-in
    const isSuccess = true; // Replace with actual success check

    if (isSuccess) {
     navigate('/home'); // Navigate to the home page after successful sign-in
    } else {
      setErrorMessage('Invalid email or password.');

   }
      }
   
  
    }
   

  

});

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        SignIn
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={!formik.isValid || formik.isSubmitting}
        >
          SignIn
        </Button>
      </form>

      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && <Typography color="primary">{successMessage}</Typography>}
    </Container>
  );
};

export default SignIn;
