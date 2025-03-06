// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import groceryListReducer from './slices/groceryListSlice';
import mealPlanReducer from './slices/mealPlanSlice';
import recipesReducer from './slices/recipesSlice';
import tutorialsReducer from './slices/tutorialsSlice';
import axios from 'axios';

/**
 * Set up Axios interceptors to include the token in request headers.
 */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Configures the Redux store with all slices and middleware.
 * Combines reducers and sets up the store for the application.
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    groceryList: groceryListReducer,
    mealPlan: mealPlanReducer,
    recipes: recipesReducer,
    tutorials: tutorialsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable data (e.g., errors)
    }),
});

export default store;
