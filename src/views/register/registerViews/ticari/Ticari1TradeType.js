import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useRegisterValue } from "../../../../contexts/RegisterContext";

import MainLogo from "../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../components/btnNavigationBack/BtnNavigationBack";
import TradeTypeComponent from "../../registerComponents/TradeTypeComponent";
import TxtFormInput from "../../../../components/txtFormInput/TxtFormInput";

import BtnMain from "../../../../components/btnMain/BtnMain";
import StylesRegister from "../../StylesRegister";
import BackgroundImage from "../../../../../assets/register_background.jpg";


const Ticari1TradeType = ({ setSelectedPage }) => {
  const nav = useNavigation();
  const [, dispatch] = useRegisterValue();
  const [tradeType, setTradeType] = useState("seciniz");
  const [tradeTitle, setTradeTitle] = useState("");
  const [tradePhone, setTradePhone] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleNext = () => {
    dispatch({
      type: "changeRegister",
      newRegister: { company_type: tradeType.id, ticariUnvan: tradeTitle, phonenumberestablishment: tradePhone },
    });

    setSelectedPage(2);
  };

  useEffect(() => {
    if (tradeType === "seciniz" || (tradePhone.length >= 1 && tradePhone.length < 10) || tradeTitle === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [tradeType, tradeTitle, tradePhone]);

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>

    <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />
      <ScrollView>
        <MainLogo />
        <Text style={StylesRegister.mainText}>Şirketinizi Tanımaya Başlıyoruz!</Text>

        <View>
          <TradeTypeComponent selectValue={tradeType} setSelectValue={setTradeType} />
        </View>

        <View>
          <TxtFormInput
            content={tradeType === "seciniz" ? "" : tradeType}
            onChangeText={setTradeTitle}
            placeHolder="Ticari Ünvanınızı Giriniz..."
          />
          <TxtFormInput
            onFocus={() => setShowInfo(true)}
            onEndEditing={() => setShowInfo(false)}
            content={(tradeType === "seciniz" ? "" : tradeType) && tradeTitle}
            onChangeText={setTradePhone}
            placeHolder="Şirket Telefon Numaranızı Girin..."
            isPhone
            max10
          />
        </View>

        {showInfo && (
          <View>
            <Text style={StylesRegister.infoText}>* Alan kodunun başına 0 koymadan ilerleyin</Text>
          </View>
        )}
      </ScrollView>
      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>
  );
};

export default Ticari1TradeType;
