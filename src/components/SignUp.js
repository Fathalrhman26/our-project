// src/SignUp.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

const SignUp = ({ onSignUp }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = (values) => {
    onSignUp(values);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mb={2}>
                <Field name="name">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Name"
                      variant="outlined"
                      helperText={<ErrorMessage name="name" />}
                      error={Boolean(field.error && field.touched)}
                    />
                  )}
                </Field>
              </Box>
              <Box mb={2}>
                <Field name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Email"
                      variant="outlined"
                      helperText={<ErrorMessage name="email" />}
                      error={Boolean(field.error && field.touched)}
                    />
                  )}
                </Field>
              </Box>
              <Box mb={2}>
                <Field name="password">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Password"
                      type="password"
                      variant="outlined"
                      helperText={<ErrorMessage name="password" />}
                      error={Boolean(field.error && field.touched)}
                    />
                  )}
                </Field>
              </Box>
              <Box mb={2}>
                <Field name="confirmPassword">
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      helperText={<ErrorMessage name="confirmPassword" />}
                      error={Boolean(field.error && field.touched)}
                    />
                  )}
                </Field>
              </Box>
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignUp;
