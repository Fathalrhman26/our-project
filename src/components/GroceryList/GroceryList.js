// GroceryList.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroceryList, updateGroceryItem } from '../redux/slices/groceryListSlice';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    ListItemSecondaryAction,
    IconButton,
} from '@mui/material';
import { useStyles } from '../styles/globalStyles';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * GroceryList component that displays the user's grocery list.
 * Users can check off items, and the list syncs with the backend.
 */
const GroceryList = () => {
    // Use custom styles from globalStyles.js
    const classes = useStyles();

    // Redux dispatch function
    const dispatch = useDispatch();

    // Get grocery list state from Redux store
    const groceryList = useSelector((state) => state.groceryList.items);

    // Fetch the grocery list when the component mounts
    useEffect(() => {
        dispatch(fetchGroceryList());
    }, [dispatch]);

    /**
     * Handle toggling of a grocery item.
     * Dispatches an action to update the item's checked status.
     * @param {string} itemId - The ID of the grocery item
     */
    const handleToggle = (itemId) => {
        dispatch(updateGroceryItem(itemId));
    };

    return (
        <Container maxWidth="md" className={classes.container}>
            {/* Page title */}
            <Typography variant="h4" className={classes.title}>
                Grocery List
            </Typography>
            {/* Grocery items list */}
            <List className={classes.list}>
                {groceryList.map((item) => (
                    <ListItem key={item.id} button onClick={() => handleToggle(item.id)}>
                        {/* Checkbox to mark item as purchased */}
                        <Checkbox
                            edge="start"
                            checked={item.checked}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': `checkbox-list-label-${item.id}` }}
                        />
                        {/* Display item name */}
                        <ListItemText id={`checkbox-list-label-${item.id}`} primary={item.name} />
                        {/* Optionally, add a delete button */}
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default GroceryList;
