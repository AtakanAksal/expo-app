import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Pressable, TextInput } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from '@react-navigation/native';
import ExpoLogo from "../../../../assets/expologo.png";
import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import Info from "../../../../assets/register/info-yeni.png";
import { relativeHeightNum, relativeWidthNum } from "../../../utils/HelperFunctions";
import StylesRegister from "../StylesRegister";
import { useRegisterValue } from "../../../contexts/RegisterContext";

const SektorDigerModal = ({setModalVisible }) => {
  const [sektorDiger, setSektorDiger] = useState("");
  const [warning, setWarning]=useState("")
   const [disabled, setDisabled] = useState(true);
   const [{ register }, dispatch] = useRegisterValue();
   const nav = useNavigation()

useEffect(() => {
 if(sektorDiger.length>1){setDisabled(false)}
}, [sektorDiger]);

const buttonPress = () => {
  dispatch({
    type: "changeRegister",
    newRegister: { sector_diger:sektorDiger },
  });   
  setModalVisible(false);
  if (register.countryId === 212) {
    nav.navigate("Bireysel2Adress");
  } else {
    nav.navigate("Yabanci2Adress");
  }
}
  return (
    <Pressable style={{ flex: 1 }} >
      <View style={styles.outerModal}>
        <View style={styles.innerModal}>
        
          <View>
           <Text  style={styles.textHeader}>Sektörünüzü Girin</Text>
          </View>
          <View>
          <View style={[StylesRegister.textInputHolder, (warning!=="")&& {borderColor:"#FF0000"}, (sektorDiger.length>1)&& {borderColor:"#00AA9F"} ]}>
            <TextInput
              value={sektorDiger}
              onChangeText={(v) => setSektorDiger(v)}
              placeholder={"Girin"}
              style={StylesRegister.textInput}
              onFocus={()=>{
                if(sektorDiger.length===0){setWarning("Bu alan gerekli.")}
              }}
            /> 
          </View>
          
          </View>
            <TouchableOpacity
              onPress={()=>{ buttonPress()  }}
              style={ disabled? styles.buttonDisabled:styles.button }
            >
              <Text style={disabled? styles.buttonTextDisabled  : styles.buttonText }>Kaydet ve İlerle</Text>
            </TouchableOpacity>
          
        </View>
      </View>
    </Pressable>
  );
};

export default SektorDigerModal;

const styles = StyleSheet.create({
  innerModal: {
    // margin: 25,
    backgroundColor: "#FFFFFF",
    height: relativeHeightNum(270),
    width:relativeWidthNum(320),
    justifyContent: "space-between",
    alignItems:"center",
    // alignSelf:"center"
  },
  outerModal: {
    justifyContent: "center",
    alignItems:"center",
    flex: 1,
    backgroundColor: "#000000a1",
  },

  textHeader: {
   fontSize:20,
   color:"#6C757D",
   fontStyle:"italic",
   marginTop: relativeHeightNum(43)
    
  },

  button: {
    width:relativeWidthNum(280),
    alignItems: "center",
    backgroundColor: "#00AA9F",
    padding: 10,
    margin: 10,
    marginBottom:relativeHeightNum(20)
  },
  buttonDisabled: {
    width:relativeWidthNum(280),
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 10,
    marginBottom:relativeHeightNum(20),
    borderColor:"#00AA9F",
    borderWidth:1
  },


  buttonText : {
    fontSize:15,
    color:"#FFFFFF"
  },
  buttonTextDisabled : {
    fontSize:15,
    color:"#6C757D"
  }
});
