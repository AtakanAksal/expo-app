import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from "react-native";

import { useRegisterValue } from "../../../../../contexts/RegisterContext";

import MainLogo from "../../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../../components/btnNavigationBack/BtnNavigationBack";

import BtnMain from "../../../../../components/btnMain/BtnMain";

import StylesRegister from "../../../StylesRegister";
import IlPicker from "../../../registerComponents/IlPicker";
import BackgroundImage from "../../../../../../assets/register_background.jpg";


const Diger3Sehir = ({ setSelectedPage }) => {
  const [sehir, setSehir] = useState("seciniz");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [{ register }, dispatch] = useRegisterValue();

  useEffect(() => {

    if (sehir === "seciniz") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [sehir]);

  const handleNext = () => {
    // setToBackPage(SelectedPage);
    dispatch({
      type: "changeRegister",
      newRegister: { city: sehir.cityid, sehirAdi: sehir.cityname},
    });

    setSelectedPage(17);
  };

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => setSelectedPage(15)} fromView />

      <MainLogo />
      <Text style={StylesRegister.mainText}>Kurumunuzu Tanımaya Başlıyoruz!</Text>

      <View style={StylesRegister.textContainer}>
        <Text style={StylesRegister.containerText}>{register.kamuStatuIsim}</Text>
      </View>
      <View>
        <IlPicker selectValue={sehir} setSelectValue={setSehir} selectedLocation firstPlaceholder="Bulunduğu İl..." />
      </View>

      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>

  );
};

export default Diger3Sehir;
