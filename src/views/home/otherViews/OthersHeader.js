import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";

import GoBackPng from "../../../../assets/go-back.png";
import HomeIcon from "../../../../assets/tabbar/home.png";

const OthersHeader = ({ userName }) => {
  const nav = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        paddingHorizontal: 10,
        backgroundColor: "#FFFFFF",
        margin: 5,
        elevation: 2,
      }}
    >
      <TouchableOpacity style={{ flex: 1, alignItems: "flex-start" }} onPress={() => nav.goBack()}>
        <Image style={{ height: 30, width: 25 }} source={GoBackPng} resizeMode="contain" />
      </TouchableOpacity>
      <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#6C757D", fontSize: 16 }} numberOfLines={1}>
          {userName}
        </Text>
      </View>
      <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }} onPress={() => nav.navigate("HomeStack")}>
        <Avatar rounded source={HomeIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default OthersHeader;

const styles = StyleSheet.create({});
