/* eslint-disable consistent-return */
import React, { useState, useEffect } from "react";

import CheckBox from "@react-native-community/checkbox";
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Pressable } from "react-native";

import { Flags } from "../../../../../../components/FlagExporter";

/* 
import ContentOpenIcon from "../../../../../../assets/vexmail/icerik-ac.png";
import ContentCloseIcon from "../../../../../../assets/vexmail/icerik-kapa.png";

import FuarCerceveIcon from "../../../../../../assets/fuar/fuar-cerceve-turkuaz.png";
import SalonCerceveIcon from "../../../../../../assets/salon/salon-cerceve-turkuaz.png";
import StantCerceveIcon from "../../../../../../assets/stant/stant-cerceve-turkuaz.png";

import TarihIcon from "../../../../../../assets/stant/menu/dokuman/tarih.png";
import SaatIcon from "../../../../../../assets/stant/menu/dokuman/saat.png";
import KonumIcon from "../../../../../../assets/stant/menu/dokuman/konum.png"; 
*/

import GelenKartvizitIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-kartvizit.png";
import GidenKartvizitIcon from "../../../../../../../assets/stant/menu/dokuman/giden-kartvizit.png";
import GelenBrosurIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-brosur.png";
import GidenBrosurIcon from "../../../../../../../assets/stant/menu/dokuman/giden-brosur.png";
import GelenVexDriveIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-vexdrive.png";
import GidenVexDriveIcon from "../../../../../../../assets/stant/menu/dokuman/giden-vexdrive.png";
import ProfileBox from "../../../../../../components/profileComponent/ProfileBox";

const WIDTH_WINDOW = Dimensions.get("window").width;

