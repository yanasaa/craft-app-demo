import { createAsyncThunk } from "@reduxjs/toolkit";
import ArticlesService from "../../../services/ArticlesService";

export const getArticlesThunk = createAsyncThunk(
  "getArticles",
  async (searchValue, { rejectWithValue }) => {
    try {
      const response = await ArticlesService.getArticles(searchValue);
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);
export const getArticlesByCategoryThunk = createAsyncThunk(
  "getArticlesByCategory",
  async (catigoryId, { rejectWithValue }) => {
    try {
      const response = await ArticlesService.getArticlesByCategory(catigoryId);
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);

export const getArticlesBySearchThunk = createAsyncThunk(
  "getArticlesBySearch",
  async (searchValue, { rejectWithValue }) => {
    try {
      const response = await ArticlesService.getArticlesBySearch(searchValue);
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);

export const getProfileArticlesThunk = createAsyncThunk(
  "getProfileArticles",
  async (userSlug, { rejectWithValue }) => {
    try {
      const response = await ArticlesService.getProfileArticles(userSlug);
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);

export const getAllTagsThunk = createAsyncThunk(
  "getTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ArticlesService.getAllTags();
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);


