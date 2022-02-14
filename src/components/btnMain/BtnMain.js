import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, useWindowDimensions } from "react-native";
import { relativeHeightNum, relativeWidthNum } from "../../utils/HelperFunctions";

const BtnMain = ({ buttonDisabled, onPress, txt }) => {
  const window = useWindowDimensions();

  return (
    <View
      style={{
        margin: 10,
        position: "absolute",
        top: window.height - window.height / 10,
       // width: "95%",
        height: relativeHeightNum(40),
        width: relativeWidthNum(280),
        alignSelf: "center",
      }}
    >
      <TouchableOpacity
        style={buttonDisabled ? styles.buttonDisable : styles.button}
        onPress={onPress}
        disabled={buttonDisabled}
      >
        <Text style={buttonDisabled ? styles.buttonTextDisable : styles.buttonText}>{txt}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BtnMain;

const styles = StyleSheet.create({

  button: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00AA9F",
    backgroundColor: "#00AA9F",
    padding: 10,
  },
  buttonDisable: {
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00AA9F",
    padding: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "#fff",
  },
  buttonTextDisable: {
    fontSize: 15,
    color: "#6C757D",
  },
});
