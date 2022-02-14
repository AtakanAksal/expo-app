import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable
} from "react-native";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../utils/HelperFunctions";
import SoruIsareti from "../../../../assets/soru-işareti.png";
import KapatGri from "../../../../assets/vexmail/kapat-gri.png";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const PinInfoModal = ({ setModalOpenState }) => {
  return (
    <Pressable style={{ flex: 1 }} >
    <View style={styles.outerModal}>
      <View style={styles.innerModal}>

    {/* <View style={styles.container}> */}
      <TouchableOpacity onPress={()=>{setModalOpenState(false)}} style={styles.kapatButon}>
        <Image
          style={{
            height: relativeHeightNum(25),
            width: relativeWidthNum(25),
          
          }}
          source={KapatGri}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Image
        style={{
          height: relativeHeightNum(150),
          width: relativeWidthNum(150),
         
        }}
        source={SoruIsareti}
        resizeMode="contain"
      />
      <Text style={styles.textDescription}>
        expo.com.tr ve tüm alt modül portallerin kullanımında belirlediğiniz
        şifreniz kullanılacaktır. Belirleyeceğiniz 4 haneli pin kodu kullanım
        güvenliğinizi arttırmak ve belirli alanlarda işlemlerinizi doğrulamak
        amaçlı kullanılacaktır.
      </Text>
    {/* </View> */}

    </View>
      </View>
    </Pressable>
  );
};

export default PinInfoModal;
const styles = StyleSheet.create({
  // eslint-disable-next-line react-native/no-unused-styles
  container: {
    height: relativeHeightNum(334),
    width: relativeWidthNum(300),
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    marginVertical: relativeHeightNum(129),
    // justifyContent: "flex-start",
    alignItems: "center",
    // marginHorizontal:WIDTH/6.54,
  },
  innerModal: {
    height: relativeHeightNum(334),
    width: relativeWidthNum(300),
    alignSelf: "center",
   
    marginVertical: relativeHeightNum(129),
    // justifyContent: "flex-start",
    alignItems: "center",
    // margin: 25,
    backgroundColor: "#f1f1f1",
 
    // justifyContent: "space-around",
 
    // alignSelf:"center"
  },
  outerModal: {
    justifyContent: "center",
    alignItems:"center",
    flex: 1,
    backgroundColor: "#000000a1",
  },
  textDescription: {
    fontSize: 12,
    width: "80%",
    textAlign:"center",
    color:"#6C757D",
    paddingHorizontal:relativeWidthNum(12)
  },
  kapatButon : {
    alignSelf: "flex-end",
    margin:relativeWidthNum(12)
  }
});
