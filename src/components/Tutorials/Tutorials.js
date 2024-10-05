// Tutorials.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTutorials } from '../redux/slices/tutorialsSlice';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { useStyles } from '../styles/globalStyles';

/**
 * Tutorials component that provides step-by-step instructions.
 * Displays tutorials based on the user's selected recipes or meal plans.
 */
const Tutorials = () => {
    // Use custom styles from globalStyles.js
    const classes = useStyles();

    // Redux dispatch function
    const dispatch = useDispatch();

    // Get tutorials from Redux store
    const tutorials = useSelector((state) => state.tutorials.items);

    // Fetch tutorials when the component mounts
    useEffect(() => {
        dispatch(fetchTutorials());
    }, [dispatch]);

    return (
        <Container maxWidth="md" className={classes.container}>
            {/* Page title */}
            <Typography variant="h4" className={classes.title}>
                Cooking Tutorials
            </Typography>
            {/* Tutorials list */}
            <List className={classes.list}>
                {tutorials.map((tutorial) => (
                    <ListItem key={tutorial.id} className={classes.listItem}>
                        <ListItemText
                            primary={tutorial.title}
                            secondary={tutorial.steps.join('\n')}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Tutorials;
