import { createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../../../services/ProfileService";

export const currentProfileThunk = createAsyncThunk(
  "currentProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ProfileService.getCurrentProfile();
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);

export const updateProfileThunk = createAsyncThunk(
    "updateProfile",
    async (userId, userData, { rejectWithValue }) => {
      try {
        const response = await ProfileService.updateCurrentProfile(userId, userData);
        return response.data;
      } catch (e) {
        console.log(e?.response);
        return rejectWithValue(e?.response?.data?.detail || e?.message);
      }
    }
  );

  export const getUserProfileThunk = createAsyncThunk(
    "getUserProfile",
    async (userId, { rejectWithValue }) => {
      try {
        const response = await ProfileService.getUserProfile(userId);
        return response.data;
      } catch (e) {
        return rejectWithValue(e?.response?.data?.detail || e?.message);
      }
    }
  );

