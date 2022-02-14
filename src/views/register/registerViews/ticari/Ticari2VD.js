import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ImageBackground } from "react-native";

import { useRegisterValue } from "../../../../contexts/RegisterContext";

import MainLogo from "../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../components/btnNavigationBack/BtnNavigationBack";
import VdComponent from "../../registerComponents/VdComponent";
import TxtFormInput from "../../../../components/txtFormInput/TxtFormInput";

import BtnMain from "../../../../components/btnMain/BtnMain";
import StylesRegister from "../../StylesRegister";
import BackgroundImage from "../../../../../assets/register_background.jpg";

const Ticari2VD = ({ setSelectedPage }) => {
  const [vd, setVd] = useState("seciniz");
  const [vdNo, setVdNo] = useState("");
  const [, dispatch] = useRegisterValue();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleNext = () => {
    dispatch({
      type: "changeRegister",
      newRegister: { vergiDairesi: vd.id, vergiNo: vdNo },
    });

    setSelectedPage(3);
  };

  useEffect(() => {
    if (vd === "seciniz" || vdNo === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [vd, vdNo]);

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => setSelectedPage(1)} fromView />
      <ScrollView>
        <MainLogo />
        <Text style={StylesRegister.mainText}>Şirketinizi Tanımamıza Birkaç Adım Kaldı!</Text>

        <View>
          <VdComponent selectValue={vd} setSelectValue={setVd} />
        </View>

        <TxtFormInput pickerContent={vd} onChangeText={setVdNo} placeHolder="Vergi Numarasını Yazınız..." />
      </ScrollView>
      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>
  );
};

export default Ticari2VD;
