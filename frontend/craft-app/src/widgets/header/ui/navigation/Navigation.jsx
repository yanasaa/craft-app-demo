import React, { useState, useEffect, useRef } from "react";
import DropdownContent from "../../../../components/shared/ui/dropdownContent/DropdownContent";
import "./Navigation.scss";

function Navigation() {
  const [isActive, setIsActive] = useState(false);
  const menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <nav className="header__navigation">
      <div className="dropdown" ref={menuRef}>
        <div
          className="dropdown__button navigation__link"
          onClick={(e) => setIsActive(!isActive)}
        >
          <div className="no-burger">
            <span>Разделы сайта</span>
            {isActive ? (
              <span className="icon navigation__icon navigation__icon_opened"></span>
            ) : (
              <span className="icon navigation__icon navigation__icon_open_closed"></span>
            )}
            
          </div>
          <div className={`burger ${isActive && "burger__open"}`}>
            <div className="burger__line"></div>
              
            </div>
        </div>
        {isActive && (
          <DropdownContent
            className="navigation__dropdown"
            onClick={() => setIsActive(!isActive)}
          />
        )}
      </div>
    </nav>
  );
}
export default Navigation;
