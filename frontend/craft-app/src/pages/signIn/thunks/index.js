import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";
import axios from "axios";
import { BASE_URL } from "../../../api/config";
import { REFRESH_ENDPOINT } from "../../../constants/endpoints";

export const loginThunk = createAsyncThunk(
  "login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(body);
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.logout();
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);

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

export const checkAuthThunk = createAsyncThunk(
  "checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}${REFRESH_ENDPOINT}`, {withCredentials: true});
      return response.data;
    } catch (e) {
      console.log(e)
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);
