// src/ShoppingList.js
import React, { useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Checkbox, Button, TextField } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
          
          
const initialItems = [
  { id: 1, name: 'Apples' },
  { id: 2, name: 'Bread' },
  { id: 3, name: 'Milk' },
];

const GroceryList = () => {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState('');

  const handleToggle = (itemId) => {
    setItems(items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleDelete = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleAddItem = () => {
    if (newItem.trim()) {
      const newItemObject = {
        id: items.length ? items[items.length - 1].id + 1 : 1,
        name: newItem,
        checked: false,
      };
      setItems([...items, newItemObject]);
      setNewItem('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Grocery List</Typography>
        <TextField
          label="New Item"
          fullWidth
          margin="normal"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleAddItem}
        >
          Add Item
        </Button>
        <Button  variant="contained" fullWidth component={Link} to="/"
          
          sx={{ mt: 1}}>
         Back to Home
        </Button>
        <List sx={{ mt: 4 }}>
          {items.map(item => (
            <ListItem key={item.id} button>
              <Checkbox
                edge="start"
                checked={item.checked || false}
                tabIndex={-1}
                disableRipple
                onClick={() => handleToggle(item.id)}
              />
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default GroceryList;
