/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Keyboard,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as SecureStore from "expo-secure-store";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as Device from 'expo-device';

// Top Tab Navigator Icon
import CepTelefonuG from "../../../assets/register/cep-telefon-g.png";
import CepTelefonuT from "../../../assets/register/cep-telefon-t.png";
import EmailG from "../../../assets/register/email-g.png";
import EmailT from "../../../assets/register/email-t.png";
import KullaniciKoduG from "../../../assets/register/tc-no-g.png";
import KullaniciKoduT from "../../../assets/register/tc-no-t.png";

import Logo from "../../../assets/expo_logo_yatay.png";
import BackgroundImage from "../../../assets/register_background.jpg";
import MainLogo from "../../components/mainLogo/MainLogo";
import { useUserValue } from "../../contexts/UserContext";
import StylesLogin from "./StylesLogin";
import BtnMain from "../../components/btnMain/BtnMain";
import TxtValidationInput from "../../components/txtFormInput/TxtValidationInput";
import {
  checkPhoneExists,
  checkUser,
  postLogin,
} from "../../helpers/connections";
import {
  relativeWidthNum,
  relativeHeightNum,
} from "../../utils/HelperFunctions";
import TxtPhoneInput from "../../components/txtPhoneInput/TxtPhoneInput";
import { postVerifyUserLoginInfo } from "../../helpers/verificationConnections";
import UserPhoto from "./UserPhoto";
import Geri from "../../../assets/register/gerigitbeyaz.png";
import TxtValidationUserCode from "../../components/txtFormInput/TxtValidationUserCode";

const Tab = createMaterialTopTabNavigator();

