import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { useRegisterValue } from "../../../../../contexts/RegisterContext";

import MainLogo from "../../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../../components/btnNavigationBack/BtnNavigationBack";
import AdressSelectComponent from "../../../registerComponents/AdressSelectComponent";
import TxtFormInput from "../../../../../components/txtFormInput/TxtFormInput";

import BtnMain from "../../../../../components/btnMain/BtnMain";

import StylesRegister from "../../../StylesRegister";
import IlPicker from "../../../registerComponents/IlPicker";
import BackgroundImage from "../../../../../../assets/register_background.jpg";


const GenelMudur = () => {
  const [selectedCity, setSeletedCity] = useState("seciniz");
  const [kurumName, setKurumName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [, dispatch] = useRegisterValue();
  const nav = useNavigation();

  useEffect(() => {
    if (selectedCity === "seciniz" || kurumName === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [selectedCity, kurumName]);

  const handleNext = () => {
    // setToBackPage(SelectedPage);
    dispatch({
      type: "changeRegister",
      newRegister: { city: selectedCity.cityid, sehirAdi: selectedCity.cityname, genelMudurluk: kurumName },
    });

    // setSelectedPage(3);
    nav.navigate("AccountInfo")
  };

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />

      <MainLogo keyboardUp />
      <Text style={StylesRegister.mainText}>Kurumunuzu Tanımaya Başlıyoruz!</Text>
      <View style={StylesRegister.textContainer}>
        <Text style={StylesRegister.containerText}>Genel Müdürlük</Text>
      </View>
      <View>
        <IlPicker selectValue={selectedCity} setSelectValue={setSeletedCity} selectedLocation />
      </View>

      <TxtFormInput
        content={selectedCity === "seciniz" ? "" : "notNull"}
        writedValue={kurumName}
        onChangeText={setKurumName}
        placeHolder="Kurum İsmini Yazınız..."
      />
      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>

  );
};
export default GenelMudur;
