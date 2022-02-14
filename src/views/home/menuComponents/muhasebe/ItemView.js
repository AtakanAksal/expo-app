/* eslint-disable react-native/no-unused-styles */
import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
  Platform,
  Dimensions
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  relativeHeightNum,
  relativeWidthNum,
  transformDateFormatFromIsoToShort,
  transformDateFormatToDDMMYYYY,
} from "../../../../utils/HelperFunctions";
import ContentOpenIcon from "../../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../../assets/vexmail/icerik-kapa.png";
import Tarih from "../../../../../assets/muhasebe/tarih.png";
import ExpandableItemView from "./ExpandableItemView";
import Search from './Search';


const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;
const dummyArray = [
  {
    id: "1",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "2",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "3",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "4",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "5",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "6",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "7",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "8",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "9",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
  {
    id: "10",
    value:
      "Lorem Ipsum is simply dummy text of the printing and typesetting.jpg",
  },
];


const ItemView = ({ value, listItems, setListItems,  filterPayloads, setFilterPayloads  }) => {
    const [contentOpen, setContentOpen] = useState(false);

    // Gelen value değeri Seri No, Hizmet Kodu gibi filtreleme itemları
  
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [filteredData, setFilteredData] = useState(listItems);
    const [choosenValue, setChoosenValue] = useState("");
    const [dateIsLoaded, setDateIsLoaded] = useState(false)
   
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      // console.log(currentDate);
      console.log(date);
      addToFilterPayloads();  
      setDateIsLoaded(true) 
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
  
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    const addToFilterPayloads = () => {
      console.log(value);
     // setChoosenValue(String(expandableItemText(value, item)) );
       setFilterPayloads((prev)=>[...prev, {[value] : date}]);
     }
  
  // Tarih itemların view edilmesi
    if(value.includes("Tarih")){
     return(
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
          <View>
            <Text style={{ fontSize: 15, color: "#6C757D" }}>{dateIsLoaded? transformDateFormatFromIsoToShort(String(date))  : value}</Text> 
          </View>
          <View>
            {/* Tarih */}
            <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
              <TouchableOpacity onPress={()=>{showDatepicker()}}>
              <Image
                style={{
                  height: relativeWidthNum(25),
                  width: relativeWidthNum(25),
                  marginRight: 5,
                }}
                source={ Tarih}
                resizeMode="contain"
              />
              </TouchableOpacity>
            </View>
            
            <View>        
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour
            display="default"
            onChange={onChange}
          />
        )}
      </View>
  
          </View>
        </View>
      </View>
     )
    }
  
    // Tarihsiz Itemların View edilmesi
    return (
      <View
        style={{
          //   width: WIDTH_WINDOW - 50,
          //   height: contentOpen ? 180 : 80, // contentOpen ? 80 : 180
          marginHorizontal: relativeWidthNum(10),
          // elevation: 6,
          // backgroundColor: "#FFFFFF",
          // borderBottomColor: "#c1c1c1",
          // borderBottomWidth: 0.5,
          justifyContent: "flex-start",
        }}
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
          <View style={{flex:1}}>
            {/* <Text style={{ fontSize: 15, color: "#6C757D" }}>{value}</Text>  */}
            <Search  filteredData={filteredData}  setFilteredData={setFilteredData} listItems={listItems} setListItems={setListItems} value={value} setContentOpen={setContentOpen} choosenValue={choosenValue} />
          </View>
          <View>
            {/* yukarı aşağı ok  */}
            <Pressable style={{ justifyContent: "center", alignItems: "flex-start" }} onPress={() => setContentOpen((prevState) => !prevState)} >
              <Image
                style={{
                  height: relativeWidthNum(25),
                  width: relativeWidthNum(25),
                  marginRight: 5,
                }}
                source={ (contentOpen ? ContentCloseIcon : ContentOpenIcon)}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
        {/* itemların altında açılan info tab ı */}
        {contentOpen && (
          <View>
            {/* <Text>Deneme</Text> */}
            <FlatList
              data={filteredData} // listItems örneğin Seri No sekmesi içinde listelenecek array
              //   onEndReached={() => getData()} bu method ana componentte active state e uygun get methodunu çağıracak
              renderItem={({ item, index }) => (
                <ExpandableItemView item={item} value={value} filterPayloads={filterPayloads} setFilterPayloads={setFilterPayloads} setChoosenValue={setChoosenValue} /> // value={item.value} 
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false} // 
            />
          </View>
        )}
      </View>
    );
  };
  export default ItemView;
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // marginHorizontal:Math.trunc( WIDTH_WINDOW*15/360 ),
    // marginVertical: Math.trunc( HEIGHT_WINDOW*50/360 )
    // alignItems: "center",
 
  },
  headFrame: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: relativeWidthNum(94),
    height: relativeWidthNum(94),
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#707070",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
    
  },
  imageBorderContainer: {
    width: relativeWidthNum(94),
    height: relativeWidthNum(94),
    backgroundColor: "#FFFFFF",
    borderWidth: 0.2,
    borderColor: "#707070",
    justifyContent: "center",
    alignSelf: "center",
    
    
  },
  image: {
    width: "60%",
    height: "60%",
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
    fontSize: 10,
  },
  textComman: {
    fontSize: 10,
    color: "#6C757D",
    paddingVertical: 13,
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderColor: "#c1c1c1",
    borderBottomWidth: 0.5,
    // borderColor: "#707070",
    //  borderWidth: 0.2,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    paddingBottom: 0.2,
  },
  mainButton: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    width: WIDTH_WINDOW - 30,
    height: 45,
    backgroundColor: "#00AA9F",
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
  },
  roundsRow : {
    // marginTop:10, 
     alignItems:"center",
     flex:1,
      width:'100%', 
      flexDirection:"row",
       justifyContent:"space-around", 
   },
   box: {
    width:relativeWidthNum(60),
    height:relativeWidthNum(60),
    borderColor:"#707070",
    borderWidth:0.2,
    justifyContent:"center",
    alignItems:"center"
   },
   round: {
     width:relativeWidthNum(90),
     height:relativeHeightNum(60),
     borderColor:"#707070",
     borderWidth:0.2,
     justifyContent:"center",
     alignItems:"center",
     borderRadius:10
    },
    bigRound: {
     width:relativeWidthNum(121),
     height:relativeHeightNum(75),
     borderColor:"#707070",
     borderWidth:0.2,
     justifyContent:"center",
     alignItems:"center",
     borderRadius:15
    },
   boxText : {
     color: "#6C757D",
     fontSize:10
   },
   roundText : {
     color: "#6C757D",
     fontSize:12
   }, 
});