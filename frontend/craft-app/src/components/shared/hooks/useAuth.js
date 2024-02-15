import { useContext } from "react";
import { StoreContext } from "../../../api/context/StoreProvider";

export const useAuth = () => {
  const value = useContext(StoreContext);

  return value;
};

// export default useAuth;
