// UserProfile.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../redux/slices/profileSlice';
import { logoutUser } from '../redux/slices/authSlice';
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  MenuItem,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useStyles } from '../styles/globalStyles';
import { PhotoCamera } from '@mui/icons-material';

/**
 * UserProfile component for managing user profiles and settings.
 * Users can view and edit their personal information and preferences.
 */
const UserProfile = () => {
  // Use custom styles from globalStyles.js
  const classes = useStyles();

  // Local state for edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // Local state for profile data
  const [profileData, setProfileData] = useState({});

  // Redux dispatch function
  const dispatch = useDispatch();

  // Get profile data from Redux store
  const profile = useSelector((state) => state.profile.data);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  // Fetch the user profile when the component mounts
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Update local state when profile data changes
  useEffect(() => {
    setProfileData(profile);
  }, [profile]);

  /**
   * Handle input changes in the form fields.
   * @param {Object} e - Event object
   */
  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  /**
   * Handle profile picture change.
   * @param {Object} e - Event object
   */
  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Create a preview URL for the selected image
      const imageFile = e.target.files[0];
      setProfileData({ ...profileData, avatarFile: imageFile });

      // Update the avatar preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData((prevData) => ({
          ...prevData,
          avatarUrl: event.target.result,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };

  /**
   * Handle form submission to update the user profile.
   * Dispatches an action to update the profile in the backend.
   * @param {Object} e - Event object
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a FormData object to handle file uploads
    const formData = new FormData();
    for (const key in profileData) {
      formData.append(key, profileData[key]);
    }
    dispatch(updateProfile(formData));
    setIsEditMode(false);
  };

  /**
   * Handle user logout.
   */
  const handleLogout = () => {
    dispatch(logoutUser());
    // Optionally, redirect to the login page
    // navigate('/signin');
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      {/* Page title */}
      <Typography variant="h4" className={classes.title}>
        User Profile
      </Typography>
      {/* Profile avatar */}
      <div className={classes.avatarContainer}>
        <Avatar
          src={profileData.avatarUrl}
          className={classes.largeAvatar}
          alt="Profile Picture"
        />
        {isEditMode && (
          <input
            accept="image/*"
            className={classes.input}
            id="avatar-upload"
            type="file"
            name="avatar"
            onChange={handlePictureChange}
            hidden
          />
        )}
        {isEditMode && (
          <label htmlFor="avatar-upload">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              className={classes.cameraButton}
            >
              <PhotoCamera />
            </IconButton>
          </label>
        )}
      </div>
      {/* Toggle edit/view mode button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsEditMode(!isEditMode)}
        className={classes.editButton}
      >
        {isEditMode ? 'Cancel' : 'Edit Profile'}
      </Button>
      {/* Profile form */}
      <form onSubmit={handleSubmit} className={classes.form}>
        {/* Name field */}
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          disabled={!isEditMode}
          value={profileData.name || ''}
          onChange={handleChange}
          className={classes.textField}
        />
        {/* Email field */}
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          disabled
          value={profileData.email || ''}
          className={classes.textField}
        />
        {/* Age field */}
        <TextField
          label="Age"
          name="age"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          disabled={!isEditMode}
          type="number"
          value={profileData.age || ''}
          onChange={handleChange}
          className={classes.textField}
        />
        {/* Country field */}
        <TextField
          label="Country"
          name="country"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          disabled={!isEditMode}
          value={profileData.country || ''}
          onChange={handleChange}
          className={classes.textField}
        />
        {/* Current Weight field */}
        <TextField
          label="Current Weight (kg)"
          name="currentWeight"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          disabled={!isEditMode}
          type="number"
          value={profileData.currentWeight || ''}
          onChange={handleChange}
          className={classes.textField}
        />
        {/* Height field */}
        <TextField
          label="Height (cm)"
          name="height"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          disabled={!isEditMode}
          type="number"
          value={profileData.height || ''}
          onChange={handleChange}
          className={classes.textField}
        />
        {/* Dietary Preferences field */}
        <TextField
          label="Dietary Preferences"
          name="dietaryPreferences"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled={!isEditMode}
          value={profileData.dietaryPreferences || ''}
          onChange={handleChange}
          className={classes.textField}
          select
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="Vegetarian">Vegetarian</MenuItem>
          <MenuItem value="Vegan">Vegan</MenuItem>
          <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
          <MenuItem value="Keto">Keto</MenuItem>
          {/* Add more options as needed */}
        </TextField>
        {/* Preferred Cuisines field */}
        <TextField
          label="Preferred Cuisines"
          name="preferredCuisines"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled={!isEditMode}
          value={profileData.preferredCuisines || ''}
          onChange={handleChange}
          className={classes.textField}
          helperText="Separate multiple cuisines with commas"
        />
        {/* Disliked Ingredients field */}
        <TextField
          label="Disliked Ingredients"
          name="dislikedIngredients"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled={!isEditMode}
          value={profileData.dislikedIngredients || ''}
          onChange={handleChange}
          className={classes.textField}
          helperText="Separate multiple ingredients with commas"
        />
        {/* Allergies field */}
        <TextField
          label="Allergies"
          name="allergies"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled={!isEditMode}
          value={profileData.allergies || ''}
          onChange={handleChange}
          className={classes.textField}
          helperText="Separate multiple allergies with commas"
        />
        {/* Health Goal field */}
        <TextField
          label="Health Goal"
          name="healthGoal"
          variant="outlined"
          fullWidth
          margin="normal"
          disabled={!isEditMode}
          value={profileData.healthGoal || ''}
          onChange={handleChange}
          className={classes.textField}
          select
        >
          <MenuItem value="Lose Weight">Lose Weight</MenuItem>
          <MenuItem value="Gain Muscle">Gain Muscle</MenuItem>
          <MenuItem value="Maintain Weight">Maintain Weight</MenuItem>
          {/* Add more options as needed */}
        </TextField>
        {/* Submit button */}
        {isEditMode && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={classes.submitButton}
          >
            Save Changes
          </Button>
        )}
      </form>
      {/* Logout button */}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        className={classes.logoutButton}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );
};

export default UserProfile;
