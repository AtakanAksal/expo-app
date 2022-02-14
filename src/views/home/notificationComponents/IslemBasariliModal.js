import React, { useState, useEffect } from "react";
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
  Modal,
} from "react-native";

import Okundu from "../../../../assets/notification/okundu.png";
import Kapat from "../../../../assets/vexmail/kapat-gri.png";
import Success from "../../../../assets/notification/success.png";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const IslemBasariliModal = ({setOpenIslemBasariliModal, setActiveState}) => {
  

const closeModal = () =>{
  setOpenIslemBasariliModal(false)
  setActiveState("bildirimler-sikayet")

}

return(
    <View style={styles.frame}>
      <View style={styles.innerFrame}>

        <View style={{flexDirection:'row', flex:2, justifyContent:'space-between', alignItems:'center',  borderBottomColorColor: '#00AA9F',  borderWidth: 0.2, }}>
         
     <Text style={{color:'#00AA9F', fontSize:12, fontWeight:'bold', marginLeft:10,   }}>ONAY </Text>
       <TouchableOpacity onPress={closeModal}><Image style={styles.kapaImg} source={Kapat} resizeMode="contain" /></TouchableOpacity>
        </View>


        <View style={{flexDirection:"row", flex:6, justifyContent:'flex-start', alignItems:'center', backgroundColor:'#EFEFEF', }}>
        <Image style={styles.bildirimItemImg} source={Success} resizeMode="contain" />
          <Text style={{color:'#6C757D', fontSize:12}}>İşlem Başarılı</Text>
        </View>

        </View>
    </View>
)
}
export default IslemBasariliModal;
const styles = StyleSheet.create(
  {
    frame : {   height:150,
                width:250,
                backgroundColor:'#FFFFFF',
                marginVertical:HEIGHT/2.19,
                marginHorizontal:WIDTH/6.54,
                borderRadius: 3,
                borderColor: '#00AA9F',
                borderWidth: 0.2,
                borderStyle: 'solid',
                shadowColor: 'gray',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 1,
                shadowRadius: 8,
                elevation: 8,               
    },
    innerFrame : {
      flex:1,
    },
    bildirimItemImg: {
      height:80,
      width:80,
      marginBottom:2,
      marginHorizontal:10,
    },
    kapaImg: {
      height:25,
      width:25,
      marginBottom:2,
      marginHorizontal:10,
    },

  }
)