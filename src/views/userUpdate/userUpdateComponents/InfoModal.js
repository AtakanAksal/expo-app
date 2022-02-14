import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import infoImage from "../../../../assets/info-big.png";

const InfoModal = ({ closePress }) => {
  return (
    <View style={styles.outerModal}>
      <View style={styles.innerModal}>
        <View>
          <Image style={styles.logo} resizeMode="contain" source={infoImage} />
        </View>
        <View style={styles.textField}>
          <Text>
            * Mevcut üyeliğinize ait kullanıcı bilgilerinizi güncelliyorsunuz. Yeni bilgilerinizi girdikten sonra
            tarafınıza gönderilecek olan `Kullanıcı Kayıt Güncelleme Formu` belgesinin doldurarak tarafımıza iletiniz.
          </Text>
        </View>

        <View>
          <TouchableOpacity style={styles.button} onPress={closePress}>
            <Text style={styles.btnText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InfoModal;

const styles = StyleSheet.create({
  innerModal: {
    margin: 45,
    backgroundColor: "#fff",
    height: "50%",
    justifyContent: "center"
  },
  outerModal: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#000000a1",
  },
  textField: {
    margin: 15,
  },
  logo: {
    width: "100%",
    height: 150,
  },
  button: {
    height: 30,
    alignItems: "center",
    backgroundColor: "#00AA9F",
    justifyContent: "center",
    margin: 10,
  },
  btnText: {
    fontSize: 10,
    color: "#fff"
  }
});
