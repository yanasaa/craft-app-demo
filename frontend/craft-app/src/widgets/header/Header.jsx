import { Link, useNavigate } from "react-router-dom";
import Navigation from "./ui/navigation/Navigation";
import Button from "../../components/shared/ui/button/Button";
import { ROUTES } from "../../components/shared/consts/routes";
import "./Header.scss";

function Header() {
  let navigate = useNavigate();
  function handleClick() {
    navigate(ROUTES.ENTER);
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
          <Button className="button button_colored" btnText="Войти" onClick={handleClick} />
        </div>
      </div>
    </header>
  );
}

export default Header;
