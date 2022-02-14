import React, { useState } from "react";
import { Text, View, TextInput, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRegisterValue } from "../../../../contexts/RegisterContext";

import MainLogo from "../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../components/btnNavigationBack/BtnNavigationBack";
import TxtMultilineInput from "../../../../components/txtMultilineInput/TxtMultilineInput";

import BtnMain from "../../../../components/btnMain/BtnMain";

import StylesRegister from "../../StylesRegister";
import BackgroundImage from "../../../../../assets/register_background.jpg";
import { useGetWorldCities } from "../../../../helpers/registerConnection";
import YabanciIlPicker from "../../registerComponents/YabanciIlPicker";
import { relativeHeightNum, relativeWidthNum } from "../../../../utils/HelperFunctions";


const Yabanci2Adress = () => {
  const [{register}, dispatch] = useRegisterValue();
  const nav = useNavigation();
  const [selectedCity, setSelectedCity] = useState("seciniz");
  const [adress, setAdress] = useState("");


   console.log(selectedCity);
  const { data, isLoading, isError } = useGetWorldCities(register.ulkeDetay.countryname);
  const handleNext = () => {
    dispatch({
      type: "changeRegister",
      newRegister: {
         city: selectedCity.id,
         cityName:selectedCity.city,
         address: adress
         },
    });

    nav.navigate("Phone"); 
    };

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
    <BackButton handlePress={() => nav.goBack()} fromView />
    <ScrollView>
      <MainLogo />

      <Text style={StylesRegister.mainText}>Çok Az Kaldı!</Text>
      <YabanciIlPicker selectValue={selectedCity} setSelectValue={setSelectedCity} selectedCountry={register.ulkeDetay.countryname} />

      <TxtMultilineInput content="notNull" onChangeText={setAdress} pickerContent={selectedCity} placeHolder="Adresinizi Yazınız..." />
{ !(adress === "") &&     <TouchableOpacity style={{alignSelf:"flex-end", marginRight: relativeWidthNum(57),  marginTop: relativeHeightNum(29)}} onPress={()=> nav.navigate("FaturaAdresiYabanci")}><Text style={{fontSize:11, fontStyle:"italic", color:"#6C757D" }}>Fatura için Farklı Adres Kullan</Text></TouchableOpacity>     
}  
    </ScrollView>
      <BtnMain buttonDisabled={adress === ""} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>

  );
};

export default Yabanci2Adress;
