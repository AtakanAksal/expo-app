/* eslint-disable no-lonely-if */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { Text, View, ImageBackground, Modal, TouchableOpacity, Image } from "react-native";
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
import Info from "../../../../assets/register/info-yeni.png";
import YetkilendirmeModal from "./YetkilendirmeModal";
import KamuTicariBilgilendirmeModal from './KamuTicariBilgilendirmeModal';

 


const  AccountInfo = () => {
  const methods = useForm();

  const [{ register }, dispatch] = useRegisterValue();
  const [date, setDate] = useState(new Date(dayjs().subtract(18, `year`)));
  const [selectCountDate, setSelectCountDate] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [modalOpenState2, setModalOpenState2] = useState(false);

  const [gender, setGender] = useState("seciniz");

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const nav = useNavigation();
  //  console.log(register)

  const postData = new FormData();

  const onPress = async (data) => {
    console.log(data);
    // validate

    dispatch({
      type: "changeRegister",
      newRegister: {
        // userrole: 1,
        firstname: data.ipnName,
        lastname: data.ipnSurname,
        // phonenumber: data.ipnPhone.substring(1),
        borndate: dayjs(new Date(date)).format("YYYY-MM-DD"), // ? Date format
        gender: gender,
        isCommercial :toggleCheckBox
      },
    });
    // ? memory leak

    
    if(toggleCheckBox||register.accountType===2){
      nav.navigate("RegisterSelectSecType"); 
    }else{
    if (register.countryId === 212) {
      nav.navigate("Bireysel2Adress");
    } else {
      nav.navigate("Yabanci2Adress");
    }


      // switch (register.accountType) {
      //         case 1:
      //           nav.navigate("Bireysel2Adress");
      //           break;
      //         case 2:
      //           nav.navigate("Yabanci2Adress");
      //           break;
      //         case 3:
      //           nav.navigate("Yabanci2Adress");
      //           break;
      //         case 4:
      //           nav.navigate("Yabanci2Adress");
      //           break;
      //         default:
      //           break;
      //       }
    }
   
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

  useEffect(() => {
    if (gender === "seciniz" || Object.keys(methods.formState.errors).length > 0){
      setButtonDisabled(true);
    }
    if((register.accountType ===3 || register.accountType ===4) &&!toggleCheckBox2){
      setButtonDisabled(true);
    }
    else {
      setButtonDisabled(false);
    }
  }, [gender, methods.formState, toggleCheckBox2]);

  const rulesNameSurname = {
    minLength: { value: 2, message: "En az 2 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
  };

  const rulesPhone = {
    minLength: { value: 13, message: "Lütfen Cep Telefon Numarası Yazınız." }, // ? kontrol edilecek. mask
    required: { value: true, message: "Bu alan gerekli." },
    validate: {
      checkUrl: async () =>
        (await (postData.append("phoneNumber", methods.getValues("ipnPhone").substring(1)), // ? timeout yada oneditingend de yapılacak.
        console.log(" render count"),
        checkPhoneExists(postData)
          .then((res) => !res.success)
          .catch((err) => console.log(err)))) || "Bu Numara Başka Bir Hesap Tarafından Kullanımdadır",
    },
  };
  // console.log(methods.formState.errors.ipnName)
  return (
    <ImageBackground style={{flex:1}} source={BackgroundImage}>
    <View style={StylesRegister.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />
      {/** console.log("Yabanci1 Render control---")  we have some problemme... */}

      <MainLogo keyboardUp />

      <Text style={StylesRegister.mainText}>Sizi Tanımaya Başlıyoruz!</Text>

      <View>
        <TxtValidationInput
          content="notNull"
          name="ipnName"
          rules={rulesNameSurname}
          placeHolder={register.accountType===1 ? "Adınızı Yazınız" : "Yetkili Kişi Adını Yazınız"}
          {...methods}
        />
        <TxtValidationInput
          content={typeof methods.watch("ipnName") === "undefined" ? "" : methods.watch("ipnName")}
          name="ipnSurname"
          rules={rulesNameSurname}
          placeHolder={register.accountType===1 ? "Soyadınızı Yazınız" : "Yetkili Kişi Soyadı Yazınız"}
          {...methods}
        />

        {/* <TxtPhoneInput
          content={
            (typeof methods.watch("ipnName") === "undefined" ? "" : methods.watch("ipnName")) &&
            (typeof methods.watch("ipnSurname") === "undefined" ? "" : methods.watch("ipnSurname"))
          }
          name="ipnPhone"
          // setPhone={setPhone}
          rules={rulesPhone}
          placeHolder="Cep Telefon Numaranızı Yazınız"
          countryCallingCode={register.ulkeDetay.phonecode}
          {...methods}
        /> */}

        <View style={StylesRegister.row}>
          <View style={inputCheck() ? StylesRegister.rowContent : StylesRegister.rowContentDisable}>
            <BirthdaySelectComponent
              date={date}
              setDate={setDate}
              inputCheck={inputCheck}
              selectCountDate={selectCountDate}
              setSelectCountDate={setSelectCountDate}
            />
          </View>
          <View style={inputCheck() && selectCountDate ? StylesRegister.rowContent : StylesRegister.rowContentDisable}>
            <GenderSelectComponent
              gender={gender}
              setGender={setGender}
              inputCheck={inputCheck}
              selectCountDate={selectCountDate}
            />
          </View>
        </View>
      </View>

{/* Bilgilendirme Satırı  yetkilendirme */}
{( register.accountType ===3 || register.accountType ===4 ) && <>
        <View
          style={{
            height: relativeHeightNum(25),
            width: relativeWidthNum(280),
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:"center",
            position:"absolute",
            top:relativeHeightNum(510)
          }}
        >
          <View style={{flexDirection:"row",  alignItems:"center",}}> 
          <CheckBox
            tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
            disabled={false}
            value={toggleCheckBox2}
            onValueChange={(newValue) => {
              setToggleCheckBox2(newValue);
            if(toggleCheckBox2===false){setModalOpenState2(true)}
            }}
          />
          <Text style={{ fontSize: 11, color: "#6C757D", fontStyle: "italic", marginLeft: relativeWidthNum(10)}}>
          Kurum adına yetkilendirildim
          </Text>


          </View>
          <TouchableOpacity onPress={()=>{setModalOpenState2(true)}}>
          <Image style={{height:relativeHeightNum(25), width:relativeWidthNum(25)}} resizeMode="contain" source={Info} />
          </TouchableOpacity>
        </View>
        </>   }

 {/* Bilgilendirme Satırı Ticari faaliyet */}
 {(register.accountType ===1 || register.accountType ===3 || register.accountType ===4 ) && <>
        <View
          style={{
            height: relativeHeightNum(25),
            width: relativeWidthNum(280),
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:"center",
            position:"absolute",
            top:relativeHeightNum(540)
          }}
        >
          <View style={{flexDirection:"row",  alignItems:"center",}}> 
          <CheckBox
            tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
            disabled={false}
            value={toggleCheckBox}
            onValueChange={(newValue) => {
              setToggleCheckBox(newValue);
              if(toggleCheckBox===false&&( register.accountType ===3 || register.accountType ===4 )){setModalOpenState(true)}
            }}
          />
          <Text style={{ fontSize: 11, color: "#6C757D", fontStyle: "italic", marginLeft: relativeWidthNum(10)}}>
        { textDefiner(register.accountType) }
          </Text>
          </View>
        { (register.accountType ===3 || register.accountType ===4) && <TouchableOpacity onPress={()=>{setModalOpenState(true)}}>
          <Image style={{height:relativeHeightNum(25), width:relativeWidthNum(25)}} resizeMode="contain" source={Info} />
          </TouchableOpacity>}
        </View>
        </>   }




      <BtnMain buttonDisabled={buttonDisabled} onPress={methods.handleSubmit(onPress)} txt="Kaydet ve İlerle" />



     {/*  YetkilendirmeModal                                   */}
     <View>
          <Modal
          transparent 
          animationType="fade"
            visible={modalOpenState2}
            onRequestClose={() => {
              setModalOpenState2(false);
            }}
          >
            <YetkilendirmeModal setModalVisible={setModalOpenState2} />
          </Modal>
        </View>
        
       
        

        {/*  TicariBilgilendirmeModal                                   */}
        <View>
          <Modal
          transparent 
          animationType="fade"
            visible={modalOpenState}
            onRequestClose={() => {
              setModalOpenState(false);
            }}
          >
            <KamuTicariBilgilendirmeModal setModalVisible={setModalOpenState} />
          </Modal>
        </View>





    </View>
    </ImageBackground> 
  );
};
const textDefiner = (accountType) => {
if(accountType===1||accountType===4)return"Sektör ve Faaliyet alanımı girmek istiyorum"
if(accountType===3)return"Kurumumuzda Ticari Faaliyet vardır"
return ""
}
export default AccountInfo;
