/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react-native/no-unused-styles */
/* eslint-disable no-undef */
import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, Fragment, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import BackButton from "../../components/btnNavigationBack/BtnNavigationBack";
import { useUpdateValue } from "../../contexts/UpdateContext";

import MainLogo from "../../components/mainLogo/MainLogo";
import TxtFormInput from "../../components/txtFormInput/TxtFormInput";
import InfoIcon from "./userUpdateComponents/InfoIcon";
import InfoModal from "./userUpdateComponents/InfoModal";

import BtnMain from "../../components/btnMain/BtnMain";

import StylesUserUpdate from "./StylesUserUpdate";
import TxtValidationInput from "../../components/txtFormInput/TxtValidationInput";

const UserUpdate1AccInfo = ({ setSelectedPage }) => {
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const methods = useForm();

  const nav = useNavigation();

  const [{ update }, dispatch] = useUpdateValue();

  const rulesEmail = {
    // minLength: { value: 2, message: "En az 2 karakter giriniz." },
    required: { value: true, message: "Bu alan gerekli." },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "E-posta Adresi Hatalı",
    },
  };

  const onPress = async (value) => {
    dispatch({
      type: "doUpdate",
      newUpdate: { request_change_firstname: name, request_change_lastname: name, request_change_mail:  value.ipnEmail, },
    });

    setSelectedPage(2);
  };

  useEffect(() => {
    if (name === "" || Object.keys(methods.formState.errors).length > 0) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [name, methods.formState]);

  return (
    <View style={StylesUserUpdate.container}>
      <BackButton handlePress={() => nav.goBack()} fromView />

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
      <TxtFormInput content="notNull" onChangeText={setName} placeHolder="Adınızı ve Soyadınızı Giriniz" />

      <TxtValidationInput
        content="notNull"
        name="ipnEmail"
        rules={rulesEmail}
        placeHolder="E-mail Adresiniz"
        noUppercase="none"
        {...methods}
      />

      <BtnMain buttonDisabled={buttonDisabled} onPress={methods.handleSubmit(onPress)} txt="Kaydet ve İlerle" />
    </View>
  );
};

export default UserUpdate1AccInfo;
