/* eslint-disable no-lonely-if */
/* eslint-disable no-else-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import filter from "lodash.filter";

import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

import { useUserValue } from "../../../contexts/UserContext";
import { getProfile, followProfile, unfollowProfile } from "../../../helpers/connections";
import { getProfileStream, useGetProfileStream } from "../../../helpers/streamConnections";
import OthersHeader from "./OthersHeader";
import { Flags } from "../../../components/FlagExporter";

import Card from "./Card";

import chatIcon from "../../../../assets/profileitems/vexchat.png";
import qrIcon from "../../../../assets/profileitems/qr.png";
import menuIcon from "../../../../assets/profileitems/menu.png";
import menuActiveIcon from "../../../../assets/profileitems/menu-active.png";

import infoPassiveIcon from "../../../../assets/profileitems/info-passive.png";
import infoActiveIcon from "../../../../assets/profileitems/info-active.png";

import takipIcon from "../../../../assets/profileitems/takip-icon.png";
import takipAktif from "../../../../assets/profileitems/takip-aktif.png";
import sikayetIcon from "../../../../assets/profileitems/sikayet-icon.png";
import engelleIcon from "../../../../assets/profileitems/engelle-icon.png";
import takipBirak from "../../../../assets/profileitems/takip-birak.png";
import takipEt from "../../../../assets/profileitems/takip-et.png";

import upIcon from "../../../../assets/general/up-arrow.png";
import downIcon from "../../../../assets/general/down-arrow.png";
import upIconTurkuaz from "../../../../assets/general/up-arrow-turkuaz.png";
import downIconTurkuaz from "../../../../assets/general/down-arrow-turkuaz.png";
import searchIcon from "../../../../assets/general/search.png";

import DescriptionIcon from "../../../../assets/profileitems/description.png";
import MobilePhoneIcon from "../../../../assets/profileitems/mobile-phone.png";
import HomePhoneIcon from "../../../../assets/profileitems/home-phone.png";
import WebIcon from "../../../../assets/profileitems/web.png";
import EmailIcon from "../../../../assets/profileitems/email.png";
import HomeIcon from "../../../../assets/profileitems/home.png";
import GoBackIcon from "../../../../assets/forgotpass/go-back-border.png";

import profilePlaceholder from "../../../../assets/general/profile.png";
import refreshIcon from "../../../../assets/general/refresh.png";

import NewMailModal from "../vexMailComponents/NewMailModal";

import StantIcon from "../../../../assets/menuitems/stant.png";
import SalonIcon from "../../../../assets/menuitems/salon.png";
import FuarIcon from "../../../../assets/menuitems/fuar.png";
import VexWebIcon from "../../../../assets/menuitems/vexweb.png";
import VexMailIcon from "../../../../assets/menuitems/vexmail.png";
import VexDriveIcon from "../../../../assets/menuitems/vexdrive.png";
import ReklamIcon from "../../../../assets/menuitems/reklam.png";
import MyVexIcon from "../../../../assets/menuitems/myvex.png";
// import MuhasebeIcon from "../../../../assets/menuitems/muhasebe.png";
import CikisIcon from "../../../../assets/menuitems/cikis.png";
import VexOfficeIcon from "../../../../assets/menuitems/vexoffice.png";
import VexHibitionIcon from "../../../../assets/menuitems/vexhibition.png";
import VexClassIcon from "../../../../assets/menuitems/vexclass.png";
import VexClinicIcon from "../../../../assets/menuitems/vexclinic.png";
import VexStoreIcon from "../../../../assets/menuitems/vexstore.png";
import VexToranIcon from "../../../../assets/menuitems/vextoran.png";
import QrModal from "../profileComponents/QrModal";

const WINDOW_HEIGHT = Dimensions.get("window").height;
const WINDOW_WIDTH = Dimensions.get("window").width;

const OtherProfile = ({ route }) => {
  const { userID } = route.params;

  const [userDetail, setUserDetail] = useState();
  const [streamData, setStreamData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(1);

  const [{ user }] = useUserValue();
  const nav = useNavigation();

  // const [modalVisible, setModalVisible] = useState(false);
  // const [headerBotPart, setHeaderBotPart] = useState(0);
  // const [selectedModalType, setSelectedModalType] = useState("kartvizit");
  // const [selectedIndex, setSelectedIndex] = useState([]);

  /* console.log(userID); */

  /*   const { data, isLoading, isError } = useGetProfileStream(offset, userID, user.token);

  useEffect(() => {
    if (!(isLoading || isError)) {
      console.log("other profile gelen data-----");
      console.log(data);
      setStreamData([...streamData, ...data.streams]);
      setLoading(false);
    } else {
      console.log("isError loading");
      setLoading(true);
    }
  }, [data]); */

  useEffect(() => {
    getData();
    getUserDetail();
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, []);

  const handleBackButtonClick = () => {
    nav.goBack();
    return true;
  };

  const getData = () => {
    console.log("get DATA ------ çalıştı");
    setLoading(true);
    const postData = new FormData();
    postData.append("page", offset);
    postData.append("user_id", userID); // ? type belirlenecek

    getProfileStream(postData, user.token)
      .then((res) => {
        // console.log(res);
        setOffset(offset + 1);
        setStreamData((prevState) => [...prevState, ...res.streams]);
        setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  const getUserDetail = useCallback(() => {
    console.log("-- getUserDetail Çalıştı ----");
    getProfile(userID, user.token)
      .then((res) => {
        setUserDetail(res);
        // console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const renderrItem = ({ item }) => (
    // console.log(item);
    <Card stream={item} userID={user.userid} userToken={user.token} user={userDetail?.user} />
  );

  const footerComponent = () => {
    if (loading) {
      return (
        <View style={{ height: 70, width: "100%", alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color="#00AA9F" size="large" />
        </View>
      );
    } else {
      return (
        <View style={{ height: 70, width: "100%", alignItems: "center", justifyContent: "center" }}>
          {/* <TouchableOpacity style={{ flex: 1 }} onPress={() => setOffset((prev) => prev + 1)}> */}
          <TouchableOpacity style={{ flex: 1 }} onPress={() => getData()}>
            <Image style={{ flex: 1, height: 70 }} source={refreshIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      );
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
      <KeyboardAvoidingView style={styles.container}>
        <OthersHeader
          userName={
            userDetail?.user?.userrole_id === 1
              ? userDetail?.user?.userdetail?.name
              : userDetail?.user?.userdetail?.full_institution_name
          }
        />
        {console.log("render çalıştı")}
        <>
          <FlatList
            style={{
              zIndex: 0,
              height: "100%",
              elevation: -1,
              flex: 1,
            }}
            // onMomentumScrollEnd={()=> console.log("scrool")}
            ListHeaderComponent={
              userDetail && <HeaderTopComponent userDetail={userDetail} getUserDetail={getUserDetail} />
            }
            ListFooterComponent={footerComponent}
            maxToRenderPerBatch={1}
            // onEndReached={() => getData()}
            // onEndReachedThreshold={0.5}
            data={streamData.length > 0 && streamData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderrItem}
          />
          {/*     <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={selectedIndex.length > 0 ? () => setSelectedIndex([]) : () => setModalVisible((prev) => !prev)}
      >
        <MainModal
          component={selectedModalType}
          closePress={() => setModalVisible(false)}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </Modal> */}
        </>
      </KeyboardAvoidingView>
    </MenuProvider>
  );
};

export default OtherProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },
  headerContainer: {
    height: WINDOW_HEIGHT / 1.9,
    flex: 1,
  },
  menuContainer: {
    height: WINDOW_HEIGHT - WINDOW_HEIGHT / 8,
    backgroundColor: "#FFFFFF",
    marginTop: 3,
  },

  menuRow: {
    height: WINDOW_HEIGHT / 6 - 20,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  menuItem: {
    padding: 5,
    margin: 5,
    height: WINDOW_HEIGHT / 5 - 45,
    width: WINDOW_HEIGHT / 5 - 45,
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
    backgroundColor: "#FFFFFF",
    shadowColor: "#c1c1c1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 6,
  },
  menuItemImg: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    alignSelf: "center",
  },
  menuItemText: {
    color: "#6C757D",
    textAlign: "center",
    paddingBottom: 5,
  },
  cokYakindaa: {
    position: "absolute",
    backgroundColor: "#6C757D",
    top: 0,
    height: 14,
    width: WINDOW_HEIGHT / 5 - 45,
  },
  cokYakindaText: {
    color: "#FFFFFF",
    fontSize: 9,
    textAlign: "center",
  },
});

const HeaderTopComponent = React.memo(({ userDetail, getUserDetail }) => {
  console.log("HeaderTopComponent çalıştı ----- ");
  // console.log(userDetail.is_liked);
  const [{ user }] = useUserValue();

  const [selectedBotComp, setSelectedBotComp] = useState(0);
  const [newMailModalOpen, setNewMailModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const headerHeightTakip = WINDOW_HEIGHT / 1.8;
  const avatarSize = WINDOW_WIDTH / 2.8;

  const setFollow = (userIDforFollow) => {
    const postData = new FormData();
    postData.append("followUser", userIDforFollow);

    /*   console.log("--------ggg");
    console.log(userIDforFollow); */

    followProfile(postData, user.token)
      .then((res) => {
        console.log(res);
        getUserDetail();
      })
      .catch((err) => console.log(err));
  };

  const setUnfollow = (userIDforUnfollow) => {
    const postData = new FormData();
    postData.append("unfollowUser", userIDforUnfollow);

    /*   console.log("--------ggg");
    console.log(userIDforFollow); */

    unfollowProfile(postData, user.token)
      .then((res) => {
        console.log(res);
        getUserDetail();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <View style={styles.headerContainer}>
        <View style={{ flex: 1 }}>
          {/* banner foto */}
          <View style={{ flex: 1.7, marginHorizontal: 5 }}>
            <Image
              style={{ height: "100%", width: "100%", backgroundColor: "#FFFFFF" }}
              source={{ uri: userDetail?.banner_photo }}
              resizeMode="cover"
            />
          </View>
          <View style={{ flex: 1, marginHorizontal: 5, backgroundColor: "#FFFFFF" }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                alignItems: "flex-start",
              }}
            >
              <View style={{ flexDirection: "row", flex: 1, paddingTop: 5 }}>
                <View
                  style={{
                    marginRight: 2,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={Flags[userDetail?.user?.userdetail?.country.binarycode.toLowerCase()]}
                    resizeMode="contain"
                  />
                </View>
                <Text style={{ color: "#6C757D", fontSize: 10, textAlignVertical: "center" }}>
                  {userDetail?.user?.userdetail?.country.binarycode}
                </Text>
                <Text style={{ paddingLeft: 10, color: "#6C757D", fontSize: 10, textAlignVertical: "center" }}>
                  {setUyelikTuru(userDetail?.user?.userrole_id)}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center", paddingTop: 8 }}>
                <Text style={{ textAlignVertical: "center", color: "#6C757D", fontSize: 10 }}>
                  {userDetail?.user?.userdetail?.user_code}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 15, color: "#6C757D" }}>
                {userDetail?.user?.userrole_id === 1
                  ? userDetail?.user?.userdetail?.name
                  : userDetail?.user?.userdetail?.full_institution_name}
              </Text>
            </View>

            <View style={{ flex: 1, flexDirection: "row" }}>
              {/* mail gönder iconu */}
              <TouchableOpacity
                onPress={() => setNewMailModalOpen(true)}
                style={{ flex: 1, margin: 5, alignItems: "center", justifyContent: "center" }}
              >
                <Image style={{ height: 30, width: 30 }} resizeMode="contain" source={chatIcon} />
              </TouchableOpacity>

              {/* Takip butonları */}
              <View style={{ flex: 1, margin: 5, alignItems: "center", justifyContent: "center" }}>
                <Menu>
                  <MenuTrigger
                    customStyles={{
                      triggerWrapper: {
                        flexDirection: "row",
                        alignItems: "center",
                      },
                      // ? yemedi--- butona tıklanınca touchableopacity efenti vermeye çalışırken
                      /*        triggerTouchable: {
                        underlayColor: "red",
                        activeOpacity: 70,
                        style: {
                          flex: 1,
                        },
                      }, */
                    }}
                  >
                    <Image
                      style={{ height: 30, width: 30 }}
                      resizeMode="contain"
                      source={isFollow(userDetail.user.followed_users, user.userid) ? takipAktif : takipEt}
                    />
                    <Image
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                      source={isFollow(userDetail.user.followed_users, user.userid) ? downIconTurkuaz : downIcon}
                    />
                  </MenuTrigger>
                  <MenuOptions
                    customStyles={{
                      optionsContainer: {
                        backgroundColor: "#FFFFFF",
                        borderWidth: 0.5,
                        borderColor: "#c1c1c1",
                        width: 60,
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
                        },
                      }}
                      onSelect={() =>
                        isFollow(userDetail.user.followed_users, user.userid)
                          ? setUnfollow(userDetail.user.id)
                          : setFollow(userDetail.user.id)
                      }
                    >
                      <Image
                        style={{ height: 30, width: 30 }}
                        resizeMode="contain"
                        source={isFollow(userDetail.user.followed_users, user.userid) ? takipBirak : takipEt}
                      />
                      {/* // ? userDetail.is_liked ? */}
                      <Image style={{ height: 20, width: 20 }} resizeMode="contain" source={downIcon} />
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`sikayet`)}>
                      <Image style={{ height: 30, width: 30 }} resizeMode="contain" source={sikayetIcon} />
                    </MenuOption>
                    <MenuOption onSelect={() => alert(`engel`)}>
                      <Image style={{ height: 30, width: 30 }} resizeMode="contain" source={engelleIcon} />
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>

              {/* info iconu */}
              <TouchableOpacity
                style={{ flex: 1, margin: 5, alignItems: "center", justifyContent: "center" }}
                onPress={() => setSelectedBotComp((prev) => (prev === 1 ? 0 : 1))}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  resizeMode="contain"
                  source={selectedBotComp === 1 ? infoActiveIcon : infoPassiveIcon}
                />
              </TouchableOpacity>

              {/* qr iconu */}
              <TouchableOpacity
                style={{ flex: 1, margin: 5, alignItems: "center", justifyContent: "center" }}
                onPress={() => setQrModalOpen(true)}
              >
                <Image style={{ height: 30, width: 30 }} resizeMode="contain" source={qrIcon} />
              </TouchableOpacity>
              <Modal
                transparent
                animationType="fade"
                visible={qrModalOpen}
                onRequestClose={() => {
                  setQrModalOpen((prev) => !prev);
                }}
              >
                <QrModal closePress={() => setQrModalOpen(false)} />
              </Modal>
              {/* menü iconu */}
              <TouchableOpacity
                style={{ flex: 1, margin: 5, alignItems: "center", justifyContent: "center" }}
                onPress={() => setSelectedBotComp((prev) => (prev === 2 ? 0 : 2))}
              >
                <Image
                  style={{ height: 30, width: 30 }}
                  resizeMode="contain"
                  source={selectedBotComp === 2 ? menuActiveIcon : menuIcon}
                />
              </TouchableOpacity>

              <Modal
                animationType="slide"
                visible={newMailModalOpen}
                onRequestClose={() => {
                  setNewMailModalOpen((prev) => !prev);
                }}
              >
                <NewMailModal setNewMailModalOpen={setNewMailModalOpen} />
              </Modal>
            </View>
          </View>

          {/* Avatar */}
          <View
            style={{
              width: avatarSize,
              height: avatarSize,
              position: "absolute",
              alignSelf: "center",
              top: headerHeightTakip / 2 - avatarSize / 2,
            }}
          >
            <Image
              style={{
                height: "100%",
                width: "100%",
                borderWidth: 2,
                borderColor: "#FFFFFF",
                backgroundColor: "#FFFFFF",
              }}
              source={{ uri: userDetail?.user?.userdetail?.picture }}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <HeaderBotComponent comp={selectedBotComp} userDetail={userDetail} />
    </>
  );
});

const HeaderBotComponent = React.memo(({ comp, userDetail }) => {
  console.log("HeaderBotComponent -------- çalıştı");

  switch (comp) {
    case 0:
      return <TakipComponent userDetail={userDetail} />;

    case 1:
      return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF", marginTop: 3, marginHorizontal: 5 }}>
          <View style={{ flex: 3, padding: 10 }}>
            <View style={{ position: "absolute", top: 8, left: 7 }}>
              <Image
                style={{
                  height: WINDOW_WIDTH / 16,
                  width: WINDOW_WIDTH / 16,
                }}
                source={DescriptionIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={{ color: "#6C757D" }}>
              {"       "}
              {userDetail?.user?.userdetail?.about}
            </Text>
          </View>

          <View style={{ flex: 2, flexDirection: "row" }}>
            <View style={{ flex: 1, padding: 5 }}>
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ height: WINDOW_WIDTH / 16, width: WINDOW_WIDTH / 16, marginRight: 5 }}
                  source={MobilePhoneIcon}
                  resizeMode="contain"
                />
                <Text style={{ color: "#6C757D" }}>{userDetail?.user?.userdetail?.mobilephone}</Text>
              </View>

              <View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingTop: 5 }}>
                <Image
                  style={{ height: WINDOW_WIDTH / 16, width: WINDOW_WIDTH / 16, marginRight: 5 }}
                  source={WebIcon}
                  resizeMode="contain"
                />
                <Text style={{ color: "#6C757D" }}>{userDetail?.user?.userdetail?.social_website}</Text>
              </View>
            </View>

            <View style={{ flex: 1, padding: 5 }}>
              <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ height: WINDOW_WIDTH / 16, width: WINDOW_WIDTH / 16, marginRight: 5 }}
                  source={HomePhoneIcon}
                  resizeMode="contain"
                />
                <Text style={{ color: "#6C757D" }}>{userDetail?.user?.userdetail?.establishment_phone}</Text>
              </View>

              <View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingTop: 5 }}>
                <Image
                  style={{ height: WINDOW_WIDTH / 16, width: WINDOW_WIDTH / 16, marginRight: 5 }}
                  source={EmailIcon}
                  resizeMode="contain"
                />
                <Text style={{ color: "#6C757D" }}>{userDetail?.user?.email}</Text>
              </View>
            </View>
          </View>

          {/* adress */}
          <View style={{ flex: 1, padding: 5, flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: WINDOW_WIDTH / 16, width: WINDOW_WIDTH / 16, marginRight: 5 }}
              source={HomeIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D" }}>{userDetail?.user?.userdetail?.address}</Text>
          </View>
        </View>
      );

    case 2:
      return <HeaderBotPartMenu />;

    default:
      return null;
  }
});

