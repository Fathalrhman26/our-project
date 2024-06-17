
import React , {useState,useEffect} from 'react';
import {   Button, Container,Box,  Typography } from '@mui/material';
import { Fastfood, ShoppingCart, EventNote } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';



const Home = ({ username }) => {
  const [currentTime,setCurrentTime] = useState(new Date());
  useEffect(()=>{
    const timer = setInterval(()=>setCurrentTime(new Date()),1000);
    return ()=>clearInterval(timer);
  },[]);
  const getCurrentGreeting = () =>{
    const currentHour = currentTime.getHours();
    let greeting = "";
    if(currentHour < 12){
      return greeting = "Good Morning";
    }else if(currentHour < 18){
      return greeting = "Good Afternoon";
    }else{
      greeting = "Good Evening";
    }
    return greeting;
  }

  return (
    
<Container maxWidth="sm">
 
 
 <h1 >AI Recipe & Meal Planning</h1>
 
<Stack direction="column" spacing={2} justifyContent="center"   mt={10}>
      <Avatar sx={{ bgcolor: deepOrange[500],width: 60, height: 60 }} component={Link} to="/profile-setting">A</Avatar>
      
      </Stack>
      <Stack direction="row" spacing={4}   justifyContent="center"
  alignItems="center"  mt={5} >
     <Avatar src="/broken-image.jpg" sx={{ width: 100, height: 100 }}/>
    
      </Stack>
  
      <Box sx={{ textAlign: 'center', mt: 4 }} >
      
        <Typography variant="h4" component="h1" gutterBottom>
          {getCurrentGreeting()}, {username}!
        </Typography>
        </Box>
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 8 , my:4,
      alignItems:"center" ,  
    
      borderRadius: 10,boxShadow:2 }}>
          <Button variant="contained" startIcon={<EventNote />} fullWidth component={Link} to="/meal-plan">
          Today's MealPlan
          </Button>
          <Button variant="contained" startIcon={<Fastfood />} fullWidth component={Link} to="/my-recipes">
          My Recipes
          </Button>
          
          <Button variant="contained" startIcon={<ShoppingCart />} fullWidth component={Link} to="/grocery-list">
          Grocery List       
          </Button>
          <Button variant="contained" startIcon={< EventNote/>} fullWidth component={Link} to="/onboarding&tutorials">
          Onboarding&Tutorials      
          </Button>
        </Box>
    </Container>
  );
};

export default Home;
