import { useEffect, useRef, useState } from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {UserOutlined } from "@ant-design/icons";
import { Tooltip } from 'antd';
import Navigation from "./ui/navigation/Navigation";
import Button from "../../components/shared/ui/button/Button";
import { ROUTE_NAMES } from "../../routes/routeNames";
import { loginSelector } from "../../pages/signIn/selectors";
import { logoutThunk } from "../../pages/signIn/thunks";
import "./Header.scss";

function Header() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(loginSelector);
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
          <Link to={"."} onClick={() => {window.scroll(0,0)}}>
            <Tooltip title="Вернуться на главную" color={'#ad2e95'} mouseEnterDelay={1} arrow={false}>
              <span className="logo header__logo"></span>
            </Tooltip>
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
                      dispatch(logoutThunk())
                    }}
                    className="dropdown-item"
                  >
                    Выйти
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link reloadDocument to={ROUTE_NAMES.SIGN_IN}>
              <Button
                className={`button button_colored button-enter ${window.location.href.endsWith("/login") && "hidden"}`}
              >
             Войти
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
