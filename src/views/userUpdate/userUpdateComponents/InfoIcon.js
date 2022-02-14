import React from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import InfoImage from "../../../../assets/info-small.png";

const InfoIcon = ({ setModalVisible }) => {
  return (
    <View style={styles.info}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image resizeMode="cover" source={InfoImage} />
      </TouchableOpacity>
    </View>
  );
};

export default InfoIcon;

const styles = StyleSheet.create({
  info: {
    position: "absolute",
    zIndex: 2,
    right: "5%",
    bottom: 7, // kullanılan png nin çevçevesinden dolayı. düzentilecek
  },
});
