import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import DoneLogo from "../../../assets/done-icon.png";
import BackButton from "../../components/btnNavigationBack/BtnNavigationBack";
import StylesForgot from "./StylesForgot";
import BackgroundImage from "../../../assets/register_background.jpg";
import MainLogo from "../../components/mainLogo/MainLogo";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../utils/HelperFunctions";
import Foto from "../../../assets/forgotpass/profileaktif.png";
import { postForgetPassword } from "../../helpers/registerConnection";
import { useRegisterValue } from "../../contexts/RegisterContext";

const ForgotPassDone = ({ type, keyword }) => {
  const nav = useNavigation();
  const [data, setData] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  // eslint-disable-next-line no-undef
  const postData = new FormData();

  useEffect(() => {
    postData.append(type, keyword); //
    console.log(postData);
    postForgetPassword(postData)
      .then((res) => {
        console.log(res);
        setData(res.message);
        setIsSuccess(res.success);
      })
      .catch((err) => console.log(err)); // ?
  }, []);

  return (
    <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
      <View style={StylesForgot.container}>
        <BackButton handlePress={() => nav.goBack()} fromView />

        <MainLogo />

        {isSuccess ? (
          <Text style={StylesForgot.mainText}>İŞLEM BAŞARILI</Text>
        ) : (
          <Text style={StylesForgot.mainText}>İŞLEM BAŞARISIZ</Text>
        )}

        {isSuccess ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{
                height: relativeHeightNum(131),
                width: relativeWidthNum(125),
                marginBottom: relativeWidthNum(20),
              }}
              resizeMode="contain"
              source={data?.picture ? { uri: data?.picture } : Foto}
            />
            <Text style={{ fontSize: 20, color: "#6C757D" }}>Sayın</Text>
            <Text
              style={{
                fontSize: 20,
                color: "#6C757D",
                marginBottom: relativeHeightNum(36),
              }}
            >
              **{data?.full_institution_name}**
            </Text>
          </View>
        ) : null}

        <View>
          {isSuccess ? (
            <Text style={StylesForgot.textDone}>
              Şifre yenileme linki e-posta adresinize gönderilmiştir. Gönderilen
              link üzerinden yeni şifrenizi oluşturabilirsiniz.
            </Text>
          ) : (
            <Text style={StylesForgot.textDone}>
              Girdiğiniz bilgiler hatalıdır! Şifre yenileme işlemini
              gerçekleştirmek için lütfen sisteme kayıtlı bir kullanıcı bilgisi
              ile tekrar deneyiniz.
            </Text>
          )}
        </View>

        <Text
          style={{
            color: "#6C757D",
            fontSize: 12,
            fontStyle: "italic",
            alignSelf: "flex-end",
            marginTop: relativeHeightNum(117),
          }}
        >
          Bu profil bana ait değil
        </Text>
      </View>
    </ImageBackground>
  );
};

export default ForgotPassDone;
