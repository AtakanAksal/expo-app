import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useNavigation } from '@react-navigation/native';
import { useRegisterValue } from "../../../../../contexts/RegisterContext";

import MainLogo from "../../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../../components/btnNavigationBack/BtnNavigationBack";

import BtnMain from "../../../../../components/btnMain/BtnMain";

import StylesRegister from "../../../StylesRegister";

import { useGetMinistryType } from "../../../../../helpers/connections";
import BackgroundImage from "../../../../../../assets/register_background.jpg";


const Bakanlik = () => {
  const [bakanlik, setBakanlik] = useState("seciniz");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [, dispatch] = useRegisterValue();
  const nav = useNavigation();
  const { data, isLoading, isError } = useGetMinistryType();

  useEffect(() => {
    if (bakanlik === "seciniz") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [bakanlik]);

  const handleNext = () => {
    // setToBackPage(SelectedPage);
    dispatch({
      type: "changeRegister",
      newRegister: { bakanlikType: bakanlik.id, bakanlikAdi: bakanlik.type },
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
        <Text style={StylesRegister.containerText}>Bakanlık</Text>
      </View>
      <View style={StylesRegister.pickerContainer}>
        <Picker
          selectedValue={bakanlik}
          onValueChange={(itemValue) => setBakanlik(itemValue)}
          mode="dialog"
          style={StylesRegister.picker}
        >
          <Picker.Item label="Bakanlık Seçiniz..." value="seciniz" enable={false} />
          {data &&
            data.map((el) => (
              // eslint-disable-next-line react/no-array-index-key
              <Picker.Item key={el.id} label={el.type} value={el} />
            ))}
        </Picker>
      </View>

      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
        </ImageBackground>

  );
};

export default Bakanlik;
