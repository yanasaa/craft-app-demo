import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../../../api/config";
import { REFRESH_ENDPOINT } from "../../../constants/endpoints";
import { ROUTE_NAMES } from "../../../routes/routeNames";


export const signUpThunk = createAsyncThunk(
  "signUp",
  async (body, { rejectWithValue }) => {
    
    try {
     let response = await AuthService.signUp(body);
     return response.data;
    } catch (e) {
      console.log(e.response?.data?.username);
      return rejectWithValue(e?.response?.data.username || e?.message);
    }
  }
);