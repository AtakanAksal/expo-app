/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { StyleSheet,Text, View, Image, Dimensions  } from "react-native";
import {transformDateFormatFromIsoToShort} from "../../../utils/HelperFunctions"
import LogoYatay from "../../../../assets/expo_logo_yatay.png";

const { width, height } = Dimensions.get('window');
const BildirimlerSikayetGoruntule = ({onProcessItem}) => {
    return(
        <View style={styles.mainFrame}>
           <View style={{}}>
                  <View style={{marginVertical:20,  alignItems:'center',}}>
                  <Image style={{height:55, width:150}} source={LogoYatay} resizeMode="contain" />
                  </View>

                <View style={styles.row}>                 
                 <Text style={styles.textStyle}>Kullanıcı Adı   :</Text>
                 <Text style={styles.textStyle}>{onProcessItem.receiver_user.username}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.textStyle}>Yayın Türü      :</Text>
                <Text style={styles.textStyle}> {onProcessItem.sender_message_id === 32 ||
                                onProcessItem.sender_message_id === 7
                                  ? "Profil"
                                  : "Stant"}</Text>
                </View>      
                <View style={styles.row}>
                <Text style={styles.textStyle}>Tarih                :</Text>
                <Text style={styles.textStyle}> {transformDateFormatFromIsoToShort(onProcessItem.created_at)} </Text>
                </View>
                <View style={[styles.row, {flexWrap:'wrap'}]}>
                  
                <Text style={styles.textStyle}>Yorum            :</Text>
                <Text style={styles.textStyle}> {onProcessItem.notifiable.description} </Text>
              
                </View>

                
           </View>
        </View>
    )
  }
  export default BildirimlerSikayetGoruntule;
  const styles = StyleSheet.create({
      row:{
         marginBottom:10, marginHorizontal:10, flexDirection:"row", backgroundColor:'white', justifyContent:'space-between',  borderColor:'#6C757D', borderWidth:0.2,  
      }, 
      textStyle: {
        color:'#6C757D',
        fontSize:10,
        margin:10, 
     },
     mainFrame : {
      margin: 20,
      backgroundColor: "white",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  
  })