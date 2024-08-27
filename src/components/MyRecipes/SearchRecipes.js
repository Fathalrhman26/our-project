import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { StyledBox } from '../../styles/globalStyles'; // Assuming paths

const SearchRecipes = ({ onSearch }) => {
  const initialValues = {
    keywords: '',
    dietaryPreference: '',
    prepTime: '',
    mealType: '', // New field for meal type
  };

  const validationSchema = Yup.object().shape({
    keywords: Yup.string(),
    dietaryPreference: Yup.string(),
    prepTime: Yup.number()
      .min(1, 'Preparation time must be at least 1 minute')
      .max(120, 'Preparation time must be less than or equal to 120 minutes'),
    mealType: Yup.string(),
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
          <StyledBox>
            {/* Search Bar for Keywords */}
            <Field name="keywords">
              {({ field }) => (
                <TextField
                  {...field}
                  label="Search Recipes"
                  margin="normal"
                  fullWidth
                  helperText={<ErrorMessage name="keywords" />}
                  error={Boolean(field.touched && field.error)}
                />
              )}
            </Field>
            
            {/* Row with Dietary Preference, Preparation Time, and Meal Type */}
            <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', mt: 2 }}>
              <Field name="dietaryPreference">
                {({ field }) => (
                  <FormControl margin="normal" error={Boolean(field.touched && field.error)}>
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

              <Field name="prepTime">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Preparation Time"
                    margin="normal"
                    type="number"
                    helperText={<ErrorMessage name="prepTime" />}
                    error={Boolean(field.touched && field.error)}
                  />
                )}
              </Field>

              <Field name="mealType">
                {({ field }) => (
                  <FormControl margin="normal" error={Boolean(field.touched && field.error)}>
                    <InputLabel>Meal Type</InputLabel>
                    <Select
                      {...field}
                      onChange={(event) => setFieldValue('mealType', event.target.value)}
                      label="Meal Type"
                    >
                      <MenuItem value=""><em>All</em></MenuItem>
                      <MenuItem value="breakfast">Breakfast</MenuItem>
                      <MenuItem value="lunch">Lunch</MenuItem>
                      <MenuItem value="dinner">Dinner</MenuItem>
                      {/* Add more meal types as needed */}
                    </Select>
                    <Typography variant="body2" color="error">
                      <ErrorMessage name="mealType" />
                    </Typography>
                  </FormControl>
                )}
              </Field>
            </Box>

            {/* Submit/Search Button */}
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} sx={{ mt: 2 }}>
              Search
            </Button>
            
            {/* Icon Button for additional actions, positioned within the main frame */}
          </StyledBox>
        </Form>
      )}
    </Formik>
  );
};

export default SearchRecipes;
