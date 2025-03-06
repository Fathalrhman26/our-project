// globalStyles.js

// Correct import
import { makeStyles } from '@mui/styles';


/**
 * Global styles for the application components.
 * All component-specific styles are defined here.
 */
export const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    form: {
        marginBottom: theme.spacing(4),
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    submitButton: {
        marginTop: theme.spacing(2),
    },
    logoutButton: {
        marginTop: theme.spacing(2),
      },
      StyledProfileAvatar:{
        width: 50,
      height: 50,
      },
      editButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
      avatarContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
      },
      largeAvatar: {
        width: theme.spacing(14),
        height: theme.spacing(14),
      },
      cameraButton: {
        position: 'absolute',
        bottom: 0,
        right: 'calc(50% - 35px)', // Adjust position as needed
      },
      input: {
        display: 'none',
      },
   
    box:{
        maxWidth: theme.breakpoints.values.md,
  textAlign: 'center',
  margin: 'auto',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[4],
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),

    },
    StyledHomeBox:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    StyledRecipeCard:{
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        border: '1px solid #ccc',
        borderRadius: theme.shape.borderRadius,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    recipeCard: {
        maxWidth: '100%',
    },
    recipeMedia: {
        height: 140,
    },
    formControl: {
        minWidth: 120,
    },
    searchButton: {
        marginTop: theme.spacing(2),
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        marginBottom: theme.spacing(1),
    },
    header: {
        marginBottom: theme.spacing(4),
    },
    avatar: {
        width: theme.spacing(12.5),
        height: theme.spacing(12.5),
        margin: 'auto',
        marginBottom: theme.spacing(2),
    },
    logo: {
        fontWeight: 'bold',
    },
    greeting: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
    },
    buttonGrid: {
        marginTop: theme.spacing(4),
    },
    navButton: {
        height: '100%',
    },
   
    StyledAvatar :{
width: theme.spacing(12.5),
  height: theme.spacing(12.5),
  margin: 'auto',
  marginBottom: theme.spacing(2),
    },
    
    
}));
