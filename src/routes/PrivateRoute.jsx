import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PrivateRoute = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  // UseEffect is triggered whenever isAuth changes
  useEffect(() => {
    if (!isAuth) {
      toast.dismiss();
      toast.error("Please login to access this page");
    }
  }, [isAuth]);

  // If the user is not authenticated, redirect to home
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default PrivateRoute;
