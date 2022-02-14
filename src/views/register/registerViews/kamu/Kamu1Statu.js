/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useRegisterValue } from "../../../../contexts/RegisterContext";

import MainLogo from "../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../components/btnNavigationBack/BtnNavigationBack";
import KamuStatuComponent from "../../registerComponents/KamuStatuComponent";

import BtnMain from "../../../../components/btnMain/BtnMain";

import StylesRegister from "../../StylesRegister";
import BackgroundImage from "../../../../../assets/register_background.jpg";


const Kurum1Statu = () => {
  const nav = useNavigation();
  const [, dispatch] = useRegisterValue();

  const [kamuStatu, setKamuStatu] = useState("seciniz");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  /**
  const handleNext = () => {
    dispatch({
      type: "changeRegister",
      newRegister: { kamuTuru: kamuStatu },
    });

    switch (kamuStatu) {
      case "belediye":
        setSelectedPage(2);
        break;

      default:
        setSelectedPage(1);
        break;
    }
  };
   */

  useEffect(() => {
    dispatch({
      type: "changeRegister",
      newRegister: { public_institution_id: kamuStatu },
    });

    switch (kamuStatu) {
      case 1:
        // setSelectedPage(2);++
        nav.navigate("Belediye")
        break;

      case 2:
        // setSelectedPage(7);++
        nav.navigate("Kaymakamlik")
        break;

      case 3:
        // setSelectedPage(8);++
        nav.navigate("Valilik")
        break;

      case 4:
        // setSelectedPage(9);++
        nav.navigate("IlceMudur")
        break;

      case 5:
        // setSelectedPage(10);++
        nav.navigate("IlMudur")
        break;

      case 6:
        // setSelectedPage(11);++
        nav.navigate("BolgeMudur")
        break;

      case 9:
        // setSelectedPage(12);++
        nav.navigate("GenelMudur")
        break;

      case 11:
        // setSelectedPage(13);++
        nav.navigate("Bakanlik")
        break;

      case 12:
        // setSelectedPage(14);++
        nav.navigate("Diger1Statu")
        break;

      default:
        // setSelectedPage(1);
        nav.navigate("Kamu1Statu")
        break;
    }
  }, [kamuStatu]);

  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>

    <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />

      <MainLogo keyboardUp />
      <Text style={StylesRegister.mainText}>Kurumunuzu Tanımaya Başlıyoruz!</Text>

      <View>
        <KamuStatuComponent selectValue={kamuStatu} setSelectValue={setKamuStatu} />
      </View>

      <BtnMain buttonDisabled={buttonDisabled} txt="Kaydet ve İlerle" />
    </View>
    </ImageBackground>
  );
};

export default Kurum1Statu;
