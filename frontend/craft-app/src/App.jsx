import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/sass/style.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import SignIn from "./pages/signIn/SignIn";

import { ROUTES } from "./components/shared/consts/routes";
import { SingleArticle } from "./pages/singleArticle/SingleArticle";
import CreateArticle from "./pages/createArticle/CreateArticle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.ENTER} element={<SignIn />} />
          <Route path={ROUTES.CREATE} element={<CreateArticle />} />
          <Route path="/:slug" element={<SingleArticle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