const DokumanListeItem = ({ item, index, setSelectedIndex, documentType, selectedIndex, setSelectedItem }) => {
  const [user, setUser] = useState(null);
  // const [contentOpen, setContentOpen] = useState(false);

  /*   console.log("item render");
  console.log(contentOpen);
  console.log("------"); */

  useEffect(() => {
    if (documentType === "giden-kartvizit" || documentType === "giden-brosur" || documentType === "giden-vexdrive") {
      setUser(item.contacted_user);
      console.log(item);
    } else {
      setUser(item.user);
      console.log(item);
    }
  }, []);

  const setUyelikTuru = () => {
    if (user?.userrole_id === 1) {
      return "Bireysel";
    }
    if (user?.userrole_id === 2) {
      return "Ticari";
    }
    if (user?.userrole_id === 3) {
      return "Kamu";
    }
    if (user?.userrole_id === 4) {
      return "STK";
    }
  };

  const setTypeIcon = () => {
    switch (documentType) {
      case "giden-kartvizit":
        return GidenKartvizitIcon;

      case "gelen-kartvizit":
        return GelenKartvizitIcon;

      case "giden-brosur":
        return GidenBrosurIcon;

      case "gelen-brosur":
        return GelenBrosurIcon;

      case "giden-vexdrive":
        return GidenVexDriveIcon;

      case "gelen-vexdrive":
        return GelenVexDriveIcon;

      default:
        break;
    }
  };

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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        </View>
        {/* ? setSelectedIndex((prevArray) => [...prevArray, index])
            : setSelectedIndex(selectedIndex.filter((itm) => itm !== index)) */}

        <View style={{ flex: 5 }}>
          {user && (
            <ProfileBox
              roleID={user?.userrole_id}
              userID={user?.userdetail.user_id}
              userAvatar={user?.userdetail?.picture_url}
              fullName={user?.userdetail?.name}
              institutionName={user?.userdetail?.full_institution_name}
              countryBinary={user?.userdetail?.country?.binarycode}
              /* timeCalculate */
            />
          )}
        </View>

        {/* foto */}
        {/*  <View style={{ flex: 1.3, justifyContent: "center", alignItems: "flex-start" }}>
          <Image
            style={{ height: WIDTH_WINDOW / 7, width: WIDTH_WINDOW / 7 }}
            source={{ uri: user?.userdetail?.picture_url }}
            resizeMode="contain"
          />
        </View>

       // kullanıcı bilgi 
        <View style={{ flex: 3.3, justifyContent: "center" }}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={{ color: "#6C757D", fontSize: 13 }}>
            {user?.userrole_id === 1 ? user?.userdetail?.name : user?.userdetail?.full_institution_name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 2 }}>
              <Image
                style={{ height: 20, width: 20 }}
                source={Flags[user?.userdetail?.country?.binarycode.toLowerCase()]}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.textUserInfo}>{user?.userdetail?.country?.binarycode}</Text>
            <Text style={[styles.textUserInfo, { paddingLeft: 10 }]}>{setUyelikTuru()}</Text>
          </View>
        </View> */}

        {/* dokuman tipi */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          {documentType !== "giden-vexdrive" && (
            <TouchableOpacity
              style={{
                height: WIDTH_WINDOW / 15,
                width: WIDTH_WINDOW / 15,
                elevation: 5,
                backgroundColor: "#FFFFFF",
                padding: 2,
              }}
              onPress={() => setSelectedItem(item)}
            >
              <Image style={{ height: "100%", width: "100%" }} source={setTypeIcon()} resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>

        {/* yukarı aşağı ok */}
        {/*   <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
          <Image
            style={{ height: WIDTH_WINDOW / 12, width: WIDTH_WINDOW / 12 }}
            source={contentOpen ? ContentCloseIcon : ContentOpenIcon}
            resizeMode="contain"
          />
        </View> */}
      </View>

      {/* itemların altında açılan info tab ı */}
      {/*   {contentOpen && (
        <View
          style={{
            height: 100,
            flex: 1,
            flexDirection: "row",
            borderWidth: 0.5,
            marginHorizontal: 5,
            marginBottom: 5,
            borderColor: "#c1c1c1",
          }}
        >
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                borderColor: "#c1c1c1",
                borderBottomWidth: 0.5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: 25, width: 25, marginHorizontal: 5 }}
                source={FuarCerceveIcon}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 10, color: "#6C757D", paddingRight: 5 }}>{item.booths.hall.expo.name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{ height: 25, width: 25, marginHorizontal: 5 }}
                source={StantCerceveIcon}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 10, color: "#6C757D", paddingRight: 5 }}>{item.booths.name}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              borderColor: "#c1c1c1",
              borderLeftWidth: 0.5,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 3 }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  borderColor: "#c1c1c1",
                  borderBottomWidth: 0.5,
                }}
              >
                <Image
                  style={{ height: 25, width: 25, marginHorizontal: 5 }}
                  source={SalonCerceveIcon}
                  resizeMode="contain"
                />
                <Text style={{ fontSize: 10, color: "#6C757D", paddingRight: 5 }}>{item.booths.hall.name}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <Image style={{ height: 25, width: 25, marginHorizontal: 5 }} source={TarihIcon} resizeMode="contain" />
                <Text style={{ fontSize: 10, color: "#6C757D", paddingRight: 5 }}>{item.booths.started_at}</Text>
              </View>
            </View>
            <View style={{ flex: 1, borderColor: "#c1c1c1", borderLeftWidth: 0.5 }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "#c1c1c1",
                  borderBottomWidth: 0.5,
                }}
              >
                <Image style={{ height: 20, width: 20, marginHorizontal: 5 }} source={KonumIcon} resizeMode="contain" />
                <Text style={{ fontSize: 10, color: "#6C757D" }}>C1</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Image style={{ height: 20, width: 20, marginHorizontal: 5 }} source={SaatIcon} resizeMode="contain" />
                <Text style={{ fontSize: 10, color: "#6C757D" }}>11:01</Text>
              </View>
            </View>
          </View>
        </View>
      )} */}
    </Pressable>
  );
};

export default DokumanListeItem;

const styles = StyleSheet.create({

});
