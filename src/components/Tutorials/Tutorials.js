import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, ListItem, ListItemText} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { StyledBox, StyledSearchBox, StyledTutorialList, StyledBackButton } from '../../styles/globalStyles';

const Tutorials = ({ selectedMealPlan, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tutorials, setTutorials] = useState([]);
  const navigate = useNavigate();

  // Load tutorials for the selected meal plan on initial load
  useEffect(() => {
    if (selectedMealPlan) {
      setTutorials(selectedMealPlan.tutorials);
    }
  }, [selectedMealPlan]);

  // Mock function to fetch tutorials based on search query
  const fetchTutorials = (query) => {
    // Replace this with your actual API call or data retrieval logic
    const dummyTutorials = [
      { title: 'Spaghetti Carbonara', description: 'Learn how to make a classic Italian Spaghetti Carbonara' },
      { title: 'Vegan Buddha Bowl', description: 'A step-by-step guide to making a Vegan Buddha Bowl' },
      { title: 'Grilled Chicken Salad', description: 'A healthy and delicious grilled chicken salad tutorial' },
    ];
    return dummyTutorials.filter((tutorial) =>
      tutorial.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search button click
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchResults = fetchTutorials(searchQuery);
      setTutorials(searchResults);
    }
  };

  return (
    <StyledBox>
      <StyledBackButton onClick={() => navigate('/home')}>
        <ArrowBackIcon />
      </StyledBackButton>
      <Typography variant="h4" gutterBottom>
        Meal Tutorials
      </Typography>
      <StyledSearchBox>
        <TextField
          label="Search Tutorials"
          value={searchQuery}
          onChange={handleSearchChange}
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ mt: 1 }}
        >
          Search
        </Button>
      </StyledSearchBox>
      <StyledTutorialList>
        {tutorials.map((tutorial, index) => (
          <ListItem key={index} sx={{ mb: 1 }}>
            <ListItemText
              primary={tutorial.title}
              secondary={tutorial.description}
            />
          </ListItem>
        ))}
      </StyledTutorialList>
    </StyledBox>
  );
};

export default Tutorials;
