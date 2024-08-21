import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';

// Create a theme instance to customize global MUI styles.
const theme = createTheme({
  palette: {
    primary: {
      main: green[500], // Custom primary color
    },
    secondary: {
      main: purple[500], // Custom secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Set default font family
    h1: {
      fontSize: '2rem', // Override specific typography styles
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
  spacing: 8, // Default spacing unit (8px)
});

// Create custom styles using makeStyles hook
const useGlobalStyles = makeStyles({
  // Example for common container styling
  container: {
    padding: theme.spacing(2),
    margin: '0 auto',
    maxWidth: '1200px',
    backgroundColor: '#f5f5f5',
  },
  // Example for button styling
  button: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 4),
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  // Example for text styling
  text: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
  },
});

export { theme, useGlobalStyles };
