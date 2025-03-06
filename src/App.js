// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import { useSelector } from 'react-redux';
import MealPlan from './components/MealPlan/MealPlan';
import MyRecipes from './components/MyRecipes/MyRecipes';
import GroceryList from './components/GroceryList/GroceryList';
import Tutorials from './components/Tutorials/Tutorials';
import UserProfile from './components/UserProfile/UserProfile'
import SignIn from './components/Auth/SignIn';
/**
 * Main application component that handles routing and authentication logic.
 */
const App = () => {
  // Get authentication state from Redux store
  const auth = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />

        {/* Protected routes */}
        {auth.isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            {/* Add other protected routes here */}
            <Route path="*" element={<Navigate to="/home" replace />} />
          </>
        ) : (
          // Redirect unauthenticated users to sign-in page
          <Route path="*" element={<Navigate to="/signin" replace />} />
        )}
         <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/meal-plan" element={<MealPlan />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/grocery-List" element={<GroceryList />} />
        <Route path="/tutorials" element={< Tutorials />} />
      </Routes>
    </Router>
  );
};

export default App;
