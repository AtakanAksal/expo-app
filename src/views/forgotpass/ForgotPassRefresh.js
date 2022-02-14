/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Text, View, TextInput, ImageBackground } from "react-native";
import { useForm } from "react-hook-form";
import BackButton from "../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../components/mainLogo/MainLogo";
import BtnMain from "../../components/btnMain/BtnMain";
import TxtValidationInput from "../../components/txtFormInput/TxtValidationInput";
import TxtPhoneInput from "../../components/txtPhoneInput/TxtPhoneInput";
import BackgroundImage from "../../../assets/register_background.jpg";

import { checkUser, checkPhone, checkEmail } from "../../helpers/connections";

import StylesForgot from "./StylesForgot";


const ForgotPassRefresh = ({ selectedItem, setSelectedPage, setType, setKeyword }) => {
  const methods = useForm();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const postData = new FormData();
 

  const handleRefresh = () => {
    if (selectedItem === 2) {
      // dispatch({
      //   type: "changeRegister",
      //   newRegister: {
      //     type: "phone",
      //     key: methods.getValues("inpPhone"),
      //   },
      // });
      setType("phone");
      setKeyword(methods.getValues("inpPhone").substring(1));
      console.log("cep");
    } else if (selectedItem === 3) {
      // dispatch({
      //   type: "changeRegister",
      //   newRegister: {
      //     type: "email",
      //     key: methods.getValues("inpEmail"),
      //   },
      // });
      setType("email");
      setKeyword(methods.getValues("inpEmail"));
      console.log("eposta");
    } else if (selectedItem === 1) {
      // dispatch({
      //   type: "changeRegister",
      //   newRegister: {
      //     type: "user_code",
      //     key: methods.getValues("inpUsername"),
      //   },
      // });
      setType("usercode");
      setKeyword(methods.getValues("inpUsername"));
      console.log("kullanıcı kodu");
    }
    // validationlar

    setSelectedPage(2);
  };

  useEffect(() => {
    // console.log("selectedItem", selectedItem);
    // console.log(methods.getValues("inpPhone")==="");
    // console.log(Object.keys(methods.formState.errors).length);
    if (Object.keys(methods.formState.errors).length > 0) {
      setButtonDisabled(true);
      // console.log("çalıstı 1");
    } else if (methods.getValues("inpPhone") === "" && selectedItem === 2) {
      setButtonDisabled(true);
      // console.log("çalıstı 2");
    } else if (methods.getValues("inpUsername") === "" && selectedItem === 1) {
      setButtonDisabled(true);
      // console.log("çalıstı 3");
    } else if (methods.getValues("inpEmail") === "" && selectedItem === 3) {
      setButtonDisabled(true);
      // console.log("çalıstı 4");
    } else {
      setButtonDisabled(false);
      // console.log("çalıstı 5");
    }
  }, [methods.formState, selectedItem]);

  const rulesUsername = {
    validate: {
      checkUrl: async () =>
        (await (postData.append("user_code", methods.getValues("inpUsername")),
        checkUser(postData)
          .then((res) => res.success)
          .catch((err) => console.log(err)))) || "Kullanıcı Kodu Bulunamadı",
    },
  };
  // console.log( methods.getValues("inpPhone").substring(1))
  const rulesPhone = {
    validate: {
      checkUrl: async () =>
        (await (postData.append(
          "phone",
          methods.getValues("inpPhone").substring(1)
        ),
        checkPhone(postData)
          .then((res) => res.success)
          .catch((err) => console.log(err)))) || "Telefon Numarası Bulunamadı",
    },
  };

  const rulesEmail = {
    validate: {
      checkUrl: async () =>
        (await (postData.append("email", methods.getValues("inpEmail")),
        checkEmail(postData)
          .then((res) => res.success)
          .catch((err) => console.log(err)))) || "E-posta Adresi bulunamadı",
    },
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
      <View style={StylesForgot.container}>
        <BackButton handlePress={() => setSelectedPage(1)} fromView />
        <MainLogo />

        <Text style={StylesForgot.mainText}>ŞİFREMİ UNUTTUM</Text>
        <View>
          {
            {
              1: (
                <TxtValidationInput
                  content="notNull"
                  name="inpUsername"
                  rules={rulesUsername}
                  placeHolder="Kullanıcı Kodunuzu Giriniz"
                  {...methods}
                />
              ),
              2: (
                <TxtPhoneInput
                  content="notNull"
                  name="inpPhone"
                  rules={rulesPhone}
                  placeHolder="Cep Telefon Numaranızı Girin"
                  countryCallingCode={90}
                  {...methods}
                />
              ),
              3: (
                <TxtValidationInput
                  content="notNull"
                  name="inpEmail"
                  rules={rulesEmail}
                  placeHolder="E-posta Adresinizi Girin"
                  noUppercase="none"
                  {...methods}
                />
              ),
            }[selectedItem]
          }
        </View>
        <BtnMain
          buttonDisabled={buttonDisabled}
          onPress={handleRefresh}
          txt="Şifreyi Yenile"
        />
      </View>
    </ImageBackground>
  );
};

export default ForgotPassRefresh;
