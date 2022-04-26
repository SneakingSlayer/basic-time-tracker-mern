import React, { createContext, useReducer } from "react";
import { ENDPOINTS } from "../utils/api";
import axios from "axios";
import AppReducer from "./AppReducer";
const initalState = {
  data: [],
  error: null,
  changeLoading: false,
};

export const GlobalContext = createContext(initalState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initalState);

  const handleLogin = async (id) => {
    dispatch({
      type: "CHANGE_FETCH",
    });
    const res = await axios.put(ENDPOINTS.computers.timeIn, { pc_id: id });
    dispatch({
      type: "LOGIN_COMPUTER",
      payload: res,
    });
  };

  const handleLogout = async (id) => {
    dispatch({
      type: "CHANGE_FETCH",
    });
    const res = await axios.put(ENDPOINTS.computers.timeOut, { pc_id: id });
    dispatch({
      type: "LOGOUT_COMPUTER",
      payload: res,
    });
  };

  const handleDeleteComputer = async (id) => {
    dispatch({
      type: "CHANGE_FETCH",
    });
    const res = await axios.delete(ENDPOINTS.computers.computers, {
      data: {
        pc_id: id,
      },
    });
    dispatch({
      type: "DELETE_COMPUTER",
      payload: res,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        data: state.data,
        error: state.error,
        changeLoading: state.changeLoading,
        handleLogin,
        handleLogout,
        handleDeleteComputer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
