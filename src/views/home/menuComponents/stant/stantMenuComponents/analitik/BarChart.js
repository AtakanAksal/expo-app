import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryLabel } from "victory-native";



const BarChart = ({isFiltered, analaticState, streamData,}) => {
  const tempData = (Object.values(streamData))
 
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
    return (
      <View style={styles.container}>
 
 <View style={{ alignItems:"center",}} >
        <VictoryChart width={350} theme={VictoryTheme.material}>
          <VictoryBar data={(isFiltered)? tempData : tempData.slice(1)} 
            x={name}
           y={count}
           style={{

            labels: { fontSize: 12,    fill: "white"}, 
            data: { fill: ({ datum }) => datum.x === 1 ? "#c43a31" : "#c43a31"},}}
           animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
          barWidth={16} 
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
        }}     
       labelComponent={
    <VictoryLabel angle={-90} textAnchor="end" dy={7}/>
  }
          />
        </VictoryChart>
</View>


      </View>
    );
  }
export default BarChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  }
});