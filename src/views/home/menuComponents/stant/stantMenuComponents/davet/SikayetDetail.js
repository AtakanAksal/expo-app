import React, { useEffect, useState, useMemo } from "react";

import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, ScrollView } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

import { Flags } from "../../../../../../components/FlagExporter";

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import stantYayindaIcon from "../../../../../../../assets/stant/stant-cerceve-yayinda.png";
import stantYayinBitenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-biten.png";
import stantYayinBekleyenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";
import ComplaintIcon from "../../../../../../../assets/complaint.png";
import TDotH from "../../../../../../../assets/three-dot-h.png";

import { useUserValue } from "../../../../../../contexts/UserContext";

import { postStantSikayetler } from "../../../../../../helpers/connections";
import ProfileBox from "../../../../../../components/profileComponent/ProfileBox";
import StantInfoHeader from "../../StantInfoHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;

const SikayetDetail = ({ sikayetData, closePress }) => {
  console.log(sikayetData);

  const [{ user }] = useUserValue();
  const nav = useNavigation();

  const userID = sikayetData?.user.id;

  const getMainIcon = () => {
    switch (sikayetData.complainable.status) {
      case 1:
        return stantYayindaIcon;
      case 2:
        return stantYayinBitenIcon;
      case 3:
        return stantYayinBekleyenIcon;
      default:
        return null;
    }
  };

  return (
    <MenuProvider
      skipInstanceCheck
      customStyles={{
        backdrop: {
          backgroundColor: "#FFFFFF",
          opacity: 0.7,
        },
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <View style={styles.headFrame}>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
              <TouchableOpacity onPress={() => closePress()}>
                <Image style={{ height: 45, width: 45 }} source={GoBackPng} resizeMode="contain" />
              </TouchableOpacity>
              <Text style={{ color: "#6C757D", fontSize: 20 }}>Şikayeti Gör</Text>
            </View>
          </View>

          <View style={styles.container}>
            <StantInfoHeader stant={sikayetData.complainable} />

            <View style={{ flex: 1, paddingBottom: 20 }}>
              <View style={{ flex: 2 }}>
                {/* <RenderComp /> */}
                {/* user info */}
                <View style={{ flex: 2, flexDirection: "row", elevation: 3, backgroundColor: "#FFFFFF" }}>
                  <View style={{ flex: 8, flexDirection: "row", justifyContent: "flex-start" }}>
                    <TouchableOpacity
                      style={{ flex: 8, flexDirection: "row", justifyContent: "flex-start" }}
                      onPress={
                        user.userid === userID
                          ? () => nav.jumpTo("profile")
                          : () => {
                              closePress();
                              nav.navigate("OtherProfile", { userID });
                            }
                      }
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 10,
                        }}
                      >
                        <Image
                          style={{ height: "100%", width: "100%" }}
                          source={{ uri: sikayetData?.user.userdetail.picture }}
                          resizeMode="contain"
                        />
                      </View>
                      <View style={{ flex: 2, justifyContent: "center" }}>
                        {/* username */}
                        <View>
                          <Text
                            style={{ fontSize: 13, color: "#6C757D", fontWeight: "bold" }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                          >
                            {sikayetData?.user.userrole_id === 1
                              ? sikayetData?.user.userdetail.name
                              : sikayetData?.user.userdetail.full_institution_name}
                          </Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                          <View
                            style={{
                              marginRight: 2,
                            }}
                          >
                            <Image
                              style={{ height: 20, width: 20 }}
                              source={Flags[sikayetData?.user?.userdetail?.country?.binarycode?.toLowerCase()]}
                              resizeMode="contain"
                            />
                          </View>
                          <Text style={{ fontSize: 10, textAlignVertical: "center", color: "#6C757D" }}>
                            {sikayetData?.user?.userdetail?.country?.binarycode?.toUpperCase()}
                          </Text>

                          <Text
                            style={{ paddingLeft: 10, fontSize: 10, textAlignVertical: "center", color: "#6C757D" }}
                          >
                            {setUyelikTuru(sikayetData?.user.userrole_id)}
                          </Text>
                        </View>
                        <View>
                          <Text style={{ fontSize: 10, color: "#6C757D" }} numberOfLines={2} ellipsizeMode="tail">
                            {/* {sikayetData?.created_at} */}
                            {dayjs(new Date(sikayetData?.created_at)).format("DD.MM.YYYY - H:mm")}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {/* üç nokta */}
                  <View style={{ flex: 1 }}>
                    <Menu>
                      <MenuTrigger
                        customStyles={{
                          triggerWrapper: {
                            flexDirection: "row",
                            alignItems: "center",
                          },
                        }}
                      >
                        <Image
                          style={{ height: 30, width: 30, alignSelf: "center" }}
                          source={TDotH}
                          resizeMode="contain"
                        />
                      </MenuTrigger>
                      <MenuOptions
                        customStyles={{
                          optionsContainer: {
                            backgroundColor: "#FFFFFF",
                            borderWidth: 0.5,
                            borderColor: "#c1c1c1",
                            width: 120,
                            marginTop: 20,
                            padding: 10,
                          },
                          /* optionsWrapper: {
                      backgroundColor: "purple",
                    }, */
                          /*   optionWrapper: {
                      backgroundColor: "yellow",
                      margin: 5,
                    }, */
                          /*   optionTouchable: {
                      underlayColor: "gold",
                      activeOpacity: 70,
                    }, */
                          /*    optionText: {
                      color: "brown",
                    }, */
                        }}
                      >
                        <MenuOption
                          customStyles={{
                            optionWrapper: {
                              flexDirection: "row",
                              alignItems: "center",
                              marginVertical: 5,
                            },
                          }}
                          onSelect={() => console.log("as")}
                        >
                          <Text style={{ color: "#6C757D", fontSize: 15 }}>Profil</Text>
                        </MenuOption>
                        <MenuOption
                          customStyles={{
                            optionWrapper: {
                              flexDirection: "row",
                              alignItems: "center",
                              marginVertical: 5,
                            },
                          }}
                          onSelect={() => console.log("as")}
                        >
                          <Text style={{ color: "#6C757D", fontSize: 15 }}>Mesaj</Text>
                        </MenuOption>
                        <MenuOption
                          customStyles={{
                            optionWrapper: {
                              flexDirection: "row",
                              alignItems: "center",
                              marginVertical: 5,
                            },
                          }}
                          onSelect={() => console.log("as")}
                        >
                          <Text style={{ color: "#6C757D", fontSize: 15 }}>Teşekkür Et</Text>
                        </MenuOption>
                        <MenuOption
                          customStyles={{
                            optionWrapper: {
                              flexDirection: "row",
                              alignItems: "center",
                              marginVertical: 5,
                            },
                          }}
                          onSelect={() => console.log("as")}
                        >
                          <Text style={{ color: "#6C757D", fontSize: 15 }}>Bildirimi Sil</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
                {/* sikayet info */}
                <View style={{ flex: 6 /* backgroundColor: "red"  */ }}>
                  {/* konu - tarih */}
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 10, marginRight: 15 }}>
                      <Text style={{ marginTop: 10, color: "#6C757D" }}>Konu</Text>
                      <Text
                        style={{
                          borderWidth: 0.5,
                          padding: 10,
                          width: "100%",
                          color: "#6C757D",
                          borderColor: "#6C757D",
                        }}
                      >
                        {sikayetData?.title}
                      </Text>
                    </View>
                    <View style={{ flex: 9 }}>
                      <Text style={{ marginTop: 10, color: "#6C757D" }}>Tarih</Text>
                      <Text
                        style={{
                          borderWidth: 0.5,
                          padding: 10,
                          width: "100%",
                          color: "#6C757D",
                          borderColor: "#6C757D",
                        }}
                      >
                        {dayjs(new Date(sikayetData?.created_at)).format("DD.MM.YYYY - H:mm")}
                      </Text>
                    </View>
                  </View>

                  {/* yorum */}

                  <View style={{ flex: 1 }}>
                    <Text style={{ marginTop: 20, color: "#6C757D" }}>Yorum</Text>
                    <ScrollView
                      style={{
                        borderWidth: 0.5,
                        padding: 10,
                        width: WIDTH_WINDOW - 20,
                        color: "#6C757D",
                        borderColor: "#6C757D",
                        flex: 1,
                      }}
                    >
                      <Text
                        style={{
                          color: "#6C757D",
                          borderColor: "#6C757D",
                          marginBottom: 80,
                        }}
                      >
                        {sikayetData?.description}
                      </Text>
                    </ScrollView>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.mainButton} /* onPress={() => setOffset((prev) => prev + 1)} */>
                <Text style={styles.mainButtonText}>Yayınla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </MenuProvider>
  );
};

export default SikayetDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 5,
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
    marginTop: 10,
  },
  /*   mainButtonDisabled: {
    borderWidth: 0.5,
    borderColor: "#00AA9F",
    alignItems: "center",
    justifyContent: "center",
    width: WIDTH_WINDOW - 20,
    height: 45,
    backgroundColor: "#FFFFFF",
  }, */
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  /*   mainButtonTextDisabled: {
    color: "#6C757D",
    fontSize: 18,
  }, */
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
