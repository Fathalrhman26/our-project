
import React , {useState,useEffect} from 'react';
import {   Button, Container,Box,  Typography, AppBar, Toolbar } from '@mui/material';
import { Fastfood, ShoppingCart, EventNote } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {  deepOrange } from '@mui/material/colors';



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
 <AppBar position='static'>
 <Toolbar sx={{ alignItems:'center',alignContent:'center',justifyContent:'center' }}>
  <Typography  >
  AI Recipe & Meal Planning
  </Typography>
 </Toolbar>
 </AppBar>

 <Box sx={{ textAlign: 'center', mt: 4 }} >
   <Stack direction="column" spacing={2} justifyContent="center" ml={62}  mt={4}  >
     <Avatar sx={{ bgcolor: deepOrange[500],width: 50, height: 50, }} component={Link} to="/profile-setting">A</Avatar>
      
      </Stack>
      <Stack direction="row" spacing={4}   justifyContent="center"
  alignItems="center"  mt={5} >
     <Avatar src="/broken-image.jpg" sx={{ width: 150, height: 150 }}/>
    
      </Stack>
      
        <Typography variant="h4" component="h1" gutterBottom>
          {getCurrentGreeting()}, {username}!
        </Typography>
        </Box>

         <Box sx={{ display: 'flex',  flexDirection: 'column',gap: 2, mt: 2,
      alignItems:"center", boxShadow:4 ,borderRadius:8}}>
          <p >
          <Button variant="contained" startIcon={<EventNote />}  component={Link} to="/meal-plan" sx={ { borderRadius:10, mr:3, py:2}}>
          Today's MealPlan
          </Button>
          <Button variant="contained" startIcon={<Fastfood />}  component={Link} to="/my-recipes" sx={ { borderRadius:10, mr:3, py:2}}>
          My Recipes
          </Button>
          </p>
          
          <p>
          <Button variant="contained" startIcon={<ShoppingCart />} component={Link} to="/grocery-list" sx={ { borderRadius:10, mr:1, py:2}}>
          Grocery List      
          </Button>
          
          <Button variant="contained" startIcon={< EventNote/>}  component={Link} to="/onboarding&tutorials" sx={ { borderRadius:10,mr:1,ml:1, py:2}}>
          Onboarding&Tutorials      
          </Button>
          </p>
          
        </Box>
    
    </Container>
  );
};

export default Home;
