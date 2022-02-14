/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useUserValue } from "../../contexts/UserContext";
import { userDetailById } from "../../helpers/connections";
import { getStreams } from "../../helpers/streamConnections";
import { Flags } from "../../components/FlagExporter";

import { usePostValue } from "../../contexts/PostContext";

import Logo1 from "../../../assets/expologo.png";

import HomeCard from "./homeComponents/HomeCard";
import Bayrak from "../../../assets/flag/tr.png";
import CreatePostModal from "./homeComponents/CreatePostModal";
import ImageModal from "./homeComponents/ImageModal";
import Camera from "../../../assets/camera.png";
import InfoActive from "../../../assets/info-active.png";
import InfoPassive from "../../../assets/info-passive.png";
import MenuActive from "../../../assets/tabbar/menu-active.png";
import MenuPassive from "../../../assets/tabbar/menu.png";

import KartvizitIcon from "../../../assets/profileitems/kartvizit-icon.png";
import FotografIcon from "../../../assets/profileitems/fotograf-icon.png";
import VideoIcon from "../../../assets/profileitems/video-icon.png";
import RandevuIcon from "../../../assets/profileitems/randevu-icon.png";
import TakipIcon from "../../../assets/profileitems/takip-icon.png";
import DovizIcon from "../../../assets/profileitems/doviz-icon.png";
import HavadurumuIcon from "../../../assets/profileitems/havadurumu-icon.png";
import DunyaSaatleriIcon from "../../../assets/profileitems/dunya-saatleri-icon.png";

import qrIcon from "../../../assets/profileitems/qr.png";

import DescriptionIcon from "../../../assets/profileitems/description.png";
import MobilePhoneIcon from "../../../assets/profileitems/mobile-phone.png";
import HomePhoneIcon from "../../../assets/profileitems/home-phone.png";
import WebIcon from "../../../assets/profileitems/web.png";
import EmailIcon from "../../../assets/profileitems/email.png";
import HomeIcon from "../../../assets/profileitems/home.png";
import GoBackIcon from "../../../assets/forgotpass/go-back-border.png";

import StantIcon from "../../../assets/menuitems/stant.png";
import SalonIcon from "../../../assets/menuitems/salon.png";
import FuarIcon from "../../../assets/menuitems/fuar.png";
import NavigasyonIcon from "../../../assets/menuitems/navigasyon.png";
import ReklamIcon from "../../../assets/menuitems/reklam.png";
import EvrakIcon from "../../../assets/menuitems/evrak-cantam.png";
import RaporIcon from "../../../assets/menuitems/raporlar.png";
import MyVexIcon from "../../../assets/menuitems/myvex.png";
import MuhasebeIcon from "../../../assets/menuitems/muhasebe.png";
import CikisIcon from "../../../assets/menuitems/cikis.png";
import VexOfficeIcon from "../../../assets/menuitems/vexoffice.png";
import VexHibitionIcon from "../../../assets/menuitems/vexhibition.png";
import VexClassIcon from "../../../assets/menuitems/vexclass.png";
import VexClinicIcon from "../../../assets/menuitems/vexclinic.png";
import VexStoreIcon from "../../../assets/menuitems/vexstore.png";
import VexToranIcon from "../../../assets/menuitems/vextoran.png";

import MainModal from "./profileComponents/MainModal";

import QrModal from "./profileComponents/QrModal";

/* geçici görseller */
import Avatar from "../../../assets/avatar-gecici.png";
import Banner from "../../../assets/banner-gecici.png";

const HEADER_TOP_HEIGHT = Dimensions.get("window").height / 2.2;
const HEADER_BOT_HEIGHT = Dimensions.get("window").height / 4.5;
const HEADER_BOT_HEIGHT_INFO = Dimensions.get("window").height / 2.5;
const HEADER_BOT_HEIGHT_MENU = Dimensions.get("window").height;

