import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import ErrorLogo from "../../../../assets/error-icon.png";

const GenderWarningModal = ({ closePress }) => {
  return (
    <View style={styles.outerModal}>
      <View style={styles.innerModal}>
        <View>
          <Image style={styles.logo} resizeMode="center" source={ErrorLogo} />
        </View>
        <View style={styles.textField}>
          <Text>
            Profilinizi temsil eden ve salondaki hareketinizi canlı gösteren Avatar Modeli cinsiyetinize göre
            eklenmektedir. Salon ziyaretinizde profilinizin görünür veya görünmez olmasını seçebilirsiniz. “Gizli”
            cinsiyet seçilen profilin salondaki hareketi görüntülenmeyecek, sadece etkileşim ve analizlerde
            listelenecektir.
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

export default GenderWarningModal;

const styles = StyleSheet.create({
  innerModal: {
    margin: 45,
    backgroundColor: "#fff",
    height: "60%",
    justifyContent: "center",
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
    color: "#fff",
  },
});
