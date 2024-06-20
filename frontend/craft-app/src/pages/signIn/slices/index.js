import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, signUpThunk } from "../thunks";

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
  
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      const tokens = action.payload;
      const accessToken= tokens.access;
      const refreshToken= tokens.refresh;
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refresh", refreshToken);
      state.isLoading = false;
      state.isAuth = true;
      state.token = accessToken;
      state.tokens = tokens;
    });

     builder.addCase(logoutThunk.fulfilled, (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      state.isAuth = false;
      state.errors = null;
      state.isLoading = false;
      state.tokens = {};
      
    });

     builder.addCase(signUpThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.signUpStatus = action.payload;
    });

    builder.addMatcher(
      isAnyOf(
        loginThunk.pending,
        logoutThunk.pending,
        signUpThunk.pending,
      ),
      (state) => {
        state.isLoading = true;
        state.errors = null;
      },
    );

    builder.addMatcher(
      isAnyOf(
        loginThunk.rejected,
        logoutThunk.rejected,
        signUpThunk.rejected,
      ),
      (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      },
    );
  },
});

export default loginSlice.reducer;
