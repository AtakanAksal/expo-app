/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  ImageBackground,
  TextInput,
  StyleSheet,
  Keyboard
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useForm } from "react-hook-form";

import { useNavigation } from "@react-navigation/native";
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
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../utils/HelperFunctions";
import PinInfoModal from "./PinInfoModal";

const Pin = () => {
  const methods = useForm();
  const [{ register }, dispatch] = useRegisterValue();
  const nav = useNavigation();
  const postData = new FormData();
  const [isPassWritten, setIsPassWritten] = useState(false);
  const [modalOpenState, setModalOpenState] = useState(false);
  //   if (Object.keys(methods.formState.errors).length > 0 || !sozlesmeChecked) {
  //     setButtonDisabled(true);
  //   } else {
  //     setButtonDisabled(false);
  //   }
  // }, [sozlesmeChecked, methods.formState]);

  useEffect(() => {
    console.log("değiştiiiii");
    if (register.pinA && register.pinB && register.pinC && register.pinD) {
      setIsPassWritten(true);
      console.log("hepsi girildi");
    } else {
      setIsPassWritten(false);
      console.log("eksik var");
    }
  }, [register.pinA, register.pinB, register.pinC, register.pinD]);

  const a = useRef();
  const b = useRef();
  const c = useRef();
  const d = useRef();
  const pinCombiner = () => {
    // console.log("a", a.current);
    const pin = `${register.pinA}${register.pinB}${register.pinC}${register.pinD}`;
    return pin;
  };

  const onPress = async (data) => {
    console.log(pinCombiner());
    dispatch({
      type: "changeRegister",
      newRegister: { pin_creater_1: pinCombiner() },
    });

    nav.navigate("Pin2");
  };
  const boxStyleDefiner = () => {
    if(isPassWritten)return styles.boxValid
    return styles.box
  }
  


  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={BackgroundImage}
    >
      <View style={StylesRegister.container}>
        <BackButton handlePress={() => nav.goBack()} fromView />
        <ScrollView keyboardShouldPersistTaps="handled">
          <MainLogo keyboardUp />
        <View  style={styles.textContainer}><Text style={styles.mainText}>
            Güvenliğinizi Önemsiyoruz!
          </Text>
          <Text style={styles.mainText}>
            4 Haneli Pin Kodu Oluşturun
          </Text>
          </View> 
          <View>
            <View style={styles.validationCodeRow}>
              <View style={boxStyleDefiner()}>
                <TextInput
                  ref={a}
                  autoFocus
                  numeric
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    dispatch({
                      type: "changeRegister",
                      newRegister: {
                        pinA: text,
                      },
                    });
                    b.current.focus();
                  }}
                  textContentType="password"
                  secureTextEntry
                  maxLength={1}
                  style={styles.textInput}
                />
              </View>
              <View style={boxStyleDefiner()}>
                <TextInput
                  ref={b}
                  numeric
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    dispatch({
                      type: "changeRegister",
                      newRegister: {
                        pinB: text,
                      },
                    });
                    c.current.focus();
                  }}
                  textContentType="password"
                  secureTextEntry
                  maxLength={1}
                  style={styles.textInput}
                />
              </View>
              <View style={boxStyleDefiner()}>
                <TextInput
                  ref={c}
                  numeric
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    dispatch({
                      type: "changeRegister",
                      newRegister: {
                        pinC: text,
                      },
                    });
                    d.current.focus();
                  }}
                  textContentType="password"
                  secureTextEntry
                  maxLength={1}
                  style={styles.textInput}
                />
              </View>
              <View style={boxStyleDefiner()}>
                <TextInput
                  ref={d}
                  numeric
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    dispatch({
                      type: "changeRegister",
                      newRegister: {
                        pinD: text,
                      },
                    });
                    Keyboard.dismiss()
                  }}
                  textContentType="password"
                  secureTextEntry
                  maxLength={1}
                  style={styles.textInput}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.nedirButon}
              onPress={() => {
                setModalOpenState(true);
              }}
            >
              <Text style={styles.nedirText}>Nedir?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <BtnMain
          buttonDisabled={!isPassWritten}
          onPress={() => {onPress()}}
          txt="Kaydet ve İlerle"
        />
      </View>

      {/*  PinInfoModal                                   */}
      <View>
        <Modal
          transparent
          animationType="fade"
          visible={modalOpenState}
          onRequestClose={() => {
            setModalOpenState(false);
          }}
        >
          <PinInfoModal setModalOpenState={setModalOpenState} />
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default Pin;
const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    color: "#6C757D",
    textAlign: "center",
  },
  validationCodeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  box: {
    borderColor: "#707070",
    // borderWidth: 0.2,
    width: relativeWidthNum(50),
    height: relativeHeightNum(50),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
  },
  boxValid: {
    borderColor: "#00AA9F",
     borderWidth: 1.5,
    width: relativeWidthNum(50),
    height: relativeHeightNum(50),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "white",
  },
  mainText: {
    fontSize: 20,
    color: "#6C757D",
    textAlign: "center",
    // marginVertical: relativeHeightNum(56),
    marginHorizontal: relativeWidthNum(30),
    fontStyle:"italic"
  },
  nedirText: {
    color: "#6C757D",
    fontSize: 12,
    fontStyle: "italic",
  },
  nedirButon: {
    alignSelf: "flex-end",
    marginTop: relativeHeightNum(40),
    marginRight: relativeWidthNum(35),
  },
  textContainer:{
     marginVertical: relativeHeightNum(56),
  }
});
