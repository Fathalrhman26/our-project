import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import ProfileSettings from './components/ProfileSettings';
import MyRecipes from './components/MyRecipes';
import GroceryList from './components/GroceryList';
import MealPlan from './components/MealPlan';

function App (){
  const userPreferences = {

    dieteryPreferences :[
      'vegetarian',
      'glutenFree'
    ],
    restrictions : ['nuts','dairy']
  };
  return (
    <div>
   
  <Router>
    <Routes>
        <Route path= "/" element = {<Home username = "Ali" />}/>
        <Route path="/profile-setting" element={<ProfileSettings />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/grocery-list" element={<GroceryList />} />
        <Route path="/meal-plan" element={<MealPlan />} userPreferences={userPreferences} />
        
        
      </Routes>
      </Router>
      </div>
  );
}
 export default App;