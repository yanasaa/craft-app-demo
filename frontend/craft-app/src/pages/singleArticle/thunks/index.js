import { createAsyncThunk } from "@reduxjs/toolkit";
import ArticlesService from "../../../services/ArticlesService";

export const singleArticleThunk = createAsyncThunk(
  "singleArticle",
  async (articleSlug, { rejectWithValue }) => {
    try {
      const response = await ArticlesService.getSingleArticle(articleSlug);
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);

export const setArticleLikeThunk = createAsyncThunk(
  "setArticleLike",
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await ArticlesService.likeDislikeArticle(articleId);
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);


