import React, { createContext, useState } from "react";
export const userContext = createContext("");
const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <>
      <userContext.Provider value={{ token, setToken }}>
        {children}
      </userContext.Provider>
    </>
  );
};

export default UserProvider;
