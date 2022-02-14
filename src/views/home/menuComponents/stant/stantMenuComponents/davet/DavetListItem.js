
import React, { useState } from "react";

import CheckBox from "@react-native-community/checkbox";
import { StyleSheet, View, Dimensions, Pressable, TouchableOpacity, Text, Modal } from "react-native";

import ProfileBox from "../../../../../../components/profileComponent/ProfileBox";
import SikayetDetail from "./SikayetDetail";

const WIDTH_WINDOW = Dimensions.get("window").width;

const DavetListItem = ({ item }) => {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
// console.log(item);
  return (
    <Pressable
      style={{
        width: WIDTH_WINDOW - 20,
        // height: contentOpen ? 170 : 70, // contentOpen ? 80 : 180
        height: 70,
        margin: 5,
        elevation: 6,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
      }}
      // onPress={() => setContentOpen((prevState) => !prevState)}
    >
      <View style={{ height: 70, flexDirection: "row" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            paddingLeft: WIDTH_WINDOW / 75,
          }}
        >
          {item && (
            <ProfileBox
              roleID={item?.user?.userrole_id}
              userID={item?.user?.userdetail.user_id}
              userAvatar={item?.user?.userdetail?.picture}
              fullName={item?.user?.userdetail?.name}
              institutionName={item?.user?.userdetail?.full_institution_name}
              countryBinary={item?.user?.userdetail?.country?.binarycode}
              /* timeCalculate */
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setDetailModalVisible(true);
          }}
          style={{ flex: 1, alignItems: "flex-end", paddingRight: WIDTH_WINDOW / 20, justifyContent: "center" }}
        >
          <Text style={{ color: "#6C757D", fontSize: 8 }}>01.01.2022 - 16:32</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent
        animationType="slide"
        visible={detailModalVisible}
        onRequestClose={() => {
          setDetailModalVisible((prev) => !prev);
        }}
      >
        <SikayetDetail closePress={() => setDetailModalVisible(false)} sikayetData={item} />
      </Modal>
    </Pressable>
  );
};

export default DavetListItem;

const styles = StyleSheet.create({});
