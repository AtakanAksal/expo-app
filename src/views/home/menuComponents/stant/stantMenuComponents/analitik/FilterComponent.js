/* eslint-disable react-native/no-unused-styles */
import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useUserValue } from '../../../../../../contexts/UserContext';
import { fetchGetWithId } from '../../../../../../helpers/analiticConnection';
import { relativeHeightNum, relativeWidthNum } from '../../../../../../utils/HelperFunctions';
import FilterListItem from './FilterListItem';
import SecilenleriGosterButon from './SecilenleriGosterButon';
import { useAnalyticValue } from "../../../../../../contexts/AnalyticContext";

const dummyData = [
	{
		"id": 1,
		"country": "Costa Rica"
	},
	{
		"id": 2,
		"country": "Turkey"
	},
	{
		"id": 3,
		"country": "Ireland"
	},
	{
		"id": 4,
		"country": "Brazil"
	},
	{
		"id": 5,
		"country": "Italy"
	}
];

const FilterComponent = ({analaticState,  streamData,  setFilterScreenOn, setLoading, setIsFiltered }) => {
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [listItems, setListItems] = useState([]);

  const tempData = (Object.values(streamData));
  const slicedTempData=tempData.slice(1);
  const [{ user }] = useUserValue();
  const [{ filter }, dispatch] = useAnalyticValue();
  const definePayloadKey = () => {   
    switch (analaticState) {
        case "Ülke":
          return "countryStats";
        case "Sektör":
          return "sectorStats";
        case "Etkileşim":
          return "sector_count";
        case "Gün":
          return "sector_count";
        case "KullanıcıTürü":
          return "accountStats";
        case "Cinsiyet":
          return "genderStats";
          default:
            return "";
        }
  }  
  const definePayloadId = () => {   
  switch (analaticState) {
      case "Ülke":
        return "countryid";
      case "Sektör":
        return "sectorid";
      case "Etkileşim":
        return "sector_count";
      case "Gün":
        return "sector_count";
      case "KullanıcıTürü":
        return "userroleid";
      case "Cinsiyet":
        return "genderid";
        default:
          return "";
      }
  }  
   const value= definePayloadId();
   const key= definePayloadKey();

   const addFilterParams = (x, y) => {
    dispatch({
        type: "addFilter",
        // xAnalyticStream: { ulke_data: res?.ulke, sektor_data: res?.sectors, kullanicituru_data: res?.accountTypeAll, cinsiyet_data: res?.cinsiyetAll},
        newFilter: {
          [x]: y         
        },
      });
}
const secileniFiltrele = () => {
  addFilterParams(key, slicedTempData[selectedIndex[0]]?.[value]);
  setIsFiltered(true)
  setFilterScreenOn(false);  
  setLoading(true);
}
    return (
        <View style={styles.mainFrame} >
               <Text style={styles.textHeader}>{analaticState} Seç</Text>
               <FlatList
              data={tempData.slice(1)} // listItems
               //   onEndReached={() => getData()} bu method ana componentte active state e uygun get methodunu çağıracak
              renderItem={({ item, index }) =>
                
                  (
                  <FilterListItem 
                    item={item}
                    index={index}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}              
                    listItems={listItems}
                    setListItems={setListItems}
                    analaticState={analaticState}              
                  />
                )
              }           
              keyExtractor={(item, index) => index.toString()}
            />
           <SecilenleriGosterButon secileniFiltrele={secileniFiltrele} />
        </View>
    );
}

export default FilterComponent;
const styles = StyleSheet.create({
    mainFrame: { 
      flex:1,
      padding: 10,
      // marginLeft: relativeWidthNum(20),
      // marginTop: relativeHeightNum(170),
      // height: relativeHeightNum(350),
      // width: relativeWidthNum(250),
      backgroundColor: "#FFF",
      // borderColor: "#EFEFEF",
      // borderWidth: 1, 
      // borderStyle: "solid",
      // shadowColor: "gray",
      // shadowOffset: { width: 0, height: 0 },
      // shadowOpacity: 1,
      // shadowRadius: 8,
      // elevation: 8,
    },
    insiderFrame: {
      flex: 1,
      padding: 8,
      justifyContent: "space-around",
    },
    textHeader: {
      color : "#00AA9F",
      fontSize: 15,
      marginLeft:5,
      marginBottom:21,
      marginTop:8
    },
    text : {
      color : "#6C757D",
      fontSize: 12
    }
  });
  