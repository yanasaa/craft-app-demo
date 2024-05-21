import { createSlice } from "@reduxjs/toolkit";
import { signUpThunk } from "../../signUp/thunks";
import { loginThunk } from "../thunks";

const tokens = localStorage.getItem("tokens");

const initialState = {
  isAuth: !!localStorage.getItem("token"),
  isLoading: false,
  errors: null,
  token: localStorage.getItem("token") || null,
  tokens: tokens ? JSON.parse(tokens) : {},
  signUpStatus: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      state.isAuth = false;
      state.errors = null;
      state.isLoading = false;
      state.tokens = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const tokens = action.payload;
      const accessToken= tokens.access;
      const refreshToken= tokens.access;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh", refreshToken);
      state.isLoading = false;
      state.isAuth = true;
      state.token = accessToken;
      state.tokens = tokens;
    });
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
    builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.signUpStatus = action.payload;
      
    });
    builder.addCase(signUpThunk.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
      
    });
    builder.addCase(signUpThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
      state.signUpStatus = '';
    });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
