import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries } from "./ThunkFunction"; // Import the thunk

const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Define other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        console.log(1111, action.payload)
        state.isLoading = false;
        state.countries = [...state.countries, ...action.payload]; // Append new data
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch countries.";
      });
  },
});

export const countriesReducer = countriesSlice.reducer;
