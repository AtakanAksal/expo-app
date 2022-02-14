import React, { createContext, useContext, useReducer } from "react";

export const StantContext = createContext();

export const StantProvider = ({ reducer, initialState, children }) => (
  <StantContext.Provider value={useReducer(reducer, initialState)}>{children}</StantContext.Provider>
);

export const useStantValue = () => useContext(StantContext);

export const reducerStant = (state, action) => {
  switch (action.type) {
    case "changeStant":
      return {
        ...state,
        stant: { ...state.stant, ...action.newStant },
      };
    case "setPage":
      return { ...state, page: action.prevPage };

    case "removeItem":
      return { ...state, stant: null };
    default:
      return state;
  }
};
