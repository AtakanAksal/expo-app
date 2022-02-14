import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Keyboard,
  Pressable
} from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../utils/HelperFunctions";
import Info from "../../../../assets/register/info-yeni.png";
import TxtPhoneInput from "../../../components/txtPhoneInput/TxtPhoneInput";
import StylesRegister from "../StylesRegister";
import { checkPhoneExists } from "../../../helpers/connections";
import { useRegisterValue } from "../../../contexts/RegisterContext";
import {
  postCheckCode,
  postSendCode,
} from "../../../helpers/registerConnection";
import { useUserValue } from "../../../contexts/UserContext";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const PhoneValidationModal = ({ setModalOpenState }) => {
  const methods = useForm();
  const [{ register }, dispatch] = useRegisterValue();
  const [{ user }] = useUserValue();
  const nav = useNavigation();
  const [mobilCodeToken, setMobilCodeToken] = useState("");
  const [mobilCodeCheck, setMobilCodeCheck] = useState(9);
  const [isPassWritten, setIsPassWritten] = useState(false);
  const a =useRef()
  const b =useRef()
  const c =useRef()
  const d =useRef()
  const e =useRef()
  const f =useRef()
console.log('====================================');
console.log( `register.phoneValidationAttemptCount` , register.phoneValidationAttemptCount);
console.log('====================================');
  // useEffect(() => {
  //   if (mobilCodeCheck === 1) {
  //     console.log("başarılı");
  //     nav.navigate("EmailPassword");
  //   } else if (mobilCodeCheck === 0) {
  //     console.log("başarısız"); 
      
  //   } else if (mobilCodeCheck === 3) {
  //     console.log("zaman aşımı");
  //   }
  // }, [mobilCodeCheck]);

  useEffect(() => {
   
    sendCode();
  }, []);
  useEffect(() => {
    if (isPassWritten) {
      checkCode();
    }
  }, [isPassWritten]);
  const [timerCount, setTimer] = useState(174);

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        // eslint-disable-next-line no-unused-expressions
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
      
      if ((mobilCodeCheck === 0)){  clearInterval(interval);  setModalOpenState("none") }
      else if ((mobilCodeCheck === 1)){    clearInterval(interval);   dispatch({
        type: "changeRegister",
        newRegister: {
          phoneValidationAttemptCount:( 9),
        },
      });   setModalOpenState("none");  nav.navigate("Password"); } 
     
    }, 1000); // each count lasts for a second
    // cleanup the interval on complete
    return () => {
      clearInterval(interval);
    };
  }, [mobilCodeCheck]); 
 
  const passCombiner = () => {
    // console.log("a", a.current);
    const password = `${register.inpA}${register.inpB}${register.inpC}${register.inpD}${register.inpE}${register.inpF}`;
    return password;
  };
  const sendCode = () => {
    console.log("====================================");
    console.log("sendCode fonksiyonu giris");
    console.log("====================================");
    // eslint-disable-next-line no-undef
    const postData = new FormData();
    postData.append("mobilephone", register.phonenumber);
    postSendCode(postData)
      .then((res) => {
        console.log(res);
        setMobilCodeToken(res.mobilCodeToken);
        console.log("====================================");
        console.log("sendCode fonksiyonu cikis");
        console.log("====================================");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkCode = () => {
    console.log("====================================");
    console.log("checkCode fonksiyonu giris");
    console.log("====================================");
    // eslint-disable-next-line no-undef
    const postData = new FormData();
    const pass = passCombiner();

    console.log("pass", pass);
    postData.append("mobilephone_code", pass);
    console.log("mobilCodeToken", mobilCodeToken);
    postData.append("token", mobilCodeToken);

    postCheckCode(postData)
      .then((res) => {
        console.log("res.mobilCodeCheck", res.mobilCodeCheck);
        console.log("====================================");
        console.log("checkCode fonksiyonu cikis");
        console.log("====================================");
        dispatch({
          type: "changeRegister",
          newRegister: {
            phoneValidationAttemptCount:( register.phoneValidationAttemptCount+1),
          },
        });
        setMobilCodeCheck(res.mobilCodeCheck);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Pressable style={{ flex: 1 }} >
    <View style={styles.outerModal}>
      <View style={styles.innerModal}>

    {/* <View style={styles.container}> */}
      <View style={styles.innerContainer}>
        <View style={styles.firstRaw}>
          <Text style={styles.textSmall}>Kalan Süre</Text>
          <Text style={styles.textTimer}>
            {Math.floor(timerCount / 60)} : {timerCount % 60}
          </Text>
        </View>
        <View>
          {(timerCount !== 0 &&(mobilCodeCheck === 9) ) && (
            <Text style={styles.textMiddle}>Doğrulama Kodu</Text>
          )}
          {((mobilCodeCheck === 0) ) && (
            <Text style={styles.textMiddleError}>Doğrulama Kodu Hatalı Yeniden
            Gönderilmiştir</Text>
          )}
          {timerCount === 0 && (
            <Text style={styles.textMiddleError}>
              Doğrulama kodunu belirtilen süre içerisinde girmediniz, yeniden isteyiniz
            </Text>
          )}
          {/* { mobilCodeCheck===0 &&  <Text style={styles.textMiddleError}>Doğrulama Kodu Hatalı Yeniden
Gönderilmiştir </Text>} */}
        </View>
        {timerCount !== 0 && (
          <View style={styles.validationCodeRow}>
            <View style={styles.box}>
              <TextInput                     
                ref={a}
                autoFocus
                numeric
          keyboardType="numeric"
                onChangeText={(text) => {
                  dispatch({
                    type: "changeRegister",
                    newRegister: {
                      inpA: text,
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
            <View style={styles.box}>
              <TextInput
              ref={b}
              numeric
              keyboardType="numeric"
                onChangeText={(text) => {
                  dispatch({
                    type: "changeRegister",
                    newRegister: {
                      inpB: text,
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
            <View style={styles.box}>
              <TextInput
              ref={c}
              numeric
              keyboardType="numeric"
                onChangeText={(text) => {
                  dispatch({
                    type: "changeRegister",
                    newRegister: {
                      inpC: text,
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
            <View style={styles.box}>
              <TextInput
              ref={d}
              numeric
              keyboardType="numeric"
                onChangeText={(text) => {
                  dispatch({
                    type: "changeRegister",
                    newRegister: {
                      inpD: text,
                    },
                  });
                  e.current.focus();
                }}
                textContentType="password"
                secureTextEntry
                maxLength={1}
                style={styles.textInput}
              />
            </View>
            <View style={styles.box}>
              <TextInput
              ref={e}
              numeric
              keyboardType="numeric"
                onChangeText={(text) => {
                  dispatch({
                    type: "changeRegister",
                    newRegister: {
                      inpE: text,
                    },
                  });
                  f.current.focus();
                }}
                textContentType="password"
                secureTextEntry
                maxLength={1}
                style={styles.textInput}
              />
            </View>
            <View style={styles.box}>
              <TextInput
              ref={f}
              numeric
              keyboardType="numeric"
                onChangeText={(text) => {
                  dispatch({
                    type: "changeRegister",
                    newRegister: {
                      inpF: text,
                    },
                  });
                  Keyboard.dismiss()
                  setIsPassWritten(true);
                }}
                textContentType="password"
                secureTextEntry
                maxLength={1}
                style={styles.textInput}
              />
            </View>
          </View>
        )}
        <TouchableOpacity onPress={() => {
             dispatch({
              type: "changeRegister",
              newRegister: {
                phoneValidationAttemptCount:( register.phoneValidationAttemptCount+1),
              },
            });
            setModalOpenState("none")  
        }}>
          <Text style={[styles.textSmall, { alignSelf: "flex-end" }]}>
            Yeni Kod Gönder
          </Text>
        </TouchableOpacity>
      </View>
    {/* </View> */}

</View>
</View>
</Pressable>
  );
};

export default PhoneValidationModal;
const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    height: relativeHeightNum(270),
    width: relativeWidthNum(320),
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    marginVertical: relativeHeightNum(129),

    // alignItems: "center",
    // marginHorizontal:WIDTH/6.54,
  },
  innerModal: {
    height: relativeHeightNum(270),
    width: relativeWidthNum(320),
    alignSelf: "center",
  
    marginVertical: relativeHeightNum(129),
    // margin: 25,
    backgroundColor: "#f1f1f1",
 
    justifyContent: "space-around",
    alignItems:"center",
    // alignSelf:"center"
  },
  outerModal: {
    justifyContent: "center",
    alignItems:"center",
    flex: 1,
    backgroundColor: "#000000a1",
  },
  innerContainer: {
    flex: 1,
    margin: relativeWidthNum(34),
    justifyContent: "space-between",
  },
  textSmall: {
    fontSize: 10,
    color: "#6C757D",
  },
  textTimer: {
    fontSize: 35,
    color: "#6C757D",
  },
  textMiddle: {
    fontSize: 15,
    color: "#6C757D",
    alignSelf: "center",
  },
  textMiddleError: {
    fontSize: 15,
    color: "#FF0000",
    alignSelf: "center",
    textAlign:"center"
  },
  firstRaw: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: relativeWidthNum(36),
  },
  textInput: {
    fontSize: 15,
    color: "#6C757D",
    textAlign: "center",
  },
  validationCodeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  box: {
    borderColor: "#707070",
    borderWidth: 0.2,
    width: relativeWidthNum(26),
    height: relativeHeightNum(26),
  },
});
