import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

import { useRegisterValue } from "../../../../../contexts/RegisterContext";

import MainLogo from "../../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../../components/btnNavigationBack/BtnNavigationBack";
import TxtFormInput from "../../../../../components/txtFormInput/TxtFormInput";

import BtnMain from "../../../../../components/btnMain/BtnMain";

import StylesRegister from "../../../StylesRegister";
import BackgroundImage from "../../../../../../assets/register_background.jpg";


const Diger2BagliKurum = ({ setSelectedPage }) => {
  const [bagliKurum, setBagliKurum] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [{ register }, dispatch] = useRegisterValue();

  useEffect(() => {
    if (bagliKurum === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [bagliKurum]);

  const handleNext = () => {
    // setToBackPage(SelectedPage);
    dispatch({
      type: "changeRegister",
      newRegister: { kamuBagliOlduguKurumIsim: bagliKurum },
    });

    setSelectedPage(16);
  };

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => setSelectedPage(14)} fromView />

      <MainLogo />
      <Text style={StylesRegister.mainText}>Kurumunuzu Tanımaya Başlıyoruz!</Text>

      <View style={StylesRegister.textContainer}>
        <Text style={StylesRegister.containerText}>{register.kamuStatuIsim}</Text>
      </View>
      <TxtFormInput content="notNull" onChangeText={setBagliKurum} placeHolder="Bağlı Olduğu Kurum..." />
      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
        </ImageBackground>

  );
};

export default Diger2BagliKurum;
