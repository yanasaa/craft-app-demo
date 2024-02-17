import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

const StoreProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "isLoggedIn" ? true : false
  );

  useEffect(
    () => localStorage.setItem("isLoggedIn", String(isLoggedIn)),
    [isLoggedIn]
  );

  return (
    <StoreContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
