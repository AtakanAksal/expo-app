/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import { useRegisterValue } from "../../../../contexts/RegisterContext";

import MainLogo from "../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../components/btnNavigationBack/BtnNavigationBack";
import StkTypeComponent from "../../registerComponents/StkTypeComponent";
import TxtFormInput from "../../../../components/txtFormInput/TxtFormInput";

import BtnMain from "../../../../components/btnMain/BtnMain";
import StylesRegister from "../../StylesRegister";
import TxtValidationInput from "../../../../components/txtFormInput/TxtValidationInput";
import BackgroundImage from "../../../../../assets/register_background.jpg";


const Stk1StkType = ({ setSelectedPage }) => {
  const [stkType, setStkType] = useState("seciniz");

  const [showInfo, setShowInfo] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const methods = useForm();
  const nav = useNavigation();
  const [, dispatch] = useRegisterValue();

  useEffect(() => {
    if (
      stkType === "seciniz" ||
      Object.keys(methods.formState.errors).length > 0 ||
      methods.getValues("ipnStkName") === ""
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [methods, stkType]);

  const onPress = async (value) => {
    console.log(value);
    dispatch({
      type: "changeRegister",
      newRegister: { stk_tur: stkType, stk_isim: value.ipnStkName, phonenumberestablishment: value.ipnStkPhone },
    });

    setSelectedPage(2);
  };

  const rulesStkname = {
    required: { value: true, message: "Bu alan gerekli." },
  };
  const rulesStkphone = {
    validate: {
      control: () =>
        console.log(methods.register("ipnStkPhone")) || // ? input içeriği silinince state e atmıyor. validation boş ve en ez 10 rakam olmalı
        "Bu alana sadece kuruluş telefon girebilirsiniz",
    },
  };

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />
      <ScrollView>
        <MainLogo />
        <Text style={StylesRegister.mainText}>Kuruluşunuzu Tanımaya Başlıyoruz!</Text>

        <View>
          <StkTypeComponent selectValue={stkType} setSelectValue={setStkType} />
        </View>

        <TxtValidationInput
          content={stkType === "seciniz" ? "" : stkType}
          name="ipnStkName"
          rules={rulesStkname}
          placeHolder="STK İsminizi Yazınız..."
          {...methods}
        />

        <TxtValidationInput
          onFocus={() => setShowInfo(true)}
          onEndEditing={() => setShowInfo(false)}
          content={stkType === "seciniz" ? "" : stkType}
          name="ipnStkPhone"
          // rules={rulesStkphone}
          placeHolder="Kuruluşunuzun Telefon Numaranızı Girin..."
          isPhone
          max10
          {...methods}
        />

        {showInfo && (
          <View>
            <Text style={StylesRegister.infoText}>* Alan kodunun başına 0 koymadan ilerleyin</Text>
          </View>
        )}
      </ScrollView>
      <BtnMain buttonDisabled={buttonDisabled} onPress={methods.handleSubmit(onPress)} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>
  );
};

export default Stk1StkType;
