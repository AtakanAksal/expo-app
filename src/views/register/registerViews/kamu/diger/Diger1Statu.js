import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { useRegisterValue } from "../../../../../contexts/RegisterContext";

import MainLogo from "../../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../../components/btnNavigationBack/BtnNavigationBack";
import TxtFormInput from "../../../../../components/txtFormInput/TxtFormInput";

import BtnMain from "../../../../../components/btnMain/BtnMain";

import StylesRegister from "../../../StylesRegister";
import BackgroundImage from "../../../../../../assets/register_background.jpg";


const Diger1Statu = () => {
  const [kurumStatu, setKurumStatu] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [, dispatch] = useRegisterValue();
  const nav = useNavigation();

  useEffect(() => {
    if (kurumStatu === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [kurumStatu]);

  const handleNext = () => {
    // setToBackPage(SelectedPage);
    dispatch({
      type: "changeRegister",
      newRegister: { kamuStatuIsim: kurumStatu },
    });

    // setSelectedPage(15);
    nav.navigate("AccountInfo")
  };

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />

      <MainLogo />
      <Text style={StylesRegister.mainText}>Kurumunuzu Tanımaya Başlıyoruz!</Text>
      <View style={StylesRegister.textContainer}>
        <Text style={StylesRegister.containerText}>Diğer</Text>
      </View>
      <TxtFormInput content="notNull" onChangeText={setKurumStatu} placeHolder="Kurum Statü..." />
      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>

  );
};

export default Diger1Statu;
