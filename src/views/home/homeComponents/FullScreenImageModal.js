import React from "react";

import { StyleSheet, Image, View, Pressable } from "react-native";

// ? pan özelliği eklenecekW

const FullScreenImageModal = ({ closePress, img }) => {
  console.log(img);
  return (
    <Pressable style={{ flex: 1 }} onPress={closePress}>
      <View style={{ flex: 1, backgroundColor: "#000000" }}>
        <Image source={{ uri: img }} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
      </View>
    </Pressable>
  );
};

export default FullScreenImageModal;

const styles = StyleSheet.create({});
