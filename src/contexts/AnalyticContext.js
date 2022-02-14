import React, { createContext, useContext, useReducer } from "react";

export const AnalyticContext = createContext();

export const AnalyticProvider = ({ reducer, initialState, children }) => (
  <AnalyticContext.Provider value={useReducer(reducer, initialState)}>
    {children}
    </AnalyticContext.Provider>
);

export const useAnalyticValue = () => useContext(AnalyticContext);

export const reducerAnalytic = (state, action) => {
 
  switch (action.type) {
    case "setAnalyticToInitials":
      return{
        analyticStream: {
          ulke_analytic : [],
          sektor_analytic : [],
          kullanicituru_analytic : [],
          cinsiyet_analytic : []         
        }
      }
    case "addAnalyticStream":
      return { 
        ...state, 
        analyticStream: { ...state.analyticStream, 
          ...action.xAnalyticStream },
       };
    case "setFilterToInitials":
        return{
          filteredStream: {
            filtered_ulke_analytic : [],
            filtered_sektor_analytic : [],
            filtered_kullanicituru_analytic : [],
            filtered_cinsiyet_analytic : []         
          }
        }
    case "addFilteredStream":
          return { 
            ...state, 
            filteredStream: { ...state.filteredStream, 
              ...action.xFilteredStream },
           };

    case "addScreenOptions":
          return { 
            ...state, 
            screenOptions: { ...state.screenOptions, 
              ...action.xFilteredStream },
           };
    case "addFilter":
            return {
              ...state,
              filter: { ...state.filter, ...action.newFilter },
            };
    case "removeFilter":
            return { ...state,
               filter: null
              };
    default:
      return state;
  }
};
