import { BrowserRouter, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { ROUTES } from "../components/shared/consts/routes";
import Home from "./home/Home";
import About from "./about/About";
import SignIn from "./signIn/SignIn";
import SingleArticle from "./singleArticle/SingleArticle";

export default function Routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.ENTER} element={<SignIn />} />
          {/* <Route
            path={`${ROUTES.ARTICLE}/:articleId`}
            element={<SingleArticle />}
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
