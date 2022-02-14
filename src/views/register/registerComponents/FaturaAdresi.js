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
 


const  FaturaAdresi = () => {
  const methods = useForm();

  const [{ register }, dispatch] = useRegisterValue();
  const [date, setDate] = useState(new Date(dayjs().subtract(18, `year`)));
  const [selectCountDate, setSelectCountDate] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [vd, setVd] = useState("")

  const [gender, setGender] = useState("seciniz");

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const nav = useNavigation();
  //  console.log(register)

  const postData = new FormData();

  const onPress = async (data) => {
    // console.log(data);
    // validate

    dispatch({
      type: "changeRegister",
      newRegister: {
        faturaUnvani: data.inpFaturaUnvan,
        faturaAdres: data.inpFaturaAdres,
        vergiDairesi: vd.id,
        vergiNo: data.inpVergiNo, // ? Date format
       
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

  const inputCheck = () => {
    // ? callback
    if (
      (typeof methods.watch("ipnName") === "undefined" ? "" : methods.watch("ipnName")) === "" ||
      (typeof methods.watch("ipnSurname") === "undefined" ? "" : methods.watch("ipnSurname")) === "" 
      // || (typeof methods.watch("ipnPhone") === "undefined" ? "" : methods.watch("ipnPhone")) === ""
    ) {
      return false;
    }
    return true;
  };
console.log(methods.watch("inpFaturaUnvan"));
  useEffect(() => {
    if (methods.watch("inpFaturaAdres") === "" ||methods.watch("inpFaturaUnvan") === "" || Object.keys(methods.formState.errors).length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [methods.watch("inpFaturaUnvan"), methods.watch("inpFaturaAdres"), methods.formState]);

  const rulesText = {
    minLength: { value: 2, message: "En az 2 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
  };
  const rulesVergiNo = {
    minLength: { value: 11, message: "En az 11 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
    maxLength : { value: 12, message: "En az 12 karakter giriniz."}
  };

 
  // console.log(methods.formState.errors.ipnName)
  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />
      {/** console.log("Yabanci1 Render control---")  we have some problemme... */}

      <MainLogo keyboardUp />

      <Text style={StylesRegister.mainText}>Vergi Kayıt Bilginizi Girin</Text>

      <View>
        <TxtValidationInput
          content="notNull"
          name="inpFaturaUnvan"
          rules={rulesText}
          placeHolder={ "Fatura Ünvanı" }
          {...methods}
        />
        <TxtValidationInput
          content={typeof methods.watch("inpFaturaUnvan") === "undefined" ? "" : methods.watch("inpFaturaUnvan")}
          name="inpFaturaAdres"
          rules={rulesText}
          placeHolder={"Fatura Adresinizi Yazınız"}
          {...methods}
        />
        <VdComponent selectValue={vd}  setSelectValue={setVd} />
 
        <TxtValidationInput
          content="notNull"
          name="inpVergiNo"
          rules={rulesVergiNo}
          placeHolder={ "Vergi Numarası" }
          {...methods}
        />
        
      </View>

      <BtnMain buttonDisabled={buttonDisabled} onPress={methods.handleSubmit(onPress)} txt="Kaydet ve İlerle" /> 


       
       
     

    </View>
    </ImageBackground> 
  );
};

export default FaturaAdresi;
