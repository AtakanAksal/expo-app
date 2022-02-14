/* eslint-disable no-else-return */
import React from "react";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { useUserValue } from "../../contexts/UserContext";

import { Flags } from "../FlagExporter";

import ExpoLogo from "../../../assets/icon.png";
import profilePlaceholder from "../../../assets/general/profile.png";

const ekran = Dimensions.get("window");
const calculatedSize = ekran.width / 6;

const ProfileBox = ({
  roleID,
  userID,
  userAvatar,
  fullName,
  institutionName,
  countryBinary,
  timeCalculate,
  timeShow,
}) => {
  const nav = useNavigation();
  const [{ user }] = useUserValue();

  return (
    <TouchableOpacity
      style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}
      // onPress={() => nav.navigate("OtherProfile", { userID })}
      onPress={
        user.userid === userID ? () => /* nav.jumpTo("profile")  */ null : () => nav.navigate("OtherProfile", { userID })
      } /* jampto- - menü beğeniler içinden kendi profiline gidince stack i unutuyor o yüzden kapatıldı */
    >
      <View style={{ justifyContent: "center" }}>
        <Image
          style={styles.avatar}
          source={userAvatar ? { uri: userAvatar } : profilePlaceholder}
          resizeMode="contain"
        />
        {/* <Image style={styles.avatar} source={{ uri: userAvatar }} resizeMode="contain" /> */}
      </View>

      <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 10, alignItems: "flex-start" }}>
        <Text style={{ fontSize: 13, color: "#6C757D", fontWeight: "bold" }} numberOfLines={2} ellipsizeMode="tail">
          {roleID && roleID === 1 ? fullName : institutionName}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <View
            style={{
              marginRight: 2 /**  borderWidth: 0.5, borderColor:"#EEEEEE"  // beyaz bayraklara çerçeve için */,
            }}
          >
            <Image
              style={{ height: 20, width: 20 }}
              source={Flags[countryBinary?.toLowerCase()]}
              resizeMode="contain"
            />
          </View>
          <Text style={{ fontSize: 10, textAlignVertical: "center", color: "#6C757D" }}>
            {countryBinary?.toUpperCase()}
          </Text>

          <Text style={{ paddingLeft: 10, fontSize: 10, textAlignVertical: "center", color: "#6C757D" }}>
            {setUyelikTuru(roleID)}
          </Text>
        </View>
        {timeCalculate && (
          <>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 11, textAlignVertical: "center", color: "#6C757D" }}>
                {/* {dayjs('1999-01-01').fromNow() }s ●{" "} */}
                {calculateTime(timeCalculate)} ●{" "}
              </Text>
              <Image style={{ height: 11, width: 11, alignSelf: "center" }} source={ExpoLogo} resizeMode="contain" />
            </View>
          </>
        )}
        {timeShow && (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 10, color: "#6C757D" }} numberOfLines={2} ellipsizeMode="tail">
              {dayjs(new Date(timeShow)).format("DD.MM.YYYY - H:mm")}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileBox;

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
    height: calculatedSize,
    width: calculatedSize,
  },
});

const setUyelikTuru = (roleID) => {
  if (roleID === 1) {
    return "Bireysel";
  }
  if (roleID === 2) {
    return "Ticari";
  }
  if (roleID === 3) {
    return "Kamu";
  }
  if (roleID === 4) {
    return "STK";
  }
  return null;
};

const calculateTime = (timeCalculate) => {
  // console.log(dayjs(new Date()).format("DD.MM.YYYY H:mm:s"));
  // console.log(dayjs(new Date()).diff(timeCalculate, "hour"));
  // const secondDiff = dayjs(new Date()).diff(timeCalculate, "second");
  // const hourDiff = dayjs(new Date()).diff(timeCalculate, "hour");
  // console.log(hourDiff);

  if (dayjs(new Date()).diff(timeCalculate, "second") < 60) {
    // console.log(`${dayjs(new Date()).diff(timeCalculate, "second")} saniye`);
    return `${dayjs(new Date()).diff(timeCalculate, "second")}sn`;
  } else if (dayjs(new Date()).diff(timeCalculate, "minute") < 60) {
    // console.log(`${dayjs(new Date()).diff(timeCalculate, "minute")} dakika`);
    return `${dayjs(new Date()).diff(timeCalculate, "minute")}d`;
  } else if (dayjs(new Date()).diff(timeCalculate, "hour") < 24) {
    // console.log(`${dayjs(new Date()).diff(timeCalculate, "hour")} Saat`);
    return `${dayjs(new Date()).diff(timeCalculate, "hour")}s`;
  } else if (dayjs(new Date()).diff(timeCalculate, "day") < 30) {
    // console.log(`${dayjs(new Date()).diff(timeCalculate, "day")} gün`);
    return `${dayjs(new Date()).diff(timeCalculate, "day")}g`;
  } else if (dayjs(new Date()).diff(timeCalculate, "month") < 12) {
    // console.log(`${dayjs(new Date()).diff(timeCalculate, "month")} ay`);
    return `${dayjs(new Date()).diff(timeCalculate, "month")}ay`;
  } else {
    // console.log(`${dayjs(new Date()).diff(timeCalculate, "year")} yıl`);
    return `${dayjs(new Date()).diff(timeCalculate, "year")}yıl`;
  }

  /* if (hourDiff>484) {
  console.log("olduu !!!!!!!!!!!!");
}else{
  console.log("-- :(");
} */
};
