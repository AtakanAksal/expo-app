/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { StyleSheet,Text, View, Image  } from "react-native";
import OzelFuarTurkuaz from "../../../../assets/notification/ozel-fuar-turkuaz.png";
import SalonTurkuaz from "../../../../assets/notification/salon-turkuaz.png";
import StantTurkuaz from "../../../../assets/notification/stant-turkuaz.png";
import StantKonum from "../../../../assets/notification/konum-turkuaz.png";

const YayinBilgisi = () => {
    return(
        <View style={styles.mainFrame}>
              <View style={{justifyContent:'center', paddingVertical:24, alignItems:'center', borderBottomColor:'#6C757D', borderBottomWidth:0.17, }}>
               <Text style={{fontSize:15, color:'#00AA9F', }}>YAYIN BİLGİSİ</Text>
               </View>

             <View style={styles.row}>
           <Image style={{height:47, width:47}} source={OzelFuarTurkuaz} resizeMode="contain" />
          <Text style={styles.textStyle}>Kahramanmaraş İl Sağlık Müdürlüğü Sağlıkcılar Fuarı</Text>
             </View>

             <View style={styles.row}>
             <View><Image style={{height:47, width:47}} source={SalonTurkuaz} resizeMode="contain" /></View>
             <View><Text style={styles.textStyle}>Telmessos Antik Kenti</Text></View>
             </View>

             <View style={styles.row}>
             <View><Image style={{height:47, width:47}} source={StantTurkuaz} resizeMode="contain" /></View>
             <View><Text style={styles.textStyle}>Xanthos</Text></View>
             </View>

             <View style={styles.row}>
             <View><Image style={{height:47, width:47}} source={StantTurkuaz} resizeMode="contain" /></View>
             <View><Text style={styles.textStyle}>A1</Text></View>
             </View>

             <View style={styles.row}>
             <View><Image style={{height:47, width:47}} source={StantKonum} resizeMode="contain" /></View>
             <View><Text style={styles.textStyle}>16-19.04.2021</Text></View>
             </View>

        </View>
    )
  }
  export default YayinBilgisi;
  const styles = StyleSheet.create({
      row:{
       paddingVertical:10, paddingLeft:15, flexDirection:"row",  justifyContent:'flex-start', alignItems:'center', borderBottomColor:'#6C757D', borderBottomWidth:0.17,  
      }, 
      textStyle: {
        color:'#6C757D',
        fontSize:12,
        margin:10, 
        flexWrap:'wrap',
        flex:1
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