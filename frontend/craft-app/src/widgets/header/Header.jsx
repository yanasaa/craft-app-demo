import { Link, useNavigate } from "react-router-dom";
import Navigation from "./ui/navigation/Navigation";
import Button from "../../components/shared/ui/button/Button";
import { ROUTES } from "../../components/shared/consts/routes";
import "./Header.scss";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { ROUTE_NAMES } from "../../routes/routeNames";
import { useDispatch, useSelector } from "react-redux";
import { loginSelector } from "../../pages/signIn/selectors";
import { logout } from "../../pages/signIn/slices";

function Header() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(loginSelector);
  const navigate = useNavigate();
  const [profileActive, setProfileActive] = useState(false);

  return (
    <header className="header">
      <div className="wrapper header__wrapper">
        <Navigation />
        <Link to={"."} reloadDocument>
          <span className="logo header__logo"></span>
        </Link>
        <div className="header__buttons">
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
                    <Link className="dropdown-item" to={ROUTES.PROFILE}>
                      Профиль
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      setProfileActive(false);
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
              className="button button_colored"
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
