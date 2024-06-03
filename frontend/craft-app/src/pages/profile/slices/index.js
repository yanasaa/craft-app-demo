import { createSlice } from "@reduxjs/toolkit";
import { currentProfileThunk, getAllUsersProfilesThunk, getUserProfileThunk, subscribeUserThunk, updateProfileThunk } from "../thunks";

const initialState = {
  isLoading: false,
  errors: null,
  currentUser:  {
    id: null,
    username: "",
    slug: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    bio: "",
    avatar: "",
    user: null,
    following: []
  },
  profileAuthor: {
    id: null,
    username: "",
    slug: "",
    email: "",
    first_name: "",
    last_name: "",
    gender: "",
    bio: "",
    avatar: "",
    user: null,
    following: [],
    is_subscribed: ''
  },
  allUsers: []

};

export const profileSlice = createSlice({
  name: "currentUser",
  initialState: initialState,
 
  extraReducers: (builder) => {
    builder.addCase(currentProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.currentUser = action.payload

    });
    builder.addCase(currentProfileThunk.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(currentProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.currentUser = action.payload

    });
    builder.addCase(updateProfileThunk.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(updateProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
    builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.profileAuthor = action.payload

    });
    builder.addCase(getUserProfileThunk.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(getUserProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
    builder.addCase(subscribeUserThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.profileAuthor.is_subscribed = action.payload

    });
    builder.addCase(getAllUsersProfilesThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.allUsers = action.payload

    });
    
  },
});


export default profileSlice.reducer;
