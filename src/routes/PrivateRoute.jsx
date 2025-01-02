import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const PrivateRoute = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (!isAuth) {
      toast.dismiss();
      toast.error("Please login to access this page");
      navigate("/");
    }
  }, [isAuth, navigate]);
  if (!isAuth) return null;

  return <Outlet />;
};

export default PrivateRoute;
