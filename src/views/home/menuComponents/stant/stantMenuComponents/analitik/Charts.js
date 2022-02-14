import React from  "react";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import all basic components

import Liste from './Liste';
import PieChart from './PieChart';
import BarChart from './BarChart';
import ExpoBarChart from "./ExpoBarChart";
import ExpoPieChart from './ExpoPieChart';



const Tab = createMaterialTopTabNavigator();



const Charts = ({isFiltered, analaticState,  streamData,    }) => {
    // console.log(streamData);
    const ExpoPieChartComponent = () => {
        return(
            < PieChart isFiltered={isFiltered}  analaticState={analaticState}   streamData={streamData}  />
        )
         }
    const ExpoBarChartComponent = () => {
        return(
            <BarChart isFiltered={isFiltered} analaticState={analaticState}   streamData={streamData}   />
        )       
    }
    const ListeComponent = () => {
        return (
            <Liste isFiltered={isFiltered}  analaticState={analaticState}   streamData={streamData}  />
        )
    }

    return (
        <NavigationContainer independent>
        <Tab.Navigator  
        tabBarOptions={{
          showIcon: false,
          showLabel: true,
          indicatorStyle: { backgroundColor: "#00AA9F" },
        }}>
          <Tab.Screen name="Pasta" component={ExpoPieChartComponent}           
            />
          <Tab.Screen name="Sütun" component={ExpoBarChartComponent}
         
          />
          <Tab.Screen name="Liste" component={ListeComponent}        
          />
        </Tab.Navigator>
        </NavigationContainer>   
    );
    
}

export default Charts;