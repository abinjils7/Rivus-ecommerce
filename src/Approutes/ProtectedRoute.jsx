import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../ContextAPI/Authcontext";
import LoadingSpinner from "../UserPages/Common/Loadingspinner";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (user === undefined) {
   
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
