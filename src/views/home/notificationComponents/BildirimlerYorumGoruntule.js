/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { StyleSheet,Text, View, Image  } from "react-native";
import {transformDateFormatFromIsoToShort} from "../../../utils/HelperFunctions"
import LogoYatay from "../../../../assets/expo_logo_yatay.png";

const BildirimlerYorumGoruntule = ({onProcessItem}) => {
    return(
        <View style={styles.mainFrame}>
           <View style={{justifyContent:'flex-start', alignItems:'center', marginVertical:20, marginHorizontal:40,}}>
                <View style={{marginVertical:20}}><Image style={{height:55, width:150}} source={LogoYatay} resizeMode="contain" /></View>

                <View style={styles.row}>
                  
                 <Text style={styles.textStyle}>Kullanıcı Adı   :</Text>
                 <Text style={styles.textStyle}>{onProcessItem.receiver_user.username}</Text>
            
                </View>
                <View style={styles.row}>
                <Text style={styles.textStyle}>Yayın Türü      :</Text>
                <Text style={styles.textStyle}>{onProcessItem.sender_message_id === 32 ||
                                onProcessItem.sender_message_id === 7
                                  ? "Profil"
                                  : "Stant"}</Text>
                </View>      
                <View style={styles.row}>
                <Text style={styles.textStyle}>Tarih           :</Text>
                <Text style={styles.textStyle}>{transformDateFormatFromIsoToShort(onProcessItem.created_at)}</Text>
                </View>
                <View style={styles.row}>
                <Text style={styles.textStyle}>Yorum           :</Text>
                <Text style={styles.textStyle}>{onProcessItem.sender_message.name}</Text>
                </View>

                
           </View>
        </View>
    )
  }
  export default BildirimlerYorumGoruntule;
  const styles = StyleSheet.create({
      mainFrame: {
        flex:1, justifyContent:'flex-start', alignItems:'center', marginHorizontal:10,
        margin: 20,
    backgroundColor: "white",
    borderRadius: 1,
    
    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5

      },
      row:{
        width:280, marginBottom:10, marginHorizontal:10, flexDirection:"row", justifyContent:'space-between', borderColor:"#6C757D", borderWidth:0.4, padding:10
      }, 
      textStyle: {
        color:'#6C757D',
        fontSize:10,
        flexWrap:'wrap',
        flex:1
      }
  })