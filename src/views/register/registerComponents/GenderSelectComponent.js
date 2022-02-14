/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-else-return */
/* eslint-disable react/no-array-index-key */

import React, { useState } from "react";
import { StyleSheet, Text, View, Modal, Pressable, FlatList, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GenderWarningModal from "./GenderWarningModal";
import { useGetGender, useDataCountries } from "../../../helpers/connections";
import DownIcon from "../../../../assets/down-icon.png";
import DownIconW from "../../../../assets/down-icon-w.png";

const GenderSelectComponent = ({ gender, setGender, inputCheck, selectCountDate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [genderFirstClick, setGenderFirstClick] = useState(true);
  const [genderType, setGenderType] = useState(null);

  const { data, isLoading, isError } = useGetGender();

  const pressHandle = () => {
    if (genderFirstClick) {
      setGenderFirstClick(false);
      setModalVisible(true);
    } else {
      setGenderModalVisible(true);
    }
  };
  //  console.log(data);
  return (
    <Pressable disabled={!inputCheck() || !selectCountDate} onPress={pressHandle} style={styles.pressable}>
      <Text style={inputCheck() && selectCountDate ? styles.textEnable : styles.textDisable}>
        {gender === "seciniz" ? "Cinsiyet Seç" : genderType}
      </Text>
      <Image
        resizeMode="contain"
        source={inputCheck() && selectCountDate ? DownIcon : DownIconW}
        style={styles.downIcon}
      />

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible((prev) => !prev);
        }}
      >
        <GenderWarningModal closePress={() => setModalVisible(false)} />
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={genderModalVisible}
        onRequestClose={() => {
          setGenderModalVisible((prev) => !prev);
        }}
      >
        <PickerModal
          DATA={data}
          closePress={() => setGenderModalVisible(false)}
          setGender={setGender}
          setGenderType={setGenderType}
        />
      </Modal>
    </Pressable>
  );
};

const PickerModal = ({ DATA, closePress, setGender, setGenderType }) => {
  const handleSelect = (v) => {
    closePress();
    setGender(v.id);
    setGenderType(v.type);
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.innerModal}>
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tile}>
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <View style={styles.innerTile}>
                  <Text style={styles.text}>{item.type}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default GenderSelectComponent;

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    justifyContent: "center",
  },
  textEnable: {
    color: "#1E1E1C",
    paddingLeft: 5,
    fontSize: 15,
  },
  textDisable: {
    color: "#fff",
    paddingLeft: 5,
    fontSize: 15,
  },

  innerModal: {
    margin: "20%",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  modalContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#000000c4",
  },

  tile: {
    borderBottomWidth: 0.5,
    borderColor: "black",
    padding: 7,
    marginLeft: 5,
    marginRight: 5,
  },

  innerTile: {
    flexDirection: "row",
    margin: 5,
  },

  text: {
    fontSize: 16,
  },
  downIcon: {
    position: "absolute",
    zIndex: -1,
    right: 5,
    width: 25,
    height: 25,
  },
});
