import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useRegisterValue } from "../../../contexts/RegisterContext";

import MainLogo from "../../../components/mainLogo/MainLogo";
import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import TxtMultilineInput from "../../../components/txtMultilineInput/TxtMultilineInput";
import BtnMain from "../../../components/btnMain/BtnMain";

import StylesRegister from "../StylesRegister";
import BackgroundImage from "../../../../assets/register_background.jpg";
import { useGetWorldCities } from "../../../helpers/registerConnection";
import YabanciIlPicker from "./YabanciIlPicker";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../utils/HelperFunctions";
import TxtValidationInput from "../../../components/txtFormInput/TxtValidationInput";
import CheckIcon from "../../../../assets/check-icon.png";
import ErrorIcon from "../../../../assets/error-icon.png";

const FirmaIsmiUnvan = () => {
  const [{ register }, dispatch] = useRegisterValue();
  const nav = useNavigation();
  const [faturaUnvani, setFaturaUnvani] = useState("");
  const [faturaAdres, setFaturaAdres] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [warning, setWarning] = useState("");
  const [warning2, setWarning2] = useState("");
  useEffect(() => {
    // faturaUnvani kontrolleri
    if (
      faturaUnvani !== "" &&
      faturaAdres !== "" &&
      faturaUnvani.length > 1 &&
      faturaAdres.length > 1
    ) {
      setDisabled(false);
    }
    if (faturaUnvani !== "" && faturaUnvani.length > 1) {
      setWarning("");
    }
    if (faturaUnvani !== "" && faturaUnvani.length < 2) {
      setWarning("En az iki karakter giriniz!");
    }

    // faturaAdres kontrolleri

    if (faturaAdres !== "" && faturaAdres.length > 1) {
      setWarning2("");
    }
    if (faturaAdres !== "" && faturaAdres.length < 2) {
      setWarning2("En az iki karakter giriniz!");
    }
  }, [faturaUnvani, faturaAdres]);

  const handleNext = () => {
    dispatch({
      type: "changeRegister",
      newRegister: {
        firma_ismi:  faturaUnvani,
        ticari_unvan: faturaAdres,
      },
    });
    nav.navigate("AccountInfo");
    // if (register.countryId === 212) {
    //   nav.navigate("Bireysel2Adress");
    // } else {
    //   nav.navigate("Yabanci2Adress");
    // }
  };
  const rulesText = {
    minLength: { value: 2, message: "En az 2 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
  };
  return (
    <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
      <View style={StylesRegister.container}>
        <BackButton handlePress={() => nav.goBack()} fromView />
        <ScrollView>
          <MainLogo />

          <Text style={StylesRegister.mainText}>
           {placeholderMain(register.accountType)}
          </Text>
          <View
            style={[
              StylesRegister.textInputHolder,
              warning !== "" && { borderColor: "#FF0000" },
              faturaUnvani.length > 1 && { borderColor: "#00AA9F" },
            ]}
          >
            <TextInput
              value={faturaUnvani}
              onChangeText={(v) => setFaturaUnvani(v)}
              placeholder={placeholderIsim(register.accountType)}
              style={StylesRegister.textInput}
              onFocus={() => {
                if (faturaUnvani.length === 0) {
                  setWarning("Bu alan gerekli.");
                }
              }}
            />
            <WarningImages warning={warning} text={faturaUnvani} />
          </View>
          {warning !== "" && (
            <Text style={StylesRegister.textWarning}>{warning}</Text>
          )}
          <Text style={StylesRegister.textInfo}>* Profiliniz bu isimle g??r??necektir</Text>
          <View
            style={[
              StylesRegister.multipleTextInputHolder,
              warning2 !== "" && { borderColor: "#FF0000" },
              faturaAdres.length > 1 && { borderColor: "#00AA9F" },
            ]}
          >
            <TextInput
              value={faturaAdres}
              onChangeText={(v) => setFaturaAdres(v)}
              placeholder={placeholderUnvan(register.accountType)}
              style={StylesRegister.textInput}
              multiline
              editable={faturaUnvani !== "" && faturaUnvani.length > 1}
              // selectTextOnFocus={false}
              onFocus={() => {
                if (faturaAdres.length === 0) {
                  setWarning2("Bu alan gerekli.");
                }
              }}
            />
            <WarningImages warning={warning2} text={faturaAdres} />
          </View>
          {warning2 !== "" && (
            <Text style={StylesRegister.textWarning}>{warning2}</Text>
          )}
        </ScrollView>
        <BtnMain
          buttonDisabled={disabled}
          onPress={handleNext}
          txt="Kaydet ve ??lerle"
        />
      </View>
    </ImageBackground>
  );
};
const WarningImages = ({ warning, text }) => {
  if (warning !== "") {
    return (
      <Image
        style={{ height: relativeHeightNum(35), width: relativeWidthNum(35) }}
        resizeMode="center"
        source={ErrorIcon}
      />
    );
  }
  if (text.length > 1) {
    return (
      <Image
        style={{ height: relativeHeightNum(35), width: relativeWidthNum(35) }}
        resizeMode="center"
        source={CheckIcon}
      />
    );
  }
  return null;
};
const placeholderIsim = (accountType) => {
 if(accountType===2) return "Firma ??smi Girin"
 if(accountType===3) return "Kamu Kurum ??smini Girin"
 if(accountType===4) return "STK ??smi Girin"
 return ""
}
const placeholderUnvan = (accountType) => {
  if(accountType===2) return "Ticari ??nvan??n?? Girin"
  if(accountType===3) return "Kamu Kurum ??nvan??n?? Girin"
  if(accountType===4) return "STK ??nvan??n?? Girin"
  return ""
 }
 const placeholderMain = (accountType) => {
  if(accountType===1) return "Sizi Tan??maya Ba??l??yoruz!"
  if(accountType===2) return "??irketinizi Tan??maya Ba??l??yoruz!"
  if(accountType===3) return "Kurumunuzu Tan??maya Ba??l??yoruz!"
  if(accountType===4) return "Kurulu??unuzu Tan??maya Ba??l??yoruz!"
  return ""
 }


export default FirmaIsmiUnvan;
