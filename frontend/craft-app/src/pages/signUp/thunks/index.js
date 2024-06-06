import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";


export const signUpThunk = createAsyncThunk(
  "signUp",
  async (body, { rejectWithValue }) => {
    
    try {
     let response = await AuthService.signUp(body);
     return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data.username || e?.message);
    }
  }
);