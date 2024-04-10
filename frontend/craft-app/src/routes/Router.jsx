import { Route, Routes } from "react-router-dom";
import { ROUTE_NAMES } from "./routeNames";
import PrivateRoute from "./PrivateRoute";
import {
  About,
  Home,
  Profile,
  SignIn,
  SignUp,
  CreateArticle,
  ProfileEdit,
  SingleArticle,
} from "../pages";
import MainLayout from "./MainLayout";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTE_NAMES.HOME} element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/:slug" element={<SingleArticle />} />
        <Route path={ROUTE_NAMES.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTE_NAMES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTE_NAMES.ABOUT_US} element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path={ROUTE_NAMES.PROFILE} element={<Profile />} />
          <Route path={ROUTE_NAMES.PROFILE_EDIT} element={<ProfileEdit />} />
          <Route
            path={ROUTE_NAMES.ARTICLE_CREATE}
            element={<CreateArticle />}
          />
          {/* <Route path={ROUTE_NAMES.PRODUCTS} element={<Products />} />
        <Route path={ROUTE_NAMES.PRODUCT} element={<ProductInfo />} />
         <Route path={ROUTE_NAMES.ACCOUNT} element={<Account />} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import "../src/sass/style.css";
// import { ROUTES } from "./components/shared/consts/routes";
// import MainLayout from "./layouts/MainLayout";
// import StoreContext from "./api/context/StoreProvider";
// import About from "./pages/about/About";
// import { SingleArticle } from "./pages/singleArticle/SingleArticle";
// import CreateArticle from "./pages/createArticle/CreateArticle";
// import Profile from "./pages/profile/Profile";

// import ProfileEdit from "./pages/profileEdit/ProfileEdit";
// import ArticleEdit from "./pages/articleEdit/ArticleEdit";
// import { Home, SignIn } from "./pages";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path={ROUTES.MAIN} element={<MainLayout />}>
//           <Route path={ROUTES.CREATE} element={<CreateArticle />} />
//           <Route path="/:slug" element={<SingleArticle />} />
//           <Route path={ROUTES.PROFILE} element={<Profile />} />
//           <Route path={ROUTES.PROFILEEDIT} element={<ProfileEdit />} />
//           <Route path={ROUTES.ARTICLEEDIT} element={<ArticleEdit />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
