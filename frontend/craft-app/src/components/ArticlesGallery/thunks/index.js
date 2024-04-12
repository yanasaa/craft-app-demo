import { createAsyncThunk } from "@reduxjs/toolkit";
import ArticlesService from "../../../services/ArticlesService";

export const getArticlesThunk = createAsyncThunk(
  "getArticles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await ArticlesService.getArticles();
      return response.data;
    } catch (e) {
      return rejectWithValue(e?.response?.data?.detail || e?.message);
    }
  }
);

// export const addProductToCartThunk = createAsyncThunk(
//   "addProductToCart",
//   async (product, { rejectWithValue }) => {
//     try {
//       const response = await CartService.addProductToCart(product);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.message || e?.message);
//     }
//   }
// );

// export const updateProductInCartThunk = createAsyncThunk(
//   "updateProductInCart",
//   async ({ id, quantity }, { rejectWithValue }) => {
//     try {
//       const response = await CartService.updateProductInCart({ id, quantity });
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.message || e?.message);
//     }
//   }
// );

// export const removeProductFromCartThunk = createAsyncThunk(
//   "removeProductFromCart",
//   async (productId, { rejectWithValue }) => {
//     try {
//       const response = await CartService.removeProductFromCart(productId);
//       return response.data;
//     } catch (e) {
//       return rejectWithValue(e?.response?.data?.message || e?.message);
//     }
//   }
// );
