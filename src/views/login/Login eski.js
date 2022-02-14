/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { Text, View, Keyboard, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as SecureStore from "expo-secure-store";

import MainLogo from "../../components/mainLogo/MainLogo";
import { useUserValue } from "../../contexts/UserContext";
import StylesLogin from "./StylesLogin";
import BtnMain from "../../components/btnMain/BtnMain";
import TxtValidationInput from "../../components/txtFormInput/TxtValidationInput";
import { checkUser, postLogin } from "../../helpers/connections";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showButtons, setshowButtons] = useState(true);
  const [keyboardOpened, setKeyboardOpened] = useState(false);

  const [, dispatch] = useUserValue();
  const methods = useForm();
  const nav = useNavigation();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardOpened(true));
    Keyboard.addListener("keyboardDidHide", () => setKeyboardOpened(false));

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow", () => setKeyboardOpened(true));
      Keyboard.removeAllListeners("keyboardDidHide", () => setKeyboardOpened(false));
    };
  }, [showButtons]);

  const onPress = async (data) => {
    if (Object.keys(methods.formState.errors).length <= 0) {
      const postData = new FormData();
      postData.append("email", data.ipnEmail);
      postData.append("secret", data.inpPassword);

      postLogin(postData)
        .then(async (res) => {
          console.log("res----------");
          console.log(res);

          await SecureStore.setItemAsync("mobile-token", res.access_token);
          dispatch({
            type: "changeUser",
            newUser: { token: res.access_token, username: res.full_institution_name, userid: res.id },
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const rulesUsername = {
    minLength: { value: 4, message: "En az 4 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
  };

  const rulesEmail = {
    // minLength: { value: 2, message: "En az 2 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "E-posta Adresi Hatalı",
    },
  };

  // ? UseEffect ile render sayısı testi

  const testLogin = async () => {
    await SecureStore.setItemAsync("mobile-token", "res.access_token");
    dispatch({
      type: "changeUser",
      newUser: { token: "res.access_token", username: "res.user" },
    });
  };

  return (
    <View style={StylesLogin.container}>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <MainLogo />
        <Text style={StylesLogin.mainText}>EXPO HESABI İLE GİRİŞ YAP</Text>

        <View>
          {/* <TxtValidationInput
            content="notNull"
            name="inpUsername"
            rules={rulesUsername}
            placeHolder="Kullanıcı Adı"
            onFocus={() => setshowButtons(false)}
            onEndEditing={() => setshowButtons(true)}
            {...methods}
          /> */}

          <TxtValidationInput
            content="notNull"
            name="ipnEmail"
            rules={rulesEmail}
            placeHolder="E-mail Adresiniz"
            noUppercase="none"
            onFocus={() => setshowButtons(false)}
            onEndEditing={() => setshowButtons(true)}
            {...methods}
          />

          <TxtValidationInput
            content="notNull"
            name="inpPassword"
            rules={rulesUsername}
            placeHolder="Şifre"
            isPass
            showPassword={showPassword}
            setShowPassword={() => setShowPassword((prev) => !prev)}
            onFocus={() => setshowButtons(false)}
            onEndEditing={() => setshowButtons(true)}
            {...methods}
          />

          {!keyboardOpened && (
            <View style={StylesLogin.viewRow}>
              <TouchableOpacity style={StylesLogin.buttonRow} onPress={() => nav.navigate("RegisterMain")}>
                <Text style={StylesLogin.buttonRowText}>Yeni</Text>
                <Text style={StylesLogin.buttonRowText}>Kayıt Ol</Text>
              </TouchableOpacity>

              <TouchableOpacity style={StylesLogin.buttonRow} onPress={() => nav.navigate("UserUpdateMain")}>
                <Text style={StylesLogin.buttonRowText}>Eski Kaydı</Text>
                <Text style={StylesLogin.buttonRowText}>Güncelle</Text>
              </TouchableOpacity>

              <TouchableOpacity style={StylesLogin.buttonRow} onPress={() => nav.navigate("ForgotPassMain")}>
                <Text style={StylesLogin.buttonRowText}>Şifrem</Text>
                <Text style={StylesLogin.buttonRowText}>Neydi?</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      <BtnMain
        buttonDisabled={Object.keys(methods.formState.errors).length > 0}
        onPress={methods.handleSubmit(onPress)}
        txt="Giriş Yap"
      />
      {/**
      <Button title="🔐 Test girişi 🔐" onPress={() => testLogin()} />
       */}
    </View>
  );
};

export default Login;