const { width, height } = Dimensions.get("window");
const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  // const [showButtons, setshowButtons] = useState(true);
  // const [keyboardOpened, setKeyboardOpened] = useState(false);
  const [selectedTab, setSelectedTab] = useState("email");
  const [loginPassScreen, setLoginPassScreen] = useState("passive");
  const [tempData, setTempData] = useState({});
  const [unAuthLoginAttempt, setUnAuthLoginAttempt] = useState(false);

  const [, dispatch] = useUserValue();
  const methods = useForm();
  // eslint-disable-next-line no-undef
  const postData = new FormData();
  
  const nav = useNavigation();

  // useEffect(() => {
  //   Keyboard.addListener("keyboardDidShow", () => setKeyboardOpened(true));
  //   Keyboard.addListener("keyboardDidHide", () => setKeyboardOpened(false));

  //   return () => {
  //     Keyboard.removeAllListeners("keyboardDidShow", () =>
  //       setKeyboardOpened(true)
  //     );
  //     Keyboard.removeAllListeners("keyboardDidHide", () =>
  //       setKeyboardOpened(false)
  //     );
  //   };
  // }, [showButtons]);
 
  const onPress = async (data) => {
    if (Object.keys(methods.formState.errors).length <= 0) {
      //  const postData = new FormData();
      if(selectedTab==="email"){ postData.append("email", data.ipnEmail);}
      if(selectedTab==="telefon"){
        const notIncludePlus = data.ipnPhone.slice(1);
        postData.append("phone", notIncludePlus);}
      if(selectedTab==="kullaniciKodu"){  postData.append("user_code", data.ipnUserCode);}

      postData.append("brand", Device.brand)
       postData.append("isDevice", Device.isDevice)
       postData.append("manufacturer", Device.manufacturer)
       postData.append("modelName", Device.modelName)
       postData.append("supportedCpuArchitectures", Device.supportedCpuArchitectures[0])
      postData.append("osName", Device.osName)  
      postData.append("osVersion", Device.osVersion)  
      postData.append("osBuildId", Device.osBuildId)  
      postData.append("deviceName", Device.deviceName)  
      
      SecureStore.getItemAsync("secure_deviceid").then((uuid) => {
        console.log("deviceId postdata ya yukleniyor.. ", uuid);
        postData.append("deviceId", uuid)
      });
      
     
      postData.append("secret", data.inpPassword);

      postLogin(postData)
        .then(async (res) => {
          console.log("res----------");
          console.log(res);
          if (res.result === "success") {
            
            console.log("res.result", "success");
            await SecureStore.setItemAsync("mobile-token", res.access_token);
            dispatch({
              type: "changeUser",
              newUser: {
                token: res.access_token,
                username: res.full_institution_name,
                userid: res.id,
              },
            });
          }
          if (res.result === "failure") {
            if ("data" in res) {
              setTempData(res.data);

              setLoginPassScreen("only-photo");
            } else {
              setUnAuthLoginAttempt(true);
              
            }
            console.log("res.result", "failure");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const rulesPassword = {
    minLength: { value: 4, message: "En az 4 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },

    //   validate: {
    //     control: () =>
    //       !unAuthLoginAttempt || // ? input içeriği silinince state e atmıyor. validation boş ve en ez 10 rakam olmalı
    //       "Giriş bilgilerinizi ve Şifrenizi kontrol ediniz!",
    //   },
  };
  const rulesUserCode = {
    minLength: { value: 11, message: "En az 11 karakter giriniz." },
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
    // validate: {
    //   checkUrl: async () =>
    //     (await (postData.append("email", methods.getValues("ipnEmail")), // ? timeout yada oneditingend de yapılacak.
    //     console.log(" render count"),
    //     postVerifyUserLoginInfo(postData)
    //       .then((res) => res.success)
    //       .catch((err) => console.log(err)))) || "Eposta kayıtlı değil",
    // },
  };
  const rulesPhone = {
    minLength: { value: 13, message: "Lütfen Cep Telefon Numarası Yazınız." }, // ? kontrol edilecek. mask
    required: { value: true, message: "Bu alan gerekli." },
    // validate: {
    //   checkUrl: async () =>
    //     (await (postData.append(
    //       "phoneNumber",
    //       methods.getValues("ipnPhone").substring(1)
    //     ), // ? timeout yada oneditingend de yapılacak.
    //     console.log(" render count"),
    //     checkPhoneExists(postData)
    //       .then((res) => res.success)
    //       .catch((err) => console.log(err)))) || "Cep Telefonu bulunamadı!",
    // },
  };
  // ? UseEffect ile render sayısı testi

  const testLogin = async () => {
    await SecureStore.setItemAsync("mobile-token", "res.access_token");
    dispatch({
      type: "changeUser",
      newUser: { token: "res.access_token", username: "res.user" },
    });
  };
  const placeHolderChooser = () => {
    if (selectedTab === "email") return "E-mail Adresiniz";
    if (selectedTab === "telefon") return "Cep Telefon Numaranız";
    return "Kullanıcı Kodunuz";
  };
  const placeHolderText = placeHolderChooser();
  const inputChooser = () => {
    if (selectedTab === "email") return "ipnEmail";
    if (selectedTab === "telefon") return "ipnPhone";
    return "ipnUserCode";
  };
  const inputType = inputChooser();

  return (
    // <View style={StylesLogin.container}>
    <ImageBackground style={styles.backgroundImage} source={BackgroundImage}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          // justifyContent: "center",
          alignItems: "center",
        }}
      >


        {/* Geri Butonu */}
        {loginPassScreen !== "passive" ? (
          <TouchableOpacity
            style={{ alignSelf: "flex-start" }}
            onPress={() => {
              setLoginPassScreen("passive");
            }}
          >
            <Image
              style={{
                height: relativeHeightNum(30),
                width: relativeWidthNum(30),
                marginTop: relativeHeightNum(15),
                marginLeft: relativeWidthNum(15),
                alignSelf: "flex-start",
              }}
              resizeMode="contain"
              source={Geri}
            />
          </TouchableOpacity>
        ) : null}


          {/* Logo */}
        <Image style={styles.logo} resizeMode="contain" source={Logo} />
        {loginPassScreen !== "passive" ? null : (
          <Text style={styles.mainText}>EXPO HESABI İLE GİRİŞ YAP</Text>
        )}



        <View style={{ alignItems: "center" }}>

          {/* Sadece şifre ile giriş ekranı */}
          {loginPassScreen === "only-photo" ||
          loginPassScreen === "photo-password" ? (
            <UserPhoto
              loginPassScreen={loginPassScreen}
              setLoginPassScreen={setLoginPassScreen}
              data={tempData}
            />
          ) : (
            // LoginScreen
            <View>
              {/* TabMenuImages */}
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={selectedTab === "email" ? styles.selectedTab : null}
                  onPress={() => {
                    setSelectedTab("email");
                  }}
                >
                  <Image
                    style={{
                      height: relativeHeightNum(30),
                      width: relativeWidthNum(30),
                      marginHorizontal: relativeWidthNum(15),
                    }}
                    resizeMode="contain"
                    source={selectedTab === "email" ? EmailT : EmailG}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={selectedTab === "telefon" ? styles.selectedTab : null}
                  onPress={() => {
                    setSelectedTab("telefon");
                  }}
                >
                  <Image
                    style={{
                      height: relativeHeightNum(30),
                      width: relativeWidthNum(30),
                      marginHorizontal: relativeWidthNum(15),
                    }}
                    resizeMode="contain"
                    source={
                      selectedTab === "telefon" ? CepTelefonuT : CepTelefonuG
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    selectedTab === "kullaniciKodu" ? styles.selectedTab : null
                  }
                  onPress={() => {
                    setSelectedTab("kullaniciKodu");
                  }}
                >
                  <Image
                    style={{
                      height: relativeHeightNum(30),
                      width: relativeWidthNum(30),
                      marginHorizontal: relativeWidthNum(15),
                    }}
                    resizeMode="contain"
                    source={
                      selectedTab === "kullaniciKodu"
                        ? KullaniciKoduT
                        : KullaniciKoduG
                    }
                  />
                </TouchableOpacity>
              </View>

              {/* Form alanı */}
                    {{
                      "telefon" : (<TxtPhoneInput
                        name="ipnPhone"
                        // setPhone={setPhone}
                        rules={rulesPhone}
                        placeHolder="Cep Telefon Numaranız"
                        countryCallingCode={null}
                        {...methods}
                      />),
                      "email" : ( <TxtValidationInput
                        content="notNull"
                        name="ipnEmail"
                        rules={ rulesEmail}
                        placeHolder={placeHolderText}
                        noUppercase="none"
                        onFocus={
                          () => {}
                          //  setshowButtons(false)
                        }
                        onEndEditing={
                          () => {}
                          // setshowButtons(true)
                        }
                        {...methods}
                      />), 
                      "kullaniciKodu" : (<TxtValidationUserCode
                        content="notNull"
                        name="ipnUserCode"
                        rules={ rulesUserCode}
                        placeHolder={placeHolderText}
                        noUppercase="none"
                        onFocus={
                          () => {}
                          //  setshowButtons(false)
                        }
                        onEndEditing={
                          () => {}
                          // setshowButtons(true)
                        }
                        {...methods}
                      />)

                    }
                    [selectedTab]}
             
            </View>
          )}


          {/* Password  */}
          {loginPassScreen === "photo-password" ||
          loginPassScreen === "passive" ? (
            <TxtValidationInput
              content={
               ( typeof methods.watch(inputType) === "undefined"  ||
                methods.formState.errors.ipnEmail?.ref.name === inputType
                ||
                methods.formState.errors.ipnPhone?.ref.name === inputType
                ||
                methods.formState.errors.ipnUserCode?.ref.name === inputType
                )
                  ? ""
                  : methods.watch(inputType)
              }
              name="inpPassword"
              rules={rulesPassword}
              placeHolder="Şifre"
              isPass
              showPassword={showPassword}
              setShowPassword={() => setShowPassword((prev) => !prev)}
              onFocus={() => {
                // setshowButtons(false);
              }}
              onEndEditing={() => {
                // setshowButtons(true);
              }}
              onChange={() => {}}
              {...methods}
            />
          ) : null}
        </View>
        {unAuthLoginAttempt &&
          (loginPassScreen === "passive" ||
            loginPassScreen === "photo-password") && (
            <Text
              style={{
                alignSelf: "flex-start",
                fontSize: 8,
                color: "#FF0000",
                fontStyle: "italic",
                marginLeft: relativeWidthNum(40),
              }}
            >
              Giriş bilgilerinizi ve Şifrenizi kontrol ediniz!
            </Text>
          )}
      </KeyboardAwareScrollView>


      {/* Login Butonu */}
      {loginPassScreen === "passive" || loginPassScreen === "photo-password" ? (
        <BtnMain
          buttonDisabled={
            Object.keys(methods.formState.errors).length > 0 ||
            !methods.formState.isDirty ||
            !methods.formState.isValid /*   */
          }
          onPress={methods.handleSubmit(onPress)}
          txt="Giriş Yap"
        />
      ) : null}
    </ImageBackground>
    // </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  logo: {
    width: relativeWidthNum(200),
    height: relativeHeightNum(76),
    marginTop: relativeHeightNum(35),
  },
  // eslint-disable-next-line react-native/no-unused-styles
  backgroundImage: {
    // height,
    // width,
    flex: 1,
    //  alignItems: "center",
  },
  mainText: {
    fontSize: 15,
    color: "#6C757D",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: relativeHeightNum(56),
    marginBottom: relativeHeightNum(63),
  },
  selectedTab: {
    borderColor: "#00AA9F",
    borderWidth: 0.8,
    backgroundColor: "white",
  },
});
