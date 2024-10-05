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
    grid: {
        marginTop: theme.spacing(2),
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
        width: theme.spacing(7),
        height: theme.spacing(7),
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
    largeAvatar: {
        width: theme.spacing(15),
        height: theme.spacing(15),
        margin: '0 auto',
        marginBottom: theme.spacing(2),
    },
    editButton: {
        marginBottom: theme.spacing(2),
    },
    logoutButton: {
        marginTop: theme.spacing(2),
    },
}));
