/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";

import CheckBox from "@react-native-community/checkbox";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Pressable } from "react-native";

import ProfileBox from "../../../../../../components/profileComponent/ProfileBox";

const WIDTH_WINDOW = Dimensions.get("window").width;

const BegeniListItem = ({ item, index, setSelectedIndex, selectedIndex }) => {
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
        {/* checkbox */}
        <View style={{ flex: 5, justifyContent: "flex-start", alignItems: "center", flexDirection: "row", paddingLeft:6 }}>
          <CheckBox
            tintColors={{ true: "#00AA9F", false: "#c1c1c1" }}
            disabled={false}
            value={selectedIndex.includes(index)}
            onValueChange={() => {
              setSelectedIndex((prevArray) => {
                console.log("setSelectedIndex render");
                if (prevArray.includes(index)) {
                  return prevArray.filter((itm) => itm !== index);
                }
                return [...prevArray, index];
              });
            }}
          />
          {item && (
            <ProfileBox
              roleID={item?.user?.userrole_id}
              userID={item?.user?.userdetail.user_id}
              userAvatar={item?.user?.userdetail?.picture_url}
              fullName={item?.user?.userdetail?.name}
              institutionName={item?.user?.userdetail?.full_institution_name}
              countryBinary={item?.user?.userdetail?.country?.binarycode}
              /* timeCalculate */
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default BegeniListItem;

const styles = StyleSheet.create({});
