/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from "react-native";

import { Tooltip } from "react-native-elements";

import { Flags } from "../../../../../../components/FlagExporter";

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import FuarCerceveIcon from "../../../../../../../assets/fuar/fuar-cerceve-turkuaz.png";
import SalonCerceveIcon from "../../../../../../../assets/salon/salon-cerceve-turkuaz.png";
import StantCerceveIcon from "../../../../../../../assets/stant/stant-cerceve-turkuaz.png";

import TarihIcon from "../../../../../../../assets/stant/menu/dokuman/tarih.png";
import SaatIcon from "../../../../../../../assets/stant/menu/dokuman/saat.png";
import KonumIcon from "../../../../../../../assets/stant/menu/dokuman/konum.png";

import GelenKartvizitIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-kartvizit.png";
import GidenKartvizitIcon from "../../../../../../../assets/stant/menu/dokuman/giden-kartvizit.png";
import GelenBrosurIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-brosur.png";
import GidenBrosurIcon from "../../../../../../../assets/stant/menu/dokuman/giden-brosur.png";
import GelenVexDriveIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-vexdrive.png";
import GidenVexDriveIcon from "../../../../../../../assets/stant/menu/dokuman/giden-vexdrive.png";

import stantYayindaIcon from "../../../../../../../assets/stant/stant-cerceve-yayinda.png";
import stantYayinBitenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-biten.png";
import stantYayinBekleyenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";

import TDotH from "../../../../../../../assets/three-dot-h.png";
import ProfileBox from "../../../../../../components/profileComponent/ProfileBox";
import StantInfoHeader from "../../StantInfoHeader";


const WIDTH_WINDOW = Dimensions.get("window").width;

const DokumanItemDetailModal = ({ closePress, selectedItem, documentType, dItem }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (documentType === "giden-kartvizit" || documentType === "giden-brosur" || documentType === "giden-vexdrive") {
      setUser(selectedItem.contacted_user);
      // console.log(selectedItem);
    } else {
      setUser(selectedItem.user);
      // console.log(selectedItem);
    }
  }, []);

  const setUyelikTuru = () => {
    if (user?.userdetail?.userrole_id === 1) {
      return "Bireysel";
    }
    if (user?.userdetail?.userrole_id === 2) {
      return "Ticari";
    }
    if (user?.userdetail?.userrole_id === 3) {
      return "Kamu";
    }
    if (user?.userdetail?.userrole_id === 4) {
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

  const getMainText = () => {
    switch (documentType) {
      case "giden-kartvizit":
        return "Giden Kartvizit";

      case "gelen-kartvizit":
        return "Gelen Kartvizit";

      case "giden-brosur":
        return "Giden Broşür";

      case "gelen-brosur":
        return "Gelen Broşür";

      case "giden-vexdrive":
        return "Giden VexDrive";

      case "gelen-vexdrive":
        return "Gelen VexDrive";
      default:
        break;
    }
  };

  const getMainIcon = () => {
    switch (dItem.status) {
      case 1:
        return stantYayindaIcon;
      case 2:
        return stantYayinBitenIcon;
      case 3:
        return stantYayinBekleyenIcon;
      default:
        break;
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

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Ekle tıklandı")}>
          <Text style={styles.tooltipText}>Ekle</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tooltipItems} onPress={() => console.log("Sil tıklandı")}>
          <Text style={styles.tooltipText}>Sil</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headFrame}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <TouchableOpacity onPress={closePress}>
            <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", fontSize: 20 }}>
            {dItem.name} - {getMainText()}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
   
        <StantInfoHeader  stant={dItem} />
       

        <View style={{ flex: 1, paddingBottom: 20 }}>
          <View style={{ flex: 8 }}>
            <View style={{ flex: 5 }}>
              {/* tooltip container */}
              <View style={{ position: "absolute", top: 0, right: 5, zIndex: 1 }}>
                <Tooltip
                  containerStyle={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#EEEEEE",
                    top: WIDTH_WINDOW / 2.2,
                    left: WIDTH_WINDOW / 1.6,
                  }}
                  //          overlayColor="#00AA9F30"
                  skipAndroidStatusBar
                  height={160}
                  width={100}
                  backgroundColor="#FFFFFF"
                  withPointer={false}
                  popover={tooltipPopover()}
                >
                  <Image
                    style={{ height: 40, width: 40, alignSelf: "center", backgroundColor: "#FFFFFF70" }}
                    source={TDotH}
                    resizeMode="contain"
                  />
                </Tooltip>
              </View>
              <Image
                style={{
                  width: WIDTH_WINDOW / 1.2,
                  justifyContent: "center",
                  alignSelf: "center",
                  height: "100%",
                }}
                source={{ uri: selectedItem.shareable.file_url }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                flex: 1,
                width: WIDTH_WINDOW - 20,
                marginTop: 5,
                elevation: 5,
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
              }}
            >
              <View style={{ height: WIDTH_WINDOW / 7, flexDirection: "row", paddingHorizontal: 5 }}>
                <View style={{ flex: 4.6, justifyContent: "center", alignItems: "flex-start" }}>
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

                {/* dokuman tipi */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <View
                    style={{
                      height: WIDTH_WINDOW / 15,
                      width: WIDTH_WINDOW / 15,
                      backgroundColor: "#FFFFFF",
                      padding: 2,
                    }}
                  >
                    <Image style={{ height: "100%", width: "100%" }} source={setTypeIcon()} resizeMode="contain" />
                  </View>
                </View>
              </View>

              {/* itemların altında açılan info tab ı */}
              {/* 
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
                    <Text style={{ fontSize: 10, color: "#6C757D", paddingRight: 5 }}>
                      {selectedItem.booths.hall.expo.name}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{ height: 25, width: 25, marginHorizontal: 5 }}
                      source={StantCerceveIcon}
                      resizeMode="contain"
                    />
                    <Text style={{ fontSize: 10, color: "#6C757D", paddingRight: 5 }}>{selectedItem.booths.name}</Text>
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
                      <Text style={{ fontSize: 10, color: "#6C757D", paddingRight: 5 }}>
                        {selectedItem.booths.hall.name}
                      </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                      <Image
                        style={{ height: 25, width: 25, marginHorizontal: 5 }}
                        source={TarihIcon}
                        resizeMode="contain"
                      />
                      <Text style={{ fontSize: 10, color: "#6C757D", paddingRight: 5 }}>
                        {selectedItem.booths.started_at}
                      </Text>
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
                      <Image
                        style={{ height: 20, width: 20, marginHorizontal: 5 }}
                        source={KonumIcon}
                        resizeMode="contain"
                      />
                      <Text style={{ fontSize: 10, color: "#6C757D" }}>C1</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                      <Image
                        style={{ height: 20, width: 20, marginHorizontal: 5 }}
                        source={SaatIcon}
                        resizeMode="contain"
                      />
                      <Text style={{ fontSize: 10, color: "#6C757D" }}>11:01</Text>
                    </View>
                  </View>
                </View>
              </View>
            */}
            </View>
          </View>

          {/* main button -*/}
          <View style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
            <TouchableOpacity style={styles.mainButton}>
              <Text style={styles.mainButtonText}>Salona Git</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DokumanItemDetailModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },

  headFrame: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "space-between",
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

  tooltipContainer: {
    alignSelf: "flex-start",
  },

  tooltipItems: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  tooltipText: {
    color: "#6C757D",
    marginLeft: 10,
  },
});
