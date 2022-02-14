import React, { createContext, useContext, useReducer } from "react";

export const UpdateContext = createContext();

export const UpdateProvider = ({ reducer, initialState, children }) => (
  <UpdateContext.Provider value={useReducer(reducer, initialState)}>{children}</UpdateContext.Provider>
);

export const useUpdateValue = () => useContext(UpdateContext);

export const reducerUpdate = (state, action) => {
  switch (action.type) {
    case "doUpdate":
      return {
        ...state,
        update: { ...state.update, ...action.newUpdate },
      };
    case "removeItems":
      return { ...state, update: null };
    default:
      return state;
  }
};
