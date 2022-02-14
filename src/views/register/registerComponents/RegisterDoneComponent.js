import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import DoneLogo from "../../../../assets/check-icon.png";

import StylesRegister from "../StylesRegister";
import BackgroundImage from "../../../../assets/register_background.jpg";
import BtnMain from "../../../components/btnMain/BtnMain";

const RegisterDoneComponent = () => {
  // context verileri kontrol edilip servera gönderilecek.
  const nav = useNavigation();
  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <Image style={StylesRegister.logo} resizeMode="center" source={DoneLogo} />
      <Text style={StylesRegister.mainText}>TEBRİKLER</Text>
      <View>
        <Text style={StylesRegister.textDone}>
        E-posta adresinize aktivasyon linki gönderilmiştir. 
Gönderilen link üzerinden şifrenizi oluşturarak
sisteme giriş yapabilirsiniz.
        </Text>
      </View>
    </View>
    
    <BtnMain  onPress={() => {nav.navigate("WelcomePage"); }} txt="Ana Sayfa" />
    </ImageBackground>
  );
};

export default RegisterDoneComponent;
