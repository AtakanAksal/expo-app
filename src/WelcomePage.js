import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, Image, View, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import { relativeHeightNum, relativeWidthNum } from "./utils/HelperFunctions";
import Logo from "../assets/expo_logo_yatay.png";
import ButtonIcon from "../assets/welcome_item_icon.png";
import BackgroundImage from "../assets/register_background.jpg";

const { width, height } = Dimensions.get("window");

const WelcomePage = () => {
  const nav = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
    <ImageBackground style={styles.backgroundImage} source={BackgroundImage}>
      <Image style={styles.logo} resizeMode="contain" source={Logo} />

      <Text style={styles.textWelcome}>
        Sanal Fuar ve Sanal Ticaret Platformuna Hoşgeldiniz
      </Text>

    {/* Button container */}
      <View style={styles.buttonContainer}>

      {/* 1. row */}
      <TouchableOpacity style={styles.button} onPress={() => nav.navigate("Login")}>
        <Image style={styles.buttonIcon} resizeMode="contain" source={ButtonIcon} />
        <Text style={styles.textButton}>GİRİŞ YAP</Text>
      </TouchableOpacity>

       {/* 2. row */}
       <TouchableOpacity style={styles.button} onPress={() => nav.navigate("RegisterMain")} >
        <Image style={styles.buttonIcon} resizeMode="contain" source={ButtonIcon} />
        <Text style={styles.textButton}>YENİ KAYIT OL</Text>
      </TouchableOpacity>

       {/* 3. row */}
       <TouchableOpacity style={styles.button} onPress={() => nav.navigate("ForgotPassMain")}>
        <Image style={styles.buttonIcon} resizeMode="contain" source={ButtonIcon} />
        <Text style={styles.textButton}>ŞİFREMİ UNUTTUM</Text>
      </TouchableOpacity>

       {/* 4. row */}
       <TouchableOpacity style={styles.button} onPress={() => nav.navigate("UserUpdateMain")}>
        <Image style={styles.buttonIcon} resizeMode="contain" source={ButtonIcon}  />
        <Text style={styles.textButton}>MEVCUT KAYIT BİLGİLERİMİ GÜNCELLE</Text>
      </TouchableOpacity>

 
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default WelcomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center"
  },
  logo: {
    width: relativeWidthNum(200),
    height: relativeHeightNum(76),
    marginTop: relativeHeightNum(65),
  },
  textWelcome: {
    fontSize: 15,
    width: relativeWidthNum(172),
    color: "#6C757D",
    fontStyle: "italic",
    marginTop: relativeHeightNum(44),
    textAlign: "center",
  },
  buttonContainer : {
    marginTop: relativeHeightNum(50)
  },
  textButton : {
    fontSize:12,
    color: "#6C757D"
  },
  button : {
    flexDirection:"row",
    height : relativeHeightNum(40),
    width : relativeWidthNum(280),
    justifyContent:"flex-start",
    alignItems:"center",
    marginBottom:relativeHeightNum(10),
    backgroundColor: "white",
  //  borderRadius: 20,
  //  padding: 35,
  
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonIcon : {
    height : relativeHeightNum(30),
    width : relativeWidthNum(30),
    marginHorizontal: relativeWidthNum(10)
  }, 
  backgroundImage : {
    height,
    width,
    // flex: 1,
    alignItems: "center",
    
    
  }
});
