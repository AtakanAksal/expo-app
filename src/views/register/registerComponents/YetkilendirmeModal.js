import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import ExpoLogo from "../../../../assets/expologo.png";
import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import Info from "../../../../assets/register/info-yeni.png";
import { relativeHeightNum, relativeWidthNum } from "../../../utils/HelperFunctions";

const YetkilendirmeModal = ({setModalVisible }) => {
  return (
    <Pressable style={{ flex: 1 }} >
      <View style={styles.outerModal}>
        <View style={styles.innerModal}>
        
          <View>
            <Image style={styles.logo} resizeMode="center" source={Info} />
          </View>
          <View style={styles.textField}>
            <Text style={styles.textInfo}>
            * Kurumlar adına başvuruda bulunmak bazı 
belgeleri ibraz etmeyi ve kurum adına 
sorumluluk alabilmeyi gerektirir.
              </Text>
              <Text style={styles.textInfo}>
              * Kurum adına yetkisiz kişilerin işlemleri veya 
yetkililerce onay verilmeyen başvuru sahipleri
yasal sorumluluklara maruz kalabilirler.
              </Text>
          </View>   

         
            <TouchableOpacity
              onPress={()=>{setModalVisible(false)}}
              style={ styles.button}
            >
              <Text style={ styles.buttonText}>Kapat</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    </Pressable>
  );
};

export default YetkilendirmeModal;

const styles = StyleSheet.create({
  innerModal: {
    // margin: 25,
    backgroundColor: "#f1f1f1",
    height: relativeHeightNum(370),
    width:relativeWidthNum(250),
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
  textField: {
    margin: 15,
  },
  logo: {
    width: relativeWidthNum(115),
    height: relativeHeightNum(115),
    
  },

  button: {
    width:relativeWidthNum(220),
    alignItems: "center",
    backgroundColor: "#00AA9F",
    padding: 10,
    margin: 10,
  },

  textInfo: {
    fontSize:10,
    color:"#6C757D",
    textAlign:"center"
  },
  buttonText : {
    fontSize:10,
    color:"#FFFFFF"
  }
});
