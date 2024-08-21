import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import { ThemeProvider } from '@mui/material/styles';
//import { theme } from './styles/globalStyles';
import Home from './components/Home/Home';
import ProfileSettings from './components/ProfileSettings/ProfileSettings';
import MyRecipes from './components/MyRecipes/MyRecipes';
import GroceryList from './components/GroceryList/GroceryList';
import MealPlan from './components/MealPlan/MealPlan';
import Tutorials from './components/Tutorials/Tutorials';
import Auth from "./components/Auth/Auth";

function App (){

  return (
    <div>
   
  <Router>
    <Routes>
    <Route path="/" element={<Auth/>} />
        <Route path= "/home" element = {<Home username = "Ali" />}/>
        <Route path="/profile-setting" element={<ProfileSettings />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/tutorials" element={<Tutorials />} />
       
      </Routes>
      </Router>
      </div>
  );
}
 export default App;