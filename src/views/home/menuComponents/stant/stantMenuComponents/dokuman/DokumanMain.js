/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Dimensions, BackHandler } from "react-native";

import GoBackPng from "../../../../../../../assets/forgotpass/go-back-black.png";

import stantYayindaIcon from "../../../../../../../assets/stant/stant-cerceve-yayinda.png";
import stantYayinBitenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-biten.png";
import stantYayinBekleyenIcon from "../../../../../../../assets/stant/stant-cerceve-yayin-bekleyen.png";

import BrosurIcon from "../../../../../../../assets/brosur.png";
import VexDriveIcon from "../../../../../../../assets/vex-drive.png";
import KartvizitIcon from "../../../../../../../assets/profileitems/kartvizit-icon.png";
import DokumanGelenGidenListComp from "./DokumanGelenGidenListComp";

import GelenKartvizitIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-kartvizit.png";
import GidenKartvizitIcon from "../../../../../../../assets/stant/menu/dokuman/giden-kartvizit.png";
import GelenBrosurIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-brosur.png";
import GidenBrosurIcon from "../../../../../../../assets/stant/menu/dokuman/giden-brosur.png";
import GelenVexDriveIcon from "../../../../../../../assets/stant/menu/dokuman/gelen-vexdrive.png";
import GidenVexDriveIcon from "../../../../../../../assets/stant/menu/dokuman/giden-vexdrive.png";
import MainHeader from "../../../../MainHeader";
import StantInfoHeader from "../../StantInfoHeader";

const WIDTH_WINDOW = Dimensions.get("window").width;

