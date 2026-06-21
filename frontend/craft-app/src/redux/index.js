import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginSlice from "../pages/signIn/slices";
import articleSlice from "../components/ArticlesGallery/slices/";
import  profileSlice  from "../pages/profile/slices";
import singleActicleSlice from "../pages/singleArticle/slices";


const combineReducer = combineReducers({
  loginPage: loginSlice,
  articlesPage: articleSlice,
  singleActiclePage: singleActicleSlice,
  profilePage: profileSlice,
  //   productsPage: productsReducer,
  //   productInfoPage: productInfoSlice,
  //   cartPage: cartSlice,
  //   ordersPage: ordersSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "login/logout") {
    state = {};
  }
  return combineReducer(state, action);
};

export const store = configureStore({ reducer: rootReducer });
