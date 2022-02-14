import React,{useEffect, useState} from "react";
import { StyleSheet, Image, Keyboard } from "react-native";
import Expologo from "../../../assets/expo_logo_yatay.png";
import {
  relativeWidthNum,
  relativeHeightNum,
} from "../../utils/HelperFunctions";

const MainLogo = ({keyboardUp}) => {
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardOpened(true));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardOpened(false));

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow", () => setKeyboardOpened(true));
      Keyboard.removeAllListeners("keyboardDidHide", () => setKeyboardOpened(false));
    };
  }, []);

  return <Image style={keyboardUp && keyboardOpened ? styles.logoKeyboard : styles.logo} resizeMode="contain" source={Expologo} />;
};

export default MainLogo;

const styles = StyleSheet.create({
  logoKeyboard: {
    alignSelf:"center",
    width: relativeWidthNum(200),
    height: relativeHeightNum(76),
    marginTop: 0,
  },
  logo: {
    alignSelf:"center",
    width: relativeWidthNum(200),
    height: relativeHeightNum(76),
    marginTop: "20%",
  },
});
