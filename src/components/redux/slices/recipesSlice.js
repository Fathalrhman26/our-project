// recipesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

/**
 * Thunk action to fetch the user's saved recipes from the backend.
 */
export const fetchMyRecipes = createAsyncThunk(
  'recipes/fetchMyRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/recipes/my');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch your recipes');
    }
  }
);

/**
 * Thunk action to search for recipes based on filters.
 * @param {Object} filters - Search filters (searchTerm, mealType, prepTime, dietaryPreference)
 */
export const searchRecipes = createAsyncThunk(
  'recipes/searchRecipes',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/recipes/search', { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to search recipes');
    }
  }
);

/**
 * Thunk action to save a recipe to the user's saved recipes.
 * @param {Object} recipe - Recipe data to save
 */
export const saveRecipe = createAsyncThunk(
  'recipes/saveRecipe',
  async (recipe, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/recipes', recipe);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to save recipe');
    }
  }
);

/**
 * Initial state for the recipes slice.
 */
const initialState = {
  myRecipes: [],
  searchResults: [],
  loading: false,
  error: null,
};

/**
 * Recipes slice that manages recipes state.
 * Handles fetching, searching, and saving recipes.
 */
const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchMyRecipes actions
      .addCase(fetchMyRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.myRecipes = action.payload;
      })
      .addCase(fetchMyRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle searchRecipes actions
      .addCase(searchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle saveRecipe actions
      .addCase(saveRecipe.fulfilled, (state, action) => {
        state.myRecipes.push(action.payload);
      })
      .addCase(saveRecipe.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export reducer to be included in the store
export default recipesSlice.reducer;
