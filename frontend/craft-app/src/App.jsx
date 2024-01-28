import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../src/sass/style.css";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import SignIn from "./pages/signIn/SignIn";

import { ROUTES } from "./components/shared/consts/routes";
import { SingleArticle } from "./pages/singleArticle/SingleArticle";
import CreateArticle from "./pages/createArticle/CreateArticle";
import Profile from "./pages/profile/Profile";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route
            path={ROUTES.ENTER}
            element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path={ROUTES.CREATE} element={<CreateArticle />} />
          <Route path="/:slug" element={<SingleArticle />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
