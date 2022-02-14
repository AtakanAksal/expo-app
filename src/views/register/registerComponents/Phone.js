/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, TouchableOpacity, Image, Modal,  } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import CheckBox from "@react-native-community/checkbox";

import { useRegisterValue } from "../../../contexts/RegisterContext";
import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../../components/mainLogo/MainLogo";
import ErrorIcon from "../../../../assets/error-icon.png";

import TxtPhoneInput from "../../../components/txtPhoneInput/TxtPhoneInput";

import BtnMain from "../../../components/btnMain/BtnMain";

import StylesRegister from "../StylesRegister";
import { checkPhoneExists } from "../../../helpers/connections";
import BackgroundImage from "../../../../assets/register_background.jpg";
import CepTelBilgilendirmeModal from "../registerViews/CepTelBilgilendirmeModal";
import { relativeHeightNum, relativeWidthNum } from "../../../utils/HelperFunctions";
import CepTelOnayModal from "../registerViews/CepTelOnayModal";
import PhoneValidationModal from "../registerViews/PhoneValidationModal";



const Phone = () => {
  const methods = useForm();

  const [{ register }, dispatch] = useRegisterValue();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [modalOpenState, setModalOpenState] = useState("none");
  
 

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const nav = useNavigation();
  //  console.log(register)

  const postData = new FormData();
useEffect(() => {
  dispatch({
    type: "changeRegister",
    newRegister: {
      phoneValidationAttemptCount: 0,
    },
  });

}, [])

useEffect(() => {
 if((register.phoneValidationAttemptCount===1)||(register.phoneValidationAttemptCount===2)||(register.phoneValidationAttemptCount===4)||(register.phoneValidationAttemptCount===5)){setModalOpenState("PhoneValidationModal")}
 else if(register.phoneValidationAttemptCount===6){
  alert("rrapor sayfasına önlendirilirsun");

  nav.navigate("Basarisiz")
 }
 
}, [modalOpenState])


  useEffect(() => {
   
    if (!toggleCheckBox||methods.watch("ipnPhone") === ""|| Object.keys(methods.formState.errors).length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [methods.watch("ipnPhone"), methods.formState]);

  const onPress = async (data) => {
    console.log(data);
    // validate

    dispatch({
      type: "changeRegister",
      newRegister: {
      
        phonenumber: data.ipnPhone.substring(1),
        
      },
    });
    // ? memory leak
    setModalOpenState("CepTelefonuOnayModal")


  };





  const rulesPhone = {
    minLength: { value: 13, message: "Lütfen Cep Telefon Numarası Yazınız." }, // ? kontrol edilecek. mask
    required: { value: true, message: "Bu alan gerekli." },
    validate: {
      checkUrl: async () =>
        (await (postData.append("phoneNumber", methods.getValues("ipnPhone").substring(1)), // ? timeout yada oneditingend de yapılacak.
        // console.log(" render count"),
        checkPhoneExists(postData)
          .then((res) => !res.success)
          .catch((err) => console.log(err)))) || "Bu Numara Başka Bir Hesap Tarafından Kullanımdadır",
    },
  };
  // console.log(methods.formState.errors.ipnName)
  return (
<ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
      <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />
      {/** console.log("Yabanci1 Render control---")  we have some problemme... */}

      <MainLogo keyboardUp />

     {(register.phoneValidationAttemptCount!==3)&&  <Text style={StylesRegister.mainText}>Sizi Tanımaya Başlıyoruz!</Text>}
    { (register.phoneValidationAttemptCount===3)&& <Image style={StylesRegister.errorIcon} resizeMode="contain" source={ErrorIcon} />}

      <View>
  

        <TxtPhoneInput
          // content={
          //   (typeof methods.watch("ipnName") === "undefined" ? "" : methods.watch("ipnName")) &&
          //   (typeof methods.watch("ipnSurname") === "undefined" ? "" : methods.watch("ipnSurname"))
          // }
          name="ipnPhone"
          // setPhone={setPhone}
          rules={rulesPhone}
          placeHolder="Cep Telefon Numaranızı Yazınız"
          countryCallingCode={register.ulkeDetay.phonecode}
          {...methods}
        />      
          {(register.phoneValidationAttemptCount===3)&&  <Text style={StylesRegister.errorText}>Doğrulama Kodunu 3 Kez hatalı giriş yaptınız. Lütfen
Cep Numaranızı Kontrol Ederek Tekrar Deneyin!</Text>}
      </View>

      <View
          style={{
            height: relativeHeightNum(25),
            width: relativeWidthNum(280),
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:"center",
            position:"absolute",
            top:relativeHeightNum(520)
          }}
        >
          <View style={{flexDirection:"row",  alignItems:"center",}}> 
          <CheckBox
            tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => {
              setToggleCheckBox(newValue);
              if(!toggleCheckBox){
                setModalOpenState("TicariBilgilendirmeModal");
              }
            }}
          />
          <Text style={{ fontSize: 11, color: "#6C757D", fontStyle: "italic", marginLeft: relativeWidthNum(10)}}>
          Cep telefonu bilgilendirmeyi okudum.
          </Text>
          </View>
       
        </View>

      <BtnMain buttonDisabled={buttonDisabled} onPress={methods.handleSubmit(onPress)} txt="Kaydet ve İlerle" />
    </View>


     {/*  CepTelBilgilendirmeModal                                   */}
     <View>
          <Modal
          transparent
          animationType="fade"
            visible={modalOpenState==="TicariBilgilendirmeModal"}
            onRequestClose={() => {
              setModalOpenState("none");
            }}
          >
            <CepTelBilgilendirmeModal setModalOpenState={setModalOpenState} />
          </Modal>
        </View>


         {/*  CepTelefonuOnayModal                                   */}
     <View>
          <Modal
          transparent
          animationType="fade"
            visible={modalOpenState==="CepTelefonuOnayModal"}
            onRequestClose={() => {
              setModalOpenState("none");
            }}
          >
            <CepTelOnayModal setModalOpenState={setModalOpenState} />
          </Modal>
        </View>


          {/*  PhoneValidationModal                                   */}
     <View>
          <Modal
          transparent
          animationType="fade"
            visible={modalOpenState==="PhoneValidationModal"}
            onRequestClose={() => {
              setModalOpenState("none");
            }}
          >
            <PhoneValidationModal setModalOpenState={setModalOpenState} />
          </Modal>
        </View>

    </ImageBackground> 
  );
};

export default Phone;
