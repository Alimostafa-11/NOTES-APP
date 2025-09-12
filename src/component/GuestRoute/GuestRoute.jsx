import React, { useContext } from "react";
import { userContext } from "../../context/user.context";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }) => {
  let { token, setToken } = useContext(userContext);
  if (token != null) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }
  return <></>;
};

export default GuestRoute;