/*
 [Unhandled promise rejection: Error: The method or property IntentLauncher.startActivityAsync is not available on ios,
   are you sure you've linked all the native dependencies properly?
*/
const Profile = ({ route }) => {
  const [streamData, setStreamData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [headerBotPart, setHeaderBotPart] = useState(0);
  const [selectedModalType, setSelectedModalType] = useState("kartvizit");
  const [selectedIndex, setSelectedIndex] = useState([]);

  const [{ user }] = useUserValue();

  const { myProfileStreamData, resetMyStream, incrementMyOffset } = usePostValue();

/*   console.log("render--");
  console.log(route.params); */

  useEffect(() => {
    // getData();
    getUserDetail();
  }, []);

  const onRefresh = () => {
    resetMyStream();
  };

  const postData = new FormData();
  /*
  const getData = () => {
    console.log("-- getData Çalıştı ---");
    setLoading(true);

    postData.append("page", offset);
    postData.append("type", "me");

    getStreams(postData, user.token)
      .then((res) => {
        setOffset(offset + 1);
        setStreamData([...streamData, ...res.streams]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }; */

  const getUserDetail = () => {
    console.log("-- getUserDetail Çalıştı ----");
    postData.append("user_id", user.userid);

    userDetailById(postData, user.token)
      .then((res) => {
        setUserDetail(res);
      })
      .catch((err) => console.log(err));
  };

  const setUyelikTuru = () => {
    if (userDetail[0]?.userrole_id === 1) {
      return "Bireysel";
    }
    if (userDetail[0]?.userrole_id === 2) {
      return "Ticari";
    }
    if (userDetail[0]?.userrole_id === 3) {
      return "Kamu";
    }
    if (userDetail[0]?.userrole_id === 4) {
      return "STK";
    }
  };

  // headerComponent içide hangi alt kısmın gözükeceğini belirleyen fonksiyob
  const showHeaderBotPart = (selectedHeaderBotPart) => {
    // console.log(selectedHeaderBotPart);
    switch (selectedHeaderBotPart) {
      case 0:
        return (
          <HeaderBotPart user={user} setSelectedModalType={setSelectedModalType} setModalVisible={setModalVisible} />
        );
      case 1:
        return <HeaderBotPartInfo user={user} />;
      /* case 2:
        return <HeaderBotPartMenu user={user} />; */

      default:
        return null;
    }
  };

  const headerComponent = () => (
    <View>
      {/* @@@@@ HEADER TOP @@@@@ */}
      <HeaderTopPart
        userDetail={userDetail}
        headerBotPart={headerBotPart}
        setHeaderBotPart={setHeaderBotPart}
        setUyelikTuru={setUyelikTuru}
      />
      {/* @@@@@ HEADER BOT @@@@@ */}

      {showHeaderBotPart(headerBotPart)}
    </View>
  );

  const footerComponent = () => {
    if (loading) {
      return <ActivityIndicator color="#00AA9F" size="large" />;
    }
    return null;
  };

  // flatlist içi render edilecek öğeler
  const renderrItem = ({ item }) => <HomeCard stream={item} userID={user.userid} userToken={user.token} />;

  return (
    <>
      <FlatList
        style={{
          zIndex: 0,
          height: "100%",
          elevation: -1,
          flex: 1,
        }}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={footerComponent}
        maxToRenderPerBatch={10}
        onEndReached={() => incrementMyOffset()}
        onEndReachedThreshold={1}
        data={myProfileStreamData}
        renderItem={renderrItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
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
      </Modal>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  userInfoBox: {
    flex: 2,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textUserInfo: {
    textAlignVertical: "center",
    fontSize: 12,
    color: "#6C757D",
  },

  neDusunuyorsunBox: {
    flex: 2,
    flexDirection: "row",
    height: 100,
    backgroundColor: "#FFF",
    elevation: 1000,
    marginVertical: 5,
  },
  neDusunuyorsun: {
    flex: 1,

    padding: 10,
    height: "100%",
    fontSize: 15,
    color: "#6C757D",
  },

  profileOptionsBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  menuContainer: {
    height: HEADER_BOT_HEIGHT_MENU + 10,
    backgroundColor: "#FFFFFF",
    marginTop: 3,
  },

  menuRow: {
    height: HEADER_BOT_HEIGHT_MENU / 6 - 20,
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  menuItem: {
    padding: 5,
    margin: 5,
    height: HEADER_BOT_HEIGHT_MENU / 5 - 45,
    width: HEADER_BOT_HEIGHT_MENU / 5 - 45,
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
    width: HEADER_BOT_HEIGHT_MENU / 5 - 45,
  },
  cokYakindaText: {
    color: "#FFFFFF",
    fontSize: 9,
    textAlign: "center",
  },
});

// header üst kısım, banner, profil foto, kullanıcı bilgileri, info ve menu button
const HeaderTopPart = ({ userDetail, headerBotPart, setHeaderBotPart, setUyelikTuru }) => {
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const nav = useNavigation();
  /*   console.log("----- ğğğ -----");
  console.log(userDetail); */
  return (
    <View style={{ height: HEADER_TOP_HEIGHT, zIndex: 0 }}>
      {headerBotPart !== 0 && (
        <View
          style={{
            position: "absolute",
            top: 10,
            left: 5,
            zIndex: 1,
          }}
        >
          <TouchableOpacity onPress={() => setHeaderBotPart(0)}>
            <Image
              style={{ height: HEADER_TOP_HEIGHT / 10, width: HEADER_TOP_HEIGHT / 10 }}
              source={GoBackIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}

      {/* banner */}
      <View style={{ flex: 4 }}>
        <Image style={{ width: "100%", height: "100%" }} source={Banner} resizeMode="cover" />

        {/* @@@@@@ profil foto @@@@@@ */}
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -HEADER_TOP_HEIGHT / 20,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Image
            style={{ height: HEADER_TOP_HEIGHT / 2.7, width: HEADER_TOP_HEIGHT / 2.7 }}
            source={Avatar}
            resizeMode="contain"
          />
          {/* profil foto kamera icon */}
          <View
            style={{
              position: "absolute",
              top: HEADER_TOP_HEIGHT / 3.2,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <Image
              style={{ height: HEADER_TOP_HEIGHT / 15, width: HEADER_TOP_HEIGHT / 15, backgroundColor: "#EFEFEF" }}
              source={Camera}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* banner kamera icon */}
        <View
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            zIndex: 1,
          }}
        >
          <TouchableOpacity /* onPress={() => nav.navigate("OtherProfile", { user: "üser" })} */>
            <Image
              style={{ height: HEADER_TOP_HEIGHT / 15, width: HEADER_TOP_HEIGHT / 15, backgroundColor: "#EFEFEF" }}
              source={Camera}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* user info box  */}
      <View style={styles.userInfoBox}>
        {userDetail && (
          <Text style={{ color: "#6C757D", fontSize: 15 }}>
            {userDetail[0]?.userrole_id === 1
              ? userDetail[0]?.userdetail.name
              : userDetail[0]?.userdetail.full_institution_name}
          </Text>
        )}
        <View
          style={{
            marginBottom: 10,
            marginTop: 5,
            padding: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => (headerBotPart !== 1 ? setHeaderBotPart(1) : setHeaderBotPart(0))}
            >
              <Image
                style={{ marginLeft: 10, height: HEADER_TOP_HEIGHT / 18, width: HEADER_TOP_HEIGHT / 18 }}
                source={headerBotPart === 1 ? InfoActive : InfoPassive}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 2 }}>
              {userDetail.length > 0 && ( // emrenin telefonunun çözümü.  lenght konrol etmezsek Flags[userDetail da patlıyor
                <Image
                  style={{ height: 20, width: 20 }}
                  source={Flags[userDetail[0]?.userdetail?.country?.binarycode.toLowerCase()]}
                  resizeMode="contain"
                />
              )}
            </View>
            <Text style={styles.textUserInfo}>{userDetail[0]?.userdetail.country.binarycode}</Text>
            <Text style={[styles.textUserInfo, { paddingLeft: 10 }]}>{setUyelikTuru()}</Text>
            <Text style={[styles.textUserInfo, { paddingLeft: 10 }]}>{userDetail[0]?.userdetail.user_code}</Text>
          </View>

          <View>
            {/*   <TouchableOpacity
              style={{ flex: 1 }}
              // onPress={() => (headerBotPart !== 2 ? setHeaderBotPart(2) : setHeaderBotPart(0))}
            >
              <Image
                style={{ marginRight: 10, height: HEADER_TOP_HEIGHT / 18, width: HEADER_TOP_HEIGHT / 18 }}
                source={headerBotPart === 2 ? MenuActive : MenuPassive}
                resizeMode="contain"
              />
            </TouchableOpacity> */}

            <TouchableOpacity
              style={{ flex: 1, margin: 5, alignItems: "center", justifyContent: "center" }}
              onPress={() => setQrModalOpen(true)}
            >
              <Image
                style={{ height: HEADER_TOP_HEIGHT / 12, width: HEADER_TOP_HEIGHT / 12 }}
                resizeMode="contain"
                source={qrIcon}
              />
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
          </View>
        </View>
      </View>
    </View>
  );
};

//
//
//
/** @@@@@@@@ header alt kısım 3 farklı, @@@@@@@ */
// standart bot part ne düşünüyorsun ve yatay flatlist
const HeaderBotPart = ({ user, setSelectedModalType, setModalVisible }) => {
  return (
    <View style={{ height: HEADER_BOT_HEIGHT }}>
      {/* ne düşünüyorsun view */}
      <View style={styles.neDusunuyorsunBox}>
        <View style={{ flex: 1, padding: 10, alignItems: "center" }}>
          <Image style={{ flex: 1, height: "100%", width: "100%" }} source={Logo1} resizeMode="contain" />
          <Text style={{ fontSize: 12 }}>{user.username}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Image style={{ height: 20, width: 20, marginRight: 2 }} source={Bayrak} resizeMode="contain" />
            <Text style={{ fontSize: 10, textAlignVertical: "center" }}>TR</Text>

            <Text style={{ paddingLeft: 10, fontSize: 8, textAlignVertical: "center" }}>Bireysel</Text>
          </View>
        </View>
        <View style={{ flex: 3 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              shadowColor: "#c1c1c1",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 5,
              backgroundColor: "#FFFFFF",
              margin: 5,
            }}
            onPress={() => console.log("Ne Düşünüyorsun tıklandı") /* setModalOpen(true) */}
          >
            <Text style={styles.neDusunuyorsun}>Ne Düşünüyorsun ?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* profile options view */}
      <View style={styles.profileOptionsBox}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <ProfileItem
            text="Kartvizit"
            img={KartvizitIcon}
            onPressHandle="kartvizit"
            setSelectedModalType={setSelectedModalType}
            setModalVisible={setModalVisible}
          />
          <ProfileItem
            text="Fotoğraf"
            img={FotografIcon}
            onPressHandle="foto"
            setSelectedModalType={setSelectedModalType}
            setModalVisible={setModalVisible}
          />
          <ProfileItem
            text="Video"
            img={VideoIcon}
            onPressHandle="video"
            setSelectedModalType={setSelectedModalType}
            setModalVisible={setModalVisible}
          />
          <ProfileItem
            text="Randevu"
            img={RandevuIcon}
            onPressHandle="randevu"
            setSelectedModalType={setSelectedModalType}
            setModalVisible={setModalVisible}
          />
          <ProfileItem
            text="Takip"
            img={TakipIcon}
            onPressHandle="takip"
            setSelectedModalType={setSelectedModalType}
            setModalVisible={setModalVisible}
          />
          <ProfileItem
            text="Döviz"
            img={DovizIcon}
            onPressHandle="doviz"
            setSelectedModalType={setSelectedModalType}
            setModalVisible={setModalVisible}
          />
          <ProfileItem
            text="Hava Durumu"
            img={HavadurumuIcon}
            onPressHandle="hava"
            setSelectedModalType={setSelectedModalType}
            setModalVisible={setModalVisible}
          />
          <ProfileItem
            text="Dünya Saatleri"
            img={DunyaSaatleriIcon}
            onPressHandle="saat"
            setSelectedModalType={setSelectedModalType}
            setModalVisible={setModalVisible}
          />
        </ScrollView>
      </View>
    </View>
  );
};

// info butonuna tıklanırsa açılacak bot part
const HeaderBotPartInfo = ({ user }) => {
  return (
    <View style={{ height: HEADER_BOT_HEIGHT_INFO, backgroundColor: "#FFFFFF", marginTop: 3 }}>
      <View style={{ flex: 3, padding: 5 }}>
        <View style={{ position: "absolute", top: 6, left: 4 }}>
          <Image
            style={{
              height: HEADER_BOT_HEIGHT_INFO / 15,
              width: HEADER_BOT_HEIGHT_INFO / 15,
            }}
            source={DescriptionIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={{ color: "#6C757D" }}>
          {"       "}Lorem Ipsum is simply dummy text of the printing and the is typesetting industry. Lorem Ipsum has
          been the industrys is standard dummy text ever since the 1500s, when the end. isdustrys is standard dummy text
          ever since the 1500s, when the end.
        </Text>
      </View>

      <View style={{ flex: 2, padding: 5, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: HEADER_BOT_HEIGHT_INFO / 15, width: HEADER_BOT_HEIGHT_INFO / 15, marginRight: 5 }}
              source={MobilePhoneIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D" }}>adress asdas </Text>
          </View>

          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: HEADER_BOT_HEIGHT_INFO / 15, width: HEADER_BOT_HEIGHT_INFO / 15, marginRight: 5 }}
              source={WebIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D" }}>adress asd</Text>
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: HEADER_BOT_HEIGHT_INFO / 15, width: HEADER_BOT_HEIGHT_INFO / 15, marginRight: 5 }}
              source={HomePhoneIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D" }}>adres</Text>
          </View>

          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: HEADER_BOT_HEIGHT_INFO / 15, width: HEADER_BOT_HEIGHT_INFO / 15, marginRight: 5 }}
              source={EmailIcon}
              resizeMode="contain"
            />
            <Text style={{ color: "#6C757D" }}>adress asd</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, padding: 5, flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ height: HEADER_BOT_HEIGHT_INFO / 15, width: HEADER_BOT_HEIGHT_INFO / 15, marginRight: 5 }}
          source={HomeIcon}
          resizeMode="contain"
        />
        <Text style={{ color: "#6C757D" }}>adress asdas adress asdas asared</Text>
      </View>

      <View style={{ flex: 2, padding: 5 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#00AA9F",
            backgroundColor: "#00AA9F",
            padding: 10,
          }}
          /* onPress={onPress}
          disabled={buttonDisabled} */
        >
          <Text style={{ fontSize: 15, color: "#fff" }}>Profilimi Düzenle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// menu butonuna tıklanırsa açılacak bot part
