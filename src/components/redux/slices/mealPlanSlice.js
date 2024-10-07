// frontend/src/redux/slices/mealPlanSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

/**
 * Thunk action to fetch the user's meal plan from the backend.
 */
export const fetchMealPlan = createAsyncThunk(
  'mealPlan/fetchMealPlan',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/mealplan');
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

/**
 * Thunk action to add a recipe to the meal plan.
 */
export const addToMealPlan = createAsyncThunk(
  'mealPlan/addToMealPlan',
  async ({ recipeId, date }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/recipes/add-to-plan', {
        recipeId,
        date,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

/**
 * Thunk action to swap a meal in the meal plan.
 */
export const swapMeal = createAsyncThunk(
  'mealPlan/swapMeal',
  async ({ mealPlanId, newRecipeId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/api/recipes/swap-meal', {
        mealPlanId,
        newRecipeId,
      });
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
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
      const response = await axiosInstance.put('/api/mealplan', mealPlanData);
      return response.data;
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
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
      // Handle addToMealPlan actions
      .addCase(addToMealPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToMealPlan.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the backend returns the newly added meal
        state.meals.push(action.payload);
      })
      .addCase(addToMealPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle swapMeal actions
      .addCase(swapMeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(swapMeal.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the backend returns the updated meal
        const index = state.meals.findIndex(
          (meal) => meal.id === action.payload.id
        );
        if (index !== -1) {
          state.meals[index] = action.payload;
        }
      })
      .addCase(swapMeal.rejected, (state, action) => {
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

export default mealPlanSlice.reducer;
