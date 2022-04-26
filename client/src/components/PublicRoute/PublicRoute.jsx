import React from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const auth = () => {
    const token = localStorage.getItem("token");
    if (token === null) return false;
    const expiresIn = jwt_decode(token).exp * 1000;
    const currentDate = new Date();
    if (expiresIn < currentDate.getTime()) {
      return false;
    }
    return true;
  };
  return auth() ? <Navigate to="/" /> : children;
};
