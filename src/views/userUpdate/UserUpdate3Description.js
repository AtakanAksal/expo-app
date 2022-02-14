/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from "react-native";
import { useForm } from "react-hook-form";
import { useUpdateValue } from "../../contexts/UpdateContext";
import BackButton from "../../components/btnNavigationBack/BtnNavigationBack";

import MainLogo from "../../components/mainLogo/MainLogo";
import InfoIcon from "./userUpdateComponents/InfoIcon";
import InfoModal from "./userUpdateComponents/InfoModal";
import TxtMultilineInput from "../../components/txtMultilineInput/TxtMultilineInput";

import BtnMain from "../../components/btnMain/BtnMain";

import StylesUserUpdate from "./StylesUserUpdate";
import { postStoreAuthoritychange } from "../../helpers/connections";

const UserUpdate3Description = ({ setSelectedPage }) => {
  const [{ update }, dispatch] = useUpdateValue();
  const [descriptionValue, setDescriptionValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [serverResponse, setServerResponse] = useState([]);
  /* useEffect(() => {
    postStoreAuthoritychange()
    .then((res) => setServerResponse(res))
    .catch((err) => console.log(err))
   }, []);  */

  const postData = new FormData();
   
  const handleNext = () => {
    dispatch({ type: "doUpdate", newUpdate: { description : descriptionValue } });
    postData.append("user_id", update.user_id);   
    postData.append("request_change_firstname", update.request_change_firstname);
    postData.append("request_change_lastname", update.request_change_lastname);
    postData.append("request_change_mail", update.request_change_mail);
    postData.append("description",  descriptionValue);
    postData.append("request_change_mobilephone", update.request_change_mobilephone);
    postData.append("request_change_position", update.request_change_position);
    postData.append("is_user_logged_in_while_sending", false);
    console.log('postData');
    console.log(postData);
    postStoreAuthoritychange(postData)
    .then(() => setSelectedPage(4))
    .catch((err) => console.log(err)); // ?
     
  };

  useEffect(() => {
    if (descriptionValue === "") {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [descriptionValue]);

  return (
    <View style={StylesUserUpdate.container}>
      <BackButton handlePress={() => setSelectedPage(2)} fromView />

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

      <TxtMultilineInput
        content="notNull"
        onChangeText={setDescriptionValue}
        placeHolder="Lütfen Açıklama Metni Giriniz..."
      />

      <BtnMain buttonDisabled={buttonDisabled} onPress={handleNext} txt="Kaydet ve İlerle" />
    </View>
  );
};

export default UserUpdate3Description;
