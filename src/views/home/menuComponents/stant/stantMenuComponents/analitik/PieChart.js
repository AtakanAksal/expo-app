import React, {useEffect, useState, useRef} from "react";
import { StyleSheet, View } from "react-native";

import { VictoryPie, VictoryChart, VictoryTheme, VictoryContainer, Slice, handleClick } from "victory-native";
import { relativeHeightNum, relativeWidthNum, convertArrayOfObjectsIntoArrayOfProperties } from "../../../../../../utils/HelperFunctions";


const PieChart = ({isFiltered, analaticState, streamData, }) => {
  
    const tempData = (Object.values(streamData));
    // console.log("----------tempData-------------");
    // console.log(tempData);

  
    // console.log("----------tempFilteredData-------------");
    // console.log(tempFilteredData);
    // tempData.forEach(element => {
    //     console.log(element.country_count);
    // });
    // console.log(tempData); 
const defineCountName = () => {   
    switch (analaticState) {
        case "Ülke":
          return "country_count";
        case "Sektör":
          return "sector_count";
        case "Etkileşim":
          return "sector_count";
        case "Gün":
          return "sector_count";
        case "KullanıcıTürü":
          return "role_count";
        case "Cinsiyet":
          return "gender_type_count";
          default:
            return "";
        }
}   
const defineCodeName = () => {
    switch (analaticState) {
        case "Ülke":
          return "country_code";
        case "Sektör":
          return "sector_name";
        case "Etkileşim":
          return "sector_count";
        case "Gün":
          return "sector_count";
        case "KullanıcıTürü":
          return "user_type";
        case "Cinsiyet":
          return "gender_type";
          default:
            return "";
        }
}  
const count=defineCountName(); const name=defineCodeName();
const calculateAvarage= () =>{
  let total=0;
  tempData.forEach(element => {
    total+=element?.[count]
  });
  const avarage = Math.round(total/tempData.length) ;
  return avarage;
}


  return (
    <View style={styles.container}>
        
        
         <View style={{flex:4, justifyContent:"center", alignItems:"center",}} >
         
      <VictoryPie
         data={(isFiltered)? tempData : tempData.slice(1)}
        // data={ exampleData2.slice(1)}
        // data= {exampleData}
         x={name} y={count}
        // x="quarter" y="earnings"
        animate={{
            duration: 2000,
            onLoad: { duration: 2000 }
          }}       
        //  categories={{ x: ["dogs", "cats", "mice"] }}
        colorScale={[ "#4C00FF" , "#9100FF",  "#460000", "#A7AC00", "#8A8A8A", "#FF0000", "#FFB300", "#01FF45", "#016E66", "tomato", "orange", "gold", "cyan", "navy","tomato", "orange", "gold", "cyan", "navy","tomato", "orange", "gold", "cyan", "navy",]}
        height={relativeHeightNum(320)}
        radius={relativeWidthNum(160)}  
        labelRadius = {90}
        style={{ labels: { fill: "white", fontSize: 12, } }}   
        labelPlacement={() => "parallel"}
        // labels={({ datum }) => `y: ${datum.country_count}`} örnek
        // labels={({ datum }) =>  `${datum.country_code} ${datum.country_count}  %${(Math.round((datum.country_count*100)/(exampleData2[0].country_count)))}`}
        labels={({ datum }) =>  { 
            
                  if(isFiltered){
                    if( Math.round((datum?.[count]*100)/(tempData[0]?.[count]))>1){ 
                    // return `${datum?.[name]} ${datum?.[count]}  %${(Math.round((datum?.[count]*100)/calculateAvarage()))}`
                     return `${datum?.[name]} ${datum?.[count]}  %${(Math.round((datum?.[count]*100)/(tempData[0]?.[count])))}`
                    }return ""
                  }
                   
            if( Math.round((datum?.[count]*100)/(tempData[0]?.[count]))>1){
            return  `${datum?.[name]} ${datum?.[count]}  %${(Math.round((datum?.[count]*100)/(tempData[0]?.[count])))}`
             }return ""
            
           
        }
        } 
       
      />
      </View>
    </View>
  );
};
export default PieChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    backgroundColor: "#FFFFFF",
  },
});
