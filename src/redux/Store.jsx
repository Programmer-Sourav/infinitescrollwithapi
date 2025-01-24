import { configureStore } from "@reduxjs/toolkit";
import { countriesReducer } from "./Reducer";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});
