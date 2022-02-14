/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableHighlight,
  TextInput
} from "react-native";


import Yanitla from "../../../../assets/vexmail/yanitla.png";
import TumunuYanitla from "../../../../assets/vexmail/tumunu-yanitla.png";
import Ilet from "../../../../assets/vexmail/ilet.png";
import Tasi from "../../../../assets/vexmail/tasi.png";
import Sil from "../../../../assets/vexmail/sil.png";
import { relativeHeightNum, relativeWidthNum} from "../../../utils/HelperFunctions";


const ekran = Dimensions.get("screen");
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const UcNoktaModal = ({ setModalOpenState, index }) => {
 
  const [bccProfilArray, setBccProfilArray] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  return (
    <View style={[styles.mainFrame, {marginTop:relativeHeightNum(190)+index*relativeHeightNum(81)}]}>
      <View style= {styles.insiderFrame}>
     <View style={styles.row} >
     <Image style={{ height: relativeHeightNum(13), width: relativeWidthNum(20), marginRight:relativeWidthNum(12) }} source={Yanitla} resizeMode="contain" />
      <Text>Yanıtla</Text>
      </View>
     <View style={styles.row}>
     <Image style={{ height: relativeHeightNum(13), width: relativeWidthNum(20), marginRight:relativeWidthNum(12) }} source={TumunuYanitla} resizeMode="contain" />
       <Text>Tümünü Yanıtla</Text></View>
     <View style={styles.row}>
     <Image style={{ height: relativeHeightNum(13), width: relativeWidthNum(20), marginRight:relativeWidthNum(12) }} source={Ilet} resizeMode="contain" /><Text>İlet</Text></View>
     <View style={styles.row}>
     <Image style={{ height: relativeHeightNum(13), width: relativeWidthNum(20), marginRight:relativeWidthNum(12) }} source={Tasi} resizeMode="contain" /><Text>Taşı</Text></View>
     <View style={styles.row}>
     <Image style={{ height: relativeHeightNum(13), width: relativeWidthNum(20), marginRight:relativeWidthNum(12) }} source={Sil} resizeMode="contain" /><Text>Sil</Text></View>
      </View>
         
    </View>
  );
};

export default UcNoktaModal;

const styles = StyleSheet.create({
  mainFrame: {   
    marginLeft:relativeWidthNum(188),
     
    height:relativeHeightNum(191),
    width: relativeWidthNum(151),
    backgroundColor: "#FFF",
    borderColor: "#EFEFEF",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    
  },
  insiderFrame: {
    flex:1,
     padding: 8,
    justifyContent:"space-around"
  },
  row: {
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center"
  }
  
});
