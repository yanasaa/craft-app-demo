import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./DropdownContent.scss";
import { ROUTE_NAMES } from "../../../../../routes/routeNames";
import { useSelector } from "react-redux";
import { loginSelector } from "../../../../../pages/signIn/selectors";
import { navLinks } from "./dropdownValues";

const DropdownContent = ({ className, onClick}) => {
  const {isAuth} = useSelector(loginSelector)
  let content = navLinks;
  if(isAuth) {
    content = navLinks.filter(link => !link.authHidden)
  }
  
  return (
    <ul className={`dropdown__content ${className}`} onClick={onClick}>
      {content.map(link => {
        return (link.type === 'hashlink') ?  (
        <li>
        <HashLink className="dropdown-item" to={`${ROUTE_NAMES.HOME}${link.hash}`}>
          {link.label}
        </HashLink>
        </li> 
        ) : (
        <li>
          <Link className="dropdown-item" to={link.pageRef}>
            {link.label}
          </Link>
        </li>
        )
        })
        
      }
    </ul>
  );
};

export default DropdownContent;
