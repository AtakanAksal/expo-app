/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { View, ImageBackground, Image, Text, TouchableOpacity,  BackHandler,
  Alert, } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
// import RNExitApp from 'react-native-exit-app';

import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../../components/mainLogo/MainLogo";
import ErrorIcon from "../../../../assets/error-icon.png";
import Kapat from "../../../../assets/vexmail/kapat-gri.png";

import BtnMain from "../../../components/btnMain/BtnMain";

import StylesRegister from "../StylesRegister";
import BackgroundImage from "../../../../assets/register_background.jpg";



const Basarisiz = () => {
  const methods = useForm();

  const nav = useNavigation();



  return (
<ImageBackground style={{flex:1}} source={BackgroundImage}>
      <View style={StylesRegister.container}>
        <View style={StylesRegister.top}>
      <View style={StylesRegister.top}><BackButton handlePress={() => nav.goBack()} fromView /></View>
      <TouchableOpacity onPress={()=>{BackHandler.exitApp()}} style={StylesRegister.top}><Image style={StylesRegister.kapat} resizeMode="contain" source={Kapat} /></TouchableOpacity>
      </View>
      {/** console.log("Yabanci1 Render control---")  we have some problemme... */}

      <MainLogo keyboardUp />


<Image style={StylesRegister.errorIcon} resizeMode="contain" source={ErrorIcon} />


  
   <Text style={StylesRegister.basarisizUyariText}>KAYIT AŞAMASI BAŞARISIZ
OLMUŞTUR</Text>

    

      <BtnMain  onPress={()=> {}} txt="Geri Bildirim" />
    </View>



    </ImageBackground> 
  );
};

export default Basarisiz;
