/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal } from "react-native";
import { useForm } from "react-hook-form";
import { useUpdateValue } from "../../contexts/UpdateContext";
import BackButton from "../../components/btnNavigationBack/BtnNavigationBack";

import MainLogo from "../../components/mainLogo/MainLogo";
import TxtFormInput from "../../components/txtFormInput/TxtFormInput";
import InfoIcon from "./userUpdateComponents/InfoIcon";
import InfoModal from "./userUpdateComponents/InfoModal";

import BtnMain from "../../components/btnMain/BtnMain";

import StylesUserUpdate from "./StylesUserUpdate";
import TxtPhoneInput from "../../components/txtPhoneInput/TxtPhoneInput";

const UserUpdate2AccDetail = ({ setSelectedPage }) => {
  const [{ update }, dispatch] = useUpdateValue();
  
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const methods = useForm();
  const rulesPhone = {
    minLength: { value: 13, message: "Lütfen Cep Telefon Numarası Yazınız." }, // ? kontrol edilecek. mask
    required: { value: true, message: "Bu alan gerekli." },
    
  };
  
  const onPress = async (value) => {
    console.log("Onpress calisiyor..");
    console.log(value);
    console.log("value.ipnPhone ");
    console.log(value.ipnPhone);
    console.log("job ");
    console.log(job);
    dispatch({
      type: "doUpdate",
      newUpdate: { request_change_mobilephone: value.ipnPhone, request_change_position: job },
    });

    setSelectedPage(3);
  };

  useEffect(() => {
    if ( job === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [job]);

  return (
    <View style={StylesUserUpdate.container}>
      <BackButton handlePress={() => setSelectedPage(1)} fromView  />

      <MainLogo />

      <View>
        <Text style={StylesUserUpdate.mainText}>ESKİ KAYDI GÜNCELLE</Text>
        <InfoIcon setModalVisible={setModalVisible} />

        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible((prev) => !prev);
          }}
        >
          <InfoModal closePress={() => setModalVisible(false)} />
        </Modal>
      </View>
      <TxtFormInput name="ipnJob" content="notNull"  onChangeText={setJob} placeHolder="Kurumunuzdaki Görevinizi Giriniz"  />
      
      <TxtPhoneInput
          
          name="ipnPhone"
          // setPhone={setPhone}
          rules={rulesPhone}
          placeHolder="Cep Telefon Numaranızı Yazınız"  
          countryCallingCode="90"     
          {...methods}
        />
        
      

      <BtnMain buttonDisabled={buttonDisabled} onPress={methods.handleSubmit(onPress)} txt="Kaydet ve İlerle" />
    </View>
  );
};

export default UserUpdate2AccDetail;

