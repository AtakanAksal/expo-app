import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { useRegisterValue } from "../../../../../contexts/RegisterContext";

import MainLogo from "../../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../../components/btnNavigationBack/BtnNavigationBack";

import TxtFormInput from "../../../../../components/txtFormInput/TxtFormInput";

import BtnMain from "../../../../../components/btnMain/BtnMain";

import StylesRegister from "../../../StylesRegister";
import IlPicker from "../../../registerComponents/IlPicker";
import IlcePicker from "../../../registerComponents/IlcePicker";
import BackgroundImage from "../../../../../../assets/register_background.jpg";


const IlceMudur = () => {
  const [selectedCity, setSeletedCity] = useState("seciniz");
  const [selectedTown, setSeletedTown] = useState("seciniz");
  const [kurumName, setKurumName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [, dispatch] = useRegisterValue();
  const nav = useNavigation();

  useEffect(() => {
    if (selectedCity === "seciniz" || selectedTown === "seciniz" || kurumName === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [selectedCity, selectedTown, kurumName]);

  useEffect(() => {
    setSeletedTown("seciniz");
  }, [selectedCity]);

  const handleNext = () => {
    // setToBackPage(SelectedPage);
    dispatch({
      type: "changeRegister",
      newRegister: {
        city: selectedCity.cityid,
        sehirAdi: selectedCity.cityname,
        town: selectedTown.countyid,
        ilceAdi: selectedTown.countyname,
        genelMudurluk: kurumName,
      },
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
        <Text style={StylesRegister.containerText}>İlçe Müdürlüğü</Text>
      </View>
      <View>
        <IlPicker selectValue={selectedCity} setSelectValue={setSeletedCity} selectedLocation />
      </View>
      <View>
        <IlcePicker
          selectValue={selectedTown}
          setSelectValue={setSeletedTown}
          selectedLocation={selectedCity}
          cityID={selectedCity === "seciniz" ? 0 : selectedCity.cityid}
        />
      </View>
      <TxtFormInput
        content={selectedCity === "seciniz" || selectedTown === "seciniz" ? "" : "notNull"}
        writedValue={kurumName}
        onChangeText={setKurumName}
        placeHolder="Kurum İsmini Yazınız..."
      />
      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
     </ImageBackground>
  );
};

export default IlceMudur;
