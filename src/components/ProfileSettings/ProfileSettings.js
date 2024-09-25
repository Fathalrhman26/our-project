// src/components/ProfileSettings/ProfileSettings.js
import React, { useState,useEffect } from 'react';
import { TextField, Button, Typography, FormControl, Select, MenuItem, InputLabel, Avatar} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import { 
  StyledBackButton, 
  StyledBox, 
  StyledAvatar, 
  StyledButton, 
  StyledFormControl, 
  StyledSubmitButton 
} from '../../styles/globalStyles'; // Adjust the path as needed
import axios from 'axios';

const initialProfile = {
  name: 'Ali',
  email: 'Ali@example.com',
  age:30,
  currentWeight:80,
  height:150,
  dietaryPreferences: 'Vegetarian',
  preferredCuisines: 'Italian, Asian',
  dislikedIngredients: 'Cilantro, Mushrooms',
  allergies: 'Lactose',
  healthGoal: 'Weight Loss',
  profilePicture: 'path/to/profile/picture.jpg', // Replace with actual image path
};

const ProfileSettings = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const { t} = useTranslation();
  const [error, setError] = useState(null);
  //const [dataProfile,setDataProfile] = useState({username,email, dietaryPreferences, preferredCuisines,allergies,healthGoals});
 


  const handleInputChange = (event) => {
    const { name, value } = event.target;
   
    setProfile({
      ...profile,
      [name]: value,
    });
  };
   //load the user profile
   useEffect(()=>{
    const loadProfile = async()=>{
     try{
     
       const response = await axios.get('http://localhost:5000/api/user/profile',
     
     );
       setError(response.data.error);
      
       
     }catch(error){
       setError('loadProfile faild.Please try again');
     }

    };
    loadProfile();
 },[]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
   
    
    // Handle file upload logic here, e.g., upload to a 
    
    setProfile({
      ...profile,
      profilePicture: URL.createObjectURL(file),
    });
  };
 

  const toggleEditMode = async() => {
   
  
    if (editMode) {
      // Here you would typically send the updated profile to your server
      try{
      
        const response = await axios.put('http://localhost:5000/api/user/profile',profile,
      
      );
        setError(response.data.error);
       
        
      }catch(error){
        setError('update faild.Please try again');
      }
    
     
      console.log('Profile updated:', profile);
      // Navigate back to home or any related page
      navigate('/');
    }
    setEditMode(!editMode);
  };

  return (
    <StyledBox>
      <StyledBackButton onClick={() => navigate('/home')}>
        <ArrowBackIcon />
      </StyledBackButton>
        <Typography variant="h4" gutterBottom>User Profile & Settings</Typography>
        <StyledAvatar as={Avatar} alt="Profile Picture" src={profile.profilePicture} />
        {editMode && (
          <StyledButton as={Button} variant="contained" component="label">
            {t('Change Picture')}
            <input type="file" hidden onChange={handleProfilePictureChange} />
          </StyledButton>
        )}
        <form>
          <TextField
            label={t('Name')}
            fullWidth
            margin="normal"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            InputProps={{
              readOnly: !editMode,
            }}
          />
          <TextField
            label={t('Email')} fullWidth margin="normal" name="email" value={profile.email} onChange={handleInputChange} InputProps={{ readOnly: !editMode, }} /> 
            <TextField label={t('age')} fullWidth margin="normal" name="" value={profile.age} onChange={handleInputChange} InputProps={{ readOnly: !editMode, }} /> 
            <TextField label={t('currentWeigh')} fullWidth margin="normal" name="currentWeight" value={profile.currentWeight} onChange={handleInputChange} InputProps={{ readOnly: !editMode, }} /> 
            <TextField label={t('height')} fullWidth margin="normal" name="height" value={profile.height} onChange={handleInputChange} InputProps={{ readOnly: !editMode, }} />
            <TextField label={t('Dietary Preferences')} fullWidth margin="normal" name="dietaryPrefereces" value={profile.dietaryPreferences} onChange={handleInputChange} InputProps={{ readOnly: !editMode, }} /> 
            <TextField label={t('Preferred Cuisines')} fullWidth margin="normal" name="preferredCuisines" value={profile.preferredCuisines} onChange={handleInputChange} InputProps={{ readOnly: !editMode, }} /> 
            <TextField label={t('Disliked Ingredients')} fullWidth margin="normal" name="dislikedIngredients" value={profile.dislikedIngredients} onChange={handleInputChange} InputProps={{ readOnly: !editMode, }} /> 
            <TextField label={t('Allergies')} fullWidth margin="normal" name="allergies" value={profile.allergies} onChange={handleInputChange} InputProps={{ readOnly: !editMode, }} /> 
            <StyledFormControl as={FormControl} fullWidth> 
              <InputLabel id="health-goal-label">{t('Health Goal')}</InputLabel> 
              <Select labelId="health-goal-label" name="healthGoal" value={profile.healthGoal} onChange={handleInputChange} disabled={!editMode} > 
                <MenuItem value="Weight Loss">{t('Weight Loss')}</MenuItem> 
                <MenuItem value="Maintain Weight">{t('Maintain Weight')}</MenuItem> 
                <MenuItem value="Build Muscle">{t('Build Muscle')}</MenuItem> 
                <MenuItem value="Increase Stamina">{t('Increase Stamina')}</MenuItem> 
              </Select> 
            </StyledFormControl> 
            <StyledSubmitButton as={Button} variant="contained" color="primary" fullWidth onClick={toggleEditMode}> {editMode ? t('Save Settings') : t('Edit Profile')} </StyledSubmitButton> 
        </form> 
      </StyledBox>  ); };
    export default ProfileSettings;