import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from "react-native";

import { useRegisterValue } from "../../../../contexts/RegisterContext";
import BackButton from "../../../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../../../components/mainLogo/MainLogo";
import TxtFormInput from "../../../../components/txtFormInput/TxtFormInput";

import BtnMain from "../../../../components/btnMain/BtnMain";

import StylesRegister from "../../StylesRegister";
import BackgroundImage from "../../../../../assets/register_background.jpg";


const Kamu3Phone = ({ setSelectedPage, toBackPage }) => {
  const [kurumPhone, setKurumPhone] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [{ register }, dispatch] = useRegisterValue();

  useEffect(() => {
    if (kurumPhone.length >= 1 && kurumPhone.length < 10) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [kurumPhone]);

  const handleNext = () => {
    dispatch({
      type: "changeRegister",
      newRegister: { phonenumberestablishment: kurumPhone },
    });
    setSelectedPage(4);
  };

  // ? state kullansak daha mı iyi olur ??
  let selectorOption;
  if (register.public_institution_id === 1) {
    switch (register.bolge) {
      case 1:
        selectorOption = "belde";
        break;

      case 2:
        selectorOption = "ilce";
        break;

      case 3:
        selectorOption = "il";
        break;

      case 4:
        selectorOption = "buyukSehir";
        break;

      default:
        break;
    }
  } else {
    selectorOption = register.public_institution_id;
  }

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => setSelectedPage(toBackPage)} fromView />

      <MainLogo />
      <Text style={StylesRegister.mainText}>Kurumunuzu Tanımaya Başlıyoruz!</Text>

      <View style={StylesRegister.textContainer}>
        {
          {
            buyukSehir: (
              <Text style={StylesRegister.containerText}>{register.sehirAdi} Büyükşehir Belediyesi</Text>
            ),
            il: <Text style={StylesRegister.containerText}>{register.sehirAdi} Belediyesi</Text>,
            ilce: (
              <Text style={StylesRegister.containerText}>
                {register.ilceAdi} Belediyesi - {register.sehirAdi}
              </Text>
            ),
            belde: (
              <Text style={StylesRegister.containerText}>
                {register.belde} Belediyesi - {register.ilceAdi}/{register.sehirAdi}
              </Text>
            ),
            2: (
              <Text style={StylesRegister.containerText}>
                {register.ilceAdi} Kaymakamlığı - {register.sehirAdi}
              </Text>
            ),
            3: <Text style={StylesRegister.containerText}>{register.sehirAdi} Valiliği</Text>,
            4: (
              <Text style={StylesRegister.containerText}>
                {register.ilceAdi} İlçe {register.genelMudurluk} Müdürlüğü - {register.sehirAdi}
              </Text>
            ),
            5: (
              <Text style={StylesRegister.containerText}>
                {register.sehirAdi} İl {register.genelMudurluk} Müdürlüğü
              </Text>
            ),
            6: (
              <Text style={StylesRegister.containerText}>
                {register.genelMudurluk} Bölge Müdürlüğü - {register.sehirAdi}
              </Text>
            ),
            9: (
              <Text style={StylesRegister.containerText}>
                {register.genelMudurluk} Genel Müdürlüğü - {register.sehirAdi}
              </Text>
            ),
            11: <Text style={StylesRegister.containerText}>{register.bakanlikAdi}</Text>,
            12: (
              <Text style={StylesRegister.containerText}>
                {register.kamuStatuIsim} - {register.sehirAdi}
              </Text>
            ),
          }[selectorOption]
        }
      </View>

      <TxtFormInput
        onFocus={() => setShowInfo(true)}
        onEndEditing={() => setShowInfo(false)}
        content="notNull"
        onChangeText={setKurumPhone}
        placeHolder="Kurum Telefon Numaranızı Giriniz..."
        isPhone
        max10
      />

      {showInfo && (
        <View>
          <Text style={StylesRegister.infoText}>* Alan kodunun başına 0 koymadan ilerleyin</Text>
        </View>
      )}

      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>
  );
};

export default Kamu3Phone;