const TakipComponent = React.memo(({ userDetail }) => {
  const [takipOpen, setTakipOpen] = useState(0);
  const [takipci, setTakipci] = useState(0);
  const [takipModalOpen, setTakipModalOpen] = useState(false);

  const [takipData, setTakipData] = useState([]);
  const [takipciData, setTakipciData] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const [{ user }] = useUserValue();

  const nav = useNavigation();
  useEffect(() => {
    setTakipData(userDetail.user.following_users);
    setTakipciData(userDetail.user.followed_users);
  }, []);

  const contains = (data, query) => {
    if (data?.toString().toLowerCase().includes(query.toString().toLowerCase())) {
      return true;
    }
    return false;
  };

  const handleSearch = (text) => {
    // setWritedText(text);
    let filtered;
    if (takipci === 0) {
      filtered = filter(userDetail.user.following_users, (singledata) => {
        // return contains(singledata?.followed_user_detay?.userdetail?.name, text);
        // console.log(singledata);
        // setTakipData(filtered)

        if (singledata?.followed_user_detay?.userrole_id === 1) {
          return contains(singledata?.followed_user_detay?.userdetail?.name, text);
        } else {
          return contains(singledata?.followed_user_detay?.userdetail?.full_institution_name, text);
        }
      });
    } else {
      filtered = filter(userDetail.user.followed_users, (singledata) => {
        // return contains(singledata?.following_user_detay?.userdetail?.name, text);
        // console.log(singledata);

        if (singledata?.following_user_detay?.userrole_id === 1) {
          return contains(singledata?.following_user_detay?.userdetail?.name, text);
        } else {
          return contains(singledata?.following_user_detay?.userdetail?.full_institution_name, text);
        }
      });
    }
    if (takipci === 0) {
      if (text !== "") {
        console.log(filtered);
        setTakipData(filtered);
      } else {
        setTakipData(userDetail.user.following_users);
      }
    } else {
      if (text !== "") {
        console.log(filtered);
        setTakipciData(filtered);
      } else {
        setTakipciData(userDetail.user.followed_users);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        marginTop: 3,
        marginHorizontal: 5,
      }}
    >
      {
        {
          0: (
            <TouchableOpacity
              onPress={() => setTakipOpen(1)}
              style={{
                height: 50,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 5,
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                <Image
                  style={{ height: WINDOW_WIDTH / 15, width: WINDOW_WIDTH / 15 }}
                  source={takipIcon}
                  resizeMode="contain"
                />
                <Text style={{ color: "#6C757D", fontSize: 15 }}>Takip</Text>
              </View>
              <View>
                <Image
                  style={{ height: WINDOW_WIDTH / 10, width: WINDOW_WIDTH / 10 }}
                  source={downIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          ),
          1: (
            <>
              <View
                style={{
                  height: 50,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 5,
                }}
              >
                {searchActive ? (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      elevation: 5,
                      flexDirection: "row",
                      backgroundColor: "#FFFFFF",
                      paddingHorizontal: 5,
                    }}
                  >
                    <TextInput
                      style={{ flex: 1 }}
                      placeholder={`${takipci === 0 ? "Takip" : "Takipçi"} içinde ara...`}
                      onChangeText={(text) => handleSearch(text)}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSearchActive(false);
                        handleSearch("");
                      }}
                    >
                      <Image
                        style={{ height: WINDOW_WIDTH / 9, width: WINDOW_WIDTH / 9 }}
                        source={searchIcon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View style={{ width: WINDOW_WIDTH / 3, height: "100%" }}>
                      {/* @@@@ 1111 */}
                      <Menu>
                        <MenuTrigger
                          customStyles={{
                            triggerWrapper: {
                              alignItems: "center",
                              flexDirection: "row",
                              backgroundColor: "#FFFFFF",
                              height: "100%",
                              elevation: 5,
                              paddingHorizontal: 5,
                              justifyContent: "space-between",
                            },
                          }}
                        >
                          <Image
                            style={{ height: "70%", width: "70%", flex: 1 }}
                            source={takipIcon}
                            resizeMode="contain"
                          />
                          <Text style={{ color: "#6C757D", fontSize: 15, flex: 3 }}>
                            {takipci === 0 ? "Takip" : "Takipçi"}
                          </Text>
                          <Image
                            style={{ height: "80%", width: "80%", flex: 1 }}
                            source={downIcon}
                            resizeMode="contain"
                          />
                        </MenuTrigger>
                        <MenuOptions
                          customStyles={{
                            optionsContainer: {
                              backgroundColor: "#FFFFFF",
                              borderWidth: 0.5,
                              borderColor: "#c1c1c1",
                              width: WINDOW_WIDTH / 3,
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
                                paddingVertical: 10,
                              },
                            }}
                            onSelect={() => setTakipci(0)}
                          >
                            <Text style={{ color: "#6C757D", fontSize: 15 }}>Takip</Text>
                          </MenuOption>
                          <MenuOption
                            customStyles={{
                              optionWrapper: {
                                paddingVertical: 10,
                              },
                            }}
                            onSelect={() => setTakipci(1)}
                          >
                            <Text style={{ color: "#6C757D", fontSize: 15 }}>Takipçi</Text>
                          </MenuOption>
                        </MenuOptions>
                      </Menu>

                      {/* @@@@ 2222222222222222 */}
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity onPress={() => setSearchActive(true)}>
                        <Image
                          style={{ height: WINDOW_WIDTH / 9, width: WINDOW_WIDTH / 9 }}
                          source={searchIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setTakipOpen(0)}>
                        <Image
                          style={{ height: WINDOW_WIDTH / 10, width: WINDOW_WIDTH / 10 }}
                          source={upIcon}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "flex-start",
                  backgroundColor: "#FFFFFF",
                }}
              >
                {takipci === 0
                  ? takipData.map(
                      (el, index) =>
                        index < 9 && (
                          <TouchableOpacity
                            key={el.id}
                            style={{
                              width: "30.3%",
                              height: WINDOW_WIDTH / 3,
                              marginVertical: 5,
                              marginHorizontal: "1.5%",
                            }}
                            onPress={() =>
                              nav.push("OtherProfile", { userID: el.followed_user_detay?.userdetail?.user_id })
                            }
                          >
                            <Image
                              style={{ flex: 1 }}
                              source={
                                el?.followed_user_detay?.userdetail?.picture
                                  ? { uri: el?.followed_user_detay?.userdetail?.picture }
                                  : profilePlaceholder
                              }
                              resizeMode="contain"
                            />
                            <Text style={{ textAlign: "left", color: "#6C757D" }} numberOfLines={1}>
                              {
                                /* el.followed_user_detay?.userdetail?.name */

                                el.followed_user_detay?.userrole_id === 1
                                  ? el.followed_user_detay?.userdetail?.name
                                  : el.followed_user_detay?.userdetail?.full_institution_name
                              }
                            </Text>
                          </TouchableOpacity>
                        )
                    )
                  : takipciData.map(
                      (el, index) =>
                        index < 9 && (
                          <TouchableOpacity
                            key={el.id}
                            style={{
                              width: "30.3%",
                              height: WINDOW_WIDTH / 3,
                              marginVertical: 5,
                              marginHorizontal: "1.5%",
                            }}
                            onPress={() =>
                              user.userid !== el.following_user_detay?.userdetail?.user_id &&
                              nav.push("OtherProfile", { userID: el.following_user_detay?.userdetail?.user_id })
                            }
                          >
                            <Image
                              style={{ flex: 1 }}
                              source={
                                el?.following_user_detay?.userdetail?.picture
                                  ? { uri: el?.following_user_detay?.userdetail?.picture }
                                  : profilePlaceholder
                              }
                              resizeMode="contain"
                            />
                            <Text style={{ textAlign: "left", color: "#6C757D" }} numberOfLines={1}>
                              {
                                /* el.following_user_detay?.userdetail?.name */

                                el.following_user_detay?.userrole_id === 1
                                  ? el.following_user_detay?.userdetail?.name
                                  : el.following_user_detay?.userdetail?.full_institution_name
                              }
                            </Text>
                          </TouchableOpacity>
                        )
                    )}
              </View>

              <View
                style={{
                  height: 45,
                  justifyContent: "center",
                  alignItems: "flex-end",
                  borderTopWidth: 0.5,
                  borderColor: "#6C757D",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  style={{ paddingRight: 10 }}
                  onPress={() =>
                    nav.push("TakipView", {
                      userDetail,
                    })
                  }
                >
                  <Text style={{ color: "#6C757D" }}>Tümünü Gör</Text>
                </TouchableOpacity>
              </View>
            </>
          ),
        }[takipOpen]
      }
    </View>
  );
});

const HeaderBotPartMenu = () => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuRow}>
        <MenuItem text="Stant" img={StantIcon} onPressHandle="Stant" />
        <MenuItem text="Salon" img={SalonIcon} onPressHandle="Salon" />
        <MenuItem text="Fuar" img={FuarIcon} onPressHandle="Salon" />
      </View>
      <View style={styles.menuRow}>
        <MenuItem text="VexWeb" img={VexWebIcon} onPressHandle="VexWeb" />
        <MenuItem text="VexMail" img={VexMailIcon} onPressHandle="VexMail" />
        <MenuItem text="VexDrive" img={VexDriveIcon} onPressHandle="VexDrive" />
      </View>
      <View style={styles.menuRow}>
        <MenuItem text="Reklam" img={ReklamIcon} onPressHandle="Reklam" />
        <MenuItem text="MyVex" img={MyVexIcon} onPressHandle="MyVex" cokYakinda />
        <MenuItem text="VexOffice" img={VexOfficeIcon} onPressHandle="VexOffice" cokYakinda />
      </View>
      <View style={styles.menuRow}>
        <MenuItem text="VexHibition" img={VexHibitionIcon} onPressHandle="VexHibition" cokYakinda />
        <MenuItem text="VexClass" img={VexClassIcon} onPressHandle="VexClass" cokYakinda />
        <MenuItem text="VexClinic" img={VexClinicIcon} onPressHandle="VexClinic" cokYakinda />
      </View>
      <View style={styles.menuRow}>
        <MenuItem text="VexStore" img={VexStoreIcon} onPressHandle="VexStore" cokYakinda />
        <MenuItem text="VexToran" img={VexToranIcon} onPressHandle="VexToran" cokYakinda />
        {/* boş menü itemlar - bir sırada 3 adet menü item olması gerek, düzgün ortalama için */}
        <View
          style={{
            padding: 5,
            margin: 5,
            height: WINDOW_HEIGHT / 5 - 45,
            width: WINDOW_HEIGHT / 5 - 45,
            borderWidth: 0.5,
            borderColor: "#FFFFFF",
          }}
        />
      </View>
    </View>
  );
};

// menu butonu içi öğreleri
const MenuItem = ({ text, img, onPressHandle, cokYakinda }) => {
  const goToComp = () => {
    console.log(onPressHandle);
  };

  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => goToComp()}>
      <Image style={styles.menuItemImg} source={img} resizeMode="contain" />
      <Text style={styles.menuItemText}>{text}</Text>
      {cokYakinda && (
        <View style={styles.cokYakindaa}>
          <Text style={styles.cokYakindaText}>ÇOK YAKINDA</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// /* @@@@@ Functions @@@@ */

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

const isFollow = (likeArray, myID) => {
  if (likeArray.filter((el) => el.following_user === myID).length > 0) {
    return true;
  } else {
    return false;
  }
};
