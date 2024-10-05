// SignUp.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Container,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

/**
 * SignUp component for new user registration.
 * Allows users to create a new account by providing necessary details.
 */
const SignUp = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // useNavigate hook for navigation
  const navigate = useNavigate();

  // Get authentication state from Redux store
  const auth = useSelector((state) => state.auth);

  // Formik setup for form handling and validation
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters long')
        .required('Name is required'),
      email: Yup.string()
        .email('Invalid email address format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords do not match')
        .required('Confirm your password'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // Dispatch register action with name, email, and password
      dispatch(registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      }))
        .unwrap()
        .then(() => {
          // On successful registration, redirect to home page
          navigate('/home');
        })
        .catch((error) => {
          // Handle errors (optional)
          console.error('Registration failed:', error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5 }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Sign Up
        </Typography>

        {/* Display authentication error if any */}
        {auth.error && <Alert severity="error">{auth.error}</Alert>}

        {/* Name input field */}
        <TextField
          label="Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          required
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        {/* Email input field */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          required
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        {/* Password input field */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          required
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        {/* Confirm Password input field */}
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          required
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formik.isValid || formik.isSubmitting || auth.loading}
        >
          {auth.loading ? 'Signing Up...' : 'Sign Up'}
        </Button>

        {/* Link to Sign In page */}
        <Typography variant="body2" align="center">
          Already have an account?{' '}
          <Link to="/signin">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignUp;
