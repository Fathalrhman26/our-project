// groceryListSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Thunk action to fetch the grocery list from the backend.
 */
export const fetchGroceryList = createAsyncThunk(
  'groceryList/fetchGroceryList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/grocerylist');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch grocery list');
    }
  }
);

/**
 * Thunk action to update a grocery item.
 * Toggles the 'checked' status of the item.
 * @param {string} itemId - ID of the grocery item to update
 */
export const updateGroceryItem = createAsyncThunk(
  'groceryList/updateGroceryItem',
  async (itemId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/grocerylist/${itemId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update grocery item');
    }
  }
);

/**
 * Initial state for the grocery list slice.
 */
const initialState = {
  items: [],
  loading: false,
  error: null,
};

/**
 * Grocery list slice that manages the grocery list state.
 * Handles fetching and updating grocery items.
 */
const groceryListSlice = createSlice({
  name: 'groceryList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchGroceryList actions
      .addCase(fetchGroceryList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroceryList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGroceryList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle updateGroceryItem actions
      .addCase(updateGroceryItem.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateGroceryItem.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export reducer to be included in the store
export default groceryListSlice.reducer;
