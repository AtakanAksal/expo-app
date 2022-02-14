import React from "react";
import { Text, View, ImageBackground, } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Mail from "../../../assets/forgotpass/mail.png";
import Profil from "../../../assets/forgotpass/profileaktif.png";
import Telefon from "../../../assets/forgotpass/telefon.png";

import BtnNavigationOpener from "../../components/btnNavigationOpener/BtnNavigationOpener";
import BackButton from "../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../components/mainLogo/MainLogo";
import StylesForgot from "./StylesForgot";
import BackgroundImage from "../../../assets/register_background.jpg";

// Top Tab Navigator Icon
import CepTelefonuT from "../../../assets/register/cep-telefon-t.png";
import EmailT from "../../../assets/register/email-t.png";
import KullaniciKoduT from "../../../assets/register/tc-no-t.png";


const ForgotPass = ({ setSelectedPage, setSelectedItem }) => {
  const nav = useNavigation();

  return (
    <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
    <View style={StylesForgot.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />
      <MainLogo />

      <Text style={StylesForgot.mainText}>ŞİFREMİ UNUTTUM</Text>

      <View style={StylesForgot.viewRow}>
        <BtnNavigationOpener
          txt="Cep Telefonu"
          imgSrc={CepTelefonuT}
          handlePress={() => {
            setSelectedPage(3);
            setSelectedItem(2);
          }}
        />
        <BtnNavigationOpener
          txt="E-mail Adresi"
          imgSrc={EmailT}
          handlePress={() => {
            setSelectedPage(3);
            setSelectedItem(3);
          }}
        />
        <BtnNavigationOpener
          txt="Kullanıcı Kodu"
          imgSrc={KullaniciKoduT}
          handlePress={() => {
            setSelectedPage(3);
            setSelectedItem(1);
          }}
        />
      </View>

      <Text style={StylesForgot.text}>
        * Sizi tanıyabilmemiz ve sistemimize kayıtlı e-postanıza şifre yenileme linki gönderebilmemiz için proﬁlinize
        ait bilgilerden birini seçiniz.
      </Text>
    </View>
    </ImageBackground>
  );
};

export default ForgotPass;
