import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const AuthRoutes = ({ children }) => {
  const {user} = useContext(AuthContext);
  if (user) return <> {children} </>;
  return <Navigate to="/login" replace={true} />;
};

export default AuthRoutes;