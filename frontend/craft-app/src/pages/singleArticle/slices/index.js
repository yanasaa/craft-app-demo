import { createSlice } from "@reduxjs/toolkit";
import {setArticleLikeThunk, singleArticleThunk} from '../thunks'

const initialState = {
 article: {
  author: null,
  author_username: '',
  body: '',
  category: null,
  created: '',
  id: null,
  is_favorited: false,
  likes: [],
  post_preview: '',
  preview: '',
  publish: '',
  slug: '',
  status: '',
  title: '',
  total_likes: null,
  updated: '',
  is_liked: ''
 },
 isLoading: '', 
 errors: []
};

export const singleActicleSlice = createSlice({
  name: "singleArticle",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(singleArticleThunk.fulfilled, (state, action) => {
      state.article = action.payload;
      state.isLoading = false;
      state.errors = null;
    });
    builder.addCase(singleArticleThunk.pending, (state) => {
      state.isLoading = true;
      state.errors = null;
    });
    builder.addCase(singleArticleThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
    builder.addCase(setArticleLikeThunk.fulfilled, (state, action) => {
      state.article.is_liked = action.payload;
      state.isLoading = false;
      state.errors = null;
    });
  },
});

export default singleActicleSlice.reducer;
