import React, { useState } from "react";
import { View, TouchableOpacity, Dimensions, Image, Text, StyleSheet } from "react-native";

import TakipGelen from "../../../../assets/notification/takip/takip-gelen.png";
import TakipGiden from "../../../../assets/notification/takip/takip-giden.png";

import BegeniGelen from "../../../../assets/notification/begeni/begeni-gelen.png";
import BegeniGiden from "../../../../assets/notification/begeni/begeni-giden.png";

import BasvuruGelen from "../../../../assets/notification/basvuru/basvuru-gelen.png";
import BasvuruGiden from "../../../../assets/notification/basvuru/basvuru-giden.png";

import EngelGelen from "../../../../assets/notification/engel/engel-gelen.png";
import EngelGiden from "../../../../assets/notification/engel/engel-giden.png";

import SikayetGelen from "../../../../assets/notification/sikayet/sikayet-gelen.png";
import SikayetGiden from "../../../../assets/notification/sikayet/sikayet-giden.png";

import DavetGelen from "../../../../assets/notification/davetiye/davetiye-gelen.png";
import DavetGiden from "../../../../assets/notification/davetiye/davetiye-giden.png";

import YorumGelen from "../../../../assets/notification/yorum/yorum-gelen.png";
import YorumGiden from "../../../../assets/notification/yorum/yorum-giden.png";

import TesekkurGelen from "../../../../assets/notification/tesekkur/tesekkur-gelen.png";
import TesekkurGiden from "../../../../assets/notification/tesekkur/tesekkur-giden.png";

import HediyeGelen from "../../../../assets/notification/hediye/hediye-gelen.png";
import HediyeGiden from "../../../../assets/notification/hediye/hediye-giden.png";

import KayitGuncellemeGelen from "../../../../assets/notification/kayit-guncelle/kayit-guncelle-gelen.png";
import KayitGuncellemeGiden from "../../../../assets/notification/kayit-guncelle/kayit-guncelle-giden.png";

const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;

