// src/styles/globalStyles.js
import { styled } from '@mui/material/styles';
import { deepOrange } from '@mui/material/colors';
import { Box, Avatar, Button ,IconButton, List, ListItem } from '@mui/material';
import selected from '@emotion/styled';

// ProfileSettings Component Styles

// IconButton for navigating back, positioned according to the language direction.
export const StyledBackButton = styled(IconButton)(({ theme, language }) => ({
  position: 'absolute',
  padding: theme.spacing(3),
  top: theme.spacing(2),
  left: language === 'en' ? theme.spacing(2) : 'auto',
  right: language === 'ar' ? theme.spacing(2) : 'auto', // Adjust position based on language
}));

// Avatar for displaying the user's profile picture.
export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12.5),
  height: theme.spacing(12.5),
  margin: 'auto',
  marginBottom: theme.spacing(2),
}));

// Button for changing the profile picture or submitting profile updates.
export const StyledButton = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// FormControl for the Health Goal dropdown in Profile Settings.
export const StyledFormControl = styled('div')(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

// Submit button for saving or editing the profile in Profile Settings.
export const StyledSubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

// Home Component Styles

// App logo, positioned according to the language direction.
export const StyledLogo = styled('img')(({ theme, language }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: language.startsWith('en') ? theme.spacing(2) : 'auto',
  right: language.startsWith('ar') ? theme.spacing(2) : 'auto',
  width: 50,
  height: 50,
}));

// Avatar for profile display in the Home component.
export const StyledProfileAvatar = styled(Avatar)(({ theme }) => ({
  bgcolor: deepOrange[500],
  width: 50,
  height: 50,
}));

// Box for structuring content in the Home component.
export const StyledHomeBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

// MyRecipes Component Styles

// Container for the recipe search section.
export const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: theme.breakpoints.values.md,
  textAlign: 'center',
  margin: 'auto',
  padding: theme.spacing(3),
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));


// Recipe Search and Cards Styles
export const StyledRecipeCard = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  border: '1px solid #ccc',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

// Button for adding items to the Grocery List.
export const StyledAddButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));


// List to display meals in the Meal Plan component.
export const StyledMealList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

// Individual ListItem in the Meal Plan, styled to highlight when selected.
export const StyledMealListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: selected ? theme.palette.action.selected : theme.palette.background.default,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// IconButton for navigating back, positioned at the top left.
export const StyledIconButton = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
}));


// Tutorials Component Styles

// Box for the search input and button, styled for layout consistency.
export const StyledSearchBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

// List to display tutorials in the Tutorials component.
export const StyledTutorialList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

