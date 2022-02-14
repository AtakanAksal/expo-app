import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ImageBackground } from "react-native";

import { useRegisterValue } from "../../../../contexts/RegisterContext";

import MainLogo from "../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../components/btnNavigationBack/BtnNavigationBack";

import TxtMultilineInput from "../../../../components/txtMultilineInput/TxtMultilineInput";
import IlPicker from "../../registerComponents/IlPicker";
import IlcePicker from "../../registerComponents/IlcePicker";
import MahallePicker from "../../registerComponents/MahallePicker";

import BtnMain from "../../../../components/btnMain/BtnMain";

import StylesRegister from "../../StylesRegister";
import BackgroundImage from "../../../../../assets/register_background.jpg";


const Stk2Adress = ({ setSelectedPage }) => {
  const [selectedAdress, setSelectedAdress] = useState(""); //! Typelar null -> string
  const [selectedCity, setSelectedCity] = useState("seciniz");
  const [selectedTown, setSelectedTown] = useState("seciniz");
  const [selectedDistrict, setSelectedDistrict] = useState("seciniz");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [{ register }, dispatch] = useRegisterValue();

  useEffect(() => {
    //! useEffect'e ve BtnDisabled stateine gerek yok
    if (
      selectedCity === "seciniz" ||
      selectedTown === "seciniz" ||
      selectedDistrict === "seciniz" ||
      selectedAdress === ""
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [selectedCity, selectedTown, selectedDistrict, selectedAdress]);

  useEffect(() => {
    setSelectedTown("seciniz");
    setSelectedDistrict("seciniz");
  }, [selectedCity]);

  useEffect(() => {
    setSelectedDistrict("seciniz");
  }, [selectedTown]);

  const handleNext = () => {
    dispatch({
      type: "changeRegister",
      newRegister: { city: selectedCity.cityid, sehirAdi: selectedCity.cityname, town: selectedTown.countyid, district: selectedDistrict, address: selectedAdress },
    });
    setSelectedPage(3);
  };

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => setSelectedPage(1)} fromView />
    <ScrollView>
      <MainLogo keyboardUp />

      <Text style={StylesRegister.mainText}>Çok Az Kaldı!</Text>

      <View>
        <IlPicker selectValue={selectedCity} setSelectValue={setSelectedCity} selectedLocation />
      </View>

      <View>
        <IlcePicker
          selectValue={selectedTown}
          setSelectValue={setSelectedTown}
          selectedLocation={selectedCity}
          cityID={selectedCity === "seciniz" ? 0 : selectedCity.cityid}
        />
      </View>

      <View>
        <MahallePicker
          selectValue={selectedDistrict}
          setSelectValue={setSelectedDistrict}
          selectedLocation={selectedCity && selectedTown}
          countyID={selectedTown === "seciniz" ? 0 : selectedTown.countyid}
        />
      </View>

      <TxtMultilineInput
        writedValue={selectedAdress}
        pickerContent={selectedDistrict}
        onChangeText={setSelectedAdress}
        placeHolder="Adresinizi Yazınız..."
      />
  </ScrollView>
      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>
  );
};

export default Stk2Adress;
