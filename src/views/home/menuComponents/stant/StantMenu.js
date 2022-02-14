/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, BackHandler } from "react-native";

import { useNavigation } from "@react-navigation/native";

import dokumanIcon from "../../../../../assets/stant/menu/dokuman.png";
import erisimIcon from "../../../../../assets/stant/menu/erisim.png";
import etkilesimIcon from "../../../../../assets/stant/menu/etkilesim.png";
import vexRateIcon from "../../../../../assets/stant/menu/vexrate.png";
import vexChatIcon from "../../../../../assets/stant/menu/vexchat.png";
import begenIcon from "../../../../../assets/stant/menu/begen.png";
import sikayetIcon from "../../../../../assets/stant/menu/sikayet.png";
import davetiyeIcon from "../../../../../assets/stant/menu/davetiye.png";
import raporIcon from "../../../../../assets/stant/menu/raporlar.png";
import gorselIcon from "../../../../../assets/stant/menu/gorseller.png";
import videoIcon from "../../../../../assets/stant/menu/video.png";
import hediyeIcon from "../../../../../assets/stant/menu/hediye.png";
import yayinIcon from "../../../../../assets/stant/menu/yayin-bilgisi.png";

import RateIcon from "../../../../../assets/vex-rate.png";
import Dokuman from "./stantMenuComponents/dokuman/DokumanMain";
import ErisimMain from "./stantMenuComponents/erisim/ErisimMain";
import EtkilesimMain from "./stantMenuComponents/etkilesim/EtkilesimMain";
import VexRate from "./stantMenuComponents/vexRate/VexRateMain";

import { useUserValue } from "../../../../contexts/UserContext";
import BegenilerMain from "./stantMenuComponents/begeniler/BegenilerMain";
import SikayetlerMain from "./stantMenuComponents/sikayetler/SikayetlerMain";
import GoresellerMain from "./stantMenuComponents/gorseller/GoresellerMain";
import VideolarMain from "./stantMenuComponents/videolar/VideolarMain";
import YayinBilgisiMain from "./stantMenuComponents/yayinBilgisi/YayinBilgisiMain";
import { useStantValue } from "../../../../contexts/StantContext";
import StantInfoHeader from "./StantInfoHeader";
import MainHeader from "../../MainHeader";
import HediyeMain from "./stantMenuComponents/hediye/HediyeMain";
import { getStantInfo } from "../../../../helpers/stantConnections";
import AnalitikMain from "./stantMenuComponents/analitik/AnalitikMain";
import DavetMain from './stantMenuComponents/davet/DavetMain';

const WIDTH_WINDOW = Dimensions.get("window").width;
const HEIGHT_WINDOW = Dimensions.get("window").height;

