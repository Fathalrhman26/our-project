
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';

const SearchRecipes = ({ onSearch }) => {
  const initialValues = {
    keywords: '',
    dietaryPreference: '',
    prepTime: '',
  };

  const validationSchema = Yup.object().shape({
    keywords: Yup.string().required('Keywords are required'),
    dietaryPreference: Yup.string().required('Please select a dietary preference'),
    prepTime: Yup.number()
      .required('Preparation time is required')
      .min(1, 'Preparation time must be at least 1 minute')
      .max(120, 'Preparation time must be less than or equal to 120 minutes'),
  });

  const handleSubmit = (values) => {
    onSearch(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <Box sx={{ mt: 4 }}>
            <Field name="keywords">
              {({ field }) => (
                <TextField
                  {...field}
                  
                  label="Search Recipes"
                  margin="normal"
                  helperText={<ErrorMessage name="keywords" />}
                  error={Boolean(field.touched && field.error)}
                />

              )}
            </Field>
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} sx={{ ml:2,my:2,py:2}}>
              Search
            </Button>
            <br/>
            <Field name="dietaryPreference">
              {({ field }) => (
                <FormControl  margin="normal" error={Boolean(field.touched && field.error)}>
                  <InputLabel>Dietary Preference</InputLabel>
                  <Select
                    {...field}
                    onChange={(event) => setFieldValue('dietaryPreference', event.target.value)}
                    label="Dietary Preference"
                  >
                    <MenuItem value=""><em>All</em></MenuItem>
                    <MenuItem value="vegetarian">Vegetarian</MenuItem>
                    <MenuItem value="vegan">Vegan</MenuItem>
                    <MenuItem value="glutenFree">Gluten Free</MenuItem>
                    {/* Add more dietary preferences as needed */}
                  </Select>
                  <Typography variant="body2" color="error">
                    <ErrorMessage name="dietaryPreference" />
                  </Typography>
                </FormControl>
              )}
            </Field>
            <Field name="prepTime" >
              {({ field }) => (
                <TextField  sx={{ ml:4}}
                  {...field}
                  
                  label="Preparation Time"
                  margin="normal"
                  type="number"
                  helperText={<ErrorMessage name="prepTime" />}
                  error={Boolean(field.touched && field.error)}
                />
              )}
            </Field>
          
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default SearchRecipes;
