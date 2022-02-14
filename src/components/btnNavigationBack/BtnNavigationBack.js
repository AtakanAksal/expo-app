import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import GoBackPng from "../../../assets/register/gerigitbeyaz.png";
import { relativeHeightNum, relativeWidthNum } from "../../utils/HelperFunctions";

const BtnNavigationBack = ({ handlePress, fromView }) => {
  return (
    <TouchableOpacity style={fromView ? styles.viewBackButton : styles.backButton} onPress={handlePress}>
      <Image style={{ width: relativeWidthNum(30), height: relativeHeightNum(30) }} resizeMode="contain" source={GoBackPng} />
    </TouchableOpacity>
  );
};

export default BtnNavigationBack;

const styles = StyleSheet.create({
  viewBackButton: {
    alignItems: "flex-start",
    padding: 5,
    margin: 5,
    position: "absolute",
    zIndex: 2,
    left: 0,
    // top: 40,
  },

  backButton: {
    alignItems: "flex-start",
    padding: 5,
    margin: 5,
    position: "absolute",
    zIndex: 2,
    left: -20,
    top: 20,
  },
});