const StantMenu = () => {
  const [{ stant, page }] = useStantValue();

  // console.log(stant);
  const [selectedMenuItem, setSelectedMenuItem] = useState(0);
  const [stantCounts, setStantCounts] = useState();

  const [{ user }] = useUserValue();

  const nav = useNavigation();

  // backbutton setup START ---
  useEffect(() => {
    // console.log("selectedMenuItem --- use effect ");
    // console.log(selectedMenuItem);
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
    };
  }, [selectedMenuItem]);

  const handleBackButtonClick = () => {
    // console.log("selectedMenuItem ---");
    // console.log(selectedMenuItem);
    if (selectedMenuItem === 0) {
      nav.goBack();
    } else {
      setSelectedMenuItem(0);
    }

    return true;
  };

  // backbutton setup END ---

  useEffect(() => {
    getStantInfo(stant.id, user.token)
      .then((res) => {
        setStantCounts(res.booth);
        // console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? `${Math.sign(num) * (Math.abs(num) / 1000).toFixed(1)}k`
      : Math.sign(num) * Math.abs(num);
  };

  const MenuItem = ({ img, txt, setRateIcon, setInfo, itemPress, count }) => {
    return (
      <TouchableOpacity
        style={{
          elevation: 7,
          margin: 5,
          width: WIDTH_WINDOW / 2 - 20,
          // minWidth: WIDTH_WINDOW / 2 - 20,
          height: HEIGHT_WINDOW / 12,
          // // flex:1,
          // maxHeight:WIDTH_WINDOW / 2 - 20,
          backgroundColor: "#FFFFFF",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        onPress={() => setSelectedMenuItem(itemPress)}
      >
        <Image
          style={{ height: WIDTH_WINDOW / 9, width: WIDTH_WINDOW / 9, margin: 5 }}
          source={img}
          resizeMode="contain"
        />
        <Text style={{ color: "#6C757D", fontSize: 15, textAlign: "center", textAlignVertical: "center" }}>{txt}</Text>
        {setInfo && (
          <View
            style={{
              width: WIDTH_WINDOW / 10,
              height: WIDTH_WINDOW / 17,
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "#00AA9F",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 12 }}>{kFormatter(count)}</Text>
          </View>
        )}
        {setRateIcon && (
          <View
            style={{
              width: WIDTH_WINDOW / 15,
              height: WIDTH_WINDOW / 8,
              position: "absolute",
              top: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image style={{ width: "100%", height: "100%" }} source={RateIcon} resizeMode="contain" />
            <Text
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "bold",
                marginTop: 3,
              }}
            >
              {stant.rating}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const MenuItemSquare = ({ img, txt, setRateIcon, setInfo, itemPress, count }) => (
    <TouchableOpacity
      style={{
        elevation: 7,
        margin: 10,
        width: HEIGHT_WINDOW / 6.6,
        height: HEIGHT_WINDOW / 6.6,
        backgroundColor: "#FFFFFF",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      onPress={() => setSelectedMenuItem(itemPress)}
    >
      <Image
        style={{ height: HEIGHT_WINDOW / 10, width: HEIGHT_WINDOW / 10, margin: 5 }}
        source={img}
        resizeMode="contain"
      />
      <Text style={{ color: "#6C757D", fontSize: 15, textAlign: "center", textAlignVertical: "center" }}>{txt}</Text>
      {setInfo && (
        <View
          style={{
            width: WIDTH_WINDOW / 16,
            height: WIDTH_WINDOW / 17,
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: "#00AA9F",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 12 }} numberOfLines={1}>
            {kFormatter(count)}
          </Text>
        </View>
      )}
      {setRateIcon && (
        <View
          style={{
            width: WIDTH_WINDOW / 15,
            height: WIDTH_WINDOW / 8,
            position: "absolute",
            top: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={{ width: "100%", height: "100%" }} source={RateIcon} resizeMode="contain" />
          <Text
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: "bold",
              marginTop: 3,
            }}
          >
            {stant.rating}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const MainComponent = () => { 
    // console.log(stantCounts);
    switch (page) {
      case "my-taslak":
        return (
          <>
            <MainHeader text={`Stantlarım - ${stant.name}`} />

            <View style={styles.container}>
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                {/* @info header@@@ */}

                <StantInfoHeader stant={stant} optionMenu />

                <View
                  style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <MenuItemSquare img={dokumanIcon} txt="Döküman" itemPress={1} />
                  <MenuItemSquare img={gorselIcon} txt="Görseller" itemPress={11} />
                  <MenuItemSquare img={videoIcon} txt="Video" itemPress={12} />
                  <MenuItemSquare img={hediyeIcon} txt="Hediye" itemPress={13} />
                  <MenuItemSquare img={hediyeIcon} txt="Promo" itemPress={14} />
                  <View // ikili dizilimi tamamlamak için
                    style={{
                      margin: 10,
                      width: HEIGHT_WINDOW / 6.6,
                      height: HEIGHT_WINDOW / 6.6,
                      backgroundColor: "#FFFFFF",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  />
                </View>
              </View>
            </View>
          </>
        );

      case "my-yayinda":
        return (
          <>
            <MainHeader text={`Stantlarım - ${stant.name}`} />
            <View style={styles.container}>
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                {/* @info header@@@ */}

                <StantInfoHeader stant={stant} optionMenu />

                <View
                  style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <MenuItem img={dokumanIcon} txt="Döküman" itemPress={1} />
                  {/* <MenuItem img={hediyeIcon} txt="3D Göre" itemPress={15} /> */}
                  <MenuItem img={yayinIcon} txt="Yayın Bilgisi" itemPress={2} />
                  <MenuItem
                    img={erisimIcon}
                    txt="Erişim"
                    setInfo
                    itemPress={3}
                    count={stantCounts?.hall?.visitors_count}
                  />
                  <MenuItem
                    img={etkilesimIcon}
                    txt="Etkileşim"
                    setInfo
                    itemPress={4}
                    count={stantCounts?.visitors_count}
                  />
                  <MenuItem img={vexRateIcon} txt="VexRate" setRateIcon itemPress={5} />
                  <MenuItem img={vexChatIcon} txt="VexChat" itemPress={6} />
                  <MenuItem img={begenIcon} txt="Beğeniler" setInfo itemPress={7} count={stantCounts?.likeable_count} />
                  <MenuItem
                    img={sikayetIcon}
                    txt="Şikayet"
                    setInfo
                    itemPress={8}
                    count={stantCounts?.complainable_count}
                  />
                  <MenuItem img={davetiyeIcon} txt="Davetiye" itemPress={9} />
                  <MenuItem img={raporIcon} txt="Analitik" itemPress={10} />
                  <MenuItem img={gorselIcon} txt="Görseller" itemPress={11} />
                  <MenuItem img={videoIcon} txt="Video" itemPress={12} />
                  <MenuItem img={hediyeIcon} txt="Hediye" itemPress={13} />
                  <MenuItem img={hediyeIcon} txt="Promo" itemPress={14} />
                </View>
              </View>
            </View>
          </>
        );

      case "my-bekleme":
        return (
          <>
            <MainHeader text={`Stantlarım - ${stant.name}`} />
            <View style={styles.container}>
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                {/* @info header@@@ */}

                <StantInfoHeader stant={stant} optionMenu />

                <View
                  style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <MenuItemSquare img={dokumanIcon} txt="Döküman" itemPress={1} />
                  <MenuItemSquare img={yayinIcon} txt="Yayın Bilgisi" itemPress={2} />
                  <MenuItemSquare img={davetiyeIcon} txt="Davetiye" itemPress={9} />
                  <MenuItemSquare img={gorselIcon} txt="Görseller" itemPress={11} />
                  <MenuItemSquare img={videoIcon} txt="Video" itemPress={12} />
                  <MenuItemSquare img={hediyeIcon} txt="Hediye" itemPress={13} />
                  <MenuItemSquare img={hediyeIcon} txt="Promo" itemPress={14} />
                  <View // ikili dizilimi tamamlamak için
                    style={{
                      margin: 10,
                      width: HEIGHT_WINDOW / 6.6,
                      height: HEIGHT_WINDOW / 6.6,
                      backgroundColor: "#FFFFFF",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  />
                </View>
              </View>
            </View>
          </>
        );

      case "my-biten":
        return (
          <>
            <MainHeader text={`Stantlarım - ${stant.name}`} />
            <View style={styles.container}>
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                {/* @info header@@@ */}

                <StantInfoHeader stant={stant} optionMenu />

                <View
                  style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <MenuItem img={dokumanIcon} txt="Döküman" itemPress={1} />
                  <MenuItem img={yayinIcon} txt="Yayın Bilgisi" itemPress={2} />
                  <MenuItem
                    img={erisimIcon}
                    txt="Erişim"
                    setInfo
                    itemPress={3}
                    count={stantCounts?.hall?.visitors_count}
                  />
                  <MenuItem
                    img={etkilesimIcon}
                    txt="Etkileşim"
                    setInfo
                    itemPress={4}
                    count={stantCounts?.visitors_count}
                  />
                  <MenuItem img={vexRateIcon} txt="VexRate" setRateIcon itemPress={5} />
                  <MenuItem img={vexChatIcon} txt="VexChat" itemPress={6} />
                  <MenuItem img={begenIcon} txt="Beğeniler" setInfo itemPress={7} count={stantCounts?.likeable_count} />
                  <MenuItem
                    img={sikayetIcon}
                    txt="Şikayet"
                    setInfo
                    itemPress={8}
                    count={stantCounts?.complainable_count}
                  />
                  <MenuItem img={davetiyeIcon} txt="Davetiye" itemPress={9} />
                  <MenuItem img={raporIcon} txt="Analitik" itemPress={10} />
                  <MenuItem img={gorselIcon} txt="Görseller" itemPress={11} />
                  <MenuItem img={videoIcon} txt="Video" itemPress={12} />
                  <MenuItem img={hediyeIcon} txt="Hediye" itemPress={13} />
                  <MenuItem img={hediyeIcon} txt="Promo" itemPress={14} />
                </View>
              </View>
            </View>
          </>
        );

      case "other-yayinda":
        return (
          <>
            <MainHeader text={`Kullanıcı Stanı - ${stant.name}`} />
            <View style={styles.container}>
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                {/* @info header@@@ */}

                <StantInfoHeader stant={stant} optionMenu />

                <View
                  style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <MenuItem img={dokumanIcon} txt="Döküman" itemPress={1} />
                  <MenuItem img={yayinIcon} txt="Yayın Bilgisi" itemPress={2} />
                  <MenuItem
                    img={erisimIcon}
                    txt="Erişim"
                    setInfo
                    itemPress={3}
                    count={stantCounts?.hall?.visitors_count}
                  />
                  <MenuItem
                    img={etkilesimIcon}
                    txt="Etkileşim"
                    setInfo
                    itemPress={4}
                    count={stantCounts?.visitors_count}
                  />
                  <MenuItem img={vexRateIcon} txt="VexRate" setRateIcon itemPress={5} />
                  <MenuItem img={vexChatIcon} txt="VexChat" itemPress={6} />
                  <MenuItem img={begenIcon} txt="Beğeniler" setInfo itemPress={7} count={stantCounts?.likeable_count} />
                  <MenuItem
                    img={sikayetIcon}
                    txt="Şikayet"
                    setInfo
                    itemPress={8}
                    count={stantCounts?.complainable_count}
                  />
                  <MenuItem img={davetiyeIcon} txt="Davetiye" itemPress={9} />
                  <MenuItem img={raporIcon} txt="Analitik" itemPress={10} />
                  <MenuItem img={gorselIcon} txt="Görseller" itemPress={11} />
                  <MenuItem img={videoIcon} txt="Video" itemPress={12} />
                  <MenuItem img={hediyeIcon} txt="Hediye" itemPress={13} />
                  <MenuItem img={hediyeIcon} txt="Promo" itemPress={14} />
                </View>
              </View>
            </View>
          </>
        );

      case "other-bekleme":
        return <YayinBilgisiMain stantItem={stant} />;

      case "other-biten":
        return (
          <>
            <MainHeader text={`Kullanıcı Stanı - ${stant.name}`} />
            <View style={styles.container}>
              <View style={{ flex: 1, justifyContent: "flex-start" }}>
                {/* @info header@@@ */}

                <StantInfoHeader stant={stant} optionMenu />

                <View
                  style={{
                    flex: 1,
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <MenuItemSquare img={yayinIcon} txt="Yayın Bilgisi" itemPress={2} />
                  <MenuItemSquare
                    img={erisimIcon}
                    txt="Erişim"
                    setInfo
                    itemPress={3}
                    count={stantCounts?.hall?.visitors_count}
                  />
                  <MenuItemSquare
                    img={etkilesimIcon}
                    txt="Etkileşim"
                    setInfo
                    itemPress={4}
                    count={stantCounts?.visitors_count}
                  />
                  <MenuItemSquare img={vexRateIcon} txt="VexRate" setRateIcon itemPress={5} />
                  <MenuItemSquare
                    img={begenIcon}
                    txt="Beğeniler"
                    setInfo
                    itemPress={7}
                    count={stantCounts?.likeable_count}
                  />
                  <MenuItemSquare
                    img={sikayetIcon}
                    txt="Şikayet"
                    setInfo
                    itemPress={8}
                    count={stantCounts?.complainable_count}
                  />
                </View>
              </View>
            </View>
          </>
        );

      default:
        return null;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {
        {
          0: <MainComponent />,
          1: <Dokuman item={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          2: (
            <YayinBilgisiMain
              stantItem={stant}
              setSelectedMenuItem={setSelectedMenuItem}
              backtoStant={() => setSelectedMenuItem(0)}
            />
          ),
          3: <ErisimMain stantItem={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          4: <EtkilesimMain stantItem={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          5: <VexRate stantItem={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          6: (
            <View>
              <Text>VexChat Açılacak...</Text>
            </View>
          ),
          7: <BegenilerMain stantItem={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          8: <SikayetlerMain stantItem={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          9:  <DavetMain stantItem={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          10: <AnalitikMain stantItem={stant} setSelectedMenuItem={setSelectedMenuItem}/>,
          11: <GoresellerMain stantItem={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          12: <VideolarMain stantItem={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          13: <HediyeMain stantItem={stant} setSelectedMenuItem={setSelectedMenuItem} />,
          14: (
            <View>
              <Text>promo.. .</Text>
            </View>
          ),
        }[selectedMenuItem]
      }
    </View>
  );
};

export default StantMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 5,
  },
});
