import React, {useState} from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet, Dimensions, FlatList  } from "react-native";

import GoBackPng from "../../../../assets/forgotpass/go-back-black.png";

import YayinBekleyenIcon from "../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
import YayinBekleyenGriIcon from "../../../../assets/stant/stant-cerceve-gri.png";
import YayinBitenIcon from "../../../../assets/stant/stant-cerceve-yayin-biten.png";
import YayindaIcon from "../../../../assets/stant/stant-cerceve-yayinda.png";
import RateIcon from "../../../../assets/vex-rate.png";


const WIDTH_WINDOW = Dimensions.get("window").width;
const StantSeciniz = ({setActiveState}) => {
  
  
  

    const MainStantSelection = () =>(
      <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => setActiveState("bildirimler-davet-stantseciniz-yayındakiler")}>
          <Image style={styles.image} source={YayindaIcon} resizeMode="contain" />
          <Text style={[styles.text, { color: "#28A745" }]}>Yayında</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={() => setActiveState("bildirimler-davet-stantseciniz-yayınbekleyen")}>
          <Image style={styles.image} source={YayinBekleyenIcon} resizeMode="contain" />
          <Text style={[styles.text, { color: "#17A2B8" }]}>Yayın Bekleyen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageContainer} onPress={() => setActiveState("bildirimler-davet-stantseciniz-yayınıbiten")}>
          <Image style={styles.image} source={YayinBitenIcon} resizeMode="contain" />
          <Text style={[styles.text, { color: "#FF0000" }]}>Yayını Biten</Text>
        </TouchableOpacity>
      </View>
    </>
    )
  return (
    <MainStantSelection />
  );
}
  export default StantSeciniz
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    imageContainer: {
      width: WIDTH_WINDOW / 3,
      height: WIDTH_WINDOW / 3,
      backgroundColor: "#FFFFFF",
      borderWidth: 0.5,
      borderColor: "#c1c1c1",
      justifyContent: "center",
      elevation: 6,
    },
    
    image: {
      width: "60%",
      height: "60%",
      alignSelf: "center",
    },
    
    text: {
      alignSelf: "center",
    },
  
   
  });
  