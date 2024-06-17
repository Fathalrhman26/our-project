
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, FormGroup, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';

const initialProfile = {
  name: 'Ali',
  email: 'Ali@example.com',
  dietaryPreferences: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    dairyFree: false,
  },
  allergies: {
    peanuts: false,
    shellfish: false,
    lactose: false,
    gluten: false,
  },
  healthGoal: '',
};

const ProfileSettings = () => {
  const [profile, setProfile] = useState(initialProfile);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleDietaryChange = (event) => {
    const { name, checked } = event.target;
    setProfile({
      ...profile,
      dietaryPreferences: {
        ...profile.dietaryPreferences,
        [name]: checked,
      },
    });
  };

  const handleAllergyChange = (event) => {
    const { name, checked } = event.target;
    setProfile({
      ...profile,
      allergies: {
        ...profile.allergies,
        [name]: checked,
      },
    });
  };

  const handleHealthGoalChange = (event) => {
    setProfile({
      ...profile,
      healthGoal: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the updated profile to your server
    console.log('Profile updated:', profile);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Profile Settings</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
          
          <Typography variant="h6" gutterBottom sx={{ mt: 1 }}>Dietary Preferences</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={profile.dietaryPreferences.vegetarian} onChange={handleDietaryChange} name="vegetarian" />}
              label="Vegetarian"
            />
            <FormControlLabel
              control={<Checkbox checked={profile.dietaryPreferences.vegan} onChange={handleDietaryChange} name="vegan" />}
              label="Vegan"
            />
            <FormControlLabel
              control={<Checkbox checked={profile.dietaryPreferences.glutenFree} onChange={handleDietaryChange} name="glutenFree" />}
              label="Gluten-Free"
            />
              
          </FormGroup>

          <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>Allergies</Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={profile.allergies.peanuts} onChange={handleAllergyChange} name="peanuts" />}
              label="Peanuts"
            />
           
            <FormControlLabel
              control={<Checkbox checked={profile.allergies.lactose} onChange={handleAllergyChange} name="lactose" />}
              label="Lactose"
            />
            <FormControlLabel
              control={<Checkbox checked={profile.allergies.gluten} onChange={handleAllergyChange} name="gluten" />}
              label="Gluten"
            />
          </FormGroup>

          <Typography variant="h6" gutterBottom sx={{ mt: 0 }}>Health Goals</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel id="health-goal-label">Health Goal</InputLabel>
            <Select
              labelId="health-goal-label"
              value={profile.healthGoal}
              onChange={handleHealthGoalChange}
              label="Health Goal"
            >
              <MenuItem value="weightLoss">Weight Loss</MenuItem>
              <MenuItem value="muscleGain">Muscle Gain</MenuItem>
              <MenuItem value="maintain">Maintain Weight</MenuItem>
              <MenuItem value="improveFitness">Improve Fitness</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 1}}
          >
            Save Settings
            
          </Button>
          <Button variant="contained"  fullWidth component={Link} to="/"
          
          sx={{ mt: 1}}>
           Back to Home
           </Button>
          
        </form>
       
      </Box>
    </Container>
  );
};

export default ProfileSettings;
