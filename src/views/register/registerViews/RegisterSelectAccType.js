/* eslint-disable react-native/no-raw-text */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Modal,
  Image,
} from "react-native";
import { useRegisterValue } from "../../../contexts/RegisterContext";  
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";
import {
  relativeHeightNum,
  relativeWidthNum,
} from "../../../utils/HelperFunctions";

import BackButton from "../../../components/btnNavigationBack/BtnNavigationBack";
import MainLogo from "../../../components/mainLogo/MainLogo";

import StylesRegister from "../StylesRegister";

import BtnMain from "../../../components/btnMain/BtnMain";
import { getUserRole } from "../../../helpers/connections";
import BackgroundImage from "../../../../assets/register_background.jpg";
import TicariBilgilendirmeModal from "./TicariBilgilendirmeModal";
import Info from "../../../../assets/register/info-yeni.png";
import { opacity } from "styled-system";

const  RegisterSelectAccType = () => {
  const [selectedType, setSelectedType] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [accountTypes, setAccountTypes] = useState(null);
  const [modalOpenState, setModalOpenState] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [{ register }, dispatch] = useRegisterValue();
  const nav = useNavigation();

  useEffect(() => {
    if (selectedType === 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [selectedType]);

  useEffect(() => {
    getUserRole()
      .then((res) => {
        setAccountTypes(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const selectType = () => {
    // seçiniz : 0,  Bireysel :1,  Ticari: 2, Kamu :3, Stk :4

    dispatch({
      type: "changeRegister",
      newRegister: { accountType: selectedType  },
    }); 
    // nav.navigate("AccountInfo");
// if(toggleCheckBox){
//     nav.navigate("RegisterSelectSecType"); // bu kamu ve sk için düzenlenecek
// }else{

    switch (selectedType) {
      case 1:
        nav.navigate("AccountInfo");
        break;
      case 2:
        nav.navigate("FirmaIsmiUnvan");
        break;
      case 3:
        {
        
          if (register.countryId === 212) {
            nav.navigate("Kamu1Statu");
            } else {
              nav.navigate("FirmaIsmiUnvan");
            }
         }
        break;
      case 4:
        nav.navigate("FirmaIsmiUnvan");
        break;
      default:
        break;
    }
//     }
  };
console.log("selectedType :  ", selectedType);
  return (
    <ImageBackground style={[{ flex: 1 }, modalOpenState? {opacity:0.3}:null]} source={BackgroundImage}>
      <View style={StylesRegister.container}>
        <BackButton handlePress={() => nav.goBack()} fromView />

        <MainLogo />

        <Text style={StylesRegister.mainText}>Üyelik Türünü Seçin</Text>

        <View style={ selectedType===0? StylesRegister.pickerContainer : StylesRegister.pickerContainerSelected }>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
            mode="dialog"
            style={StylesRegister.picker}
          >
            <Picker.Item label="Seçiniz" value={0} enable={false} />
            {accountTypes &&
              accountTypes.map((el) => (
                <Picker.Item label={el.user_type} value={el.id} key={el.id} />
              ))}
          </Picker>
        </View>

        {
          {
            0: null,
            1: (
              <View style={StylesRegister.longTextContainer}>
                <Text style={StylesRegister.longTextNorm}>
                  {`* Üyeliğinize `}{" "}
                  <Text style={StylesRegister.longTextAccent}>
                    Bireysel Üye{" "}
                  </Text>
                  <Text style={StylesRegister.longTextNorm}>
                    olarak devam edilecektir. Bireysel Üyeler diğer
                    üyeliklerinin yararlandığı avantajlı hizmetlerden
                    yararlanamamaktadır.
                  </Text>
                </Text>
              </View>
            ),
            2: (
              <View style={StylesRegister.longTextContainer}>
                <Text style={StylesRegister.longTextNorm}>
                  {`* `}{" "}
                  <Text style={StylesRegister.longTextAccent}>
                    Ticari Üyelikler{" "}
                  </Text>
                  <Text style={StylesRegister.longTextNorm}>
                    resmi ve faal bir tüzel kişiliğe sahip olmalıdırlar. EXPO,
                    Ticari Üyeler için gerekli belgeler talep edebilir.
                  </Text>
                </Text>
              </View>
            ),
            3: (
              <View style={StylesRegister.longTextContainer}>
                <Text style={StylesRegister.longTextNorm}>
                  {`* `}{" "}
                  <Text style={StylesRegister.longTextAccent}>
                    Kamu Üyelikler{" "}
                  </Text>
                  <Text style={StylesRegister.longTextNorm}>
                    sadece resmi hizmette bulunan Türkiye Cumhuriyeti Kamu Kurum
                    ve Kuruluşları içindir. Kurumlar adına başvuruda bulunmak
                    bazı belgeleri ibraz etme ve kurum adına sorumluluk alabilme
                    gerektirir. Yetkisiz kişilerin işlemleri veya yetkililerce
                    onay verilmeyen başvuru sahipleri yasal sorumluluklara maruz
                    kalabilirler.
                  </Text>
                </Text>
              </View>
            ),
            4: (
              <View style={StylesRegister.longTextContainer}>
                <Text style={StylesRegister.longTextNorm}>
                  {`* `}{" "}
                  <Text style={StylesRegister.longTextAccent}>
                    Sivil Toplum Kuruluşu üyelikleri{" "}
                  </Text>
                  <Text style={StylesRegister.longTextNorm}>
                    resmi ve faal bir tüzel kişiliğe sahip olan kuruluşlara
                    özeldir. EXPO bu STK üyeliğinize dair bazı belgeleri talep
                    edebilir.
                  </Text>
                </Text>
              </View>
            ),
          }[selectedType]
        }


     
        <BtnMain
          buttonDisabled={buttonDisabled}
          onPress={() => selectType()}
          txt="Kaydet ve İlerle"
        />
        



      </View>
    </ImageBackground>
  );
};

export default RegisterSelectAccType;
