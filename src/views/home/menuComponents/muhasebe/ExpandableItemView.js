/* eslint-disable react-native/no-unused-styles */
import React, { useState } from "react";
import {
  Text,
  View,
  Dimensions,
  Pressable} from "react-native";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../../utils/HelperFunctions";
import expandableItemText from './expandableItemText';

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;

const ExpandableItemView = ({ item, value, filterPayloads, setFilterPayloads, setChoosenValue }) => {

 const addToFilterPayloads = () => {
  //  const payload= <ExpandableItemText value={value} item={item}  />
  //  const payloadObj = {value: payload}
  //  console.log(payloadObj);
 // setFilterPayloads((prev)=>[...prev, {value : payload}]);
//  console.log(value);
 setChoosenValue(String(expandableItemText(value, item)) );
 setFilterPayloads((prev)=>[...prev, {[value] : expandableItemText(value, item)}]);
 }
    // const [contentOpen, setContentOpen] = useState(false);
    return (
      <View
        style={{
          //   width: WIDTH_WINDOW - 50,
          //   height: contentOpen ? 180 : 80, // contentOpen ? 80 : 180
          marginHorizontal: relativeWidthNum(10),
          // elevation: 6,
          // backgroundColor: "#FFFFFF",
          borderBottomColor: "#c1c1c1",
          borderBottomWidth: 0.5,
          justifyContent: "flex-start",
        }}
        // onPress={() => null}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // paddingHorizontal: 5,
            paddingVertical: relativeHeightNum(14),
          }}
        >
          {/* Burada tıklanan item filtreleme kriter dizisine eklenecek */}
          <Pressable onPress={()=>{ 
            addToFilterPayloads(); 
            console.log(filterPayloads);
             }} > 
            <Text style={{ fontSize: 15, color: "#6C757D" }}>{expandableItemText(value, item)}</Text>
          </Pressable>
        </View>
      </View>
    );
  };
  export default ExpandableItemView;
 