const GelenGidenMenu = ({ activeState, setActiveState, setType, setStateIsReceived }) => {
  const activateBildirimTakip = () => {
    //  setActiveState("bildirimler-takip");

    setActiveState("bildirimler-takip");
    setType(1);
    //  setStreamData(streamTakipData);
  };
  const activateBildirimBegeni = () => {
    // setActiveState("bildirimler-begeni");
    setActiveState("bildirimler-begeni");
    setType(2);
    // setStreamData(streamBegeniData);
  };
  const activateBildirimEngel = () => {
    // setActiveState("bildirimler-engel");
    setActiveState("bildirimler-engel");
    setType(3);
    //  setStreamData(streamEngelData);
  };
  const activateBildirimSikayet = () => {
    // setActiveState("bildirimler-sikayet");
    setActiveState("bildirimler-sikayet");
    setType(4);
    //  setStreamData(streamSikayetData);
  };

  const activateBildirimDavet = () => {
    //  setActiveState("bildirimler-davet");
    setActiveState("bildirimler-davet");
    setType(5);
    //  setStreamData(streamDavetData);
  };

  const activateBildirimYorum = () => {
    //  setActiveState("bildirimler-yorum");
    setActiveState("bildirimler-yorum");
    setType(6);
    //  setStreamData(streamYorumData);
  };
  const activateBildirimTesekkur = () => {
    // setActiveState("bildirimler-tesekkur");
    setActiveState("bildirimler-tesekkur");
    setType(7);
    //  setStreamData(streamTesekkurData);
  };
  const activateBildirimBasvuru = () => {
    //  setActiveState("bildirimler-basvuru");
    setActiveState("bildirimler-basvuru");
    setType(8);
    //  setStreamData(streamBasvuruData);
  };
  const activateBildirimHediye = () => {
    // setActiveState("bildirimler-hediye");
    setActiveState("bildirimler-hediye");
    setType(9);
    //  setStreamData(streamHediyeData);
  };
  const activateBildirimKayitGuncelleme = () => {
    //  setActiveState("bildirimler-guncelleme");
    setActiveState("bildirimler-guncelleme");
    setType(10);
    //  setStreamData(streamKayitGuncellemeData);
  };

  const activationForReceived = () => {
    setStateIsReceived(true);
    if (activeState === "bildirim-takip-menu") {
      activateBildirimTakip();
    } else if (activeState === "bildirim-beğeni-menu") {
      activateBildirimBegeni();
    } else if (activeState === "bildirim-engel-menu") {
      activateBildirimEngel();
    } else if (activeState === "bildirim-şikayet-menu") {
      activateBildirimSikayet();
    } else if (activeState === "bildirim-davet-menu") {
      activateBildirimDavet();
    } else if (activeState === "bildirim-yorum-menu") {
      activateBildirimYorum();
    } else if (activeState === "bildirim-teşekkür-menu") {
      activateBildirimTesekkur();
    } else if (activeState === "bildirim-başvuru-menu") {
      activateBildirimBasvuru();
    } else if (activeState === "bildirim-hediye-menu") {
      activateBildirimHediye();
    } else if (activeState === "bildirim-güncelleme-menu") {
      activateBildirimKayitGuncelleme();
    }
  };
  const activationForSent = () => {
    setStateIsReceived(false);
    if (activeState === "bildirim-takip-menu") {
      activateBildirimTakip();
    } else if (activeState === "bildirim-beğeni-menu") {
      activateBildirimBegeni();
    } else if (activeState === "bildirim-engel-menu") {
      activateBildirimEngel();
    } else if (activeState === "bildirim-şikayet-menu") {
      activateBildirimSikayet();
    } else if (activeState === "bildirim-davet-menu") {
      activateBildirimDavet();
    } else if (activeState === "bildirim-yorum-menu") {
      activateBildirimYorum();
    } else if (activeState === "bildirim-teşekkür-menu") {
      activateBildirimTesekkur();
    } else if (activeState === "bildirim-başvuru-menu") {
      activateBildirimBasvuru();
    } else if (activeState === "bildirim-hediye-menu") {
      activateBildirimHediye();
    } else if (activeState === "bildirim-güncelleme-menu") {
      activateBildirimKayitGuncelleme();
    }
  };

  const ShowReceivedButton = () => {
    switch (activeState) {
      case "bildirim-takip-menu":
        return <Image style={styles.bigItemImg} source={TakipGelen} resizeMode="contain" />;
      case "bildirim-beğeni-menu":
        return <Image style={styles.bigItemImg} source={BegeniGelen} resizeMode="contain" />;
      case "bildirim-engel-menu":
        return <Image style={styles.bigItemImg} source={EngelGelen} resizeMode="contain" />;
      case "bildirim-şikayet-menu":
        return <Image style={styles.bigItemImg} source={SikayetGelen} resizeMode="contain" />;
      case "bildirim-davet-menu":
        return <Image style={styles.bigItemImg} source={DavetGelen} resizeMode="contain" />;
      case "bildirim-yorum-menu":
        return <Image style={styles.bigItemImg} source={YorumGelen} resizeMode="contain" />;
      case "bildirim-teşekkür-menu":
        return <Image style={styles.bigItemImg} source={TesekkurGelen} resizeMode="contain" />;
      case "bildirim-başvuru-menu":
        return <Image style={styles.bigItemImg} source={BasvuruGelen} resizeMode="contain" />;
      case "bildirim-hediye-menu":
        return <Image style={styles.bigItemImg} source={HediyeGelen} resizeMode="contain" />;
      case "bildirim-güncelleme-menu":
        return <Image style={styles.bigItemImg} source={KayitGuncellemeGelen} resizeMode="contain" />;
      default:
        return null;
    }
  };

  const ShowSentButton = () => {
    switch (activeState) {
      case "bildirim-takip-menu":
        return <Image style={styles.bigItemImg} source={TakipGiden} resizeMode="contain" />;
      case "bildirim-beğeni-menu":
        return <Image style={styles.bigItemImg} source={BegeniGiden} resizeMode="contain" />;
      case "bildirim-engel-menu":
        return <Image style={styles.bigItemImg} source={EngelGiden} resizeMode="contain" />;
      case "bildirim-şikayet-menu":
        return <Image style={styles.bigItemImg} source={SikayetGiden} resizeMode="contain" />;
      case "bildirim-davet-menu":
        return <Image style={styles.bigItemImg} source={DavetGiden} resizeMode="contain" />;
      case "bildirim-yorum-menu":
        return <Image style={styles.bigItemImg} source={YorumGiden} resizeMode="contain" />;
      case "bildirim-teşekkür-menu":
        return <Image style={styles.bigItemImg} source={TesekkurGiden} resizeMode="contain" />;
      case "bildirim-başvuru-menu":
        return <Image style={styles.bigItemImg} source={BasvuruGiden} resizeMode="contain" />;
      case "bildirim-hediye-menu":
        return <Image style={styles.bigItemImg} source={HediyeGiden} resizeMode="contain" />;
      case "bildirim-güncelleme-menu":
        return <Image style={styles.bigItemImg} source={KayitGuncellemeGiden} resizeMode="contain" />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity style={styles.bigCardView} onPress={activationForReceived}>
        <ShowReceivedButton />
        <Text style={styles.bigCardText}>GELEN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bigCardView} onPress={activationForSent}>
        <ShowSentButton />
        <Text style={styles.bigCardText}>GÖNDERİLEN</Text>
      </TouchableOpacity>
    </View>
  );
};
export default GelenGidenMenu;
const styles = StyleSheet.create({
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
});
