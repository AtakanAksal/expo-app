/* eslint-disable react-native/no-unused-styles */
import React, {  } from "react";

import {
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity, StyleSheet} from "react-native";
import GoBackPng from "../../../../../assets/forgotpass/go-back-black.png";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../../utils/HelperFunctions";
import Tarih from "../../../../../assets/muhasebe/tarih.png";
import Etkilesim from "../../../../../assets/reklam/etkilesim.png";
import Erisim from "../../../../../assets/muhasebe/erisim.png";
import OzelSalon from "../../../../../assets/muhasebe/ozel-salon-turkuaz.png";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;
const ReklamYayinBilgisi = ({setSelectedComponent}) => {
    return(
      <>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={() =>setSelectedComponent(1)}>
            <Image
              style={{ height: relativeWidthNum(25), width:  relativeWidthNum(25), marginRight:relativeWidthNum(10) }}
              source={GoBackPng}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 15 }}>Muhasebe - Reklam Yayın Bilgisi</Text>
        </View>
      </View>
  
      <View style={styles.container}>
      
      <Text style={{color:"#00AA9F", alignSelf:"center", fontSize:15, marginVertical:relativeHeightNum(20)}}>YAYIN BİLGİSİ</Text>
  
        {/* Row 1 */} 
         
         <View style={styles.roundsRow}> 
        <View style={styles.bigRound}>      
           <Text style={{color:"#00AA9F", fontSize:14}}>1.Yayın</Text>
           <Text style={styles.roundText}>11:00-19:00</Text>
       </View> 
       <View style={styles.bigRound}>      
           <Text style={{color:"#00AA9F", fontSize:14}}>1.Yayın</Text>
           <Text style={styles.roundText}>11:00-19:00</Text>
       </View>
      </View> 
  
       
  
        {/* Row 2 */}
        <View style={styles.roundsRow}> 
        <View style={styles.bigRound}>      
           <Text style={{color:"#00AA9F", fontSize:14}}>1.Yayın</Text>
           <Text style={styles.roundText}>11:00-19:00</Text>
       </View> 
       
      </View> 
  
        {/* Row 3 */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.imageBorderContainer}
            onPress={() => null}
          >
            <Image style={styles.image} source={Erisim} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>123456</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.imageBorderContainer}
            onPress={() => null}
          >
            <Image style={styles.image} source={Etkilesim} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>
            34567
            </Text>
          </TouchableOpacity>
        </View>
  
       {/* Row 4 */}
       <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-around",
            alignContent: "center",
            marginBottom:relativeHeightNum(20)
          }}
        >
          <TouchableOpacity
            style={styles.imageBorderContainer}
            onPress={() => null}
          >
            <Image style={styles.image} source={OzelSalon} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>15</Text>
          </TouchableOpacity>
  
          <TouchableOpacity
            style={styles.imageBorderContainer}
            onPress={() => null}
          >
            <Image style={styles.image} source={Tarih} resizeMode="contain" />
            <Text style={[styles.text, { color: "#6C757D" }]}>
            12.05.2021
            </Text>
          </TouchableOpacity>
        </View>
  
      </View>
    </>
    )
  }
  export default ReklamYayinBilgisi;
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