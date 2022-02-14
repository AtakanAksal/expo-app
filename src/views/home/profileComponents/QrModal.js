import React from "react";
import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from "react-native";

import qrCode from "../../../../assets/gecici/qrcode.png";

const QrModal = ({ closePress }) => {
  return (
    <Pressable style={{ flex: 1 }} onPress={closePress}>
      <View style={styles.outerModal}>
        <View style={styles.innerModal}>
          <View style={{ flex: 4, justifyContent: "center" }}>
            <Image style={styles.logo} resizeMode="center" source={qrCode} />
          </View>

          <View style={{ flex: 1}}>
            <Text style={{ color: "#5A636B", textAlign:"center" }}>*QR Kodunu Okutarak Beni Rehberinize Ekleyebilirsiniz.</Text>
            <TouchableOpacity onPress={closePress} style={styles.button}>
              <Text style={{ color: "#FFFFFF" }}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default QrModal;

const styles = StyleSheet.create({
  innerModal: {
    margin: 25,
    backgroundColor: "#f1f1f1",
    height: "70%",
    justifyContent: "center",
  },
  outerModal: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#000000a1",
  },

  logo: {
    width: "100%",
    height: "100%",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#00AA9F",
    padding: 10,
    margin: 10,
  },
});
