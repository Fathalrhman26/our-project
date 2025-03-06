
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance';

/**
 * Thunk action to generate a meal plan.
 */
export const generateMealPlan = createAsyncThunk(
  'mealPlan/generateMealPlan',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/mealplan/generate');
      return response.data.mealPlan;
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
 * Thunk action to fetch the latest meal plan.
 */
export const fetchLatestMealPlan = createAsyncThunk(
  'mealPlan/fetchLatestMealPlan',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/mealplan/latest');
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
  mealPlan: null,
  loading: false,
  error: null,
};

/**
 * Meal plan slice that manages meal plan state.
 */
const mealPlanSlice = createSlice({
  name: 'mealPlan',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle generateMealPlan actions
      .addCase(generateMealPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateMealPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.mealPlan = action.payload;
      })
      .addCase(generateMealPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchLatestMealPlan actions
      .addCase(fetchLatestMealPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestMealPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.mealPlan = action.payload;
      })
      .addCase(fetchLatestMealPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mealPlanSlice.reducer;



