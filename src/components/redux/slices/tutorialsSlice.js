// tutorialsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

/**
 * Thunk action to fetch tutorials based on the user's meal plan or selected recipes.
 */
export const fetchTutorials = createAsyncThunk(
  'tutorials/fetchTutorials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/tutorials');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch tutorials');
    }
  }
);

/**
 * Initial state for the tutorials slice.
 */
const initialState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * Tutorials slice that manages tutorials state.
 * Handles fetching tutorials for meal preparation.
 */
const tutorialsSlice = createSlice({
  name: 'tutorials',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchTutorials actions
      .addCase(fetchTutorials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTutorials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTutorials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export reducer to be included in the store
export default tutorialsSlice.reducer;
