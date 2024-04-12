import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "../pages/signIn/slices";
import articleSlice from "../components/ArticlesGallery/slices/";

// import productsReducer from "../pages/Products/slices";
// import productInfoSlice from "../pages/ProductInfo/slices"
// import cartSlice from "../pages/Cart/slices";
// import ordersSlice from "../pages/Orders/slices";

const combineReducer = combineReducers({
  loginPage: loginSlice,
  articlesPage: articleSlice,
  //   productsPage: productsReducer,
  //   productInfoPage: productInfoSlice,
  //   cartPage: cartSlice,
  //   ordersPage: ordersSlice,
});

const rootReducer = (state, action) => {
  console.log(action.type);
  if (action.type === "login/logout") {
    state = {};
  }
  return combineReducer(state, action);
};

export const store = configureStore({ reducer: rootReducer });
