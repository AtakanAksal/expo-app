/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  ImageBackground,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useForm } from "react-hook-form";

import { useNavigation } from '@react-navigation/native';
import { useRegisterValue } from "../../../contexts/RegisterContext";
import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../../components/mainLogo/MainLogo";

import SozlesmelerModal from "./SozlesmelerModal";

import BtnMain from "../../../components/btnMain/BtnMain";
import TxtValidationInput from "../../../components/txtFormInput/TxtValidationInput";
import {
  checkEmail,
  checkUserExists,
  newRegister,
} from "../../../helpers/connections";
import StylesRegister from "../StylesRegister";
import BackgroundImage from "../../../../assets/register_background.jpg";

const Password = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [sozlesmeChecked, setSozlesmeChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [openSozlesme, setOpenSozlesme] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const methods = useForm();
  const [{ register }, dispatch] = useRegisterValue();
  const nav = useNavigation();
  const postData = new FormData();

  // useEffect(() => {
  //   if (Object.keys(methods.formState.errors).length > 0 || !sozlesmeChecked) {
  //     setButtonDisabled(true);
  //   } else {
  //     setButtonDisabled(false);
  //   }
  // }, [sozlesmeChecked, methods.formState]);

  // useEffect(() => {
  //   if (Object.keys(methods.formState.errors).length > 0) {
  //     setOpenSozlesme(false);
  //   } else {
  //     setOpenSozlesme(true);
  //   }
  // }, [methods.formState]);

  const onPress = async (data) => {
    dispatch({
      type: "changeRegister",
      newRegister: { "password": data.ipnPass1 }
    });

  nav.navigate("Pin")
  };





  const rulesPassword = {
    minLength: { value: 6, message: "En az 6 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
      message:
        "Şifreniz en az 6 karakterden oluşmalı, içinde en az bir adet büyük harf, küçük harf ve rakam yer almalıdır.",
    },
  };

  const rulesPass2 = {
    // minLength: { value: 6, message: "En az 6 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
    validate: { samePass: (v) => v === methods.watch("ipnPass1") || "Parololar uyuşmuyor." },
  };


  return (
    <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
      <View style={StylesRegister.container}>
        <BackButton handlePress={() => nav.goBack()} fromView />
        <ScrollView keyboardShouldPersistTaps="handled">
          <MainLogo keyboardUp />
          <Text style={StylesRegister.mainText}>Şifrenizi Oluşturun</Text>

          <View>
        

        
          <TxtValidationInput
            // content={
            //   (typeof methods.watch("ipnEmail") === "undefined" ? "" : methods.watch("ipnEmail")) &&
            //   (typeof methods.watch("ipnUserName") === "undefined" ? "" : methods.watch("ipnUserName"))
            // }
            name="ipnPass1"
            rules={rulesPassword}
            placeHolder="Şifre"
            longInfoText
            isPass
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            {...methods}
          />

          <TxtValidationInput
            content={
              // (typeof methods.watch("ipnEmail") === "undefined" ? "" : methods.watch("ipnEmail")) &&
              // (typeof methods.watch("ipnUserName") === "undefined" ? "" : methods.watch("ipnUserName")) &&
              (typeof methods.watch("ipnPass1") === "undefined" ? "" : methods.watch("ipnPass1"))
            }
            name="ipnPass2"
            rules={rulesPass2}
            placeHolder="Şifre Tekrar"
            isPass
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            {...methods}
          />
          </View>

       
        </ScrollView>
        <BtnMain
        buttonDisabled={(Object.keys(methods.formState.errors).length > 0)||(typeof methods.watch("ipnPass1") === "undefined")||((methods.watch("ipnPass2"))?.length===0)} 
          onPress={methods.handleSubmit(onPress)}
          txt="Kaydet ve İlerle"
        />
      </View>
    </ImageBackground>
  );
};

export default Password;
