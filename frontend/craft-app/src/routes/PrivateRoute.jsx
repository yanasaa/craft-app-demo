import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";
import { ROUTE_NAMES } from "./routeNames";
import { loginSelector } from "../pages/signIn/selectors";

const PrivateRoute = () => {
  const { isAuth } = useSelector(loginSelector);

  return isAuth ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={ROUTE_NAMES.SIGN_IN} />
  );
};
export default PrivateRoute;
