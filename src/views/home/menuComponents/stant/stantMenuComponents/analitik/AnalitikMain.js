import React from  "react";


import { AnalyticProvider, reducerAnalytic , useAnalyticValue } from "../../../../../../contexts/AnalyticContext";

import Analitik from "./Analitik";



const AnalitikMain  = ({ stantItem, setSelectedMenuItem }) =>  {

   const initialState = {
    analyticStream: {
      ulke_analytic : [],
      sektor_analytic : [],
      kullanicituru_analytic : [],
      cinsiyet : []         
    },
     filter: {
      countryStats : "",
      sectorStats : "",
      accountStats : "", 
      genderStats : ""
     } ,
   }
   

return(
  <AnalyticProvider initialState={initialState} reducer={reducerAnalytic}><Analitik stantItem={stantItem} setSelectedMenuItem={setSelectedMenuItem}/></AnalyticProvider>
)

}

export default AnalitikMain;





  