import React from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

import GoBackPng from "../../../assets/go-back-w.png";
import LayerImage from "../../../assets/layer-credit.png";

const CreditCard = () => {
  return (
    <View style={{ backgroundColor: "#07222D", flex: 1 }}>
      <View style={styles.headFrame}>
        <ImageBackground source={LayerImage} resizeMode="cover" style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <TouchableOpacity /* onPress={() => setSelectDocument(0)} */>
              <Image style={{ height: 25, width: 25, margin: 5 }} source={GoBackPng} resizeMode="contain" />
            </TouchableOpacity>
            <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Ödeme Yap</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.container}>
        <ImageBackground source={LayerImage} resizeMode="cover" style={{ flex: 1, padding: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.inputText}>Kart Kullanıcısının Adı Soyadı</Text>
              <TextInput style={styles.input} placeholder="Yazınız" />
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.inputText}>Kart Numarası</Text>
              <TextInput style={styles.input} placeholder="Giriniz" />
            </View>
            <View
              style={{ marginBottom: 15, flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5 }}
            >
              {/* tarih */}
              <View style={{ backgroundColor: "red", flex: 1 }}>
                <Text style={styles.inputText}>Son Kullanma Tarihi</Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ backgroundColor: "yellow", width: "100%", height: 50 }}>
                    <Picker>
                      <Picker.Item label="Büyük" value="" />

                      <Picker.Item key={2} label={"asd"} value={"aaaa"} />
                      <Picker.Item key={3} label={"as3d"} value={"aa3aa"} />
                      <Picker.Item key={4} label={"asd4"} value={"aaaa4"} />
                    </Picker>
                  </View>
                  <View style={{ backgroundColor: "pink", width: 50, height: 50 }}></View>
                </View>
              </View>

              {/* cvc */}
              <View style={{ backgroundColor: "blue", flex: 1, alignItems: "flex-end" }}>
                <View>
                  <Text style={styles.inputText}>Güvenlik Nr</Text>
                  <View style={{ backgroundColor: "purple", width: 100, height: 50 }}></View>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            // onPress={onPress}
          >
            <Text style={styles.buttonText}>Onayla ve Öde</Text>
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.ucBoyut} />
      </View>
    </View>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 5,
    flexDirection: "row",
  },

  headFrame: {
    flexDirection: "row",
    height: 50,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },

  ucBoyut: {
    width: 12,
    height: "100%",
    backgroundColor: "#6C757D",
    borderStyle: "solid",
    borderLeftWidth: 12,
    borderTopWidth: 9,
    borderBottomWidth: 9,

    borderLeftColor: "#6C757D",
    borderTopColor: "#07222D",
    borderBottomColor: "#07222D",
  },

  button: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#00AA9F",
    backgroundColor: "#00AA9F",
    padding: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "#FFFFFF",
  },

  input: {
    color: "#1E1E1C",
    backgroundColor: "#FFFFFF",
    height: 45,
    margin: 5,
    paddingLeft: 10,
    fontSize: 15,
    elevation: 8,
  },
  inputText: {
    marginHorizontal: 5,
    fontSize: 15,
    color: "#FFFFFF",
  },
});
