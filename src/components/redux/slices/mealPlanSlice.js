// mealPlanSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Thunk action to fetch the user's meal plan from the backend.
 */
export const fetchMealPlan = createAsyncThunk(
  'mealPlan/fetchMealPlan',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/mealplan');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch meal plan');
    }
  }
);

/**
 * Thunk action to update the user's meal plan.
 * @param {Object} mealPlanData - Updated meal plan data
 */
export const updateMealPlan = createAsyncThunk(
  'mealPlan/updateMealPlan',
  async (mealPlanData, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/mealplan', mealPlanData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update meal plan');
    }
  }
);

/**
 * Initial state for the meal plan slice.
 */
const initialState = {
  meals: [],
  loading: false,
  error: null,
};

/**
 * Meal plan slice that manages the meal plan state.
 * Handles fetching and updating the user's meal plan.
 */
const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchMealPlan actions
      .addCase(fetchMealPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMealPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(fetchMealPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateMealPlan actions
      .addCase(updateMealPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMealPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
      })
      .addCase(updateMealPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export reducer to be included in the store
export default mealPlanSlice.reducer;
