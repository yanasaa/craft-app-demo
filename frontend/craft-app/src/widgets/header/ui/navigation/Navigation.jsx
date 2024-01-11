import React, { useState } from "react";
import DropdownContent from "../../../../components/shared/ui/dropdownContent/DropdownContent";
import "./Navigation.scss";

function Navigation() {
  const [isActive, setIsActive] = useState(false);
  return (
    <nav className="header__navigation">
      <div className="dropdown">
        <div
          className="dropdown__button navigation__link"
          onClick={(e) => setIsActive(!isActive)}
        >
          Разделы сайта
          {isActive ? (
            <span className="icon navigation__icon navigation__icon_opened"></span>
          ) : (
            <span className="icon navigation__icon navigation__icon_open_closed"></span>
          )}
        </div>
        {isActive && <DropdownContent className="navigation__dropdown"/>}
      </div>
    </nav>
  );
}
export default Navigation;
