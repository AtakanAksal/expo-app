/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, {useRef, useCallback, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  ImageBackground
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Recaptcha from 'react-native-recaptcha-that-works';
import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import BackgroundImage from "../../../../assets/register_background.jpg";
import MainLogo from "../../../components/mainLogo/MainLogo";
import StylesRegister from "../StylesRegister";

// const styles = StyleSheet.create({
  
//   container: {
   
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
// });

const RecaptchaComponent = () => {
  const size = "invisible" // 'normal'; "invisible"
  const [key, setKey] = useState('<none>');
  const nav = useNavigation();

  const $recaptcha = useRef();
  
  const handleOpenPress = useCallback(() => {
    $recaptcha.current.open();
  }, []);

  const handleClosePress = useCallback(() => {
    $recaptcha.current.close();
  }, []);
  
  useEffect(() => {
    handleOpenPress();
  }, [])
  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
   <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />
      <MainLogo />

      <Text style={StylesRegister.mainText}>Expo Hesabı Oluşturun</Text>
        {/* <View
          contentInsetAdjustmentBehavior="automatic"
          style={styles.container}>
          <Button onPress={handleOpenPress} title="Open" />
          <Text>Token: {key}</Text>
          <Text>Size: {size}</Text>
        </View> */}

        <Recaptcha      
          ref={$recaptcha}
          lang="en"
          // headerComponent={<Button title="Close" onPress={handleClosePress} />}
          siteKey="6LejsqwZAAAAAGsmSDWH5g09dOyNoGMcanBllKPF"
          baseUrl="http://127.0.0.1"
          size={size}
          theme="light"
          // onLoad={() => alert('onLoad event')}
          // onClose={() => alert('onClose event')}
          onError={(err) => {
            alert('onError event');
            console.warn(err);
          }}
          onExpire={() => alert('onExpire event')}
          onVerify={(token) => {
            alert('Doğrulandı..');
            setKey(token);
            nav.navigate("RegisterCountry");
          }}
        />
  </View>
      </ImageBackground>
  );
};

export default RecaptchaComponent;