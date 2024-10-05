// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * Thunk action for user registration.
 * Sends a POST request to the backend with user details.
 * On success, stores the token and user data.
 */
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/register', { name, email, password });
      // Save token to local storage
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Registration failed');
    }
  }
);

/**
 * Thunk action for user login.
 * Sends a POST request to the backend with email and password.
 * On success, stores the token and user data.
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      // Save token to local storage
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);

/**
 * Initial state for the authentication slice.
 */
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

/**
 * Auth slice that manages authentication state.
 * Handles login, registration, and logout actions.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set user from token on app initialization.
     * @param {Object} state - Current state
     * @param {Object} action - Action payload containing user data
     */
    setUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null; // Reset error state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registerUser actions
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle loginUser actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions for use in components
export const { setUser } = authSlice.actions;

// Export reducer to be included in the store
export default authSlice.reducer;
