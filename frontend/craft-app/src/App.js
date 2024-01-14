import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/sass/style.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import SignIn from "./pages/signIn/SignIn";
import SingleArticle from "./pages/singleArticle/SingleArticle";
import { ROUTES } from "./components/shared/consts/routes";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.ENTER} element={<SignIn />} />
          <Route
            path={`${ROUTES.ARTICLE}/:articleId`}
            element={<SingleArticle />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
