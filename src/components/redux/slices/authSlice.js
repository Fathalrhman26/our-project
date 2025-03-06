// frontend/src/redux/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

/**
 * Thunk action for user registration.
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/register', {
        name,
        email,
        password,
      });

      // Save token to local storage
      localStorage.setItem('token', response.data.token);
      return response.data.user;
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
 * Thunk action for user login.
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      // Save token to local storage
      localStorage.setItem('token', response.data.token);
      return response.data.user;
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
 * Thunk action for user logout.
 */
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  localStorage.removeItem('token');
});

/**
 * Initial state for the auth slice.
 */
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

/**
 * Auth slice that manages user authentication state.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
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
        state.user = action.payload;
        state.isAuthenticated = true;
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
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle logoutUser actions
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

// Export actions for use in components
//export const { setUser } = authSlice.actions;

// Export reducer to be included in the store
export default authSlice.reducer;
