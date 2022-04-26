import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";
import { SplashScreen } from "../SplashScreen/SplashScreen";
export const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
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

  const counter = setTimeout((count) => {
    setLoading(false);
  }, 500);

  return auth() ? (
    !loading ? (
      children
    ) : (
      <SplashScreen />
    )
  ) : (
    <Navigate to="/login" />
  );
};
