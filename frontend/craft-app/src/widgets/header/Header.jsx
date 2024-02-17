import { Link, useNavigate, useLocation } from "react-router-dom";
import Navigation from "./ui/navigation/Navigation";
import Button from "../../components/shared/ui/button/Button";
import { ROUTES } from "../../components/shared/consts/routes";
import "./Header.scss";
import { useState, useEffect, useRef } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../components/shared/hooks/useAuth";

function Header() {
  let navigate = useNavigate();
  const location = useLocation();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [profileActive, setProfileActive] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

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
    setProfileActive(false);
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
            <div className="header__profile-link">
              <UserOutlined
                className="icon profile-link__icon"
                onClick={() => setProfileActive(!profileActive)}
              />
              {profileActive && (
                <ul className="profile-link__dropdown dropdown__content">
                  <li
                    onClick={() => {
                      setProfileActive(!profileActive);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <Link className="dropdown-item" to={ROUTES.PROFILE}>
                      Профиль
                    </Link>
                  </li>
                  <li onClick={handleLogout} className="dropdown-item">
                    Выйти
                  </li>
                </ul>
              )}

              {/* {profileActive && <button onClick={handleLogout}>Выйти</button>} */}
            </div>
          ) : (
            <Button
              className="button button_colored"
              btnText="Войти"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(ROUTES.ENTER);
              }}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
