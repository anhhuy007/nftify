import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

const PrivateRoute = () => {
  const auth = useAuth();
  
  if (!auth || !auth.token) {
    return <Navigate to="/auth/sign-in" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
