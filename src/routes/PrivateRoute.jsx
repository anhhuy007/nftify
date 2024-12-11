import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const PrivateRoute = () => {
  const { isAuth } = useAuth();
  
  if (!isAuth) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
