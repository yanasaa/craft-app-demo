import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./DropdownContent.scss";
import { ROUTES } from "../../consts/routes";

const DropdownContent = ({ className }) => {
  return (
    <ul className={`dropdown__content ${className}`}>
      <li>
        <HashLink className="dropdown-item" to={`${ROUTES.MAIN}#`}>
          Виды ремесел
        </HashLink>
      </li>
      <li>
        <HashLink className="dropdown-item" to={`${ROUTES.MAIN}#advantages`}>
          Преимущества
        </HashLink>
      </li>
      <li>
        <HashLink className="dropdown-item" to={`${ROUTES.MAIN}#articles`}>
          Статьи авторов
        </HashLink>
      </li>
      <li>
        <HashLink className="dropdown-item" to={`${ROUTES.MAIN}#onboarding`}>
          Как это работает
        </HashLink>
      </li>
      <li>
        <HashLink className="dropdown-item" to={`${ROUTES.MAIN}#contacts`}>
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
