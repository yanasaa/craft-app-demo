import { Link } from "react-router-dom";
import "./DropdownContent.scss";
import { ROUTES } from "../../consts/routes";

const DropdownContent = ({ className }) => {
  return (
    <ul className={`dropdown__content ${className}`}>
      <li>
        <a className="dropdown-item" href="/#hero">
          Виды ремесел
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="/#advantages">
          Преимущества
        </a>
      </li>
      <li>
        <a className="dropdown-item" href={`${ROUTES.MAIN}#articles`}>
          Статьи авторов
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="#onboarding">
          Как это работает
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="/#contact-us">
          Контакты
        </a>
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
