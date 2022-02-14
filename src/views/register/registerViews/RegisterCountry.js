import React, { useState, useEffect, } from "react";
import { StyleSheet, Text, View, Pressable, Modal, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import CountryPicker from "react-native-country-picker-modal";

import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import { useRegisterValue } from "../../../contexts/RegisterContext";

import MainLogo from "../../../components/mainLogo/MainLogo";

import StylesRegister from "../StylesRegister";

import BtnMain from "../../../components/btnMain/BtnMain";
import { useDataCountries } from "../../../helpers/connections";
import BackgroundImage from "../../../../assets/register_background.jpg";

const RegisterCountry = () => {
  const { data, isLoading, isError } = useDataCountries();
  const [selectedCountry, setSelectedCountry] = useState({
    countryid: -1,
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [mVisible, setMVisible] = useState(false);
  const [, dispatch] = useRegisterValue();

  const nav = useNavigation();

  function selectCountry() {
    console.log("ulkeDetay", selectedCountry );
    dispatch({
      type: "changeRegister",
      newRegister: { countryId: selectedCountry.countryid, ulkeDetay: selectedCountry },
    });
        
    //  nav.navigate("FaturaAdresiYabanci"); // alternatif direk route
    nav.navigate("RegisterSelectAccType");
    // if (selectedCountry.countryid === 212) {
    //   nav.navigate("RegisterSelectAccType");
    // } else {
    //   nav.navigate("YabanciMain");
    // }
  }

  useEffect(() => {
    if (selectedCountry.countryid !== -1) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [selectedCountry]);

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />
      <MainLogo />

      <Text style={StylesRegister.mainText}>Ülke Seçin</Text>

      <View style={!(selectedCountry.countryid !== -1)? StylesRegister.pickerContainer:StylesRegister.pickerContainerSelected }>
        {/* <View style={StylesRegister.countryPicker}> */}
          <Picker
            selectedValue={selectedCountry}
            onValueChange={(itemValue) => setSelectedCountry(itemValue)}
            mode="dialog"
            style={StylesRegister.picker}
          >
            <Picker.Item label="Ülke Seçin" value={{ countryid: -1 }} enable={false} />
            {!(isLoading || isError) &&
              data.map((el) => <Picker.Item key={el.countryid} label={el.countryname} value={el} />)}
          </Picker>
          {/**
             *    {!selectedCountry && (
            <Pressable onPress={() => setMVisible(true)}>
              <View style={{ backgroundColor: "#fff", padding: 10 }}>
                <Text style={{ fontSize: 15, color: "#1E1E1C" }}> Ülke Seçin</Text>
              </View>
            </Pressable>
          )}
             * 
             *  <Modal
              transparent
              animationType="fade"
              visible={mVisible}
              onRequestClose={() => {
                setMVisible((prev) => !prev);
              }}
            >
              <CountryModal closePress={() => setMVisible(false)} />
            </Modal> */}
        {/* </View> */}

        {/** 
        

------
            <CountryPicker
              visible={mVisible}
              withFlag
              withFilter
              withCallingCode
              withEmoji
              withCountryNameButton
              countryCode={selectedCountry ? selectedCountry.cca2 : "TR"}
              onSelect={(value) => setSelectedCountry(value)}
              preferredCountries={["TR"]}
              onClose={() => setMVisible(false)}
              onOpen={() => setMVisible(true)}
            />




        */}
      </View>

      <BtnMain buttonDisabled={buttonDisabled} onPress={() => selectCountry()} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>
  );
};

export default RegisterCountry;
/*
const styles = StyleSheet.create({
  flagButton: {
    paddingLeft: 5,
    zIndex: -2,
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
});
*/
