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
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import Yanitla from "../../../../assets/vexmail/yanitla.png";
import KapatTurkuaz from "../../../../assets/vexmail/kapat-turkuaz.png";
import Ilet from "../../../../assets/vexmail/ilet.png";
import Tasi from "../../../../assets/vexmail/tasi.png";
import Sil from "../../../../assets/vexmail/sil.png";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../utils/HelperFunctions";

const ekran = Dimensions.get("screen");
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const EkleModal = ({ setAddModalOpen, index, setCcOpen, setBccOpen,  pickDoc }) => {
  const [bccProfilArray, setBccProfilArray] = useState([]);
  const [searchActive, setSearchActive] = useState(false);
  return (
    <TouchableOpacity
      style={[
        styles.mainFrame,
        { marginTop: relativeHeightNum(46), marginLeft: relativeWidthNum(215) },
      ]}
    >
                 
                <View style={styles.insiderFrame}>
         <TouchableOpacity onPress={()=>{setAddModalOpen(false)}} ><Image style={{height:15, width:15, alignSelf:"flex-end"}} source={KapatTurkuaz} resizeMode="contain" /></TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={()=>{pickDoc(); setAddModalOpen(false)}} >         
          <Text style ={styles.text} >Dosya Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={()=> {setCcOpen(true); setAddModalOpen(false) }}>         
          <Text  style={styles.text}>CC Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={()=>{setBccOpen(true); setAddModalOpen(false)}}>      
          <Text  style={styles.text}>BCC Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={()=>{setBccOpen(true); setAddModalOpen(false)}}>      
          <Text  style={styles.text}>İmza Ekle</Text>
        </TouchableOpacity>
                </View>
             

    </TouchableOpacity>
  );
};

export default EkleModal;

const styles = StyleSheet.create({
  mainFrame: {
 

    height: relativeHeightNum(150),
    width: relativeWidthNum(100),
    backgroundColor: "#FFF",
    borderColor: "#EFEFEF",
    borderWidth: 1,
    borderRadius:10,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  insiderFrame: {
    flex: 1,
    padding: 8,
    justifyContent: "space-around",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color : "#00AA9F",
    fontSize: 14
  }
});
