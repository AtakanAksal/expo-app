import React, { createContext, useContext, useReducer } from "react";

export const UserContext = createContext();

export const UserProvider = ({ reducer, initialState, children }) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>{children}</UserContext.Provider>
);

export const useUserValue = () => useContext(UserContext);

export const reducerUser = (state, action) => {
  switch (action.type) {
    case "changeUser":
      return { ...state, user: action.newUser };
    case "logoutUser":
      return {
        ...state,
        user: {
          token: null,
          username: null,
          userid: null,
        },
      };
    default:
      return state;
  }
};
