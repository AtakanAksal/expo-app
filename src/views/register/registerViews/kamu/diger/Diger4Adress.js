import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from "react-native";

import { useRegisterValue } from "../../../../../contexts/RegisterContext";
import TxtMultilineInput from "../../../../../components/txtMultilineInput/TxtMultilineInput";

import MainLogo from "../../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../../components/btnNavigationBack/BtnNavigationBack";

import BtnMain from "../../../../../components/btnMain/BtnMain";

import StylesRegister from "../../../StylesRegister";
import BackgroundImage from "../../../../../../assets/register_background.jpg";


const Diger4Adress = ({ setSelectedPage, setToBackPage, SelectedPage }) => {
  const [adress, setAdress] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [{ register }, dispatch] = useRegisterValue();

  useEffect(() => {
    if (adress === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [adress]);

  const handleNext = () => {
    setToBackPage(SelectedPage);
    dispatch({
      type: "changeRegister",
      newRegister: { address: adress },
    });

    setSelectedPage(3);
  };

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => setSelectedPage(16)} fromView />

      <MainLogo />
      <Text style={StylesRegister.mainText}>Kurumunuzu Tanımaya Başlıyoruz!</Text>

      <View style={StylesRegister.textContainer}>
        <Text style={StylesRegister.containerText}>
          {register.kamuStatuIsim} - {register.sehirAdi}
        </Text>
      </View>

      <TxtMultilineInput content="notNull" onChangeText={setAdress} placeHolder="Adresinizi Yazınız..." />

      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
        </ImageBackground>

  );
};

export default Diger4Adress;
