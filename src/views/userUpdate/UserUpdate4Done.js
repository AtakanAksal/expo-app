import React from "react";
import { Text, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DoneLogo from "../../../assets/done-icon.png";

import BtnMain from "../../components/btnMain/BtnMain";

import StylesUserUpdate from "./StylesUserUpdate";

const UserUpdate4Done = () => {
  const nav = useNavigation();

  const handlePress = () => {
    console.log("form gönderild.");
    nav.goBack();
  };

  return (
    <View style={StylesUserUpdate.container}>
      <View style={{ alignItems: "center" }}>
        <Image style={StylesUserUpdate.logo} resizeMode="center" source={DoneLogo} />
      </View>

      <Text style={StylesUserUpdate.mainText}>FORM GÖNDERİLDİ</Text>
      <Text style={StylesUserUpdate.longText}>Talebiniz incelenmesi için `Kayıt Güncelleme Formu` Yeni belirtmiş olduğunuz mail adresinize iletilmiştir.
        Olumlu değerlendirilmesi neticesinde tarafınıza ilgili güncelleme şifreleri gönderilecektir.</Text>

      <BtnMain buttonDisabled={false} onPress={handlePress} txt="Ana Sayfa" />

    </View>
  );
};

export default UserUpdate4Done;

