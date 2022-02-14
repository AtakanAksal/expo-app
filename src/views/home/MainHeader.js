import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GoBackPng from "../../../assets/forgotpass/go-back-black.png";
import HomeIcon from "../../../assets/general/home-null.png";

const MainHeader = ({ text, backBtnFunction }) => {
  const nav = useNavigation();

  const onPressBackBtn = () => {
    if (backBtnFunction) {
      backBtnFunction();
    } else {
      nav.goBack();
    }
  };

  return (
    <View style={styles.headFrame}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <TouchableOpacity onPress={() => onPressBackBtn()}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>{text}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => nav.navigate("HomeStack")}>
            <Image style={{ height: 30, width: 30, marginHorizontal: 10 }} source={HomeIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  headFrame: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
  },
});
