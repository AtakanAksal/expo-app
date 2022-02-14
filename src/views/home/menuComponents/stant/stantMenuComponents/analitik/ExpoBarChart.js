import React from  "react";
import { View,  StyleSheet, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
  } from 'react-native-chart-kit';


  

  const ExpoBarChart = ({analaticState, modalOpenState, setModalOpenState, streamData}) => {
    return (
      <View style={{flex:1, backgroundColor: "#FFFFFF",}} >
      
        <BarChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
            barColors: [ "#4C00FF" , "#9100FF",  "#460000", "#A7AC00", "#8A8A8A", "#FF0000", "#FFB300", "#01FF45", "#016E66",]
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          yAxisLabel={'Rs'}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    );
  };
  export default ExpoBarChart;
  const styles = StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
    },
    
  });