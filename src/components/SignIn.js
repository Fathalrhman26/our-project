// src/SignIn.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const SignIn = ({ onSignIn }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values) => {
    onSignIn(values);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Sign In</Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} component={Link} to="/Home">
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default SignIn;
