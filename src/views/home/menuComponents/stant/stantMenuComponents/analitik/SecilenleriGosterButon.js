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
import { relativeHeightNum } from "../../../../../../utils/HelperFunctions";


const SecilenleriGosterButon = ({secileniFiltrele}) =>{

    
    return(
        <View style={styles.gosterButon}>
        <TouchableOpacity onPress={secileniFiltrele}>
            <Text style={styles.text}>
                Seçilenleri Göster
            </Text>
        </TouchableOpacity>
        </View>
    )
}
export default SecilenleriGosterButon;
const styles = StyleSheet.create(
    {
       gosterButon : {           
            marginVertical:20,
           backgroundColor:'#00AA9F',
           justifyContent: 'center',
           alignItems: 'center',
           paddingVertical:6,
           height:relativeHeightNum(30)


       },
       text : {
           color:'white',
           fontSize:12,
           marginVertical:7
       }
    }
)