/* eslint-disable prefer-arrow-callback */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-unused-styles */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Modal,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import BildirimlerKotuyeKullanim from "./notificationComponents/BildirimlerKotuyeKullanim";

import { useUserValue } from "../../contexts/UserContext";
import RequestResponse from "../tests/RequestResponse";
import Arama from "../../../assets/vexmail/arama.png";
import GelenMail from "../../../assets/vexmail/gelen-mail.png";
import GonderilenMail from "../../../assets/vexmail/gonderilen-mail.png";
import Klasor from "../../../assets/vexmail/klasor.png";
import Imza from "../../../assets/vexmail/imza.png";
import Attach from "../../../assets/vexmail/attach.png";
import Ucnokta from "../../../assets/vexmail/uc-nokta.png";
import Geri from "../../../assets/forgotpass/go-back-black.png";
import BildirimAktif from "../../../assets/notification/bildirim-aktif.png";
import BildirimPasif from "../../../assets/notification/bildirim-pasif.png";
import Duyurular from "../../../assets/notification/duyurular.png";
import Mugla from "../../../assets/notification/mugla.png";

import YeniMail from "../../../assets/vexmail/yeni-mail-b.png";
import NewMailModal from "./vexMailComponents/NewMailModal";
import ReceivedMailModal from "./vexMailComponents/ReceivedMailModal";
import SentMailModal from "./vexMailComponents/SentMailModal";
import FolderModal from "./vexMailComponents/FolderModal";
import ProfilModal from "./vexMailComponents/ProfilModal";
import SignatureModal from "./vexMailComponents/SignatureModal";
import AttachedFilesModal from "./vexMailComponents/AttachedFilesModal";
import BildirimComponent from "./notificationComponents/BildirimComponent";
import SearchAndFilterComponant from "./notificationComponents/SearchAndFilter";
import FilterListModal from "./notificationComponents/FilterListModal";
import BildirimlerSikayetGoruntule from "./notificationComponents/BildirimlerSikayetGoruntule";
import BildirimlerDavetGoruntule from "./notificationComponents/BildirimlerDavetGoruntule";
import BildirimlerYorumGoruntule from "./notificationComponents/BildirimlerYorumGoruntule";
import YayinBilgisi from "./notificationComponents/YayinBilgisi";
import StantSeciniz from "./notificationComponents/StantSeciniz";
import YayindaStantSelection from "./notificationComponents/YayindaStantSelection";
import BeklemedeStantSelection from "./notificationComponents/BeklemedeStantSelection";
import BitenStantSelection from "./notificationComponents/BitenStantSelection";
import BasvuruyuTamamla from "./notificationComponents/BasvuruyuTamamla";
import KonumSec from "./notificationComponents/KonumSec";
import {
  postNotificationFollow,
  postNotificationLikes,
  postNotificationBlocks,
  postNotificationComplaints,
  postNotificationInvitations,
  postNotificationComments,
  postNotificationThanks,
  postNotificationApplications,
  postNotificationGift,
  postNotificationUpdate,
  postAnnouncement,
  postNotificationCount,
} from "../../helpers/connections";

import GelenGidenMenu from "./notificationComponents/GelenGidenMenu";

