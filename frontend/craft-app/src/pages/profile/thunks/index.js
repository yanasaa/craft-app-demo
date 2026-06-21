import { createAsyncThunk } from "@reduxjs/toolkit";
import ProfileService from "../../../services/ProfileService";

// export const currentProfileThunk = createAsyncThunk(
//   "currentProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await ProfileService.getCurrentProfile();
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.detail || e?.message);
//     }
//   }
// );

export const currentProfileThunk = createAsyncThunk(
  "currentProfile",
  async () => {
    return {
      id: 1,
      username: "demo_user",
      first_name: "Иван",
      last_name: "Иванов",
      email: "demo@test.com",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbLUwbkT9BoJZPxgABBuYYxKZN4dVTO_L1-k5C6V7Ew&s=10" ,
      about: "Демо-пользователь",
    };
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

  // export const getAllUsersProfilesThunk = createAsyncThunk(
  //   "getAllUserProfiles",
  //   async (_, { rejectWithValue }) => {
  //     try {
  //       const response = await ProfileService.getAllUsersProfiles();
  //       return response.data;
  //     } catch (e) {
  //       return rejectWithValue(e?.response?.data?.detail || e?.message);
  //     }
  //   }
  // );

  export const getAllUsersProfilesThunk = createAsyncThunk(
    "getAllUserProfiles",
    async () => {
      return [
        {
          id: 1,
          slug: "demo-user",
          username: "demo_user",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbLUwbkT9BoJZPxgABBuYYxKZN4dVTO_L1-k5C6V7Ew&s=10",
          following: [2, 3]
        },
        {
          id: 2,
          slug: "wood-master",
          username: "wood_master",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbLUwbkT9BoJZPxgABBuYYxKZN4dVTO_L1-k5C6V7Ew&s=10",
          following: [1]
        },
        {
          id: 3,
          slug: "pottery-master",
          username: "pottery_master",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbLUwbkT9BoJZPxgABBuYYxKZN4dVTO_L1-k5C6V7Ew&s=10",
          following: []
        }
      ];
    }
  );

  // export const subscribeUserThunk = createAsyncThunk(
  //   "subscribeUser",
  //   async (userId, { rejectWithValue }) => {
  //     try {
  //       const response = await ProfileService.subscribeUser(userId);
  //       return response.data;
  //     } catch (e) {
  //       return rejectWithValue(e?.response?.data?.detail || e?.message);
  //     }
  //   }
  // );

  export const subscribeUserThunk = createAsyncThunk(
    "subscribeUser",
    async () => {
      return {
        success: true
      };
    }
  );