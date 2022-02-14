/* eslint-disable object-shorthand */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity,ImageBackground } from "react-native";

import { useNavigation } from '@react-navigation/native';
import { useRegisterValue } from "../../../../../contexts/RegisterContext";

import MainLogo from "../../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../../components/btnNavigationBack/BtnNavigationBack";
import BelediyePickerComponent from "./BelediyePickerComponent";
import TxtFormInput from "../../../../../components/txtFormInput/TxtFormInput";

import BtnMain from "../../../../../components/btnMain/BtnMain";

import StylesRegister from "../../../StylesRegister";
import BackgroundImage from "../../../../../../assets/register_background.jpg";


const Belediye = () => {
  const [bolge, setBolge] = useState("seciniz");
  const [il, setIl] = useState("seciniz");
  const [ilce, setIlce] = useState("seciniz");
  const [belde, setBelde] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [{ register }, dispatch] = useRegisterValue();
  const nav = useNavigation();

  useEffect(() => {
    switch (bolge) {
      case 4:
        if (il === "seciniz") {
          setButtonDisabled(true);
        } else {
          setButtonDisabled(false);
        }
        break;

      case 3:
        if (il === "seciniz") {
          setButtonDisabled(true);
        } else {
          setButtonDisabled(false);
        }
        break;

      case 2:
        if (il === "seciniz" || ilce === "seciniz") {
          setButtonDisabled(true);
        } else {
          setButtonDisabled(false);
        }
        break;

      case 1:
        if (il === "seciniz" || ilce === "seciniz" || belde === "") {
          setButtonDisabled(true);
        } else {
          setButtonDisabled(false);
        }
        break;

      default:
        setButtonDisabled(true);
        break;
    }
  }, [bolge, il, ilce, belde]);

  useEffect(() => {
    setIlce("seciniz");
  }, [il]);

  const handleNext = () => {
    // setToBackPage(SelectedPage);
    switch (bolge) {
      case 4:
        dispatch({
          type: "changeRegister",
          newRegister: { bolge: bolge, city: il.cityid, sehirAdi: il.cityname },
        });
        // setSelectedPage(3);
        nav.navigate("AccountInfo")
        break;

      case 3:
        dispatch({
          type: "changeRegister",
          newRegister: { bolge: bolge, city: il.cityid, sehirAdi: il.cityname },
        });
        // setSelectedPage(3);
        nav.navigate("AccountInfo")
        break;

      case 2:
        dispatch({
          type: "changeRegister",
          newRegister: {
            bolge: bolge,
            city: il.cityid,
            sehirAdi: il.cityname,
            town: ilce.countyid,
            ilceAdi: ilce.countyname,
          },
        });
        // setSelectedPage(3);
        nav.navigate("AccountInfo")
        break;

      case 1:
        dispatch({
          type: "changeRegister",
          newRegister: {
            bolge: bolge,
            city: il.cityid,
            sehirAdi: il.cityname,
            town: ilce.countyid,
            ilceAdi: ilce.countyname,
            belde: belde,
          },
        });
        // setSelectedPage(3);
        nav.navigate("AccountInfo")
        break;

      default:
        break;
    }
  };

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() =>  nav.goBack()} fromView />

      <MainLogo keyboardUp />
      <Text style={StylesRegister.mainText}>Kurumunuzu Tanımaya Başlıyoruz!</Text>

      <View style={StylesRegister.textContainer}>
        <Text style={StylesRegister.containerText}>Belediye</Text>
      </View>

      <BelediyePickerComponent bolge={bolge} setBolge={setBolge} il={il} setIl={setIl} ilce={ilce} setIlce={setIlce} />

      {bolge === 1 && (
        <TxtFormInput
          content={il === "seciniz" || ilce === "seciniz" ? "" : "notNull"}
          writedValue={belde}
          onChangeText={setBelde}
          placeHolder="Belde İsmini Yazınız..."
        />
      )}

      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>
  );
};

export default Belediye;
