/* eslint-disable consistent-return */
import React, { useState, useRef } from "react";

import CheckBox from "@react-native-community/checkbox";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Pressable } from "react-native";

import { Tooltip } from "react-native-elements";

import { Flags } from "../../../../../../components/FlagExporter";

import TDotV from "../../../../../../../assets/three-dot-v.png";
import ProfileBox from "../../../../../../components/profileComponent/ProfileBox";

const WIDTH_WINDOW = Dimensions.get("window").width;

const ErisimListItem = ({ item }) => {
  const [tooltipVpos, setTooltipVpos] = useState(2000);

  const dotRef = useRef(null);

  const setUyelikTuru = () => {
    if (item?.user?.userrole_id === 1) {
      return "Bireysel";
    }
    if (item?.user?.userrole_id === 2) {
      return "Ticari";
    }
    if (item?.user?.userrole_id === 3) {
      return "Kamu";
    }
    if (item?.user?.userrole_id === 4) {
      return "STK";
    }
  };

  const tooltipPopover = () => {
    return (
      <View style={styles.tooltipContainer}>
        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Profil tıklandı")}>
          <Text style={styles.tooltipText}>Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Mesaj tıklandı")}>
          <Text style={styles.tooltipText}>Mesaj</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Teşekkür tıklandı")}>
          <Text style={styles.tooltipText}>Teşekkür Et</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Pressable
      style={{
        width: WIDTH_WINDOW - 20,
        height: 70,
        margin: 5,
        paddingLeft: 5,
        elevation: 6,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
      }}
      onPress={() => console.log("bakıcaz ")}
    >
      <View style={{ height: 80, flexDirection: "row" }}>
        <View style={{ flex: 4.6, justifyContent: "center", alignItems: "flex-start" }}>
          <ProfileBox
            roleID={item?.user?.userrole_id}
            userID={item?.user?.userdetail.user_id}
            userAvatar={item?.user?.userdetail.picture}
            fullName={item?.user?.userdetail.name}
            institutionName={item?.user?.full_institution_name}
            countryBinary={item?.user?.userdetail.country?.binarycode}
            // timeCalculate
          />
        </View>

        {/* yukarı aşağı ok */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
          <Tooltip
            onOpen={() => dotRef.current.measure((a, b, width, height, px, py) => setTooltipVpos(py))}
            containerStyle={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#EEEEEE",
              top: tooltipVpos + 14,
              left: 190,
            }}
            //          overlayColor="#00AA9F30"
            skipAndroidStatusBar
            height={110}
            width={110}
            backgroundColor="#FFFFFF"
            withPointer={false}
            popover={tooltipPopover()}
          >
            <Image
              ref={dotRef}
              style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
              source={TDotV}
              resizeMode="contain"
            />
          </Tooltip>
        </View>
      </View>
    </Pressable>
  );
};

export default ErisimListItem;

const styles = StyleSheet.create({
  // tooltips styles
  tooltipContainer: {
    alignSelf: "flex-start",
  },

  tooltipItems: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 7,
  },

  tooltipText: {
    color: "#6C757D",
    marginLeft: 5,
  },
});
