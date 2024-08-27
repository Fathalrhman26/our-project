import React, { useState, useEffect } from 'react';
import { TextField, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StyledBox, StyledAddButton, StyledBackButton } from '../../styles/globalStyles'; // Import styles

const GroceryList = ({ mealPlanItems, onBack }) => {
  const navigate = useNavigate();
  const [groceryItems, setGroceryItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // Automatically add items from MealPlan.js
  useEffect(() => {
    if (mealPlanItems && mealPlanItems.length > 0) {
      setGroceryItems(prevItems => [...prevItems, ...mealPlanItems]);
    }
  }, [mealPlanItems]);

  const handleAddItem = () => {
    if (newItem.trim()) {
      setGroceryItems([...groceryItems, newItem]);
      setNewItem('');
    }
  };

  const handleRemoveItem = (index) => {
    setGroceryItems(groceryItems.filter((_, i) => i !== index));
  };

  return (
    <StyledBox>
      <StyledBackButton onClick={() => navigate('/home')}>
        <ArrowBackIcon />
      </StyledBackButton>
      <Typography variant="h5" gutterBottom>
        Grocery List
      </Typography>
      <TextField
        label="Add New Item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <StyledAddButton onClick={handleAddItem}>
        Add Item
      </StyledAddButton>
      <List>
        {groceryItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
            <IconButton edge="end" onClick={() => handleRemoveItem(index)}>
              <Typography variant="body2" color="error">
                Remove
              </Typography>
            </IconButton>
          </ListItem>
        ))}
      </List>
    </StyledBox>
  );
};

export default GroceryList;
