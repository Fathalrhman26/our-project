// profileSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Thunk action to fetch user profile from the backend.
 */
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch profile');
    }
  }
);

/**
 * Thunk action to update user profile.
 * Sends updated profile data to the backend.
 * @param {FormData} profileData - Updated user profile information
 */
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axios.put('/api/user/profile', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to update profile');
    }
  }
);

/**
 * Initial state for the profile slice.
 */
const initialState = {
  data: {},
  loading: false,
  error: null,
};

/**
 * Profile slice that manages user profile state.
 * Handles fetching and updating the user's profile.
 */
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    /**
     * Reset the profile state, used on logout.
     * @param {Object} state - Current state
     */
    resetProfile(state) {
      state.data = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch profile actions
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle update profile actions
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions for use in components
export const { resetProfile } = profileSlice.actions;

// Export reducer to be included in the store
export default profileSlice.reducer;
