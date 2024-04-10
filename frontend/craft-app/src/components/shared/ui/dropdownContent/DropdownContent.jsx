import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./DropdownContent.scss";
import { ROUTE_NAMES } from "../../../../routes/routeNames";

const DropdownContent = ({ className, onClick }) => {
  return (
    <ul className={`dropdown__content ${className}`} onClick={onClick}>
      <li>
        <HashLink className="dropdown-item" to={`${ROUTE_NAMES.HOME}#`}>
          Виды ремесел
        </HashLink>
      </li>
      <li>
        <HashLink
          className="dropdown-item"
          to={`${ROUTE_NAMES.HOME}#advantages`}
        >
          Преимущества
        </HashLink>
      </li>
      <li>
        <HashLink className="dropdown-item" to={`${ROUTE_NAMES.HOME}#articles`}>
          Статьи авторов
        </HashLink>
      </li>
      <li>
        <HashLink
          className="dropdown-item"
          to={`${ROUTE_NAMES.HOME}#onboarding`}
        >
          Как это работает
        </HashLink>
      </li>
      <li>
        <HashLink className="dropdown-item" to={`${ROUTE_NAMES.HOME}#contacts`}>
          Контакты
        </HashLink>
      </li>
      <li>
        <Link className="dropdown-item" to={"about"}>
          О нас
        </Link>
      </li>
    </ul>
  );
};

export default DropdownContent;
