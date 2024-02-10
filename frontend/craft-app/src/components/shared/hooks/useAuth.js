import { useContext, useDebugValue } from "react";
import StoreContext from "../../../api/context/StoreProvider";

const useAuth = () => {
  const { isLoggedIn } = useContext(StoreContext);
  useDebugValue(isLoggedIn, (isLoggedIn) =>
    isLoggedIn?.user ? "Logged In" : "Logged Out"
  );
  return useContext(StoreContext);
};

export default useAuth;