const DokumanMain = ({ item, setSelectedMenuItem }) => {
  const [selectDocument, setSelectDocument] = useState(0);
  const [documentType, setDocumentType] = useState(null);

  const handleBackButtonClick = () => {
    if (selectDocument !== 0) {
      setSelectDocument(0);
    } else {
      setSelectedMenuItem(0);
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, [selectDocument]);

  const getMainIcon = () => {
    switch (item.status) {
      case 1:
        return stantYayindaIcon;

      case 2:
        return stantYayinBitenIcon;

      case 5:
        return stantYayinBekleyenIcon;

      default:
        break;
    }
  };

  const goToDocumentList = (type) => {
    // setToBackDocument(selectDocument);
    setDocumentType(type);
    setSelectDocument(5);
  };

  const MainComponent = () => (
    <>
      <MainHeader text="Döküman" backBtnFunction={() => setSelectedMenuItem(0)} />

      <View style={styles.container}>
        {/* @info header@@@ */}

        <StantInfoHeader stant={item} />

        <View style={{ alignItems: "center", flex: 1, justifyContent: "space-between", paddingVertical: 20 }}>
          <View style={{ flex: 5, justifyContent: "space-around" }}>
            <TouchableOpacity style={styles.midButtons} onPress={() => setSelectDocument(1)}>
              <Image
                style={{ height: "60%", width: "60%", marginLeft: 5 }}
                source={KartvizitIcon}
                resizeMode="contain"
              />
              <Text style={{ color: "#6C757D" }}>Kartvizit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.midButtons} onPress={() => setSelectDocument(2)}>
              <Image style={{ height: "60%", width: "60%" }} source={BrosurIcon} resizeMode="contain" />
              <Text style={{ color: "#6C757D" }}>Broşür</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.midButtons} onPress={() => setSelectDocument(3)}>
              <Image
                style={{ height: "60%", width: "60%", marginLeft: 5 }}
                source={VexDriveIcon}
                resizeMode="contain"
              />
              <Text style={{ color: "#6C757D" }}>VexDrive</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                elevation: 6,
                width: WIDTH_WINDOW - 20,
                height: 45,
                backgroundColor: "#00AA9F",
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Yayınla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
  const KartvizitComponent = () => (
    <>
      <MainHeader text={`Kartvizit - ${item.name}`} backBtnFunction={() => setSelectDocument(0)} />

      <View style={styles.container}>
        <View style={{ alignItems: "center", flex: 1, justifyContent: "space-between", paddingVertical: 20 }}>
          <View style={{ flex: 5, justifyContent: "space-evenly" }}>
            <TouchableOpacity style={styles.midButtons} onPress={() => goToDocumentList("giden-kartvizit")}>
              <Image
                style={{ height: "60%", width: "60%", marginLeft: 5 }}
                source={GidenKartvizitIcon}
                resizeMode="contain"
              />
              <Text style={{ color: "#6C757D" }}>Giden Kartvizit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.midButtons} onPress={() => goToDocumentList("gelen-kartvizit")}>
              <Image style={{ height: "60%", width: "60%" }} source={GelenKartvizitIcon} resizeMode="contain" />
              <Text style={{ color: "#6C757D" }}>Gelen Kartvizit</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                elevation: 6,
                width: WIDTH_WINDOW - 20,
                height: 45,
                backgroundColor: "#00AA9F",
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Yayınla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );

  const BrosurComponent = () => (
    <>
      <MainHeader text={`Broşür - ${item.name}`} backBtnFunction={() => setSelectDocument(0)} />

      <View style={styles.container}>
        <View style={{ alignItems: "center", flex: 1, justifyContent: "space-between", paddingVertical: 20 }}>
          <View style={{ flex: 5, justifyContent: "space-evenly" }}>
            <TouchableOpacity style={styles.midButtons} onPress={() => goToDocumentList("giden-brosur")}>
              <Image
                style={{ height: "60%", width: "60%", marginLeft: 5 }}
                source={GidenBrosurIcon}
                resizeMode="contain"
              />
              <Text style={{ color: "#6C757D" }}>Giden Broşür</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.midButtons} onPress={() => goToDocumentList("gelen-brosur")}>
              <Image style={{ height: "60%", width: "60%" }} source={GelenBrosurIcon} resizeMode="contain" />
              <Text style={{ color: "#6C757D" }}>Gelen Broşür</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                elevation: 6,
                width: WIDTH_WINDOW - 20,
                height: 45,
                backgroundColor: "#00AA9F",
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Yayınla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );

  const VexDriveComponent = () => (
    <>
      <MainHeader text={`VexDrive - ${item.name}`} backBtnFunction={() => setSelectDocument(0)} />

      <View style={styles.container}>
        <View style={{ alignItems: "center", flex: 1, justifyContent: "space-between", paddingVertical: 20 }}>
          <View style={{ flex: 5, justifyContent: "space-evenly" }}>
            <TouchableOpacity style={styles.midButtons} onPress={() => goToDocumentList("giden-vexdrive")}>
              <Image
                style={{ height: "60%", width: "60%", marginLeft: 5 }}
                source={GidenVexDriveIcon}
                resizeMode="contain"
              />
              <Text style={{ color: "#6C757D" }}>Giden VexDrive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.midButtons} onPress={() => goToDocumentList("gelen-vexdrive")}>
              <Image style={{ height: "60%", width: "60%" }} source={GelenVexDriveIcon} resizeMode="contain" />
              <Text style={{ color: "#6C757D" }}>Gelen VexDrive</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                elevation: 6,
                width: WIDTH_WINDOW - 20,
                height: 45,
                backgroundColor: "#00AA9F",
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 18 }}>Yayınla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <View style={{ flex: 1 }}>
      {
        {
          0: <MainComponent />,
          1: <KartvizitComponent />,
          2: <BrosurComponent />,
          3: <VexDriveComponent />,
          5: (
            <DokumanGelenGidenListComp dItem={item} documentType={documentType} setSelectDocument={setSelectDocument} />
          ),
        }[selectDocument]
      }
    </View>
  );
};

export default DokumanMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 5,
  },

  midButtons: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    width: WIDTH_WINDOW / 3 - 15,
    height: WIDTH_WINDOW / 3 - 15,
    backgroundColor: "#FFFFFF",
  },
});
