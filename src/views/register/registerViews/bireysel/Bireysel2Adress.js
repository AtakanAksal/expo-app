import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TextInput,
  ScrollView,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";
import { useRegisterValue } from "../../../../contexts/RegisterContext";
import MainLogo from "../../../../components/mainLogo/MainLogo";
import BackButton from "../../../../components/btnNavigationBack/BtnNavigationBack";

import TxtMultilineInput from "../../../../components/txtMultilineInput/TxtMultilineInput";
import IlPicker from "../../registerComponents/IlPicker";
import IlcePicker from "../../registerComponents/IlcePicker";
import MahallePicker from "../../registerComponents/MahallePicker";

import BtnMain from "../../../../components/btnMain/BtnMain";

import StylesRegister from "../../StylesRegister";
import BackgroundImage from "../../../../../assets/register_background.jpg";
import Info from "../../../../../assets/register/info-yeni.png";

import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../../utils/HelperFunctions";
import TicariBilgilendirmeModal from "../TicariBilgilendirmeModal";

const Bireysel2Adress = () => {
  const [selectedAdress, setSelectedAdress] = useState(""); //! Typelar null -> string
  const [selectedCity, setSelectedCity] = useState("seciniz");
  const [selectedTown, setSelectedTown] = useState("seciniz");
  const [selectedDistrict, setSelectedDistrict] = useState("seciniz");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [{ register }, dispatch] = useRegisterValue();
  const nav = useNavigation();
  useEffect(() => {
    console.log(selectedCity);
    //! useEffect'e ve BtnDisabled stateine gerek yok
    if (
      selectedCity === "seciniz" ||
      selectedTown === "seciniz" ||
      selectedDistrict === "seciniz" ||
      selectedAdress === ""
    ) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [selectedCity, selectedTown, selectedDistrict, selectedAdress]);

  useEffect(() => {
    setSelectedTown("seciniz");
    setSelectedDistrict("seciniz");
  }, [selectedCity]);

  useEffect(() => {
    setSelectedDistrict("seciniz");
  }, [selectedTown]);

  const handleNext = () => {
    dispatch({
      type: "changeRegister",
      newRegister: {
        cityId: selectedCity.cityid,
        cityName: selectedCity.cityname,
        town: selectedTown.countyid,
        district: selectedDistrict,
        address: selectedAdress,
      },
    });
    if(register.accountType===1){nav.navigate("Phone");}
   else if(register.accountType===2){nav.navigate("FaturaAdresiTicari");}
  else  if(register.accountType===3&&register.isCommercial){nav.navigate("FaturaAdresi");}else {nav.navigate("Phone");}


    
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={BackgroundImage}>
      <View style={StylesRegister.container}>
        <BackButton handlePress={() => nav.goBack()} fromView />
        <ScrollView>
          <MainLogo keyboardUp />

          <Text style={StylesRegister.mainText}>Çok Az Kaldı!</Text>
          <View>
            <IlPicker
              selectValue={selectedCity}
              setSelectValue={setSelectedCity}
              selectedLocation
            />
          </View>

          <View>
            <IlcePicker
              selectValue={selectedTown}
              setSelectValue={setSelectedTown}
              selectedLocation={selectedCity}
              cityID={selectedCity === "seciniz" ? 0 : selectedCity.cityid}
            />
          </View>

          <View>
            <MahallePicker
              selectValue={selectedDistrict}
              setSelectValue={setSelectedDistrict}
              selectedLocation={selectedCity && selectedTown}
              countyID={selectedTown === "seciniz" ? 0 : selectedTown.countyid}
            />
          </View>

          <TxtMultilineInput
            writedValue={selectedAdress}
            pickerContent={selectedDistrict}
            onChangeText={setSelectedAdress}
            placeHolder="Adresinizi Yazınız..."
          />
          {((!buttonDisabled) && register.accountType===1) && (
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginRight: relativeWidthNum(57),
                marginTop: relativeHeightNum(29),
              }}
              onPress={() => nav.navigate("FaturaAdresi")}
            >
              <Text
                style={{ fontSize: 11, fontStyle: "italic", color: "#6C757D" }}
              >
                Fatura için Farklı Adres Kullan
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        
   {/* Bilgilendirme Satırı */}
   {/* {(register.accountType ===3 || register.accountType ===4 ) && <>
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
            }}
          />
          <Text style={{ fontSize: 11, color: "#6C757D", fontStyle: "italic", marginLeft: relativeWidthNum(10)}}>
            Ticari faaliyetlerde bulunuyorum
          </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setModalOpenState(true);
            }}
          >
            <Image
              style={{
                height: relativeHeightNum(25),
                width: relativeWidthNum(25),
              }}
              source={Info}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        </>   } */}





        <BtnMain
          buttonDisabled={buttonDisabled}
          onPress={handleNext}
          txt="Kaydet ve İlerle"
        />
      </View>


              {/*  TicariBilgilendirmeModal                                   */}
              {/* <View>
          <Modal
          transparent
            visible={modalOpenState}
            onRequestClose={() => {
              setModalOpenState(false);
            }}
          >
            <TicariBilgilendirmeModal setModalOpenState={setModalOpenState} />
          </Modal>
        </View> */}


    </ImageBackground>
  );
};

export default Bireysel2Adress;
