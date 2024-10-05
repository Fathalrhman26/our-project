// SignIn.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
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
 * SignIn component for user login.
 * Allows users to input their email and password to sign in.
 */
const SignIn = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // useNavigate hook for navigation
  const navigate = useNavigate();

  // Get authentication state from Redux store
  const auth = useSelector((state) => state.auth);

  // Formik setup for form handling and validation
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address format')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      // Dispatch login action with email and password
      dispatch(loginUser(values))
        .unwrap()
        .then(() => {
          // On successful login, redirect to home page
          navigate('/home');
        })
        .catch((error) => {
          // Handle errors (optional)
          console.error('Login failed:', error);
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
          Sign In
        </Typography>

        {/* Display authentication error if any */}
        {auth.error && <Alert severity="error">{auth.error}</Alert>}

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

        {/* Submit button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formik.isValid || formik.isSubmitting || auth.loading}
        >
          {auth.loading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Link to Sign Up page */}
        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Link to="/signup">
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignIn;
