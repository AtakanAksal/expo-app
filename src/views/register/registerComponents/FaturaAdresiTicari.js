/* eslint-disable no-lonely-if */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, Modal, TouchableOpacity, Image, TextInput } from "react-native";
import dayjs from "dayjs";
import CheckBox from "@react-native-community/checkbox";

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

import { useRegisterValue } from "../../../contexts/RegisterContext";
import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../../components/mainLogo/MainLogo";

import GenderSelectComponent from "./GenderSelectComponent";
import BirthdaySelectComponent from "./BirthdaySelectComponent";
import TxtPhoneInput from "../../../components/txtPhoneInput/TxtPhoneInput";

import BtnMain from "../../../components/btnMain/BtnMain";

import StylesRegister from "../StylesRegister";
import TxtValidationInput from "../../../components/txtFormInput/TxtValidationInput";
import { checkPhoneExists } from "../../../helpers/connections";
import BackgroundImage from "../../../../assets/register_background.jpg";
import TicariBilgilendirmeModal from "../registerViews/TicariBilgilendirmeModal";
import { relativeHeightNum, relativeWidthNum } from "../../../utils/HelperFunctions";
import VdComponent from "./VdComponent";
import WarningImages from "./WarningImages";
 


const  FaturaAdresiTicari = () => {
  const methods = useForm();

  const [{register}, dispatch] = useRegisterValue();
  const [vergiNo, setVergiNo] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [vd, setVd] = useState("")
  const [warning, setWarning]=useState("")



  const nav = useNavigation();
  //  console.log(register)


  useEffect(() => {
    // faturaUnvani kontrolleri
    if (vergiNo !== "" &&vergiNo.length>1&&vd!=="") {
      setDisabled(false);
    }else{ setDisabled(true);}
    if((vergiNo !== "")&&vergiNo.length>1){
      setWarning("")
    }
    if((vergiNo !== "")&&vergiNo.length<2){
      setWarning("En az iki karakter giriniz!")
    }
    if(vergiNo.length<2){
      setDisabled(true);
    }
    // faturaAdres kontrolleri
 
    
  }, [vergiNo, vd]);




  const onPress = async (data) => {
    // console.log(data);
    // validate

    dispatch({
      type: "changeRegister",
      newRegister: {
       
        vergiDairesi: vd.id,
        vergiNo: vergiNo, // ? Date format
       
      },
    });
    // ? memory leak

    nav.navigate("Phone")
    // if(toggleCheckBox){
    //   nav.navigate("RegisterSelectSecType"); 
    // }else{
    // if (register.country === 212) {
    //   nav.navigate("Bireysel2Adress");
    // } else {
    //   nav.navigate("Yabanci2Adress");
    // }   
   
  };





  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />
      {/** console.log("Yabanci1 Render control---")  we have some problemme... */}

      <MainLogo keyboardUp />

      <Text style={StylesRegister.mainText}>Sizi Tanımaya Başlıyoruz!</Text>

      <View>
     
        <VdComponent selectValue={vd}  setSelectValue={setVd} />
 
        <View style={[StylesRegister.textInputHolder, (warning!=="")&& {borderColor:"#FF0000"}, (vergiNo.length>1)&& {borderColor:"#00AA9F"} ]}>
            <TextInput
              value={vergiNo}
              onChangeText={(v) => setVergiNo(v)}
              placeholder={"Fatura Ünvanı"}
              style={StylesRegister.textInput}
              onFocus={()=>{
                
                if(vergiNo.length===0){setWarning("Bu alan gerekli.")}
              }}
            />
            <WarningImages warning={warning} text={vergiNo}  />
          </View>
        
      </View>

      <BtnMain buttonDisabled={disabled} onPress={onPress} txt="Kaydet ve İlerle" /> 


       
       
     

    </View>
    </ImageBackground> 
  );
};

export default FaturaAdresiTicari;
