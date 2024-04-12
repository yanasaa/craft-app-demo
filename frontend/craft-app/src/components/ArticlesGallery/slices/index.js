import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { getArticlesThunk } from "../thunks";

const initialState = {
  articles: [],
  isLoading: false,
  errors: null,
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getArticlesThunk.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.isLoading = false;
      state.errors = null;
    });

    // builder.addCase(addProductToCartThunk.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   state.cartInfo = action.payload;
    //   state.isLoading = false;
    //   state.errors = null;
    // });

    // builder.addCase(updateProductInCartThunk.fulfilled, (state, action) => {
    //   const { updatedItem, cartState } = action.payload;
    //   state.cartInfo.quantity = cartState.quantity;
    //   state.cartInfo.totalPrice = cartState.totalPrice;
    //   state.cartInfo.itemsList = state.cartInfo.itemsList.map((item) =>
    //     updatedItem.id === item.id ? updatedItem : item
    //   );
    //   state.isLoading = false;
    //   state.errors = null;
    // });

    // builder.addCase(removeProductFromCartThunk.fulfilled, (state, action) => {
    //   const { removeItemId, cartState } = action.payload;
    //   state.cartInfo.quantity = cartState.quantity;
    //   state.cartInfo.totalPrice = cartState.totalPrice;
    //   state.cartInfo.itemsList = state.cartInfo.itemsList.filter(
    //     (item) => removeItemId !== item.id
    //   );
    //   state.isLoading = false;
    //   state.errors = null;
    // });

    builder.addMatcher(isAnyOf(getArticlesThunk.pending), (state) => {
      state.isLoading = true;
      state.errors = null;
    });

    builder.addMatcher(isAnyOf(getArticlesThunk.rejected), (state, action) => {
      state.isLoading = false;
      state.errors = action.payload;
    });
  },
});

export default articlesSlice.reducer;
