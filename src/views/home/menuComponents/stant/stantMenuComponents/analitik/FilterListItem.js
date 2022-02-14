/* eslint-disable react-native/no-unused-styles */
import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import CheckBox from "@react-native-community/checkbox";
import { relativeWidthNum } from "../../../../../../utils/HelperFunctions";
import { defineCodeFullName,  } from './utils';


const FilterListItem = ({item,
    index,
    setSelectedIndex,
    activeState,
    setActiveState,
    selectedIndex,
    analaticState,
  }) => {

   
      const fullName= defineCodeFullName(analaticState);
    return (
        <View style={styles.row}> 
                {/* checkbox */}
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <CheckBox
                tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
                disabled={false}
                value={selectedIndex.includes(index)}
                onValueChange={() => {
                  setSelectedIndex((prevArray) => {
                    // console.log("setSelectedIndex render");
                    if (prevArray.includes(index)) {
                      return prevArray.filter((itm) => itm !== index);
                    }
                    return [...prevArray, index];
                  });
                }}
              />
            </View>

            <Text style={styles.text}>{item?.[fullName]}</Text>
        </View>
    );
}

export default FilterListItem;
const styles= StyleSheet.create({
    row : {
        flexDirection: "row",
        justifyContent:"flex-start",
        alignItems:"center"
        },
    text: {
        marginLeft:relativeWidthNum(10),
        color:"#6C757D",
        fontSize:12
    }
})