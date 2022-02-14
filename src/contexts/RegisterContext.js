import React, { createContext, useContext, useReducer } from "react";

export const RegisterContext = createContext();

export const RegisterProvider = ({ reducer, initialState, children }) => (
  <RegisterContext.Provider value={useReducer(reducer, initialState)}>{children}</RegisterContext.Provider>
);

export const useRegisterValue = () => useContext(RegisterContext);

export const reducerRegister = (state, action) => {
  switch (action.type) {
    case "changeRegister":
      return {
        ...state,
        register: { ...state.register, ...action.newRegister },
      };
    case "removeItem":
      return { ...state, register: null };
    default:
      return state;
  }
};