const HeaderBotPartMenu = () => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuRow}>
        <MenuItem text="Stant" img={StantIcon} onPressHandle="Stant" />
        <MenuItem text="Salon" img={SalonIcon} onPressHandle="Salon" />
        <MenuItem text="Fuar" img={FuarIcon} onPressHandle="Salon" />
      </View>
      <View style={styles.menuRow}>
        <MenuItem text="Navigasyon" img={NavigasyonIcon} onPressHandle="Navigasyon" />
        <MenuItem text="Reklam" img={ReklamIcon} onPressHandle="Reklam" />
        <MenuItem text="Evrak Çantam" img={EvrakIcon} onPressHandle="Evrak Çantam" />
      </View>
      <View style={styles.menuRow}>
        <MenuItem text="Raporlar" img={RaporIcon} onPressHandle="Raporlar" />
        <MenuItem text="MyVex" img={MyVexIcon} onPressHandle="MyVex" />
        <MenuItem text="Muhasebe" img={MuhasebeIcon} onPressHandle="Muhasebe" />
      </View>
      <View style={styles.menuRow}>
        <MenuItem text="Çıkış" img={CikisIcon} onPressHandle="Çıkış" />
        <MenuItem text="VexOffice" img={VexOfficeIcon} onPressHandle="VexOffice" cokYakinda />
        <MenuItem text="VexHibition" img={VexHibitionIcon} onPressHandle="VexHibition" cokYakinda />
      </View>
      <View style={styles.menuRow}>
        <MenuItem text="VexClass" img={VexClassIcon} onPressHandle="VexClass" cokYakinda />
        <MenuItem text="VexClinic" img={VexClinicIcon} onPressHandle="VexClinic" cokYakinda />
        <MenuItem text="VexStore" img={VexStoreIcon} onPressHandle="VexStore" cokYakinda />
      </View>
      <View style={styles.menuRow}>
        <MenuItem text="VexToran" img={VexToranIcon} onPressHandle="VexToran" cokYakinda />

        {/* boş menü itemlar - bir sırada 3 adet menü item olması gerek, düzgün ortalama için */}
        <View
          style={{
            padding: 5,
            margin: 5,
            height: HEADER_BOT_HEIGHT_MENU / 5 - 45,
            width: HEADER_BOT_HEIGHT_MENU / 5 - 45,
            borderWidth: 0.5,
            borderColor: "#FFFFFF",
          }}
        />

        <View
          style={{
            padding: 5,
            margin: 5,
            height: HEADER_BOT_HEIGHT_MENU / 5 - 45,
            width: HEADER_BOT_HEIGHT_MENU / 5 - 45,
            borderWidth: 0.5,
            borderColor: "#FFFFFF",
          }}
        />
      </View>
    </View>
  );
};
//
//
//

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

// yatay flatlist içindeki öğeler - kartvizit, fotoğraf, video vs.
const ProfileItem = ({ text, img, onPressHandle, setSelectedModalType, setModalVisible }) => {
  const goToComp = () => {
    setSelectedModalType(onPressHandle);
    setModalVisible(true);
  };

  return (
    <TouchableOpacity onPress={() => goToComp()}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#EFEFEF",
          margin: 5,
          paddingVertical: 5,
          paddingHorizontal: 10,
          flexDirection: "row",
        }}
      >
        <Image style={{ height: "100%", width: 30, flex: 1 }} source={img} resizeMode="contain" />
        <Text style={{ flex: 1, textAlignVertical: "center", fontSize: 14, color: "#6C757D" }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
