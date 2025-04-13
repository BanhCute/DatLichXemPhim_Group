import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Lưu URL hiện tại trước khi chuyển hướng
    localStorage.setItem("redirectUrl", window.location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
};


export default ProtectedRoute;
