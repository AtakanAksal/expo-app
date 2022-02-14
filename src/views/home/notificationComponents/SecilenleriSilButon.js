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


const SecilenleriSilButon = ({setOpenModal}) =>{

    const secileniSil = () => {
        setOpenModal(true)
    }
    return(
        <View style={styles.silButon}>
        <TouchableOpacity onPress={secileniSil}>
            <Text style={styles.text}>
                Seçilenleri Sil
            </Text>
        </TouchableOpacity>

        



        </View>
    )
}
export default SecilenleriSilButon;
const styles = StyleSheet.create(
    {
       silButon : {           
            marginVertical:20,
           backgroundColor:'#00AA9F',
           justifyContent: 'center',
           alignItems: 'center',
           paddingVertical:8


       },
       text : {
           color:'white',
           fontSize:15,
           marginVertical:7
       }
    }
)