import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {UserOutlined } from "@ant-design/icons";
import Navigation from "./ui/navigation/Navigation";
import Button from "../../components/shared/ui/button/Button";
import { ROUTE_NAMES } from "../../routes/routeNames";
import { loginSelector } from "../../pages/signIn/selectors";
import { logout } from "../../pages/signIn/slices";
import AuthService from "../../services/AuthService";
import "./Header.scss";

function Header() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(loginSelector);
  const navigate = useNavigate();
  const [profileActive, setProfileActive] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setProfileActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Navigation />
        <Link to={"."} reloadDocument>
          <span className="logo header__logo"></span>
        </Link>
        <div className="header__buttons" ref={menuRef}>
          {isAuth ? (
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
                    <Link className="dropdown-item" to={ROUTE_NAMES.PROFILE}>
                      Профиль
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      setProfileActive(false);
                      AuthService.logout().then((data) => console.log(data));
                      dispatch(logout());
                    }}
                    className="dropdown-item"
                  >
                    Выйти
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Button
              className={`button button_colored button-enter ${window.location.href.endsWith("/login") && "hidden"}`}
              title="Войти"
              onClick={() => {
                window.scrollTo(0, 0);
                navigate(ROUTE_NAMES.SIGN_IN);
              }}
            >
             Войти
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
