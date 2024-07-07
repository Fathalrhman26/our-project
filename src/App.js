import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import ProfileSettings from './components/ProfileSettings';
import MyRecipes from './components/MyRecipes';
import GroceryList from './components/GroceryList';
import MealPlan from './components/MealPlan';
import Auth from "./components/Auth";

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
       
        
      </Routes>
      </Router>
      </div>
  );
}
 export default App;