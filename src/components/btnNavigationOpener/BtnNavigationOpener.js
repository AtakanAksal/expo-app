import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";

const BtnNavigationOpener = ({ handlePress, imgSrc, txt }) => {
  return (
    <TouchableOpacity style={styles.buttonRow} onPress={handlePress}>
      <Image style={styles.img} resizeMode="center" source={imgSrc} />
      <Text style={styles.txt}>{txt}</Text>
    </TouchableOpacity>
  );
};

export default BtnNavigationOpener;

const styles = StyleSheet.create({
  txt: {
    fontSize: 10,
    color: "#6C757D",
  },
  img: {
    width: "100%",
    height: 80,
  },
  buttonRow: {
    width: "30%",
    margin: 5,
    alignItems: "center",
  
    padding: 10,

    backgroundColor: "white",
  
    justifyContent:"center",
    alignSelf:"center",
  
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});