import Takip from "../../../assets/notification/takip/takip.png";
import Begeni from "../../../assets/notification/begeni/begeni.png";
import Engel from "../../../assets/notification/engel/engel.png";
import Sikayet from "../../../assets/notification/sikayet/sikayet.png";
import Davet from "../../../assets/notification/davetiye/davetiye.png";
import Yorum from "../../../assets/notification/yorum/yorum.png";
import Tesekkur from "../../../assets/notification/tesekkur/tesekkur.png";
import Basvuru from "../../../assets/notification/basvuru/basvuru.png";
import Hediye from "../../../assets/notification/hediye/hediye.png";
import KayitGuncelleme from "../../../assets/notification/kayit-guncelle/kayit-guncelle.png";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const Notification = () => {
  const [activeState, setActiveState] = useState("notiHome");

  const [backButtonVisible, setBackButtonVisible] = useState(false);
  const [newMailModalOpen, setNewMailModalOpen] = useState(false);
  const [receivedMailModalOpen, setReceivedMailModalOpen] = useState(false);
  const [sentMailModalOpen, setSentMailModalOpen] = useState(false);
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [profilModalOpen, setProfilModalOpen] = useState(false);
  const [signatureModalOpen, setSignatureModalOpen] = useState(false);
  const [attachedFilesModalOpen, setAttachedFilesModalOpen] = useState(false);
  const [openFilterListModal, setOpenFilterListModal] = useState(false);
  const [konum, setKonum] = useState("");
  const [selectedIndexList, setSelectedIndexList] = useState([]);
  const dummyArray = [
    { id: "1", value: "A" },
    { id: "2", value: "B" },
    { id: "3", value: "C" },
    { id: "4", value: "D" },
    { id: "5", value: "E" },
    { id: "6", value: "F" },
    { id: "7", value: "G" },
    { id: "8", value: "H" },
    { id: "9", value: "I" },
    { id: "10", value: "J" },
    { id: "11", value: "K" },
    { id: "12", value: "L" },
    { id: "13", value: "M" },
    { id: "14", value: "N" },
    { id: "15", value: "O" },
    { id: "16", value: "P" },
    { id: "17", value: "Q" },
    { id: "18", value: "R" },
    { id: "19", value: "S" },
    { id: "20", value: "T" },
    { id: "21", value: "U" },
    { id: "22", value: "V" },
    { id: "23", value: "W" },
    { id: "24", value: "X" },
    { id: "25", value: "Y" },
    { id: "26", value: "Z" },
  ];

  const [streamData, setStreamData] = useState([]);
  const [notiCounts, setNotiCounts] = useState(null);
  // const [streamTakipData, setStreamTakipData] = useState([]);
  // const [streamBegeniData, setStreamBegeniData] = useState([]);
  // const [streamEngelData, setStreamEngelData] = useState([]);
  // const [streamSikayetData, setStreamSikayetData] = useState([]);
  // const [streamDavetData, setStreamDavetData] = useState([]);
  // const [streamYorumData, setStreamYorumData] = useState([]);
  // const [streamTesekkurData, setStreamTesekkurData] = useState([]);
  // const [streamBasvuruData, setStreamBasvuruData] = useState([]);
  // const [streamHediyeData, setStreamHediyeData] = useState([]);
  // const [streamKayitGuncellemeData, setStreamKayitGuncellemeData] = useState([]);

  const [onProcessItem, setOnProcessItem] = useState(null);

  const [stateIsReceived, setStateIsReceived] = useState(true);

  const postData = new FormData();
  const postDataForCounts = new FormData();
  const [type, setType] = useState(1);
  // Api da tanımlı değerler
  // 1 Takip
  // 2 Beğeni
  // 3 Engel
  // 4 Şikayet
  // 5 Davet
  // 6 Yorum
  // 7 Teşekkür
  // 8 Başvurular
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(1);
  // SecureStore.deleteItemAsync("mobile-token");
  const [{ user }] = useUserValue();
  const [refreshComponent, setRefreshComponent] = useState(false);
  // console.log("--- g- ---");
  // console.log(user);
  // console.log(activeState);

  useEffect(() => {
    clearState();
    getNotificationCounts();

    if (activeState === "bildirimler-takip" && !Object.keys(streamData).length > 0) {
      getTakipData();
    } // &&(!Object.keys(streamTakipData).length > 0)
    else if (activeState === "bildirimler-begeni" ) { // && !Object.keys(streamData).length > 0
      setType(2)
      getBegeniData();
    } else if (activeState === "bildirimler-engel" && !Object.keys(streamData).length > 0) {
      setType(3)
      getEngelData();
    } else if (activeState === "bildirimler-sikayet" && !Object.keys(streamData).length > 0) {
      setType(4)
      getSikayetData();
    } else if (activeState === "bildirimler-davet" && !Object.keys(streamData).length > 0) {
      setType(5)
      getDavetData();
    } else if (activeState === "bildirimler-yorum" && !Object.keys(streamData).length > 0) {
      setType(6)
      getYorumData();
    } else if (activeState === "bildirimler-tesekkur" && !Object.keys(streamData).length > 0) {
      setType(7)
      getTesekkurData();
    } else if (activeState === "bildirimler-basvuru" && !Object.keys(streamData).length > 0) {
      setType(8)
      getBasvuruData();
    } else if (activeState === "bildirimler-hediye" && !Object.keys(streamData).length > 0) {
      setType(9)
      getHediyeData();
    } else if (activeState === "bildirimler-guncelleme" && !Object.keys(streamData).length > 0) {
      setType(10)
      getGuncellemeData();
    } else if (activeState === "duyuruEkrani" && !Object.keys(streamData).length > 0) {
      getDuyuruData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeState, refreshComponent]);

  const clearState = () => {
    setStreamData([]);
  };

  const getNotificationCounts = async () => {
    postNotificationCount(user.token)
      .then((res) => {
        // setOffset(offset + 1)
        //  console.log(res);
        setNotiCounts(res);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  const getTakipData = () => {
    //  setLoading(true);
    postData.append("main_type", type); // ? type belirlenecek
    postData.append("page", offset);

    postNotificationFollow(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);

        //  if (!Object.keys(streamData.filter((el) => el.id === item.id)).length > 0) { // offset artırıp yeni sayfa yüklemeyi ayarla
        // //  setCcProfilArray((prevArray) => [...prevArray, item]);
        //   setOffset(offset + 1);
        //   setStreamData([...streamData, ...res.followNotifications]);
        // } else {
        //   console.log("aynı item EKLENMEDİ");
        // }

        setStreamData([...streamData, ...res.followNotifications]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  const getBegeniData = () => {
    //  setLoading(true);
    postData.append("main_type", type); //
    postData.append("page", offset);

    postNotificationLikes(postData, user.token)
      .then((res) => {
        // console.log(res);
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.likeNotifications]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  const getEngelData = () => {
    //  setLoading(true);
    postData.append("main_type", type); //
    postData.append("page", offset);

    postNotificationBlocks(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.blockNotifications]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  const getSikayetData = () => {
    //  setLoading(true);
    postData.append("main_type", type); //
    postData.append("page", offset);

    postNotificationComplaints(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.complaintNotifications]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const getDavetData = () => {
    //  setLoading(true);
    postData.append("main_type", type); //
    postData.append("page", offset);

    postNotificationInvitations(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.invitationNotifications]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const getYorumData = () => {
    //  setLoading(true);
    postData.append("main_type", type); //
    postData.append("page", offset);

    postNotificationComments(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.commentNotifications]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const getTesekkurData = () => {
    //  setLoading(true);
    postData.append("main_type", type); //
    postData.append("page", offset);

    postNotificationThanks(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.thankNotifications]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const getBasvuruData = () => {
    //  setLoading(true);
    postData.append("main_type", type); //
    postData.append("page", offset);

    postNotificationApplications(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.applicationNotifications]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const getHediyeData = () => {
    //  setLoading(true);

    postData.append("page", offset);

    postNotificationGift(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.giftNotifications]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };
  const getGuncellemeData = () => {
    //  setLoading(true);

    postData.append("page", offset);

    postNotificationUpdate(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.authorityChanges]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  const getDuyuruData = () => {
    //  setLoading(true);

    postData.append("currentPage", offset);

    postAnnouncement(postData, user.token)
      .then((res) => {
        // setOffset(offset + 1);  sonraki sayfa ayarlanacak
        setStreamData([...streamData, ...res.announcements]);
        //  setLoading(false);
      }) // console.log(res.streams)  setStreamData(res.streams)
      .catch((err) => console.log(err));
  };

  const headerComponent = () => {
    if (
      activeState === "cardMenu" ||
      activeState === "folder" ||
      activeState === "sign" ||
      activeState === "search" ||
      activeState === "newMail"
    ) {
      return <CardMenu />;
    }
    return <AramaComponent />;
  };

  const AramaComponent = () => {
    return (
      <View style={styles.headerComponent}>
        <Image style={styles.menuItemImg} source={Arama} resizeMode="contain" />
        <TextInput placeholder="Arama" />
      </View>
    );
  };
  const ItemView = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <TouchableHighlight style={styles.item} onPress={() => openEmail(item)}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 2, justifyContent: "flex-start", alignItems: "center" }}>
            <Image
              style={{ height: 35, width: 35, marginHorizontal: 5 }}
              source={{ uri: item.broadcastable?.user?.userdetail?.picture }} // broadcastable?.user?.userdetail?.picture
              resizeMode="contain"
            />

            <Text style={{ color: "#6C757D", fontSize: 8 }}>{item.broadcastable?.expo?.name}</Text>
            {/*  broadcastable?.user?.userdetail?.full_institution_name */}
          </View>

          <View
            style={{
              flexDirection: "row",
              flex: 10,
              justifyContent: "flex-start",
              alignItems: "center",
              marginHorizontal: 8,
            }}
          >
            <Text style={{ color: "#6C757D", fontSize: 10 }}>{item.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  const openEmail = (item) => {
    // Function for click on an item
    // eslint-disable-next-line prefer-template
    //  alert('Id : ' + item.id + ' Value : ' + item.value);
    if (activeState === "inbox" || activeState === "cardMenu") {
      setReceivedMailModalOpen(true);
    } else if (activeState === "outbox") {
      setSentMailModalOpen(true);
    }
  };

  const activateInbox = () => {
    setActiveState("inbox");
  };
  const activateOutbox = () => {
    setActiveState("outbox");
  };
  const activateFolder = () => {
    setActiveState("folder");
    setFolderModalOpen(true);
  };
  const activateSignature = () => {
    setActiveState("sign");
    setSignatureModalOpen(true);
  };
  const activateSearch = () => {
    setActiveState("search");
    setAttachedFilesModalOpen(true);
  };
  const activateNewMail = () => {
    setActiveState("newMail");
    setNewMailModalOpen(true);
  };
  const activateDuyuruEkrani = () => {
    setActiveState("duyuruEkrani");
  };
  const activateBildirimler = () => {
    setActiveState("bildirimler");
  };

  const CardMenu = () => {
    return (
      <View style={styles.butonArea}>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateInbox()}>
          <Image style={styles.menuItemImg} source={GelenMail} resizeMode="contain" />
          <Text style={styles.cardText}>Gelen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateOutbox()}>
          <Image style={styles.menuItemImg} source={GonderilenMail} resizeMode="contain" />
          <Text style={styles.cardText}>Gönderilen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateFolder()}>
          <Image style={styles.menuItemImg} source={Klasor} resizeMode="contain" />
          <Text style={styles.cardText}>Klasör</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateSignature()}>
          <Image style={styles.menuItemImg} source={Imza} resizeMode="contain" />
          <Text style={styles.cardText}>İmza</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.subCardView} onPress={() => activateSearch()}>
          <Image style={styles.menuItemImg} source={Arama} resizeMode="contain" />
          <Text style={styles.cardText}>Arama</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // program to convert first letter of a string to uppercase
  function capitalizeFirstLetter(str) {
    // converting first letter to uppercase
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

    return capitalized;
  }

  const Header = () => {
    if (activeState === "notiHome") {
      return (
        <View style={styles.header}>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim</Text>
        </View>
      );
      // eslint-disable-next-line no-else-return
    } else if (activeState === "duyuruEkrani") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("notiHome")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Duyuru Ekranı</Text>
        </View>
      );
    } else if (activeState === "bildirimler") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("notiHome")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim</Text>
        </View>
      );
    } else if (activeState === "bildirimler-takip") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirim-takip-menu")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Takip</Text>
        </View>
      );
    } else if (activeState === "bildirimler-begeni") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirim-beğeni-menu")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Beğeni</Text>
        </View>
      );
    } else if (activeState === "bildirimler-engel") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirim-engel-menu")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Engel</Text>
        </View>
      );
    } else if (activeState === "bildirimler-sikayet") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirim-şikayet-menu")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Şikayet</Text>
        </View>
      );
    } else if (activeState === "bildirimler-davet") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirim-davet-menu")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Davet</Text>
        </View>
      );
    } else if (activeState === "bildirimler-yorum") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirim-yorum-menu")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Yorum</Text>
        </View>
      );
    } else if (activeState === "bildirimler-tesekkur") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirim-teşekkür-menu")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Teşekkür</Text>
        </View>
      );
    } else if (activeState === "bildirimler-basvuru") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirim-başvuru-menu")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Başvuru</Text>
        </View>
      );
    } else if (activeState === "bildirimler-hediye") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirim-hediye-menu")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Hediye</Text>
        </View>
      );
    } else if (activeState === "bildirimler-guncelleme") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Güncelleme</Text>
        </View>
      );
    } else if (activeState === "bildirimler-sikayet-goruntule") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-sikayet")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Şikâyet Görüntüle</Text>
        </View>
      );
    } else if (activeState === "bildirimler-davet-goruntule") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-davet")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Davet Görüntüle</Text>
        </View>
      );
    } else if (activeState === "bildirimler-yorum-goruntule") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-yorum")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Yorum Görüntüle</Text>
        </View>
      );
    } else if (activeState === "bildirimler-davet-yayınbilgisi") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-davet-goruntule")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Davet Görüntüle - Yayın Bilgisi</Text>
        </View>
      );
    } else if (activeState === "bildirimler-davet-stantseciniz") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-davet-goruntule")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Stant Seçiniz</Text>
        </View>
      );
    } else if (activeState === "bildirimler-davet-stantseciniz-yayındakiler") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-davet-stantseciniz")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Konuma Başvur - Yayında</Text>
        </View>
      );
    } else if (activeState === "bildirimler-davet-stantseciniz-yayınbekleyen") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-davet-stantseciniz")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Konuma Başvur - Yayın Bekleyen</Text>
        </View>
      );
    } else if (activeState === "bildirimler-davet-stantseciniz-yayınıbiten") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-davet-stantseciniz")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Konuma Başvur - Yayını Biten</Text>
        </View>
      );
    } else if (activeState === "bildirimler-davet-stantseciniz-basvuruyutamamla") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-davet-stantseciniz")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Yayında - Turizm ve Seyahat Salonu</Text>
        </View>
      );
    } else if (activeState === "bildirimler-davet-stantseciniz-konumsec") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-davet-stantseciniz-basvuruyutamamla")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Özel Salonlar - Yayında - Nakhal</Text>
        </View>
      );
    } else if (activeState === "bildirimler-kotuye-kullanim") {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler-sikayet")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim - Şikayet- Art Niyet Bildir</Text>
        </View>
      );
    } else if (
      activeState === "bildirim-takip-menu" ||
      activeState === "bildirim-beğeni-menu" ||
      activeState === "bildirim-engel-menu" ||
      activeState === "bildirim-şikayet-menu" ||
      activeState === "bildirim-davet-menu" ||
      activeState === "bildirim-yorum-menu" ||
      activeState === "bildirim-teşekkür-menu" ||
      activeState === "bildirim-başvuru-menu" ||
      activeState === "bildirim-hediye-menu"
    ) {
      return (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setActiveState("bildirimler")}>
            <Image style={{ height: 25, width: 25, paddingVertical: 16 }} source={Geri} resizeMode="contain" />
          </TouchableOpacity>
          <Text style={{ color: "#6C757D", paddingVertical: 16 }}>
            Bildirim - {capitalizeFirstLetter(activeState.slice(9).slice(0, activeState.slice(9).indexOf("-")))} - Gelen
            / Gönderilen
          </Text>
        </View>
      );
    } else return <Text style={{ color: "#6C757D", paddingVertical: 16 }}>Bildirim</Text>;
  };

  const NotiHome = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={styles.bigCardView} onPress={() => activateDuyuruEkrani()}>
          <Image style={styles.bigItemImg} source={Duyurular} resizeMode="contain" />
          <Text style={styles.bigCardText}>DUYURU EKRANI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigCardView} onPress={() => activateBildirimler()}>
          <Image style={styles.bigItemImg} source={BildirimAktif} resizeMode="contain" />
          <Text style={styles.bigCardText}>BİLDİRİMLER</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const DuyuruEkrani = () => {
    return (
      <View style={styles.duyuruEkrani}>
        <FlatList
          data={streamData}
          // Item Separator View
          renderItem={ItemView}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };
  const Bildirimler = () => {
    return (
      <View style={styles.bildirimler}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: WIDTH / 12,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirim-takip-menu")}>
            <Image style={styles.bildirimItemImg} source={Takip} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Takip</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadFollowNotifications}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirim-beğeni-menu")}>
            <Image style={styles.bildirimItemImg} source={Begeni} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Beğeni</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadLikeNotifications}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirim-engel-menu")}>
            <Image style={styles.bildirimItemImg} source={Engel} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Engel</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadBlockNotifications}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: WIDTH / 12,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirim-şikayet-menu")}>
            <Image style={styles.bildirimItemImg} source={Sikayet} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Şikayet</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadComplaintNotifications}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirim-davet-menu")}>
            <Image style={styles.bildirimItemImg} source={Davet} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Davet</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadInviteNotifications}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirim-yorum-menu")}>
            <Image style={styles.bildirimItemImg} source={Yorum} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Yorum</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadCommentNotifications}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: WIDTH / 12,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirim-teşekkür-menu")}>
            <Image style={styles.bildirimItemImg} source={Tesekkur} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Teşekkür</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadThankNotifications}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirim-başvuru-menu")}>
            <Image style={styles.bildirimItemImg} source={Basvuru} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Başvuru</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadApplicationNotifications}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirim-hediye-menu")}>
            <Image style={styles.bildirimItemImg} source={Hediye} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Hediye</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadGiftNotifications}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginHorizontal: WIDTH / 12,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity style={styles.bildirimCardView} onPress={() => setActiveState("bildirimler-guncelleme")}>
            <Image style={styles.bildirimItemImg} source={KayitGuncelleme} resizeMode="contain" />
            <Text style={styles.bildirimCardText}>Kayıt Güncelleme</Text>
            <Text style={styles.bildirimCardTextNumber}>{notiCounts.countUnreadFollowNotifications}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ViewOperations = () => {
    if (activeState === "notiHome") {
      return <NotiHome />;
    } else if (activeState === "duyuruEkrani") {
      return <DuyuruEkrani />;
    } else if (activeState === "bildirimler") {
      return <Bildirimler />;
    } else if (
      activeState === "bildirim-takip-menu" ||
      activeState === "bildirim-beğeni-menu" ||
      activeState === "bildirim-engel-menu" ||
      activeState === "bildirim-şikayet-menu" ||
      activeState === "bildirim-davet-menu" ||
      activeState === "bildirim-yorum-menu" ||
      activeState === "bildirim-teşekkür-menu" ||
      activeState === "bildirim-başvuru-menu" ||
      activeState === "bildirim-hediye-menu" ||
      activeState === "bildirim-güncelleme-menu"
    ) {
      return (
        <GelenGidenMenu
          activeState={activeState}
          setActiveState={setActiveState}
          setType={setType}
          setStateIsReceived={setStateIsReceived}
        />
      );
    } else if (activeState === "bildirimler-sikayet-goruntule") {
      return <BildirimlerSikayetGoruntule onProcessItem={onProcessItem} />;
    } else if (activeState === "bildirimler-kotuye-kullanim") {
      return <BildirimlerKotuyeKullanim onProcessItem={onProcessItem} setActiveState={setActiveState} />;
    } else if (activeState === "bildirimler-davet-goruntule") {
      return <BildirimlerDavetGoruntule setActiveState={setActiveState} onProcessItem={onProcessItem} />;
    } else if (activeState === "bildirimler-yorum-goruntule") {
      return <BildirimlerYorumGoruntule onProcessItem={onProcessItem} />;
    } else if (activeState === "bildirimler-davet-yayınbilgisi") {
      return <YayinBilgisi setActiveState={setActiveState} />;
    } else if (activeState === "bildirimler-davet-stantseciniz") {
      return <StantSeciniz setActiveState={setActiveState} />;
    } else if (activeState === "bildirimler-davet-stantseciniz-yayındakiler") {
      return <YayindaStantSelection setActiveState={setActiveState} />;
    } else if (activeState === "bildirimler-davet-stantseciniz-yayınbekleyen") {
      return <BeklemedeStantSelection setActiveState={setActiveState} />;
    } else if (activeState === "bildirimler-davet-stantseciniz-yayınıbiten") {
      return <BitenStantSelection setActiveState={setActiveState} />;
    } else if (activeState === "bildirimler-davet-stantseciniz-basvuruyutamamla") {
      return <BasvuruyuTamamla setActiveState={setActiveState} konum={konum} setKonum={setKonum} />;
    } else if (activeState === "bildirimler-davet-stantseciniz-konumsec") {
      return (
        <KonumSec
          setActiveState={setActiveState}
          konum={konum}
          setKonum={setKonum}
          setSelectedIndexList={setSelectedIndexList}
          selectedIndexList={selectedIndexList}
        />
      );
    } else {
      return (
        <BildirimComponent
          activeState={activeState}
          setActiveState={setActiveState}
          streamData={streamData}
          setOnProcessItem={setOnProcessItem}
          stateIsReceived={stateIsReceived}
          user={user}
          setRefreshComponent={setRefreshComponent}
        />
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>
      {/* {activeState === "bildirimler" && (
        <SearchAndFilterComponant
          setOpenFilterListModal={setOpenFilterListModal}
        />
      )} */}
      <View style={styles.body}>
        <ViewOperations />

        {/*  FilterListModal                             */}
        <View>
          <Modal
            transparent
            visible={openFilterListModal}
            onRequestClose={() => {
              setOpenFilterListModal((prev) => !prev);
            }}
          >
            <FilterListModal setOpenFilterListModal={setOpenFilterListModal} />
          </Modal>
        </View>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  body: {
    flex: 9,
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  menuItem: {
    padding: 5,
    margin: 5,
    borderWidth: 0.5,
    borderColor: "#c1c1c1",
  },
  menuItemImg: {
    height: 25,
    width: 25,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 2,
  },
  menuItemText: {
    color: "#6C757D",
    textAlign: "center",
    paddingBottom: 5,
  },
  butonArea: {
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listingArea: {
    marginHorizontal: 15,
    flexGrow: 1,
  },
  subCardView: {
    height: 45, // 45
    width: 45,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  bigCardView: {
    height: WIDTH / 2.77,
    width: WIDTH / 2.77,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: HEIGHT / 18.82,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",

    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  bigItemImg: {
    height: WIDTH / 4.5,
    width: WIDTH / 4.5,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 2,
  },
  bigCardText: {
    color: "#6C757D",
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  newMail: {
    height: 45,
    width: 45,
    borderRadius: 3,
    backgroundColor: "#00AA9F",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  cardText: {
    color: "#6C757D",
    fontSize: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginBottom: 10,
    flex: 1,
    //  height: HEIGHT / 9.15,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  headerComponent: {
    flex: 1,
    flexDirection: "row",
    height: 45,
    marginVertical: 15,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  duyuruEkrani: {
    marginHorizontal: 10,
    marginVertical: 10,
    flex: 1,
  },
  bildirimler: {
    flex: 1,
  },
  searchAndFilterComponant: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    height: HEIGHT / 16,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  filter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  bildirimCardView: {
    height: WIDTH / 4.4,
    width: WIDTH / 4.4,
    justifyContent: "center",
    alignItems: "center",
    //   marginBottom:HEIGHT/18.82,
    borderRadius: 3,
    backgroundColor: "white",
    borderColor: "#eeeeee",
    borderWidth: 1,
    borderStyle: "solid",

    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
  bildirimItemImg: {
    height: WIDTH / 8,
    width: WIDTH / 8,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 2,
  },
  bildirimCardText: {
    color: "#6C757D",
    fontSize: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  bildirimCardTextNumber: {
    color: "#00AA9F",
    fontSize: 9,
    justifyContent: "center",
    alignItems: "center",
  },
});
