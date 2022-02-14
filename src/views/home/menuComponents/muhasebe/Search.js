import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import filter from "lodash.filter";
import FilterImg from "../../../../../assets/vexmail/filtrele.png";
import Arama from "../../../../../assets/vexmail/arama.png";
import {
  relativeHeightNum,
  relativeWidthAndHeightForSquare,
  relativeWidthNum,
} from "../../../../utils/HelperFunctions";
import filterValueChooser from './filterValueChooser';

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const Search = ({
  setListItems,
  listItems,
  filteredData,
  setFilteredData,
  setSelectedComponent,
  value, 
  setContentOpen,
  choosenValue
}) => {
  const [writedText, setWritedText] = useState("");
useEffect(() => {
  
 
}, [choosenValue])

  const contains = (data, query) => {
    if (
      data?.toString().toLowerCase().includes(query.toString().toLowerCase())
    ) {
      return true;
    }
    return false;
  };

  const handleSearch = (text) => {
    setWritedText(text);
    if (text !== "") {
      const filtered = filter(listItems, (singledata) => {
        // eslint-disable-next-line no-template-curly-in-string
        //   const obj = {
        //       [`${singledata}.${queryString}`]: singledata
        //   };
        //  const aaaa='first_name'
        //  const strQuery=`${singledata}${queryString}${aaaa}`
        // return contains(singledata?.invoice_serial_number, text); //         `${singledata}.${queryString}` invoice_serial_number
        console.log(singledata);

       //  return contains(singledata?.invoice_serial_number, text);
       const a=filterValueChooser(value)
         return contains(singledata?.[a], text);
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(listItems);
    }
  };

  return (
    <View style={styles.searchAndFilterComponant}>
      {/* Search Bar  */}
      <View style={styles.search}>
        {/* <Image
          style={{
            height: 25,
            width: 25,
        //    paddingVertical: 8,
            marginLeft: 10,
            marginRight: 5,
          }}
          source={Arama}
          resizeMode="contain"
        /> */}
        <TextInput
          placeholder={value}
          value= { (choosenValue!=="") ? choosenValue : writedText  }         
          placeholderTextColor="#6C757D"
          // underlineColorAndroid='rgba(0,0,0,0)' 
          // inputContainerStyle={{borderBottomWidth:0}}
          // underlineColorAndroid='#FFF'
          style={{ borderBottomWidth: 0.5, flex: 1,  fontSize:15,   }}
          // autoFocus
          onFocus={() => {setContentOpen(true)}}
        //  onBlur={()=> {setContentOpen(false)} }
          onChangeText={(txt) => handleSearch(txt)}
         // value={writedText}
        />
      </View>
      
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchAndFilterComponant: {
    flex:1,
    flexDirection: "row",
    // marginVertical: 10,
    // marginHorizontal: 5,
    width: '100%',
    // height: relativeHeightNum(70),
    justifyContent: "center",
    alignItems: "center",
    // paddingRight: 8,
    // backgroundColor:"yellow"
  },
  search: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    // height: relativeHeightNum(40),
    // backgroundColor: "white",
    // borderRadius: 3,
    // borderColor: "#eeeeee",
    // borderWidth: 1,
    // borderStyle: "solid",
    // shadowColor: "gray",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 8,
    // elevation: 8,
    // marginRight: relativeWidthNum(10),
  },
 
});

