import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async ({ startIndex, endIndex }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://35.173.230.235:3000/countries/${startIndex}/${endIndex}`);
      console.log(2222, response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
