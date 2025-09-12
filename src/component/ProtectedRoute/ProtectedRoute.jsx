import React, { useContext } from "react";
import { children } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/user.context";

const ProtectedRoute = ({ children }) => {
  let { token, setToken } = useContext(userContext);
  if (token != null) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
  return <></>;
};

export default ProtectedRoute;
