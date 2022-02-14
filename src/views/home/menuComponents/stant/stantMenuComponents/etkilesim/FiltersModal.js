/* eslint-disable consistent-return */
import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Pressable, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import ContentOpenIcon from "../../../../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../../../../assets/vexmail/icerik-kapa.png";
import PickerCountryModal from "../../../../../../components/txtPhoneInput/PickerCountryModal";

const WIDTH_WINDOW = Dimensions.get("window").width;

const FiltersModal = ({ closePress, selectedRole, setSelectedRole, selectedCountry, setSelectedCountry }) => {
  const [role, setRole] = useState(selectedRole);
  const [countryIn, setCountryIn] = useState(selectedCountry);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={closePress}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>Etkileşim Filtrele</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setRole(0);
            setCountryIn(null);
            setSelectedRole(0);
            setSelectedCountry(null);
          }}
        >
          <Text style={{ color: "#00AA9F", fontSize: 18, paddingRight: 10 }}>Filtreyi Temizle</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FilterUyelikType role={role} setRole={setRole} />
        <FilterCountry countryIn={countryIn} setCountryIn={setCountryIn} />

        {/* <TouchableOpacity onPress={() => handleFilter({ country: "TR", role: 1 })}>
          <Text>asd</Text>
        </TouchableOpacity> */}
        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center", marginBottom: 20 }}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => {
              setSelectedRole(role);
              setSelectedCountry(countryIn);
              closePress();
            }}
          >
            <Text style={styles.mainButtonText}>Görüntüle</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
/* onPress={(closePress, () => {setSelectedRole(role)})}> */
export default FiltersModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  headFrame: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  
  },
  mainButton: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    width: WIDTH_WINDOW - 20,
    height: 45,
    backgroundColor: "#00AA9F",
  },

  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  /*   textUserInfo: {
    textAlignVertical: "center",
    fontSize: 10,
    color: "#6C757D",
  }, */
});

const FilterUyelikType = ({ role, setRole }) => {
  const [contentOpen, setContentOpen] = useState(false);

  return (
    <Pressable
      style={{
        width: WIDTH_WINDOW - 20,
        height: contentOpen ? 160 : 50, // contentOpen ? 80 : 180
        margin: 5,
        justifyContent: "center",
      }}
      onPress={() => setContentOpen((prevState) => !prevState)}
    >
      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* item desc */}
        <Text style={{ color: role === 0 ? "#6C757D" : "#00AA9F", fontSize: 18 }}>
          {{ 0: "Üyelik Tipi", 1: "Bireysel Üyelik", 2: "Ticari Üyelik", 3: "Kamu Üyeliği", 4: "STK Üyeliği" }[role]}
        </Text>
        {/* yukarı aşağı ok */}
        <View style={{ justifyContent: "center" }}>
          <Image
            style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
            source={contentOpen ? ContentCloseIcon : ContentOpenIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* itemların altında açılan info tab ı */}
      {contentOpen && (
        <View
          style={{
            height: 100,
            flex: 1,
            paddingHorizontal: 10,
            marginHorizontal: 5,
            marginBottom: 5,
          }}
        >
          <TouchableOpacity
            style={{ height: 30 }}
            onPress={() => {
              setRole(1);
              setContentOpen(false);
            }}
          >
            <Text style={{ color: "#6C757D", fontSize: 15 }}>Bireysel Üyelik</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 30 }}
            onPress={() => {
              setRole(2);
              setContentOpen(false);
            }}
          >
            <Text style={{ color: "#6C757D", fontSize: 15 }}>Ticari Üyelik</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 30 }}
            onPress={() => {
              setRole(3);
              setContentOpen(false);
            }}
          >
            <Text style={{ color: "#6C757D", fontSize: 15 }}>Kamu Üyeliği</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ height: 30 }}
            onPress={() => {
              setRole(4);
              setContentOpen(false);
            }}
          >
            <Text style={{ color: "#6C757D", fontSize: 15 }}>STK Üyeliği</Text>
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
};

const FilterCountry = ({ countryIn, setCountryIn }) => {
  const [madalVisible, setMadalVisible] = useState(false);

  const onSelect = (v) => {
    console.log(v);
    setCountryIn(v);
  };

  return (
    <Pressable
      style={{
        width: WIDTH_WINDOW - 20,
        height: 50,
        margin: 5,
        justifyContent: "center",
      }}
      onPress={() => setMadalVisible((prevState) => !prevState)}
    >
      <View
        style={{
          height: 50,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* item desc */}
        <Text style={{ color: !countryIn ? "#6C757D" : "#00AA9F", fontSize: 18 }}>
          {countryIn ? countryIn.countryname : "Ülke"}
        </Text>
        {/* yukarı aşağı ok */}
        <View style={{ justifyContent: "center" }}>
          <Image
            style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
            source={ContentOpenIcon}
            resizeMode="contain"
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        visible={madalVisible}
        onRequestClose={() => {
          setMadalVisible((prev) => !prev);
        }}
      >
        <PickerCountryModal closePress={() => setMadalVisible(false)} onSelect={onSelect} />
      </Modal>
    </Pressable>
  );
};
