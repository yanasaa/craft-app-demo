import { Link, useNavigate, useLocation } from "react-router-dom";
import Navigation from "./ui/navigation/Navigation";
import Button from "../../components/shared/ui/button/Button";
import { ROUTES } from "../../components/shared/consts/routes";
import "./Header.scss";
import { useState, useEffect } from "react";

function Header() {
  let navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("USERNAME");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem("USERNAME");
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, [location]);

  function handleLogout() {
    // Очистить данные пользователя при выходе
    localStorage.removeItem("USERNAME");
    setIsLoggedIn(false);
    setUsername("");
    navigate(ROUTES.MAIN);
  }

  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Navigation />
        <Link to={"."} reloadDocument>
          <span className="logo header__logo"></span>
        </Link>
        <div className="header__buttons">
          {/* <SearchBar className="search-bar search-bar_header" /> */}
          {isLoggedIn ? (
            <div className="user-dropdown">
              <span className="user-dropdown__name">{username}</span>
              <ul className="user-dropdown__menu">
                <li>Перейти к профилю</li>
                <button onClick={handleLogout}>Выйти</button>
              </ul>
            </div>
          ) : (
            <Button
              className="button button_colored"
              btnText="Войти"
              onClick={() => navigate(ROUTES.ENTER)}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
